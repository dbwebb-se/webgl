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

    // Draw some boxes
    ct.fillStyle = "rgba(200,0,100,1)";
    ct.fillRect(200, 100, 100, 100);

    ct.fillStyle = "hsla(0,100%,50%,0.5)";
    ct.fillRect(250, 150, 100, 100);

    ct.lineWidth = 10;
    ct.strokeStyle = "hsla(90,100%,50%,0.5)";
    ct.strokeRect(400, 100, 200, 100);

    ct.clearRect(450, 96, 100, 109);

    // Draw a more complex path
    ct.save();
    ct.translate(400, 300);
    ct.fillStyle = "hsla(0,0%,30%,1)";
    ct.strokeStyle = "hsla(0,0%,50%,1)";
    ct.lineWidth = 2;
    ct.beginPath();
    ct.moveTo(0, 0);
    ct.lineTo(0, 10);
    ct.lineTo(30, 10);
    ct.lineTo(30, 0);
    ct.lineTo(25, -5);
    ct.lineTo(5, -5);
    ct.lineTo(0, 0);
    ct.fill();

    ct.lineWidth = 3;
    ct.beginPath();
    ct.moveTo(15, -5);
    ct.lineTo(15, -25);
    ct.stroke();
    ct.restore();

    // Draw a arc
    ct.translate(50, 200);
    ct.strokeStyle = "hsla(0,50%,50%,1)";
    ct.beginPath();
    ct.arc(0, 0, 20, -Math.PI/2, Math.PI/2, false);
    ct.arc(75, 75, 50, 0, Math.PI/2, true);
    ct.stroke();

    console.log("Everything is ready.");
};
