/**
 * Make Canvas as large as the window
 */
window.onload = function() {
    "use strict";

    var canvas, ct;

    // Get the HTML element to work with
    canvas = document.getElementById("canvas1");

    // Create a 2D context on the canvas
    ct = canvas.getContext("2d");



    /**
     * Set the size of the canvas.
     */
    function resize() {
        ct.canvas.width  = window.innerWidth;
        ct.canvas.height = window.innerHeight;
    }



    /**
     * Draw items in each corner of the canvas.
     */
    function draw() {
        var x0, y0, x1, y1, w, h;

        // Sizes
        x0 = 1;
        y0 = 1;
        x1 = ct.canvas.width - 1;
        y1 = ct.canvas.height - 1;
        w = 100;
        h = 100;

        // top left (almost)
        ct.fillStyle = "hsla(0,100%,50%,1)";
        ct.fillRect(x0, y0, w, h);

        // top right (almost)
        ct.fillStyle = "hsla(90,100%,50%,0.8)";
        ct.fillRect(x1 - w, y0, w, h);

        // bottom left (almost)
        ct.fillStyle = "hsla(180,100%,50%,0.6)";
        ct.fillRect(x0, y1 - h, w, h);

        // bottom right (almost)
        ct.fillStyle = "hsla(270,100%,50%,0.4)";
        ct.fillRect(x1 - w, y1 - h, w, h);
    }



    // Init the size of the canvas and draw som elements
    resize();
    draw();

    // Add eventhandler to listen for resiz events on window
    window.addEventListener("resize", function () {
        resize();
        draw();
        console.log("Window was resized.");
    });

    // All done
    console.log("Everything is ready.");
};
