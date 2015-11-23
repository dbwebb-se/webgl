/**
 * Html5 audio
 */
window.onload = function() {
    "use strict";

    var audio = document.getElementById("music");
    var button = document.getElementById("toggleBackgroundMusic");
    button.disabled = false;

    button.addEventListener("click", function() {
        if (audio.paused) {
            audio.play();
            button.innerHTML = "Pausa";
        } else {
            audio.pause();
            button.innerHTML = "Spela";
        }
    });

    console.log("Sandbox ready!");
};
