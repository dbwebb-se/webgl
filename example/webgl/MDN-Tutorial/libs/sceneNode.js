
var mvMatrix;
var mvMatrixStack = [];

var perspectiveMatrix;

function SceneNode(){
    this.position = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.elasticity = 0.3; 

    this.children = [];
    this.mvMatrix = Matrix.I(4);
}

SceneNode.prototype.pass = function(){
    mvPushMatrix();

    if(this.velocity[0] || this.velocity[1] || this.velocity[1]){
        this.animate();
    }

    mvTranslate(this.position);
    mvRotate(this.rotation[0], [1, 0, 0]);
    mvRotate(this.rotation[1], [0, 1, 0]);
    mvRotate(this.rotation[2], [0, 0, 1]);
    
    // save model view matrix 
    this.mvMatrix = mvMatrix;

    this.draw();

    this.children.forEach(function(child){
        child.pass();
    });

    mvPopMatrix();
}

SceneNode.prototype.draw = function(){
}

SceneNode.prototype.animate = function(){
    var currentTime = (new Date()).getTime();
    if(this.lastUpdateTime){
        var delta = currentTime - this.lastUpdateTime;

        // 1 - apply velocity to position (vx -> x)
        this.position[0] += this.velocity[0] * delta / 1000;
        this.position[1] += this.velocity[1] * delta / 1000;
        this.position[2] += this.velocity[2] * delta / 1000;

        // 2 - apply drag/friction to velocity
        this.velocity[0] -= .5 * this.velocity[0] * delta / 1000;
        this.velocity[1] -= .01 * this.velocity[1] * delta / 1000;
        this.velocity[2] -= .5 * this.velocity[2] * delta / 1000;
      
         // 3 - apply gravity to velocity
        this.velocity[1] -= .4 * delta / 1000;

        // 4 - collision with the ground
        if(this.colideGround()){
            this.position[1] = 0.5;
            this.velocity[1] = -this.velocity[1];
            this.velocity[1] *= this.elasticity; 
            if(this.velocity[1] < 0.05){
                this.velocity[1] = 0;
            }
        }
    }
    this.lastUpdateTime = currentTime;
}

SceneNode.prototype.colideGround = function(){
    if(this.position[1] - 0.5 < 0){
        return true;
    } 
    return false;
}

SceneNode.prototype.colide = function(node){
    if(Math.abs(this.position[0] - node.position[0]) < 1 &&
            Math.abs(this.position[1] - node.position[1]) < 1){
        return true;
    }
    return false;
}

function addArray3(a, b){
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
}

function mult1Array3(v, a){
    a[0] *= v;
    a[1] *= v;
    a[2] *= v;
}

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

function mvPushMatrix(m){
  if (m) {
    mvMatrixStack.push(m.dup());
    mvMatrix = m.dup();
  } else {
    mvMatrixStack.push(mvMatrix.dup());
  }
}

function mvPopMatrix(){
    if(!mvMatrixStack.length){
        throw("Can't pop from an empty matrix stack.");
    }

    mvMatrix = mvMatrixStack.pop();
    return mvMatrix;
}

function mvTranslate(v){
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function mvRotate(angle, v) {
    var inRadians = angle * Math.PI / 180.0;
    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    multMatrix(m);
}
