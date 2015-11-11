# Display FPS  

```javascript  

    var fps_time = 0;       // Skapa variablerna som behövs
    var fps_Frames = 0;     // Skapa variablerna som behövs

    function animate(angle) {

        var now = Date.now();
        var elapsed = now - g_last;

        g_last = now;

        fps_time += elapsed; // Öka på Tidsräknaren
        fps_Frames++;        // Öka på Frameräknaren

        if(fps_time > 1000) {
            var fps = 1000 * fps_Frames/fps_time;                       // Räkna ut FPS. Det är 1000 då fps_time är i millisekunder
            document.getElementById("fps").innerHTML = Math.round(fps); // Uppdatera värdet i sandboxen
            fps_time = fps_Frames = 0;                                  // Nollställ räknaren
        }

        var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;

        return newAngle %= 360;
    };

```
