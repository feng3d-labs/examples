var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var scene3D = view3D.scene;
    var cube = feng3d.GameObjectFactory.createCube();
    scene3D.transform.addChild(cube.transform);
    var plane = feng3d.GameObjectFactory.createPlane();
    plane.transform.position = new feng3d.Vector3D(150, 0, 0);
    plane.transform.rx = 90;
    scene3D.transform.addChild(plane.transform);
    var sphere = feng3d.GameObjectFactory.createSphere();
    sphere.transform.position = new feng3d.Vector3D(-150, 0, 0);
    scene3D.transform.addChild(sphere.transform);
    var capsule = feng3d.GameObjectFactory.createCapsule();
    capsule.transform.position = new feng3d.Vector3D(300, 0, 0);
    scene3D.transform.addChild(capsule.transform);
    var cylinder = feng3d.GameObjectFactory.createCylinder();
    cylinder.transform.position = new feng3d.Vector3D(-300, 0, 0);
    scene3D.transform.addChild(cylinder.transform);
    var camera = view3D.camera;
    camera.transform.z = -500;
    camera.transform.lookAt(new feng3d.Vector3D());
    //
    camera.gameObject.addComponent(feng3d.FPSController);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=FPSControllerTest.js.map