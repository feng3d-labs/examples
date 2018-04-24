(() =>
{



    var clock = new Clock(true);

    var container: HTMLDivElement;
    var engine: feng3d.Engine, camera: feng3d.Camera, scene: feng3d.Scene3D;

    var room: feng3d.GameObject;
    var isMouseDown = false;

    var INTERSECTED;
    var crosshair: feng3d.GameObject;

    init();
    animate();

    function init()
    {

        container = document.createElement('div');
        document.body.appendChild(container);

        var info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive cubes';
        container.appendChild(info);

        engine = new feng3d.Engine();
        scene = engine.scene;
        scene.background.fromUnit(0x505050);

        camera = engine.camera;
        var lens = camera.lens = new feng3d.PerspectiveLens(70);
        lens.aspectRatio = window.innerWidth / window.innerHeight;
        lens.near = 0.1;
        lens.far = 10;
        camera.gameObject.addComponent(feng3d.FPSController);
        scene.gameObject.addChild(camera.gameObject);

        crosshair = feng3d.GameObject.create("crosshair");
        var model = crosshair.addComponent(feng3d.MeshRenderer);
        model.geometry = new feng3d.TorusGeometry(0.02, 0.004, 32, 8, false);
        var material = model.material = new feng3d.StandardMaterial();
        material.enableBlend = true;
        material.diffuseMethod.color.a = 0.5;
        crosshair.transform.z = 2;
        engine.camera.gameObject.addChild(crosshair);

        room = feng3d.GameObject.create("room", (gameobject) =>
        {
            gameobject.addComponent(feng3d.MeshRenderer, (meshRenderer) =>
            {
                meshRenderer.geometry = new feng3d.CubeGeometry(6, 6, 6, 8, 8, 8);
                var material = meshRenderer.material = new feng3d.StandardMaterial();
                material.diffuseMethod.color.fromUnit(0x404040);
                material.renderMode = feng3d.RenderMode.LINES;
            });
            gameobject.transform.y = 3;
        });
        scene.gameObject.addChild(room);

        // scene.add(new THREE.HemisphereLight(0x606060, 0x404040));

        var light = feng3d.GameObject.create("light", (gameobject) =>
        {
            gameobject.addComponent(feng3d.DirectionalLight, (component) =>
            {
                component.color.fromUnit(0xffffff);
            });
            gameobject.transform.rotation = new feng3d.Vector3(1, 1, 1).normalize();
        });
        scene.gameObject.addChild(light);

        var geometry = new feng3d.CubeGeometry(0.15, 0.15, 0.15);

        for (var i = 0; i < 200; i++)
        {
            var object = feng3d.GameObject.create(`box${i}`, (object) =>
            {
                object.addComponent(feng3d.MeshRenderer, (component) =>
                {
                    component.geometry = geometry;
                    var material = component.material = new feng3d.StandardMaterial();
                    material.diffuseMethod.color.fromUnit(Math.random() * 0xffffff);
                });

                object.transform.position = feng3d.Vector3.random().scale(4).subNumber(2);
                object.transform.rotation = feng3d.Vector3.random().scale(2 * Math.PI);
                object.transform.scale = feng3d.Vector3.random().addNumber(0.5);

                object.userData.velocity = feng3d.Vector3.random().scale(0.01).subNumber(0.005);
            });

            room.addChild(object);
        }

        // renderer = new THREE.WebGLRenderer({ antialias: true });
        // renderer.setPixelRatio(window.devicePixelRatio);
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.vr.enabled = true;
        // container.appendChild(renderer.domElement);

        engine.canvas.addEventListener('mousedown', onMouseDown, false);
        engine.canvas.addEventListener('mouseup', onMouseUp, false);
        engine.canvas.addEventListener('touchstart', onMouseDown, false);
        engine.canvas.addEventListener('touchend', onMouseUp, false);

        window.addEventListener('resize', onWindowResize, false);

        //

        window.addEventListener('vrdisplaypointerrestricted', onPointerRestricted, false);
        window.addEventListener('vrdisplaypointerunrestricted', onPointerUnrestricted, false);

        document.body.appendChild(WEBVR.createButton(engine.canvas));

    }

    function onMouseDown()
    {

        isMouseDown = true;

    }

    function onMouseUp()
    {

        isMouseDown = false;

    }

    function onPointerRestricted()
    {
        var pointerLockElement = engine.canvas;
        if (pointerLockElement && typeof (pointerLockElement.requestPointerLock) === 'function')
        {
            pointerLockElement.requestPointerLock();

        }
    }

    function onPointerUnrestricted()
    {
        var currentPointerLockElement = document.pointerLockElement;
        var expectedPointerLockElement = engine.canvas;
        if (currentPointerLockElement && currentPointerLockElement === expectedPointerLockElement && typeof (document.exitPointerLock) === 'function')
        {
            document.exitPointerLock();
        }
    }

    function onWindowResize()
    {
        camera.lens.aspectRatio = window.innerWidth / window.innerHeight;

        engine.setSize(window.innerWidth, window.innerHeight);
    }

    //

    function animate()
    {

        // renderer.animate(render);

    }

    function render()
    {

        var delta = clock.getDelta() * 60;

        if (isMouseDown === true)
        {

            var cube = room.children[0];
            room.removeChild(cube);

            cube.transform.position = new feng3d.Vector3(0, 0, - 0.75).applyQuaternion(camera.transform.orientation);
            cube.userData.velocity.x = (Math.random() - 0.5) * 0.02 * delta;
            cube.userData.velocity.y = (Math.random() - 0.5) * 0.02 * delta;
            cube.userData.velocity.z = (Math.random() * 0.01 - 0.05) * delta;
            cube.userData.velocity.applyQuaternion(camera.transform.orientation);
            room.addChild(cube);

        }

        // find intersections

        // raycaster.setFromCamera({ x: 0, y: 0 }, camera);

        // var intersects = raycaster.intersectObjects(room.children);

        // if (intersects.length > 0)
        // {

        //     if (INTERSECTED != intersects[0].object)
        //     {

        //         if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        //         INTERSECTED = intersects[0].object;
        //         INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        //         INTERSECTED.material.emissive.setHex(0xff0000);

        //     }

        // } else
        // {

        //     if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        //     INTERSECTED = undefined;

        // }

        // // Keep cubes inside room

        // for (var i = 0; i < room.children.length; i++)
        // {

        //     var cube = room.children[i];

        //     cube.userData.velocity.multiplyScalar(1 - (0.001 * delta));

        //     cube.position.add(cube.userData.velocity);

        //     if (cube.position.x < - 3 || cube.position.x > 3)
        //     {

        //         cube.position.x = THREE.Math.clamp(cube.position.x, - 3, 3);
        //         cube.userData.velocity.x = - cube.userData.velocity.x;

        //     }

        //     if (cube.position.y < - 3 || cube.position.y > 3)
        //     {

        //         cube.position.y = THREE.Math.clamp(cube.position.y, - 3, 3);
        //         cube.userData.velocity.y = - cube.userData.velocity.y;

        //     }

        //     if (cube.position.z < - 3 || cube.position.z > 3)
        //     {

        //         cube.position.z = THREE.Math.clamp(cube.position.z, - 3, 3);
        //         cube.userData.velocity.z = - cube.userData.velocity.z;

        //     }

        //     cube.rotation.x += cube.userData.velocity.x * 2 * delta;
        //     cube.rotation.y += cube.userData.velocity.y * 2 * delta;
        //     cube.rotation.z += cube.userData.velocity.z * 2 * delta;

        // }

        // renderer.render(scene, camera);

    }
})();