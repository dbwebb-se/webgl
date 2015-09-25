/**
 * Draw on Canvas
 */
window.onload = function() {
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
        var verticesSizes = new Float32Array([
            // Vertices coordinates and sizes of a point
            0.0, 0.5, 10.0,
            -0.5, -0.5, 20.0,
            0.5, -0.5, 30.0
        ]);
        var n = 3;

        // Create a buffer object
        var vertexSizeBuffer = gl.createBuffer();

        if (!vertexSizeBuffer) {
            console.log("Failed to create the buffer object");
            return -1;
        }

        // Bind the buffer object to target
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizeBuffer);
        // Write data into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

        var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

        // Get storage location of attribute variable
        var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

        if (a_Position < 0) {
            console.log("Failed to get the storage location of a_Position");
            return;
        }

        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);
        gl.enableVertexAttribArray(a_Position);

        var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

        if (a_PointSize < 0) {
            console.log("Failed to get the storage location of a_PointSize");
            return;
        }

        gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
        gl.enableVertexAttribArray(a_PointSize);

        // Unbind the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return n;
    }

    console.log("Everything is ready.");
}();
