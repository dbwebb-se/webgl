# Reference
WebGL Programming guide - Interactive 3D Graphics Programming with WebGL  
Pages 85-89  


On line 49 in main.js:  
```javascript
gl.drawArrays(gl.TRIANGLES, 0, n);
```
Try changing the first parameter "gl.TRIANGLES" to:  
1. gl.LINES for a single line between the first two vertices  
2. gl.LINE_STRIP for two lines between the first three vertices  
3. gl.LINE_LOOP for lines through all vertices  
