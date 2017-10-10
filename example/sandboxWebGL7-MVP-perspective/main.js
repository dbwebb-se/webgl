/**
 * Draw WebGL
 */
/* global WebGLUtils, Matrix4 */



/** -------------------------------------------------------------------
 * Create an object for the control panel.
 */
function ControlPanel(mvp) {
    this.mvp = mvp;

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

    this.eltx = document.getElementById("tx");
    this.elty = document.getElementById("ty");
    this.eltz = document.getElementById("tz");

    this.elFov    = document.getElementById("fov");
    this.elAspect = document.getElementById("aspect");
    this.elNear   = document.getElementById("near");
    this.elFar    = document.getElementById("far");
}



/**
 * Update the control panel to reflect current settings.
 */
ControlPanel.prototype.updateFromMVP = function() {
    this.elEyeX.value = this.mvp.eyeX;
    this.elEyeY.value = this.mvp.eyeY;
    this.elEyeZ.value = this.mvp.eyeZ;

    this.elAtX.value = this.mvp.atX;
    this.elAtY.value = this.mvp.atY;
    this.elAtZ.value = this.mvp.atZ;

    this.elUpX.value = this.mvp.upX;
    this.elUpY.value = this.mvp.upY;
    this.elUpZ.value = this.mvp.upZ;

    this.elAngle.value = this.mvp.angle;
    this.elrx.value    = this.mvp.rx;
    this.elry.value    = this.mvp.ry;
    this.elrz.value    = this.mvp.rz;

    this.eltx.value    = this.mvp.tx;
    this.elty.value    = this.mvp.ty;
    this.eltz.value    = this.mvp.tz;

    this.elFov.value    = this.mvp.fov;
    this.elAspect.value = this.mvp.aspect;
    this.elNear.value   = this.mvp.near;
    this.elFar.value    = this.mvp.far;
};



/**
 * Update from the control panel to reflect current settings.
 */
ControlPanel.prototype.updateMVP = function() {
    this.mvp.eyeX = parseFloat(this.elEyeX.value);
    this.mvp.eyeY = parseFloat(this.elEyeY.value);
    this.mvp.eyeZ = parseFloat(this.elEyeZ.value);

    this.mvp.atX = parseFloat(this.elAtX.value);
    this.mvp.atY = parseFloat(this.elAtY.value);
    this.mvp.atZ = parseFloat(this.elAtZ.value);

    this.mvp.upX = parseFloat(this.elUpX.value);
    this.mvp.upY = parseFloat(this.elUpY.value);
    this.mvp.upZ = parseFloat(this.elUpZ.value);

    this.mvp.angle = parseFloat(this.elAngle.value);
    this.mvp.rx    = parseFloat(this.elrx.value);
    this.mvp.ry    = parseFloat(this.elry.value);
    this.mvp.rz    = parseFloat(this.elrz.value);

    this.mvp.tx    = parseFloat(this.eltx.value);
    this.mvp.ty    = parseFloat(this.elty.value);
    this.mvp.tz    = parseFloat(this.eltz.value);

    this.mvp.fov    = parseFloat(this.elFov.value);
    this.mvp.aspect = parseFloat(this.elAspect.value);
    this.mvp.near   = parseFloat(this.elNear.value);
    this.mvp.far    = parseFloat(this.elFar.value);
};



/** -------------------------------------------------------------------
 * Keypress object
 */
function KeyPress(mvp, step) {
    this.mvp = mvp;
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
            this.mvp.eyeX += this.step;
            break;

        case 37:   //ArrowLeft
            this.mvp.eyeX -= this.step;
            break;

        case 40:   //ArrowDown
            this.mvp.eyeY -= this.step;
            break;

        case 38:   //ArrowUp
            this.mvp.eyeY += this.step;
            break;

        case 82:   //r
            this.mvp.angle += this.step * 20;
            break;

        case 85:   //u
            this.mvp.near += this.step;
            break;

        case 73:   //i
            this.mvp.near -= this.step;
            break;

        case 74:   //j
            this.mvp.far += this.step;
            break;

        case 75:   //k
            this.mvp.far -= this.step;
            break;

        case 87:   //w
            this.mvp.tz += this.step;
            break;

        case 83:   //s
            this.mvp.tz -= this.step;
            break;

        case 65:   //a
            this.mvp.tx -= this.step;
            break;

        case 68:   //d
            this.mvp.tx += this.step;
            break;

        default:
            return false;
    }

    return true;
};



/** -------------------------------------------------------------------
 * Create an object Projection, Model, View
 */
function MVP() {
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

    this.tx = 0;
    this.ty = 0;
    this.tz = 0;

    this.model = new Matrix4();

    this.fov    = 30;
    this.aspect = 1;
    this.near   = 1;
    this.far    = 100;

    this.projection = new Matrix4();

    // Combined mvp matrix
    this.matrix = new Matrix4();
}



/**
 * Set view.
 */
MVP.prototype.setView = function(eyeX, eyeY, eyeZ, atX, atY, atZ, upX, upY, upZ) {
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
 * Set view.
 */
MVP.prototype.setPerspective = function(fov, aspect, near, far) {
    this.fov    = fov;
    this.aspect = aspect;
    this.near   = near;
    this.far    = far;
};



/**
 * Update the matrix based on current values.
 */
MVP.prototype.update = function() {
    this.view.setLookAt(
        this.eyeX, this.eyeY, this.eyeZ,
        this.atX, this.atY, this.atZ,
        this.upX, this.upY, this.upZ
    );

    this.model.setTranslate(this.tx, this.ty, this.tz);
    this.model.rotate(this.angle, this.rx, this.ry, this.rz);

    //this.projection.setOrtho(this.left, this.right, this.bottom, this.top, this.near, this.far);
    this.projection.setPerspective(this.fov, this.aspect, this.near, this.far);

    this.matrix.set(this.projection).multiply(this.view).multiply(this.model);
};



/** -------------------------------------------------------------------
 * Rectangle with vertices and texture position.
 */
function setGeometryThreeTriangles(gl) {
    var data = {
        usage:      gl.STATIC_DRAW,
        mode:       gl.TRIANGLES,
        fsize:      null,
        n:          18,
        vertex:     new Float32Array([
            // Three triangles on the right side
            // The back green one
            0.75,  1.0,  -4.0,  0.4,  1.0,  0.4,
            0.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
            1.25, -1.0,  -4.0,  1.0,  0.4,  0.4,

            // The middle yellow one
            0.75,  1.0,  -2.0,  1.0,  1.0,  0.4,
            0.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
            1.25, -1.0,  -2.0,  1.0,  0.4,  0.4,

            // The front blue one
            0.75,  1.0,   0.0,  0.4,  0.4,  1.0,
            0.25, -1.0,   0.0,  0.4,  0.4,  1.0,
            1.25, -1.0,   0.0,  1.0,  0.4,  0.4,

            // Three triangles on the left side
            // The back green one
           -0.75,  1.0,  -4.0,  0.4,  1.0,  0.4,
           -1.25, -1.0,  -4.0,  0.4,  1.0,  0.4,
           -0.25, -1.0,  -4.0,  1.0,  0.4,  0.4,

           // The middle yellow one
           -0.75,  1.0,  -2.0,  1.0,  1.0,  0.4,
           -1.25, -1.0,  -2.0,  1.0,  1.0,  0.4,
           -0.25, -1.0,  -2.0,  1.0,  0.4,  0.4,

           // The front blue one
           -0.75,  1.0,   0.0,  0.4,  0.4,  1.0,
           -1.25, -1.0,   0.0,  0.4,  0.4,  1.0,
           -0.25, -1.0,   0.0,  1.0,  0.4,  0.4,
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
    gl.canvas = canvas;

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
    var a_Position    = gl.getAttribLocation(gl.program, "a_Position");
    var a_Color       = gl.getAttribLocation(gl.program, "a_Color");
    var u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
    var u_ViewMatrix  = gl.getUniformLocation(gl.program, "u_ViewMatrix");
    var u_ProjMatrix  = gl.getUniformLocation(gl.program, "u_ProjMatrix");
    var u_MvpMatrix   = gl.getUniformLocation(gl.program, "u_MvpMatrix");



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
    var mvp = new MVP();
    var cp   = new ControlPanel(mvp);
    var key  = new KeyPress(mvp, 0.05);

    mvp.setView(0, 0, 5, 0, 0, -100, 0, 1, 0);
    mvp.setPerspective(30, gl.canvas.width/gl.canvas.height, 1, 100);

    cp.updateFromMVP();

    window.addEventListener("keydown", function (event) {
        if (key.handler(event)) {
            cp.updateFromMVP();
            update();
            render();
        }
    });

    document.getElementById("update").addEventListener("click", function() {
        cp.updateMVP();
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
        mvp.update();
        gl.uniformMatrix4fv(u_ModelMatrix, false, mvp.model.elements);
        gl.uniformMatrix4fv(u_ViewMatrix,  false, mvp.view.elements);
        gl.uniformMatrix4fv(u_ProjMatrix,  false, mvp.projection.elements);
        gl.uniformMatrix4fv(u_MvpMatrix,   false, mvp.matrix.elements);
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
