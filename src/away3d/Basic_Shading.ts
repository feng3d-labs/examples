module feng3d
{
    var scene: Scene3D;
    var camera: Camera;
    var view3D: Engine;
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

        camera.transform.z = -1000;
        camera.transform.lookAt(new Vector3D());
        camera.gameObject.addComponent(FPSController);
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
        var geometry: Geometry = model.geometry = new PlaneGeometry(1000, 1000);
        model.material = planeMaterial;
        geometry.scaleUV(2, 2);
        plane.transform.y = -20;
        scene.gameObject.addChild(plane);
        sphere = GameObject.create();
        var model = sphere.addComponent(MeshRenderer);
        model.geometry = new SphereGeometry(150, 40, 20)
        model.material = sphereMaterial;
        sphere.transform.x = 300;
        sphere.transform.y = 160;
        sphere.transform.z = 300;
        scene.gameObject.addChild(sphere);
        cube = GameObject.create();
        var model = cube.addComponent(MeshRenderer);
        model.geometry = new CubeGeometry(200, 200, 200, 1, 1, 1, false);
        model.material = cubeMaterial;
        cube.transform.x = 300;
        cube.transform.y = 160;
        cube.transform.z = -250;
        scene.gameObject.addChild(cube);
        torus = GameObject.create();
        var model = torus.addComponent(MeshRenderer);
        geometry = model.geometry = new TorusGeometry(150, 60, 40, 20);
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
    }

    function onEnterFrame()
    {
        light1.transform.rx = 30;
        light1.transform.ry++;
    }
}