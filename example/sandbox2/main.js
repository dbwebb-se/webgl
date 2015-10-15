/**
 * Draw on Canvas
 */
window.onload = function() {
    "use strict";

    // Vertex shader program
    var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = 40.0;\n' +
    '}\n';

    // Fragment shader program
    var FSHADER_SOURCE =
        'precision mediump float;\n' +
        'uniform vec4 u_FragColor;\n' +
        'void main() {\n' +
        '   gl_FragColor = u_FragColor;\n' +
        '}\n';

    var canvas = document.getElementById('canvas1');

    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log("Failed to get rendering context for WebGL");
        return;
    }

    // init shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders!");
        return;
    }

    // Get storage location of attribute variable
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return;
    }

    // Get storage location of uniform variable
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    // Register eventhandler, mouse click
    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    var g_points = [];
    var g_colors = [];

    function click(ev, gl, canvas, a_Position, u_FragColor) {
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();

        x = ((x - rect.left) - canvas.width/2) / (canvas.width/2);
        y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2);

        g_points.push([x, y]);

        // Store the color in the array
        if (x >= 0.0 && y >= 0.0) {
            g_colors.push([1.0, 0.0, 0.5, 1.0]);
        } else if (x >= 0.0 && y < 0.0) {
            g_colors.push([0.5, 0.0, 1.0, 1.0]);
        } else if (x < 0.0 && y < 0.0) {
            g_colors.push([0.0, 0.5, 0.0, 1.0]);
        } else {
            g_colors.push([1.0, 0.0, 1.0, 1.0]);
        }

        gl.clear(gl.COLOR_BUFFER_BIT);

        var len = g_points.length;

        for (var i = 0; i < len; i++) {
            var xy = g_points[i];
            var rgba = g_colors[i];

            gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
            gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

            // Draw the point
            gl.drawArrays(gl.POINTS, 0, 1);
        }

    }

    console.log("Everything is ready.");
}();
