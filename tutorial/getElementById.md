# Get element by id  

Consider two files
* index.html
* main.js

index.html

```html

<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="style.css">
        <title>Some tite</title>
    </head>
<body>
    <main>
        <div id="myDiv"></div>
    </main>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>

```

main.js

```javascript

window.onload = function() {
    "use strict";

    var myDiv = document.getElementById("myDiv");

    myDiv.innerHTML = "You can see this text in the div. Applied from JavaScript.";

    console.log("Everything is ready.");
}();

```
