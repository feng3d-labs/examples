namespace feng3d
{
    var scene: Scene3D;
    var camera: Camera;
    var view3D: Engine;
    var cameraController: HoverController;
    var planeMaterial: StandardMaterial;
    var sphereMaterial: StandardMaterial;
    var cubeMaterial: StandardMaterial;
    var torusMaterial: StandardMaterial;
    var light1: GameObject;
    var light2: GameObject;
    var plane: GameObject;
    var sphere: GameObject;
    var cube: GameObject;
    var torus: GameObject;
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

    function initEngine()
    {
        view3D = new Engine();

        scene = view3D.scene;
        camera = view3D.camera;

        cameraController = new HoverController(camera.gameObject);
        cameraController.distance = 1000;
        cameraController.minTiltAngle = 0;
        cameraController.maxTiltAngle = 90;
        cameraController.panAngle = 45;
        cameraController.tiltAngle = 20;
    }

    function initMaterials()
    {
        planeMaterial = new StandardMaterial("resources/floor_diffuse.jpg", "resources/floor_normal.jpg", "resources/floor_specular.jpg");
        sphereMaterial = new StandardMaterial("resources/beachball_diffuse.jpg", "", "resources/beachball_specular.jpg");
        cubeMaterial = new StandardMaterial("resources/trinket_diffuse.jpg", "resources/trinket_normal.jpg", "resources/trinket_specular.jpg");
        torusMaterial = new StandardMaterial("resources/weave_diffuse.jpg", "resources/weave_normal.jpg", "resources/weave_diffuse.jpg");
    }

    function initLights()
    {
        scene.ambientColor.a = 0.2;

        light1 = GameObject.create();
        var directionalLight = light1.addComponent(DirectionalLight);
        directionalLight.intensity = 0.7;
        light1.transform.rx = 90;
        scene.gameObject.addChild(light1);

        light2 = GameObject.create();
        var directionalLight = light2.addComponent(DirectionalLight);
        directionalLight.color.fromUnit(0x00FFFF);
        directionalLight.intensity = 0.7;
        light2.transform.rx = 90;
        scene.gameObject.addChild(light2);
    }

    function initObjects()
    {
        plane = GameObject.create();
        var model = plane.addComponent(MeshRenderer);
        var geometry: Geometry = plane.addComponent(MeshFilter).mesh = new PlaneGeometry(1000, 1000);
        model.material = planeMaterial;
        geometry.scaleUV(2, 2);
        plane.transform.y = -20;
        scene.gameObject.addChild(plane);
        sphere = GameObject.create();
        var model = sphere.addComponent(MeshRenderer);
        sphere.addComponent(MeshFilter).mesh = new SphereGeometry(150, 40, 20)
        model.material = sphereMaterial;
        sphere.transform.x = 300;
        sphere.transform.y = 160;
        sphere.transform.z = 300;
        scene.gameObject.addChild(sphere);
        cube = GameObject.create();
        var model = cube.addComponent(MeshRenderer);
        cube.addComponent(MeshFilter).mesh = new CubeGeometry(200, 200, 200, 1, 1, 1, false);
        model.material = cubeMaterial;
        cube.transform.x = 300;
        cube.transform.y = 160;
        cube.transform.z = -250;
        scene.gameObject.addChild(cube);
        torus = GameObject.create();
        var model = torus.addComponent(MeshRenderer);
        geometry = torus.addComponent(MeshFilter).mesh = new TorusGeometry(150, 60, 40, 20);
        model.material = torusMaterial;
        geometry.scaleUV(10, 5);
        torus.transform.x = -250;
        torus.transform.y = 160;
        torus.transform.z = -250;
        scene.gameObject.addChild(torus);
    }

    function initListeners()
    {
        ticker.on("enterFrame", onEnterFrame, this);
        input.on("mousedown", onMouseDown, this);
        input.on("mouseup", onMouseUp, this);
    }

    function onEnterFrame(event: InputEvent)
    {
        if (move)
        {
            cameraController.panAngle = 0.3 * (input.clientX - view3D.canvas.clientLeft - lastMouseX) + lastPanAngle;
            cameraController.tiltAngle = 0.3 * (input.clientY - view3D.canvas.clientTop - lastMouseY) + lastTiltAngle;
        }
        light1.transform.rx = 30;
        light1.transform.ry++;
    }

    function onMouseDown(event: InputEvent)
    {
        lastPanAngle = cameraController.panAngle;
        lastTiltAngle = cameraController.tiltAngle;
        lastMouseX = input.clientX - view3D.canvas.clientLeft;
        lastMouseY = input.clientY - view3D.canvas.clientTop;
        move = true;
    }

    function onMouseUp(event: InputEvent)
    {
        move = false;
    }
}