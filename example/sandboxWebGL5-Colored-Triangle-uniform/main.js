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
    var u_Width = gl.getUniformLocation(program, "u_Width");
    var u_Height = gl.getUniformLocation(program, "u_Height");

    // Provide canvas size to fragment shader
    gl.uniform1f(u_Width, gl.drawingBufferWidth);
    gl.uniform1f(u_Height, gl.drawingBufferHeight);


    // Create a buffer
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(a_Position);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);



    // Set Geometry
    //var data = setGeometrySquareHalf(gl);
    //var data = setGeometrySquareFull(gl);
    var data = setGeometryTriangle(gl);



    // Update & Draw
    update();
    draw();



    // Update before drawing
    function update() {
        // Create Matrix4 object for model transformation
        var modelMatrix = new Matrix4();

        // Rotate
        var angle = Math.random() * 360;
        modelMatrix.setRotate(angle, 0, 0, 1);

        // Translate
        var tx = Math.random()-0.5;
        var ty = Math.random()-0.5;
        var tz = Math.random()-0.5;
        modelMatrix.translate(tx, ty, tz);

        // Scale
        var sx = Math.random();
        var sy = Math.random();
        var sz = Math.random();
        modelMatrix.scale(sx, sy, sz);

        gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);



        // Set the color
        var color = new Float32Array([
            //0.0, 1.0, 0.0, 1.0
            Math.random(), Math.random(), Math.random(), 1.0
        ]);
        gl.uniform4fv(u_FragColor, color);
    }



    // Draw it all
    function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(data.mode, 0, data.n);
    }



    //console.log(gl);
    console.log("Everything is ready.");
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
