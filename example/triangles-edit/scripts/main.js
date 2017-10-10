/**
 * Draw on Canvas
 */
/* globals WebGLUtils, Triangle, Matrix4 */
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




    /**
     * Prepare to add a lot of objects to the world
     */
    var world = {
        objects: []
    };

    world.add = function (angle, speed, color, verts) {
        color = new Float32Array(color);

        this.objects.push(new Triangle(verts, speed, angle, color));
    };

    // Add the first object
    addRandomTriangle();



    /**
     * Update and respect timediff
     */
    var speed = 1;
    function update(td) {
        for (var i = 0; i < world.objects.length; i++) {
            world.objects[i].update(speed * td);
        }
    }



    /**
    * FPS vars
    */
    var fpsEle = document.getElementById("fps");
    var fps = 0;
    var fpsCounter = 0;
    var fpsTimer = Date.now();

    /**
     * Draw it
     */
    function draw() {
        var modelMatrix = new Matrix4();

        gl.clear(gl.COLOR_BUFFER_BIT);

        for (var i = 0; i < world.objects.length; i++) {
            var object = world.objects[i];

            modelMatrix.setRotate(object.angle, 0, 0, 1);

            gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
            gl.uniform4fv(u_FragColor, object.color);

            var data = setGeometryTriangle(gl, new Float32Array(object.vertices), gl.TRIANGLES);
            gl.drawArrays(data.mode, 0, data.n);

            if (object.selected) {
                gl.uniform4fv(u_FragColor, new Float32Array([1, 0, 0, 1]));
                data = setGeometryTriangle(gl, new Float32Array(object.vertices), gl.LINE_LOOP);
                gl.drawArrays(data.mode, 0, data.n);
            }
        }

        fpsEle.innerHTML = "FPS: " + fps + " (" + fpsCounter + ")";
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

        //FPS
        fpsCounter++;

        if (now >= fpsTimer + 1000) {
            fps = fpsCounter;
            fpsCounter = 0;
            fpsTimer = now;
        }

        request = window.requestAnimFrame(gameLoop);

        update(td);
        draw();
    }



    function addRandomTriangle() {
        var angle = Math.random() * 360;
        var speed = Math.random() * 20;
        var color = [Math.random(), Math.random(), Math.random(), 1.0];
        var verts = [
            ((Math.random() * 2 ) - 1), ((Math.random() * 2 ) - 1),
            ((Math.random() * 2 ) - 1), ((Math.random() * 2 ) - 1),
            ((Math.random() * 2 ) - 1), ((Math.random() * 2 ) - 1),
        ];

        world.add(angle, speed, color, verts);
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
        addRandomTriangle();
    });

    var speedElement = document.getElementById("speed");
    speedElement.addEventListener("change", function() {
        speed = parseFloat(speedElement.value);
    });

    var addMultInpEle = document.getElementById("addMultipleInput");
    var addMulButtEle = document.getElementById("addMultipleButton");
    addMulButtEle.addEventListener("click", function() {
        var n = addMultInpEle.value;

        for (var i = 0; i < n; i++) {
            addRandomTriangle();
        }
    });

    canvas.onmousedown = function(ev) {
        click(ev, canvas, world.objects);
    };

    function click(ev, canvas, triangles) {
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();

        // Calculate canvas relative pos of click
        x = ((x - rect.left) - canvas.width/2) / (canvas.width/2);
        y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2);

        var clickedTri = -1;
        for (var i = triangles.length - 1; i >= 0; i--) {
            triangles[i].selected = false;

            if (triangles[i].checkClick(x, y) && clickedTri == -1) {
                clickedTri = i;
            }
        }

        triangleClicked(clickedTri);
    }

    var triClicked = -1;
    var triTitle = document.getElementById("selectedTriTitle");
    var triSpeed = document.getElementById("selectedTriSpeed");
    var triColorR = document.getElementById("selectedTriColorR");
    var triColorG = document.getElementById("selectedTriColorG");
    var triColorB = document.getElementById("selectedTriColorB");
    var triColorA = document.getElementById("selectedTriColorA");
    var triApply = document.getElementById("selectedTriApply");
    var triRemove = document.getElementById("selectedTriDelete");

    function triangleClicked(id) {
        var valid = (id != -1);
        var tri = world.objects[id];

        if (valid) {
            tri.selected = true;
        }

        triTitle.innerHTML = (
            valid
                ? "Triangle (id: " + id + ") selected"
                : "No triangle selected"
        );
        triSpeed.disabled = !valid;
        triSpeed.value = (valid ? tri.speed : "");
        triColorR.disabled = !valid;
        triColorG.disabled = !valid;
        triColorB.disabled = !valid;
        triColorA.disabled = !valid;
        triColorR.value = (valid ? tri.color[0] : "");
        triColorG.value = (valid ? tri.color[1] : "");
        triColorB.value = (valid ? tri.color[2] : "");
        triColorA.value = (valid ? tri.color[3] : "");
        triApply.disabled = !valid;
        triRemove.disabled = !valid;

        triClicked = id;
    }

    triApply.addEventListener("click", function () {
        world.objects[triClicked].speed = triSpeed.value;
        world.objects[triClicked].color = new Float32Array([
            triColorR.value,
            triColorG.value,
            triColorB.value,
            triColorA.value
        ]);
    });

    triRemove.addEventListener("click", function () {
        world.objects.splice(triClicked, 1);
        triangleClicked(-1);
    });

    //console.log(gl);
    console.log("Everything is ready.");
    gameLoop();
};



function setGeometryTriangle(gl, tri, mode) {
    var data = {
        n: 3,
        mode: (typeof(mode) == "undefined" ? gl.TRIANGLES : mode)
    };

    gl.bufferData(
        gl.ARRAY_BUFFER,
        tri,
        gl.STATIC_DRAW
    );

    return data;
}
