/**
 * Draw on Canvas
 */
/* global WebGLUtils */
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
    /*
    var vertexShader = WebGLUtils.createShaderFromScriptElement(gl, "vertex-shader");
    var fragmentShader = WebGLUtils.createShaderFromScriptElement(gl, "fragment-shader");
    program = WebGLUtils.createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);
    */

    // Setup GLSL program - shorter version
    program = WebGLUtils.createProgramFromScripts(gl, ["vertex-shader", "fragment-shader"]);
    gl.useProgram(program);



    // Look up vertex data
    var a_Position = gl.getAttribLocation(program, "a_Position");
    var u_Translation = gl.getUniformLocation(program, "u_Translation");



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



    // Update & Draw
    update();
    draw();



    // Update before drawing
    function update() {
        // The translation distance for x, y and z direction
        var translation = new Float32Array([
            //0.5, 0.5, 0.5, 0.0
            Math.random()-0.5, Math.random()-0.5, Math.random()-0.5, 0.0
        ]);
        gl.uniform4fv(u_Translation, translation);

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



    console.log(gl);
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
}*/



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
