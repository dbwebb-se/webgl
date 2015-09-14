# Get elements by tag name  

The getElementsByTagName() method returns a NodeList of all elements with the specified name.  

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
        <table>
            <tr>
                <th>Col 1</th><th>Col 2</th><th>Col 3</th>
            </tr>
            <tr>
                <td>cell 1:1</td><td>cell 1:2</td><td>cell 1:3</td>
            </tr>
            <tr>
                <td>cell 2:1</td><td>cell 2:2</td><td>cell 2:3</td>
            </tr>
            <tr>
                <td>cell 3:1</td><td>cell 3:2</td><td>cell 3:3</td>
            </tr>
        </table>
    </main>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>

```

main.js

```javascript

window.onload = function() {
    "use strict";

    var cells = document.getElementsByTagName("td");

    for (var i = 0; i < cells.length; i++) {

        // Set the table cells (td) backgroundColor to blue

        cells[i].style.backgroundColor = "blue";  
    }

    console.log("Everything is ready.");
}();

```
