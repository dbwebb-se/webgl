/**
 * Draw WebGL
 */
/* global WebGLUtils, Matrix4 */



/** -------------------------------------------------------------------
 * Create an object for the control panel.
 */
function ControlPanel(view) {
    this.view = view;

    this.elEyeX = document.getElementById("eyeX");
    this.elEyeY = document.getElementById("eyeY");
    this.elEyeZ = document.getElementById("eyeZ");

    this.elAtX = document.getElementById("atX");
    this.elAtY = document.getElementById("atY");
    this.elAtZ = document.getElementById("atZ");

    this.elUpX = document.getElementById("upX");
    this.elUpY = document.getElementById("upY");
    this.elUpZ = document.getElementById("upZ");
}



/**
 * Update the control panel to reflect current settings.
 */
ControlPanel.prototype.updateFromViewObject = function() {
    this.elEyeX.value = this.view.eyeX;
    this.elEyeY.value = this.view.eyeY;
    this.elEyeZ.value = this.view.eyeZ;

    this.elAtX.value = this.view.atX;
    this.elAtY.value = this.view.atY;
    this.elAtZ.value = this.view.atZ;

    this.elUpX.value = this.view.upX;
    this.elUpY.value = this.view.upY;
    this.elUpZ.value = this.view.upZ;
};



/**
 * Update from the control panel to reflect current settings.
 */
ControlPanel.prototype.updateViewObject = function() {
    this.view.eyeX = parseFloat(this.elEyeX.value);
    this.view.eyeY = parseFloat(this.elEyeY.value);
    this.view.eyeZ = parseFloat(this.elEyeZ.value);

    this.view.atX = parseFloat(this.elAtX.value);
    this.view.atY = parseFloat(this.elAtY.value);
    this.view.atZ = parseFloat(this.elAtZ.value);

    this.view.upX = parseFloat(this.elUpX.value);
    this.view.upY = parseFloat(this.elUpY.value);
    this.view.upZ = parseFloat(this.elUpZ.value);
};



/** -------------------------------------------------------------------
 * Keypress object
 */
function KeyPress(view, step) {
    this.view = view;
    this.step = step || 0.05;
}



/**
 * Keypress event handler
 *
 * @return Boolean true if an update was made, else false
 */
KeyPress.prototype.handler = function(event) {
    console.log(event.keyCode);

    switch (event.keyCode) {
        case 39:   //ArrowRight
            this.view.eyeX += this.step;
            break;

        case 37:   //ArrowLeft
            this.view.eyeX -= this.step;
            break;

        case 40:   //ArrowDown
            this.view.eyeY -= this.step;
            break;

        case 38:   //ArrowUp
            this.view.eyeY += this.step;
            break;

        default:
            return false;
    }

    return true;
};



/** -------------------------------------------------------------------
 * Create an object for the viewer
 */
function View(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ) {
    this.eyeX = eyeX || 0;
    this.eyeY = eyeY || 0;
    this.eyeZ = eyeZ || 0;

    this.atX = atX || 0;
    this.atY = atY || 0;
    this.atZ = atZ || -1;

    this.upX = upX || 0;
    this.upY = upY || 1;
    this.upZ = upZ || 0;

    this.matrix = new Matrix4();
}



/**
 * Update the matrix based on current values.
 */
View.prototype.update = function() {
    this.matrix.setLookAt(
        this.eyeX, this.eyeY, this.eyeZ,
        this.atX, this.atY, this.atZ,
        this.upX, this.upY, this.upZ
    );
};



/** -------------------------------------------------------------------
 * Rectangle with vertices and texture position.
 */
function setGeometryThreeTriangles(gl) {
    var data = {
        usage:      gl.STATIC_DRAW,
        mode:       gl.TRIANGLES,
        fsize:      null,
        n:          9,
        vertex:     new Float32Array([
            // vertex coordinates and color
            // The back green triangle
             0.0,  0.5,   -0.4, 0.4, 1.0, 0.4,
            -0.5, -0.5,   -0.4, 0.4, 1.0, 0.4,
             0.5, -0.5,   -0.4, 1.0, 0.4, 0.4,

             // The middle yellow triangle
             0.5,  0.4,   -0.2, 1.0, 0.4, 0.4,
            -0.5,  0.4,   -0.2, 1.0, 1.0, 0.4,
             0.0, -0.6,   -0.2, 1.0, 1.0, 0.4,

            // The front blue triangle
             0.0,  0.5,    0.0, 0.4, 0.4, 1.0,
            -0.5, -0.5,    0.0, 0.4, 0.4, 1.0,
             0.5, -0.5,    0.0, 1.0, 0.4, 0.4
        ])
    };

    data.fsize  = data.vertex.BYTES_PER_ELEMENT;

    return data;
}



/** -------------------------------------------------------------------
 * Create WebGL context
 */
function initWebGL() {
    var canvas;
    var gl;
    var buffer;

    // Get A WebGL context
    canvas = document.getElementById("canvas");
    gl = WebGLUtils.getWebGLContext(canvas);
    if (!gl) {
        return;
    }

    // Setup GLSL program
    gl.program = WebGLUtils.createProgramFromScripts(
        gl,
        ["vertex-shader", "fragment-shader"]
    );
    gl.useProgram(gl.program);

    // Create a buffer
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    return gl;
}



/** -------------------------------------------------------------------
 * main()
 */
window.onload = main;

function main() {
    "use strict";

    var gl = initWebGL();


    // Look up vertex data
    var a_Position      = gl.getAttribLocation(gl.program, "a_Position");
    var a_Color         = gl.getAttribLocation(gl.program, "a_Color");
    //var u_ModelMatrix   = gl.getUniformLocation(program, "u_ModelMatrix");
    var u_ViewMatrix    = gl.getUniformLocation(gl.program, "u_ViewMatrix");



    // Lookup fragment data



    // Set Geometry
    var data = setGeometryThreeTriangles(gl);

    // Define parts for position
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, data.fsize * 6, 0);
    gl.enableVertexAttribArray(a_Position);

    // Define parts for color
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, data.fsize * 6, data.fsize * 3);
    gl.enableVertexAttribArray(a_Color);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, data.vertex, data.usage);



    // Create vaious objects for the world
    var view = new View(0.20, 0.20, 0.25);
    var cp   = new ControlPanel(view);
    var key  = new KeyPress(view, 0.05);

    cp.updateFromViewObject();

    window.addEventListener("keydown", function (event) {
        if (key.handler(event)) {
            cp.updateFromViewObject();
            update();
            render();
        }
    });

    document.getElementById("update").addEventListener("click", function() {
        cp.updateViewObject();
        update();
        render();
    });


    // Do it
    update();
    render();



    /**
     * Update before drawing
     */
    function update() {
        view.update();
        gl.uniformMatrix4fv(u_ViewMatrix, false, view.matrix.elements);
    }



    /**
     * Render it all
     */
    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(data.mode, 0, data.n);
    }



    //console.log(gl);
    console.log("Everything is ready.");
}
