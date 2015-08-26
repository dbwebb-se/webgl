/**
 * Draw a triangle on Canvas
 */
window.onload = function() {
    "use strict";

    // Configure the canvas to use WebGL
    var gl;
    var canvas = document.getElementById('canvas1');
    try {
        gl = canvas.getContext('experimental-webgl');
    } catch (e) {
        throw new Error('no WebGL found');
    }

    // Copy an array of data points forming a triangle to the
    // graphics hardware
    var vertices = [
        0.0, 0.5,
        0.5, -0.5,
        -0.5, -0.5,
    ];
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create a simple vertex shader
    var vertCode =
        'attribute vec2 coordinates;' +
        'void main(void) {' +
        '  gl_Position = vec4(coordinates, 0.0, 1.0);' +
        '}';

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vertShader));
    }

    // Create a simple fragment shader
    var fragCode =
        'void main(void) {' +
        '   gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);' +
        '}';

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(fragShader));
    }

    // Put the vertex shader and fragment shader together into
    // a complete program

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(shaderProgram));
    }

    // Everything we need has now been copied to the graphics
    // hardware, so we can start drawing

    // Clear the drawing surface
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell WebGL which shader program to use
    gl.useProgram(shaderProgram);

    // Tell WebGL that the data from the array of triangle
    // coordinates that we've already copied to the graphics
    // hardware should be fed to the vertex shader as the
    // parameter "coordinates"
    var coordinatesVar = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.enableVertexAttribArray(coordinatesVar);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(coordinatesVar, 2, gl.FLOAT, false, 0, 0);

    // Now we can tell WebGL to draw the 3 points that make
    // up the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);




    console.log("Everything is ready.");
}();
