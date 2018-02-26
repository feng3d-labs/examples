namespace feng3d
{
    var view3D = new Engine();
    var scene3D = view3D.scene;

    var cube = GameObjectFactory.createCube();
    scene3D.gameObject.addChild(cube);

    var plane = GameObjectFactory.createPlane();
    plane.transform.position = new Vector3(1.50, 0, 0);
    plane.transform.rx = -90;
    scene3D.gameObject.addChild(plane);

    var sphere = GameObjectFactory.createSphere();
    sphere.transform.position = new Vector3(-1.50, 0, 0);
    scene3D.gameObject.addChild(sphere);

    var capsule = GameObjectFactory.createCapsule();
    capsule.transform.position = new Vector3(3, 0, 0);
    scene3D.gameObject.addChild(capsule);

    var cylinder = GameObjectFactory.createCylinder();
    cylinder.transform.position = new Vector3(-3, 0, 0);
    scene3D.gameObject.addChild(cylinder);

    var camera = view3D.camera;
    camera.transform.z = -5;
    camera.transform.lookAt(new Vector3());
    //
    camera.gameObject.addComponent(FPSController);
}