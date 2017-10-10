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



    // Create a buffer
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);



    // Look up vertex data
    var a_Position      = gl.getAttribLocation(program, "a_Position");
    var a_Color         = gl.getAttribLocation(program, "a_Color");
    var u_ModelMatrix   = gl.getUniformLocation(program, "u_ModelMatrix");



    // Lookup fragment data



    // Set Geometry
    var data = setGeometryTriangleColored(gl);

    // Define parts for position
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, data.fsize * 5, 0);
    gl.enableVertexAttribArray(a_Position);

    // Define parts for color
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, data.fsize * 5, data.fsize * 2);
    gl.enableVertexAttribArray(a_Color);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, data.vertex, data.usage);




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
 * Triangle with both vertices and color in buffer.
 */
function setGeometryTriangleColored(gl) {
    var data = {
        usage:  gl.STATIC_DRAW,
        mode:   gl.TRIANGLES,
        fsize:  null,
        n:      3,
        vertex: new Float32Array([
             0.0,  0.5,   1.0, 0.0, 0.0, // First with color
            -0.5, -0.5,   0.0, 1.0, 0.0, // Second with color
             0.5, -0.5,   0.0, 0.0, 1.0, // Third with color
        ]),
    };

    data.fsize = data.vertex.BYTES_PER_ELEMENT;

    return data;
}
