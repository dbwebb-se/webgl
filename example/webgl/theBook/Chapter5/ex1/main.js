/**
 * Draw on Canvas
 */

/* global getWebGLContext initShaders */

window.onload = (function() {
    "use strict";

    // Vertex shader program
    var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = a_PointSize;\n' +
    '}\n';

    // Fragment shader program
    var FSHADER_SOURCE =
        'void main() {\n' +
        '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
        '}\n';

    var canvas = document.getElementById('canvas1');

    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log("Failed to get rendering context for WebGL");
        return;
    }

    // Init shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders!");
        return;
    }

    var n = initVertexBuffers(gl);

    if (n < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
    }

    // Set canvas color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw three points
    gl.drawArrays(gl.POINTS, 0, n);

    function initVertexBuffers(gl) {
        var vertices = new Float32Array([
            0.0, 0.5, -0.5, -0.5, 0.5, -0.5
        ]);
        var n = 3;

        var sizes  = new Float32Array([
            10.0, 20.0, 30.0    // Point sizes
        ]);

        // Create a buffer object
        var vertexBuffer = gl.createBuffer();
        var sizeBuffer = gl.createBuffer();

        if (!vertexBuffer) {
            console.log("Failed to create the buffer object");
            return -1;
        }

        // Bind the buffer object to target
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // Write data into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Get storage location of attribute variable
        var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

        if (a_Position < 0) {
            console.log("Failed to get the storage location of a_Position");
            return;
        }

        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(a_Position);

        // Write point sizes to the buffer object and enable it
        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

        var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

        if (a_PointSize < 0) {
            console.log("Failed to get the storage location of a_PointSize");
            return;
        }

        gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(a_PointSize);

        return n;
    }

    console.log("Everything is ready.");
})();
