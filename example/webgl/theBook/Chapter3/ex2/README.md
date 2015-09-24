# Reference
WebGL Programming guide - Interactive 3D Graphics Programming with WebGL  
Pages 85-  


On line 49 in main.js:  
```javascript
gl.drawArrays(gl.TRIANGLES, 0, n);
```
Try changing the first parameter "gl.TRIANGLES" to:  
*gl.LINES for a single line between the first two vertices
*gl.LINE_STRIP for two lines between the first three vertices
*gl.LINE_LOOP for lines through all vertices
