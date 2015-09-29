/**
 * Draw on Canvas
 */
window.onload = function() {
    "use strict";

    var canvas = document.getElementById("canvas1");

    var width = canvas.width, height = canvas.height;

    var scene = new THREE.Scene();
    var aspect = width / height;
    var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize( width, height );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;

    var render = function () {
        requestAnimationFrame( render );
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
        renderer.render( scene, camera );
    };

    render();

    console.log("Everything is ready.");
}();
