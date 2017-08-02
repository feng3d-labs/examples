var feng3d;
(function (feng3d) {
    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    var view3D = new feng3d.Engine();
    var scene3D = view3D.scene;
    var camera = view3D.camera;
    camera.transform.z = -500;
    camera.transform.lookAt(new feng3d.Vector3D());
    camera.gameObject.addComponent(feng3d.FPSController);
    var cube = feng3d.GameObjectFactory.createCube();
    cube.transform.mouseEnabled = true;
    scene3D.transform.addChild(cube.transform);
    var plane = feng3d.GameObjectFactory.createPlane();
    plane.transform.position = new feng3d.Vector3D(150, 0, 0);
    plane.transform.rx = 90;
    plane.transform.mouseEnabled = true;
    scene3D.transform.addChild(plane.transform);
    var sphere = feng3d.GameObjectFactory.createSphere();
    sphere.transform.position = new feng3d.Vector3D(-150, 0, 0);
    sphere.transform.mouseEnabled = true;
    scene3D.transform.addChild(sphere.transform);
    var capsule = feng3d.GameObjectFactory.createCapsule();
    capsule.transform.position = new feng3d.Vector3D(300, 0, 0);
    capsule.transform.mouseEnabled = true;
    scene3D.transform.addChild(capsule.transform);
    var cylinder = feng3d.GameObjectFactory.createCylinder();
    cylinder.transform.position = new feng3d.Vector3D(-300, 0, 0);
    cylinder.transform.mouseEnabled = true;
    scene3D.transform.addChild(cylinder.transform);
    scene3D.transform.on("click", function (event) {
        var object3D = event.target;
        var material = object3D.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
        material.color.fromUnit(Math.random() * (1 << 24));
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=MousePickTest.js.map