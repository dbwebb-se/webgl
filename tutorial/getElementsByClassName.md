# Get elements by class name  

getElementsByClassName() method returns a collection of all elements in the document with the specified class name, as a NodeList object.  

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
        <div class="green"></div>
        <div class="green"></div>
        <div class="blue"></div>
        <div class="green"></div>
    </main>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>

```

main.js

```javascript

window.onload = function() {
    "use strict";

    var allGreenDivs = document.getElementsByClassName("green");

    for (var i = 0; i < allGreenDivs.length; i++) {
        allGreenDivs[i].innerHTML = "You can see this in all the green divs!";
    }

    console.log("Everything is ready.");
}();

```
