/**
 * Make Canvas as large as the window
 */
window.onload = function() {
    "use strict";

    var canvas = document.getElementById("canvas1"),
        ctx    = canvas.getContext("2d");



    /**
     * Draw items in each corner of the canvas.
     */
    function draw() {
        var x0, y0, x1, y1, w, h;

        // Sizes
        x0 = 1;
        y0 = 1;
        x1 = ctx.canvas.width - 1;
        y1 = ctx.canvas.height - 1;
        w = 100;
        h = 100;

        // top left (almost)
        ctx.fillStyle = "hsla(0,100%,50%,1)";
        ctx.fillRect(x0, y0, w, h);

        // top right (almost)
        ctx.fillStyle = "hsla(90,100%,50%,0.8)";
        ctx.fillRect(x1 - w, y0, w, h);

        // bottom left (almost)
        ctx.fillStyle = "hsla(180,100%,50%,0.6)";
        ctx.fillRect(x0, y1 - h, w, h);

        // bottom right (almost)
        ctx.fillStyle = "hsla(270,100%,50%,0.4)";
        ctx.fillRect(x1 - w, y1 - h, w, h);
    }



    /**
     * Event handler for pressed keys.
     */
    function keypress(event) {
        console.log("Keypress " + event.keyCode);

        switch (event.keyCode) {
            case 0:    //ContextMenu
            case 13:   //Enter
            case 32:   //Space
            case 39:   //ArrowRight
            case 40:   //ArrowDown
                //play();
            break;
            case 8:    //Backspace
            case 37:   //ArrowLeft
            case 38:   //ArrowUp
                //play(true);
            break;
            case 70:  //f
                Canvas.resizeFullBrowserSize();
                draw();
            break;
            case 190:  //Period
                Canvas.resizeDefault();
                draw();
            break;
            default:
                return;
            }

        return false;
    }


    // Create eventhandlers for keypress
    window.onkeydown = keypress;



    // Start the application
    Canvas.init(ctx);
    draw();

    console.log("Everything is ready.");
}();
