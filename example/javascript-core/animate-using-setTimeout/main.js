/**
 * Animate using timeout.
 */
 window.onload = function() {
      "use strict";

      var html,
          button = document.getElementById("button"),
          gameArea,
          gameBlocks;


    button.addEventListener('click', function () {
        var colors = ['green', 'yellow', 'red', 'blue', 'pink'],
            step = 0,

        animateFunction = function () {
            if (step === colors.length) {
                button.style.backgroundColor = '';
            } else {
                button.style.backgroundColor = colors[step];
                step += 1;
                window.setTimeout(animateFunction, 500);
            }
        };

        window.setTimeout(animateFunction, 500);
    });


    console.log('Ready');
};
