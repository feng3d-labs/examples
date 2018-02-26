var feng3d;
(function (feng3d) {
    var scene;
    var camera;
    var view3D;
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
    initEngine();
    initLights();
    initMaterials();
    initObjects();
    initListeners();
    function initEngine() {
        view3D = new feng3d.Engine();
        scene = view3D.scene;
        camera = view3D.camera;
        camera.transform.y = 5;
        camera.transform.z = -10;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);
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
        scene.gameObject.addChild(light1);
        light2 = feng3d.GameObject.create();
        var directionalLight = light2.addComponent(feng3d.DirectionalLight);
        directionalLight.color.fromUnit(0x00FFFF);
        directionalLight.intensity = 0.7;
        light2.transform.rx = 90;
        scene.gameObject.addChild(light2);
    }
    function initObjects() {
        plane = feng3d.GameObject.create();
        var model = plane.addComponent(feng3d.MeshRenderer);
        var geometry = model.geometry = new feng3d.PlaneGeometry(10, 10);
        model.material = planeMaterial;
        geometry.scaleUV(2, 2);
        plane.transform.y = -0.20;
        scene.gameObject.addChild(plane);
        sphere = feng3d.GameObject.create();
        var model = sphere.addComponent(feng3d.MeshRenderer);
        model.geometry = new feng3d.SphereGeometry(1.50, 40, 20);
        model.material = sphereMaterial;
        sphere.transform.x = 3;
        sphere.transform.y = 1.60;
        sphere.transform.z = 3.00;
        scene.gameObject.addChild(sphere);
        cube = feng3d.GameObject.create();
        var model = cube.addComponent(feng3d.MeshRenderer);
        model.geometry = new feng3d.CubeGeometry(2, 2, 2, 1, 1, 1, false);
        model.material = cubeMaterial;
        cube.transform.x = 3.00;
        cube.transform.y = 1.60;
        cube.transform.z = -2.50;
        scene.gameObject.addChild(cube);
        torus = feng3d.GameObject.create();
        var model = torus.addComponent(feng3d.MeshRenderer);
        geometry = model.geometry = new feng3d.TorusGeometry(1.50, 0.60, 40, 20);
        model.material = torusMaterial;
        geometry.scaleUV(10, 5);
        torus.transform.x = -2.50;
        torus.transform.y = 1.60;
        torus.transform.z = -2.50;
        scene.gameObject.addChild(torus);
    }
    function initListeners() {
        feng3d.ticker.onframe(onEnterFrame, this);
    }
    function onEnterFrame() {
        light1.transform.rx = 30;
        light1.transform.ry++;
    }
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_Shading.js.map