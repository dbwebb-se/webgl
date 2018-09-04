/**
 * Draw on Canvas
 */
window.onload = (function() {
    "use strict";

    var mousePressed = false;
    var lastX, lastY;
    var canvas = document.getElementById("canvas1");
    var clearBtn = document.getElementById("clear");
    var ctx;

    function init() {
        ctx = canvas.getContext("2d");

        canvas.onmousedown = function (e) {
            mousePressed = true;
            Draw(e.layerX, e.layerY, false);
        };

        canvas.onmousemove = function (e) {
            if (mousePressed) {
                Draw(e.layerX, e.layerY, true);
            }
        };

        canvas.onmouseup = function () {
            mousePressed = false;
        };
        canvas.mouseleave = function () {
            mousePressed = false;
        };
    }

    function Draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = document.getElementById("selColor").value;
            ctx.lineWidth = document.getElementById("selWidth").value;
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        lastX = x; lastY = y;
    }

    function clearArea() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    clearBtn.addEventListener("click", function() {
        clearArea();
    });

    init();

    console.log("Everything is ready.");
})();
