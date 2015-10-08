/**
 * Draw on Canvas
 */
window.onload = function() {
    "use strict";

    var objFile, mtlFile;
    var selBox = document.getElementById("selBox");

    var myObj = {
        scene: null,
        camera: null,
        renderer: null,
        container: null,
        controls: null,
        clock: null,
        stats: null,

        init: function() {

            // EXTRA Get the chosen files
            // objFile = document.getElementById("objFile").value;
            // mtlFile = document.getElementById("mtlFile").value;

            // Create the main scene
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.FogExp2(0xcce0ff, 0.0003);

            var SCREEN_WIDTH = window.innerWidth,
                SCREEN_HEIGHT = window.innerHeight;

            // Prepare camera
            var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 2000;
            this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
            this.scene.add(this.camera);
            this.camera.position.set(0, 10, 50);

            this.camera.lookAt(new THREE.Vector3(0, 0, 0));

            // Prepare renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
            this.renderer.setClearColor(this.scene.fog.color);
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMapSoft = true;

            // events
            THREEx.WindowResize(this.renderer, this.camera);

            // Prepare container
            this.container = document.createElement('div');
            document.body.appendChild(this.container);
            this.container.appendChild(this.renderer.domElement);

            // Prepare controls
            this.controls = new THREE.OrbitControls(this.camera);
            this.controls.target = new THREE.Vector3(0, 0, 0);
            this.controls.maxDistance = 2000;

            // Prepare clock
            this.clock = new THREE.Clock();

            // prepare stats
            this.stats = new Stats();
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.left = '50px';
            this.stats.domElement.style.bottom = '50px';
            this.stats.domElement.style.zIndex = 1;
            this.container.appendChild( this.stats.domElement );

            // Add spotlight
            // add directional light
            var dLight = new THREE.DirectionalLight(0xffffff, 1.5);

            dLight.castShadow = true;
            dLight.position.set(1, 1, 1);
            this.scene.add(dLight);

            // Load the model
            this.loadModel();
        },
        loadModel: function() {
            // prepare loader and load the model
            var oLoader = new THREE.OBJMTLLoader();
            oLoader.load('objects/' + objFile + '.obj', 'objects/' + mtlFile + '.mtl', function(object) {
            object.position.x = 0;
            object.position.y = 0;
            object.position.z = 0;
            object.scale.set(1, 1, 1);
            myObj.scene.add(object);
        },
    	// Function called when downloads progress
    	function ( xhr ) {
    		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    	},
    	// Function called when downloads error
    	function ( xhr ) {
    		console.log( 'An error happened' );
    	});
        }
    };

    // Animate the scene
    function animate() {
        requestAnimationFrame(animate);
        render();
        update();
    }

    // Update controls and stats
    function update() {
        myObj.controls.update(myObj.clock.getDelta());
        myObj.stats.update();
    }

    // Render the scene
    function render() {
        if (myObj.renderer) {
            myObj.renderer.render(myObj.scene, myObj.camera);
        }
    }

    // Initialize
    function init() {
        myObj.init();
        animate();
    }

    selBox.addEventListener("change", function() {
        if (selBox.value != "default") {
            objFile = selBox.value;
            mtlFile = selBox.value;
            document.body.innerHTML = "";
            document.body.style.margin = 0;
            init();
        } else {
            console.log("None chosen");
        }
    });

    console.log("Everything is ready.");
}();
