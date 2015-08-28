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



    /**
     * Check if full screen is enabled.
     */
    function fullscreenEnabled() {
        var enabled = document.fullscreenEnabled || 
                      document.webkitFullscreenEnabled || 
                      document.mozFullScreenEnabled ||
                      document.msFullscreenEnabled;
        
        console.log("Fullscren is enabled: " + enabled);
        return enabled;
    }



    /**
     * Go to fullscreen.
     */
    function requestFullscreen(elementId) {
        var el = document.getElementById(elementId),
            res = null;
         
        if (el.requestFullscreen) {
            res = el.requestFullscreen();
        } else if (el.webkeltRequestFullscreen) {
            res = el.webkeltRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
            res = el.mozRequestFullScreen();
        } else if (el.msRequestFullscreen) {
            res = el.msRequestFullscreen();
        }
        
        console.log("Fullscreen requested: " + res);
        return res;
    }



    /**
     * Check if we are fullscreen, return the element or false
     */
    function fullscreenElement() {
        var el = document.fullscreenElement ||
                 document.webkitFullscreenElement ||
                 document.mozFullScreenElement ||
                 document.msFullscreenElement;

        console.log("The fullscreen element is: " + el);
        return el;
    }



    /**
     * Check if we are fullscreen, return the element or false
     */
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }


/*
    document.addEventListener("fullscreenchange", FShandler);
    document.addEventListener("webkitfullscreenchange", FShandler);
    document.addEventListener("mozfullscreenchange", FShandler);
    document.addEventListener("MSFullscreenChange", FShandler);
*/


/*
    document.addEventListener("fullscreenerror", FSerrorhandler);
    document.addEventListener("webkitfullscreenerror", FSerrorhandler);
    document.addEventListener("mozfullscreenerror", FSerrorhandler);
    document.addEventListener("MSFullscreenError", FSerrorhandler);
*/


    // Init the size of the canvas and draw som elements
    //resize();
    draw();
    
    // Add eventhandler to listen for resiz events on window
    window.addEventListener("resize", function (event) {
        //resize();
        draw();
        console.log("Window was resized.");
    });

    // All done
    console.log("Everything is ready.");  
}();
