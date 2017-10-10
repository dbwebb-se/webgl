/**
 * Draw on Canvas
 */
/* global WebGLUtils, Matrix4 */
/* eslint camelcase: "off" */
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
    var u_Sampler0 = gl.getUniformLocation(program, 'u_Sampler0');
    var u_Sampler1 = gl.getUniformLocation(program, 'u_Sampler1');



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
    var texture0 = gl.createTexture();
    var texture1 = gl.createTexture();

    // Flip the image's y axis
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    // Set the texture units to the sampler
    gl.uniform1i(u_Sampler0, 0);
    gl.uniform1i(u_Sampler1, 1);

    // Create a image object to load and hold the image
    var totalImages = 2;
    var image0 = new Image();
    var image1 = new Image();

    image0.onload = function() { mapImage2Texture(image0, gl.TEXTURE0, texture0); };
    image1.onload = function() { mapImage2Texture(image1, gl.TEXTURE1, texture1); };

    image0.src = data.texture0;
    image1.src = data.texture1;



    /**
     * Map image to texture and update & draw when all images are loaded.
     */
    var loadedImages = 0;

    function mapImage2Texture(image, texture, textureVar) {
        // Map image to choosen texture
        gl.activeTexture(texture);
        gl.bindTexture(gl.TEXTURE_2D, textureVar);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

        loadedImages++;

        console.log("Loaded image: " + loadedImages);
        console.log(image);

        if (loadedImages === totalImages) {
            console.log("update & draw");
            update();
            draw();
        }
    }



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
        //texture0:  "../img/sky.jpg".
        texture0:   "../img/mos_256x256.jpg",
        texture1:   "../img/circle.gif",
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
