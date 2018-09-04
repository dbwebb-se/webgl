/**
* Playing Asteroids while learning JavaScript object model.
*/

/**
* Shim layer, polyfill, for requestAnimationFrame with setTimeout fallback.
* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
*/
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ) {
        window.setTimeout(callback, 1000 / 60);
    };
})();



/**
* Shim layer, polyfill, for cancelAnimationFrame with setTimeout fallback.
*/
window.cancelRequestAnimFrame = (function() {
    return  window.cancelRequestAnimationFrame       ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    window.clearTimeout;
})();



/**
* True prototypal inheritance by Douglas Crockford.
* http://javascript.crockford.com/prototypal.html
*/
Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
};
//newObject = Object.create(oldObject);



/**
* Trace the keys pressed
* http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
*/
window.Key = {
    pressed: {},

    LEFT:   37,
    UP:     38,
    RIGHT:  39,
    DOWN:   40,
    SPACE:  32,
    A:      65,
    S:      83,
    D:      68,
    w:      87,

    isDown: function(keyCode, keyCode1) {
        return this.pressed[keyCode] || this.pressed[keyCode1];
    },

    onKeydown: function(event) {
        this.pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this.pressed[event.keyCode];
    }
};
window.addEventListener('keyup',   function(event) {
    window.Key.onKeyup(event);
}, false);
window.addEventListener('keydown', function(event) {
    window.Key.onKeydown(event);
}, false);



/**
* All objects are Vectors
*/
function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype = {
    muls:  function (scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }, // Multiply with scalar
    imuls: function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    },      // Multiply itself with scalar
    adds:  function (scalar) {
        return new Vector(this.x + scalar, this.y + scalar);
    }, // Add with scalar
    iadd:  function (vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }   // Add itself with Vector
};



/**
* Particles as parts of a particle system
*/
function Particle(position, velocity) {
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
}

Particle.prototype = {

    update: function(td) { this.position.iadd( this.velocity.muls( td ) ); },

    draw: function(ct) { ct.fillRect(this.position.x, this.position.y, 1, 1); }
};



/**
* The particle system
*/
// function ParticleSystem(particles, forces) {
//     this.particles  = particles || [];
//     this.forces     = forces    || [];
// }

Particle.prototype = {

    update: function(td) {
        var alive = [], i, j, particle, force;
        for (i=0; i<this.particles.length; i++) {
            particle = this.particles[i];
            for (j=0; j<this.forces.length; j++) {
                force = this.forces[i];
                force(particle, td);
            }
            if (particle.update(td)) {
                alive.push(particle);
            }
        }
        this.particles = alive;
    },

    draw: function(ct) {
        var i;
        for (i=0; i<this.particles.length; i++) {
            this.particle[i].draw(ct);
        }
    }
};


/**
* The forces around us.
*/
function Forces() {
    this.all = {};
}

Forces.prototype = {

    createAcceleration: function(vector) {
        return function(velocity, td) {
            velocity.iadd(vector.muls(td));
        };
    },

    createDamping: function(damping) {
        return function(velocity /*, td*/) {
            velocity.imuls(damping);
        };
    },

    createWind: function(vector) {
        return function(velocity, td) {
            velocity.iadd(vector.adds(td));
        };
    },

    addAcceleration:  function(name, vector)  { this.all[name] = this.createAcceleration(vector); },
    addDamping:       function(name, damping) { this.all[name] = this.createDamping(damping); },
    addWind:          function(name, vector)  { this.all[name] = this.createWind(vector); },

    update: function(object, td) {
        for (var force in this.all) {
            if (this.all.hasOwnProperty(force)) {
                this.all[force](object, td);
            }
        }
    }

};

window.Forces = new Forces();
window.Forces.addAcceleration('gravity', new Vector(0, 9.82));
window.Forces.addDamping('drag', 0.97);
window.Forces.addWind('wind', new Vector(0.5, 0));



/**
* A Player as an object.
*/
function Player(width, height, position, velocity, speed,
    direction, accelerateForce, breakForce, dampForce) {
    this.height     = height    || 32;
    this.width      = width     || 32;
    this.position   = position  || new Vector();
    this.velocity   = velocity  || new Vector();
    this.speed      = speed     || new Vector();
    this.direction  = direction || 0;
    this.accelerateForce  = accelerateForce || Forces.createAcceleration(new Vector(80, 80));
    this.breakForce       = breakForce      || Forces.createDamping(0.97);
    this.dampForce        = dampForce       || Forces.createDamping(0.999);
}

Player.prototype = {
    draw: function(ct) {
        var x = this.width/2, y = this.height/2;

        ct.save();
        ct.translate(this.position.x, this.position.y);
        ct.rotate(this.direction+Math.PI/2);
        ct.beginPath();
        ct.moveTo(0, -y);
        ct.lineTo(x, y);
        ct.lineTo(0, 0.8*y);
        ct.lineTo(-x, y);
        ct.lineTo(0, -y);

        if (window.Key.isDown(window.Key.UP, window.Key.W)) {
            ct.moveTo(0, y);
            ct.lineTo(-2, y+10);
            ct.lineTo(0, y+8);
            ct.lineTo(2, y+10);
            ct.lineTo(0, y);
        }

        if (window.Key.isDown(window.Key.DOWN, window.Key.S)) {
            ct.moveTo(y+4, 0);
            ct.arc(0, 0, y+4, 0, Math.PI, true);
        }

        ct.stroke();
        ct.restore();
    },

    moveForward: function(td) {
        this.dampForce(this.speed, td);
        this.position.x += this.speed.x * Math.cos(this.direction) * td;
        this.position.y += this.speed.y * Math.sin(this.direction) * td;
        this.position.iadd(this.velocity.muls(td));
    },

    rotateLeft:  function() { this.direction -= Math.PI/30; },
    rotateRight: function() { this.direction += Math.PI/30; },

    throttle: function(td)  { this.accelerateForce(this.speed, td); },
    breaks:   function(td)  {
        this.breakForce(this.speed, td);
        this.breakForce(this.velocity, td);
    },

    update: function(td, width, height) {
        if (window.Key.isDown(window.Key.UP, window.Key.W)) {
            this.throttle(td);
        }
        if (window.Key.isDown(window.Key.LEFT, window.Key.A)) {
            this.rotateLeft();
        }
        if (window.Key.isDown(window.Key.DOWN, window.Key.S)) {
            this.breaks(td);
        }
        if (window.Key.isDown(window.Key.RIGHT, window.Key.D)) {
            this.rotateRight();
        }
        Forces.update(this.velocity, td);
        //this.position.iadd(this.velocity.muls(td))
        this.moveForward(td);
        this.stayInArea(width, height);
    },

    stayInArea: function(width, height) {
        if (this.position.y < -this.height) {
            this.position.y = height;
        }
        if (this.position.y > height) {
            this.position.y = -this.height;
        }
        if (this.position.x > width) {
            this.position.x = -this.width;
        }
        if (this.position.x < -this.width) {
            this.position.x = width;
        }
    }
};



/**
* Asteroids, the Game
*/
window.Asteroids = (function() {
    var ct, ship, lastGameTick, width, height;

    var init = function(canvas) {
        canvas = document.getElementById(canvas);
        ct = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        ct.lineWidth = 1;
        ct.strokeStyle = 'hsla(0, 0%, 100%, 1)';
        ship = new Player(10, 20, new Vector(width/2, height/2));

        console.log('Init the game');
    };

    var update = function(td) {
        ship.update(td, width, height);
    };

    var render = function() {
        ct.clearRect(0, 0, width, height);
        ship.draw(ct);
    };

    var gameLoop = function() {
        var now = Date.now();
        var td = (now - (lastGameTick || now)) / 1000; // Timediff since last frame / gametick
        lastGameTick = now;
        window.requestAnimFrame(gameLoop);
        update(td);
        render();
    };

    return {
        'init': init,
        'gameLoop': gameLoop
    };
})();

window.onload = (function() {
    'use strict';

    window.Asteroids.init('canvas1');
    window.Asteroids.gameLoop();

    console.log('Ready to play.');
})();
