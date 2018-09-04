/**
 * Draw on Canvas
 */

/* global getWebGLContext */

window.onload = (function() {
    "use strict";

    var canvas = document.getElementById('canvas1');

    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log("Failed to get rendering context for WebGL");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    console.log("Everything is ready.");
})();
