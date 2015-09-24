# Reference
WebGL Programming guide - Interactive 3D Graphics Programming with WebGL  
Pages 89-91  

On line 49 in main.js:  
```javascript
gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
```
Try changing the first parameter "gl.TRIANGLE_STRIP" to:  
1. gl.TRIANGLE_FAN for a ribbon-like drawing of the triangles  
