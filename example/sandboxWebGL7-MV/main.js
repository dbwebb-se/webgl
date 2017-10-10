/**
 * Draw WebGL
 */
/* global WebGLUtils, Matrix4 */



/** -------------------------------------------------------------------
 * Create an object for the control panel.
 */
function ControlPanel(vm) {
    this.vm = vm;

    this.elEyeX = document.getElementById("eyeX");
    this.elEyeY = document.getElementById("eyeY");
    this.elEyeZ = document.getElementById("eyeZ");

    this.elAtX = document.getElementById("atX");
    this.elAtY = document.getElementById("atY");
    this.elAtZ = document.getElementById("atZ");

    this.elUpX = document.getElementById("upX");
    this.elUpY = document.getElementById("upY");
    this.elUpZ = document.getElementById("upZ");

    this.elAngle = document.getElementById("angle");
    this.elrx = document.getElementById("rx");
    this.elry = document.getElementById("ry");
    this.elrz = document.getElementById("rz");
}



/**
 * Update the control panel to reflect current settings.
 */
ControlPanel.prototype.updateFromViewModel = function() {
    this.elEyeX.value = this.vm.eyeX;
    this.elEyeY.value = this.vm.eyeY;
    this.elEyeZ.value = this.vm.eyeZ;

    this.elAtX.value = this.vm.atX;
    this.elAtY.value = this.vm.atY;
    this.elAtZ.value = this.vm.atZ;

    this.elUpX.value = this.vm.upX;
    this.elUpY.value = this.vm.upY;
    this.elUpZ.value = this.vm.upZ;

    this.elAngle.value = this.vm.angle;
    this.elrx.value = this.vm.rx;
    this.elry.value = this.vm.ry;
    this.elrz.value = this.vm.rz;
};



/**
 * Update from the control panel to reflect current settings.
 */
ControlPanel.prototype.updateViewModel = function() {
    this.vm.eyeX = parseFloat(this.elEyeX.value);
    this.vm.eyeY = parseFloat(this.elEyeY.value);
    this.vm.eyeZ = parseFloat(this.elEyeZ.value);

    this.vm.atX = parseFloat(this.elAtX.value);
    this.vm.atY = parseFloat(this.elAtY.value);
    this.vm.atZ = parseFloat(this.elAtZ.value);

    this.vm.upX = parseFloat(this.elUpX.value);
    this.vm.upY = parseFloat(this.elUpY.value);
    this.vm.upZ = parseFloat(this.elUpZ.value);

    this.vm.angle = parseFloat(this.elAngle.value);
    this.vm.rx = parseFloat(this.elrx.value);
    this.vm.ry = parseFloat(this.elry.value);
    this.vm.rz = parseFloat(this.elrz.value);
};



/** -------------------------------------------------------------------
 * Keypress object
 */
function KeyPress(vm, step) {
    this.vm = vm;
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
            this.vm.eyeX += this.step;
            break;

        case 37:   //ArrowLeft
            this.vm.eyeX -= this.step;
            break;

        case 40:   //ArrowDown
            this.vm.eyeY -= this.step;
            break;

        case 38:   //ArrowUp
            this.vm.eyeY += this.step;
            break;

        case 82:   //r
            this.vm.angle += this.step * 20;
            break;

        default:
            return false;
    }

    return true;
};



/** -------------------------------------------------------------------
 * Create an object for the viewer
 */
function ViewModel() {
    this.eyeX = 0;
    this.eyeY = 0;
    this.eyeZ = 0;

    this.atX =  0;
    this.atY =  0;
    this.atZ = -1;

    this.upX = 0;
    this.upY = 1;
    this.upZ = 0;

    this.view = new Matrix4();

    this.angle = 0;
    this.rx = 0;
    this.ry = 0;
    this.rz = 1;

    this.model = new Matrix4();
}



/**
 * Set view.
 */
ViewModel.prototype.setView = function(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ) {
    this.eyeX = eyeX || 0;
    this.eyeY = eyeY || 0;
    this.eyeZ = eyeZ || 0;

    this.atX = atX || 0;
    this.atY = atY || 0;
    this.atZ = atZ || -1;

    this.upX = upX || 0;
    this.upY = upY || 1;
    this.upZ = upZ || 0;
};



/**
 * Update the matrix based on current values.
 */
ViewModel.prototype.update = function() {
    this.view.setLookAt(
        this.eyeX, this.eyeY, this.eyeZ,
        this.atX, this.atY, this.atZ,
        this.upX, this.upY, this.upZ
    );

    this.model.setRotate(this.angle, this.rx, this.ry, this.rz);
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
    var u_ModelMatrix   = gl.getUniformLocation(gl.program, "u_ModelMatrix");
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
    var viewModel = new ViewModel();
    var cp   = new ControlPanel(viewModel);
    var key  = new KeyPress(viewModel, 0.05);

    viewModel.setView(0.20, 0.20, 0.25);
    cp.updateFromViewModel();

    window.addEventListener("keydown", function (event) {
        if (key.handler(event)) {
            cp.updateFromViewModel();
            update();
            render();
        }
    });

    document.getElementById("update").addEventListener("click", function() {
        cp.updateViewModel();
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
        viewModel.update();
        gl.uniformMatrix4fv(u_ViewMatrix,  false, viewModel.view.elements);
        gl.uniformMatrix4fv(u_ModelMatrix, false, viewModel.model.elements);
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
