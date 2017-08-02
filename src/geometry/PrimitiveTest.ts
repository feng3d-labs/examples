namespace feng3d
{

    var view3D = new Engine();
    var scene3D = view3D.scene;

    var cube = GameObjectFactory.createCube();
    scene3D.transform.addChild(cube.transform);

    var plane = GameObjectFactory.createPlane();
    plane.transform.position = new Vector3D(150, 0, 0);
    plane.transform.rx = 90;
    scene3D.transform.addChild(plane.transform);

    var sphere = GameObjectFactory.createSphere();
    sphere.transform.position = new Vector3D(-150, 0, 0);
    scene3D.transform.addChild(sphere.transform);

    var capsule = GameObjectFactory.createCapsule();
    capsule.transform.position = new Vector3D(300, 0, 0);
    scene3D.transform.addChild(capsule.transform);

    var cylinder = GameObjectFactory.createCylinder();
    cylinder.transform.position = new Vector3D(-300, 0, 0);
    scene3D.transform.addChild(cylinder.transform);

    var camera = view3D.camera;
    var controller = new LookAtController(camera.gameObject);
    controller.lookAtPosition = new Vector3D();
    //
    setInterval(() =>
    {
        var time = new Date().getTime();
        var angle = (Math.round(time / 17) % 360);
        angle = angle * Math.DEG2RAD;
        camera.transform.position = new Vector3D(1000 * Math.sin(angle), 0, 1000 * Math.cos(angle));

        controller.update();
    }, 17);
}