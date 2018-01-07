var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var scene3D = view3D.scene;
    var cube = feng3d.GameObjectFactory.createCube();
    scene3D.gameObject.addChild(cube);
    var plane = feng3d.GameObjectFactory.createPlane();
    plane.transform.position = new feng3d.Vector3D(1.50, 0, 0);
    plane.transform.rx = -90;
    scene3D.gameObject.addChild(plane);
    var sphere = feng3d.GameObjectFactory.createSphere();
    sphere.transform.position = new feng3d.Vector3D(-1.50, 0, 0);
    scene3D.gameObject.addChild(sphere);
    var capsule = feng3d.GameObjectFactory.createCapsule();
    capsule.transform.position = new feng3d.Vector3D(3, 0, 0);
    scene3D.gameObject.addChild(capsule);
    var cylinder = feng3d.GameObjectFactory.createCylinder();
    cylinder.transform.position = new feng3d.Vector3D(-3, 0, 0);
    scene3D.gameObject.addChild(cylinder);
    var camera = view3D.camera;
    camera.transform.z = -5;
    camera.transform.lookAt(new feng3d.Vector3D());
    //
    camera.gameObject.addComponent(feng3d.FPSController);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=FPSControllerTest.js.map