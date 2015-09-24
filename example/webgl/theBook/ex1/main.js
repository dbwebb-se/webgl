/**
 * Draw on Canvas
 */
window.onload = function() {
    "use strict";

    var canvas = document.getElementById('canvas1');

    if (!canvas) {
        console.log("Failed to get canvas.");
        return;
    }

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    ctx.fillRect(120, 10, 150, 190);

    console.log("Everything is ready.");
}();
