var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var scene3D = view3D.scene;
    var cube = feng3d.GameObjectFactory.createCube();
    scene3D.gameObject.addChild(cube);
    var plane = feng3d.GameObjectFactory.createPlane();
    plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
    plane.transform.rx = -90;
    scene3D.gameObject.addChild(plane);
    var sphere = feng3d.GameObjectFactory.createSphere();
    sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
    scene3D.gameObject.addChild(sphere);
    var capsule = feng3d.GameObjectFactory.createCapsule();
    capsule.transform.position = new feng3d.Vector3(3, 0, 0);
    scene3D.gameObject.addChild(capsule);
    var cylinder = feng3d.GameObjectFactory.createCylinder();
    cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
    scene3D.gameObject.addChild(cylinder);
    var camera = view3D.camera;
    var controller = new feng3d.LookAtController(camera.gameObject);
    controller.lookAtPosition = new feng3d.Vector3();
    //
    setInterval(function () {
        var time = new Date().getTime();
        var angle = (Math.round(time / 17) % 360);
        angle = angle * feng3d.FMath.DEG2RAD;
        camera.transform.position = new feng3d.Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));
        controller.update();
    }, 17);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=PrimitiveTest.js.map