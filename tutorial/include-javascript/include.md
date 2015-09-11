# Include javascript into HTML-file  

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
    </main>
    <script type="text/javascript" src="main.js"></script>
</body>
</html>

```

main.js

```javascript
window.onload = function() {
    "use strict";

    // Write your javascript code here

    console.log("Everything is ready.");
}();
```

The following line ```<script type="text/javascript" src="main.js"></script>``` includes the javascript file
