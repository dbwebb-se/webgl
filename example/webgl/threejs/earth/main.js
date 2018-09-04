/**
 * Draw on Canvas
 */

/* global THREE */

window.onload = (function() {
    "use strict";

    var canvas = document.getElementById("canvas1");

    var width = canvas.width, height = canvas.height;

    var aspect = width/height;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.z = 10;

    var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});

    var group = new THREE.Object3D();
    var clock = new THREE.Clock();

    var ambientLight = new THREE.AmbientLight(0xFFFF99);
    scene.add(ambientLight);

    var light = new THREE.PointLight(0xFFFFFF, 1, 0);
    light.position.set(0, 0, 0);
    scene.add(light);

    var geometry = new THREE.SphereGeometry(2, 64, 64);
    var texture = THREE.ImageUtils.loadTexture("images/earthmap1k.jpg");
    texture.minFilter = THREE.LinearFilter;
    var bumpTexture = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');
    bumpTexture.minFilter = THREE.LinearFilter;

    var material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        map: texture,
        bumpMap: bumpTexture,
        bumpScale: 0.7,
        shininess: 10
    });

    var earth = new THREE.Mesh(geometry, material);
    earth.rotation.z = 23.439281 * Math.PI / 180;
    group.add(earth);
    scene.add(group);

    function render() {
        requestAnimationFrame(render);

        var delta = clock.getDelta();
        group.rotation.y += 1 * delta;

        var time = clock.getElapsedTime() * 0.5;
        group.position.x = Math.cos(time) * 5;
        group.position.z = Math.sin(time) * 5;

        renderer.render(scene, camera);
    }

    render();

    console.log("Everything is ready.");
})();
