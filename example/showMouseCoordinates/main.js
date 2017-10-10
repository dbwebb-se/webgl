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

    function getMouseCoords(e) {
        //var rect = e.target.getBoundingClientRect();
        var result_x = document.getElementById('x_result');
        var result_y = document.getElementById('y_result');

        result_x.innerHTML = e.clientX;
        result_y.innerHTML = e.clientY;
    }

    function getMouseCoordsOnCanvas(e) {
        var rect = e.target.getBoundingClientRect();
        var result_canv_x = document.getElementById('x_canv_result');
        var result_canv_y = document.getElementById('y_canv_result');

        result_canv_x.innerHTML =  Math.round(e.clientX - rect.left);
        result_canv_y.innerHTML = Math.round(e.clientY - rect.top);
    }

    function getConvertedCoords(e) {
        var rect = e.target.getBoundingClientRect();
        var result_conv_x = document.getElementById('x_conv_result');
        var result_conv_y = document.getElementById('y_conv_result');

        result_conv_x.innerHTML = ((e.clientX - rect.left) - canvas.width/2) / (canvas.width/2);
        result_conv_y.innerHTML = (canvas.height/2 - (e.clientY - rect.top)) / (canvas.height/2);
    }

    document.onmousemove = getMouseCoords;

    canvas.onmousemove = function(e) {
        getMouseCoordsOnCanvas(e);
        getConvertedCoords(e);
    };


    console.log("Everything is ready.");
};
