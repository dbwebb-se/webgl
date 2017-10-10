/**
 * Draw on Canvas
 */
/* global WebGLUtils, Matrix4 */
window.onload = function() {
    "use strict";

    var canvas;
    var gl;
    var program;
    var buffer;



    // Get A WebGL context
    canvas = document.getElementById("canvas");
    gl = WebGLUtils.getWebGLContext(canvas);
    if (!gl) {
        return;
    }



    // Setup GLSL program
    program = WebGLUtils.createProgramFromScripts(
        gl,
        ["vertex-shader", "fragment-shader"]
    );
    gl.useProgram(program);



    // Look up vertex data
    var a_Position = gl.getAttribLocation(program, "a_Position");
    var u_ModelMatrix = gl.getUniformLocation(program, "u_ModelMatrix");



    // Lookup fragment data
    var u_FragColor = gl.getUniformLocation(program, "u_FragColor");



    // Create a buffer
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(a_Position);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);



    // Set Geometry
    //var data = setGeometrySquareHalf(gl);
    //var data = setGeometrySquareFull(gl);
    var data = setGeometryTriangle(gl);



    /**
     * Prepare to add a lot of objects to the world
     */
    var world = {
        objects: []
    };

    world.add = function (angle, speed, color) {
        color = new Float32Array(color);

        this.objects.push({
            angle: angle,
            speed: speed,
            color: color
        });
    };

    // Add the first object
    world.add(0, 10, [0.0, 1.0, 0.0, 1.0]);



    /**
     * Update and respect timediff
     */
    var speed = 1;

    function update(td) {
        var i;
        var object;

        for (i = 0; i < world.objects.length; i++) {
            object = world.objects[i];
            object.angle = (object.angle + object.speed * speed * td) % 360;
        }
    }



    /**
     * Draw it
     */
    function draw() {
        var i;
        var object;
        var modelMatrix = new Matrix4();

        gl.clear(gl.COLOR_BUFFER_BIT);

        for (i = 0; i < world.objects.length; i++) {
            object = world.objects[i];

            modelMatrix.setRotate(object.angle, 0, 0, 1);

            gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
            gl.uniform4fv(u_FragColor, object.color);

            gl.drawArrays(data.mode, 0, data.n);
        }
    }



    /**
     * A gameloop to animate
     */
    var lastTick = null;
    var request = null;

    function gameLoop() {
        var now = Date.now();
        var td = (now - (lastTick || now)) / 1000;
        lastTick = now;

        request = window.requestAnimFrame(gameLoop);

        update(td);
        draw();
    }



    /**
     * Control panel
     */
    var playElement = document.getElementById("play");
    playElement.addEventListener("click", function() {
        if (request === null) {
            gameLoop();
        }
    });

    var pauseElement = document.getElementById("pause");
    pauseElement.addEventListener("click", function() {
        if (request) {
            window.cancelRequestAnimFrame(request);
            request = null;
            lastTick = null;
        }
    });

    var addElement = document.getElementById("add");
    addElement.addEventListener("click", function() {
        var angle = Math.random() * 360;
        var speed = Math.random() * 20;
        var color = [Math.random(), Math.random(), Math.random(), 1.0];

        world.add(angle, speed, color);
    });

    var speedElement = document.getElementById("speed");
    speedElement.addEventListener("change", function() {
        speed = parseFloat(speedElement.value);
    });



    //console.log(gl);
    console.log("Everything is ready.");
    gameLoop();
};



/**
 * A full square.
 */
/*
function setGeometrySquareFull(gl) {
    var data = {
        n: 6,
        mode: gl.TRIANGLES
    };

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0
        ]),
       gl.STATIC_DRAW
   );

   return data;
} */



/**
 * Half a square.
 */
/*
function setGeometrySquareHalf(gl) {
    var data = {
        n: 6,
        mode: gl.TRIANGLES
    };

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -0.5, -0.5,
             0.5, -0.5,
            -0.5,  0.5,
            -0.5,  0.5,
             0.5, -0.5,
             0.5,  0.5
        ]),
       gl.STATIC_DRAW
   );

  return data;
} */



/**
 * Triangle.
 */
function setGeometryTriangle(gl) {
    var data = {
        n: 3,
        mode: gl.TRIANGLES
    };

    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
             0.0,  0.5,
            -0.5, -0.5,
             0.5, -0.5,
        ]),
        gl.STATIC_DRAW
    );

    return data;
}
