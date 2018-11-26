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
    var a_TexCoord      = gl.getAttribLocation(program, "a_TexCoord");
    var u_ModelMatrix   = gl.getUniformLocation(program, "u_ModelMatrix");



    // Lookup fragment data
    var u_Sampler = gl.getUniformLocation(program, 'u_Sampler');



    // Set Geometry
    var data = setGeometryRectangleTexture(gl);

    // Define parts for position
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, data.fsize * 4, 0);
    gl.enableVertexAttribArray(a_Position);

    // Define parts for texture
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, data.fsize * 4, data.fsize * 2);
    gl.enableVertexAttribArray(a_TexCoord);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, data.vertex, data.usage);



    //
    // Create texture and load the image
    //
    var texture = gl.createTexture();

    // Flip the image's y axis
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    // Set the texture unit 0 to the sampler
    gl.uniform1i(u_Sampler, 0);

    // Create a image object to load and hold the image
    var image = new Image();

    // When the image is loaded, set it as texture image.
    // Image is loaded asynchronously so can only do update & draw after
    // image is loaded.
    image.onload = function() {
        // Enable texture unit0 and bind object to target
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

        // Map image to texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

        // Only when image is loaded
        update();
        draw();
    };

    image.src = data.texture;



    /**
     * Update before drawing
     */
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



    /**
     * Draw it all
     */
    function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(data.mode, 0, data.n);
    }



    //console.log(gl);
    console.log("Everything is ready.");
};



/**
 * Rectangle with vertices and texture position.
 */
function setGeometryRectangleTexture(gl) {
    var data = {
        usage:      gl.STATIC_DRAW,
        mode:       gl.TRIANGLE_STRIP,
        fsize:      null,
        // texture:  "../img/sky.jpg",
        texture:    "../img/mos_256x256.jpg",
        n:          4,
        vertex:     new Float32Array([
            -0.5,  0.5,   0.0, 1.0,
            -0.5, -0.5,   0.0, 0.0,
             0.5,  0.5,   1.0, 1.0,
             0.5, -0.5,   1.0, 0.0,
        ]),
    };

    data.fsize = data.vertex.BYTES_PER_ELEMENT;

    return data;
}
