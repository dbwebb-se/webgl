/**
 * Draw on Canvas
 */
window.onload = function() {
    "use strict";

    var canvas, ct;

    // Get the HTML element to work with
    canvas = document.getElementById("canvas1");

    // Create a 2D context on the canvas
    ct = canvas.getContext("2d");

    // Draw a text on canvas
    ct.font = "48px serif";
    ct.strokeText("My Canvas Sandbox", 10, 50);

    console.log("Everything is ready.");  
}();
