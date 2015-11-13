/**
 * Module for canvas resizing functions.
 */
window.Canvas = (function(){
    "use strict";

    // Define variables
    var context,
        originalWidth,
        originalHeight;



    /**
     * Init.
     */
    function init(aContext) {
        context = aContext;
        
        originalWidth  = context.canvas.width;
        originalHeight = context.canvas.height;

        console.log("Init canvas size to " + originalWidth + "x" + originalHeight);
    } 



    /**
     * Set the size of the canvas to intial.
     */
    function resizeDefault() {
        context.canvas.width  = originalWidth;
        context.canvas.height = originalHeight;
        
        context.canvas.style.position = "static";

        console.log("Resized default " + context.canvas.width + "x" + context.canvas.height);
    } 



    /**
     * Set the size of the canvas to full width & height of browser.
     */
    function resizeFullBrowserSize() {
        context.canvas.width  = window.innerWidth;
        context.canvas.height = window.innerHeight;

        context.canvas.style.position = "absolute";
        context.canvas.style.left     = 0;
        context.canvas.style.top      = 0;

        console.log("Resized full browser " + context.canvas.width + "x" + context.canvas.height);
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


    return  {
        init:                   init,
        resizeDefault:          resizeDefault,
        resizeFullBrowserSize:  resizeFullBrowserSize
    };
})();
