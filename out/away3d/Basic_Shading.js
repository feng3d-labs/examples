var feng3d;
(function (feng3d) {
    var scene;
    var camera;
    var view3D;
    var cameraController;
    var planeMaterial;
    var sphereMaterial;
    var cubeMaterial;
    var torusMaterial;
    var light1;
    var light2;
    var plane;
    var sphere;
    var cube;
    var torus;
    var move = false;
    var lastPanAngle = 0;
    var lastTiltAngle = 0;
    var lastMouseX = 0;
    var lastMouseY = 0;
    initEngine();
    initLights();
    initMaterials();
    initObjects();
    initListeners();
    function initEngine() {
        view3D = new feng3d.Engine();
        scene = view3D.scene;
        camera = view3D.camera;
        cameraController = new feng3d.HoverController(camera.gameObject);
        cameraController.distance = 1000;
        cameraController.minTiltAngle = 0;
        cameraController.maxTiltAngle = 90;
        cameraController.panAngle = 45;
        cameraController.tiltAngle = 20;
    }
    function initMaterials() {
        planeMaterial = new feng3d.StandardMaterial("resources/floor_diffuse.jpg", "resources/floor_normal.jpg", "resources/floor_specular.jpg");
        sphereMaterial = new feng3d.StandardMaterial("resources/beachball_diffuse.jpg", "", "resources/beachball_specular.jpg");
        cubeMaterial = new feng3d.StandardMaterial("resources/trinket_diffuse.jpg", "resources/trinket_normal.jpg", "resources/trinket_specular.jpg");
        torusMaterial = new feng3d.StandardMaterial("resources/weave_diffuse.jpg", "resources/weave_normal.jpg", "resources/weave_diffuse.jpg");
    }
    function initLights() {
        scene.ambientColor.a = 0.2;
        light1 = feng3d.GameObject.create();
        var directionalLight = light1.addComponent(feng3d.DirectionalLight);
        directionalLight.intensity = 0.7;
        light1.transform.rx = 90;
        scene.transform.addChild(light1.transform);
        light2 = feng3d.GameObject.create();
        var directionalLight = light2.addComponent(feng3d.DirectionalLight);
        directionalLight.color.fromUnit(0x00FFFF);
        directionalLight.intensity = 0.7;
        light2.transform.rx = 90;
        scene.transform.addChild(light2.transform);
    }
    function initObjects() {
        plane = feng3d.GameObject.create();
        var model = plane.addComponent(feng3d.MeshRenderer);
        var geometry = plane.addComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(1000, 1000);
        model.material = planeMaterial;
        geometry.scaleUV(2, 2);
        plane.transform.y = -20;
        scene.transform.addChild(plane.transform);
        sphere = feng3d.GameObject.create();
        var model = sphere.addComponent(feng3d.MeshRenderer);
        sphere.addComponent(feng3d.MeshFilter).mesh = new feng3d.SphereGeometry(150, 40, 20);
        model.material = sphereMaterial;
        sphere.transform.x = 300;
        sphere.transform.y = 160;
        sphere.transform.z = 300;
        scene.transform.addChild(sphere.transform);
        cube = feng3d.GameObject.create();
        var model = cube.addComponent(feng3d.MeshRenderer);
        cube.addComponent(feng3d.MeshFilter).mesh = new feng3d.CubeGeometry(200, 200, 200, 1, 1, 1, false);
        model.material = cubeMaterial;
        cube.transform.x = 300;
        cube.transform.y = 160;
        cube.transform.z = -250;
        scene.transform.addChild(cube.transform);
        torus = feng3d.GameObject.create();
        var model = torus.addComponent(feng3d.MeshRenderer);
        geometry = torus.addComponent(feng3d.MeshFilter).mesh = new feng3d.TorusGeometry(150, 60, 40, 20);
        model.material = torusMaterial;
        geometry.scaleUV(10, 5);
        torus.transform.x = -250;
        torus.transform.y = 160;
        torus.transform.z = -250;
        scene.transform.addChild(torus.transform);
    }
    function initListeners() {
        feng3d.ticker.on("enterFrame", onEnterFrame, this);
        feng3d.input.on("mousedown", onMouseDown, this);
        feng3d.input.on("mouseup", onMouseUp, this);
    }
    function onEnterFrame(event) {
        if (move) {
            cameraController.panAngle = 0.3 * (feng3d.input.clientX - view3D.canvas.clientLeft - lastMouseX) + lastPanAngle;
            cameraController.tiltAngle = 0.3 * (feng3d.input.clientY - view3D.canvas.clientTop - lastMouseY) + lastTiltAngle;
        }
        light1.transform.rx = 30;
        light1.transform.ry++;
    }
    function onMouseDown(event) {
        lastPanAngle = cameraController.panAngle;
        lastTiltAngle = cameraController.tiltAngle;
        lastMouseX = feng3d.input.clientX - view3D.canvas.clientLeft;
        lastMouseY = feng3d.input.clientY - view3D.canvas.clientTop;
        move = true;
    }
    function onMouseUp(event) {
        move = false;
    }
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_Shading.js.map