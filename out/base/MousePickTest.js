var feng3d;
(function (feng3d) {
    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    var view3D = new feng3d.Engine();
    var scene3D = view3D.scene;
    var camera = view3D.camera;
    camera.transform.z = -5;
    camera.transform.lookAt(new feng3d.Vector3());
    camera.gameObject.addComponent(feng3d.FPSController);
    var cube = feng3d.GameObjectFactory.createCube();
    cube.mouseEnabled = true;
    scene3D.gameObject.addChild(cube);
    var plane = feng3d.GameObjectFactory.createPlane();
    plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
    plane.transform.rx = -90;
    plane.mouseEnabled = true;
    scene3D.gameObject.addChild(plane);
    var sphere = feng3d.GameObjectFactory.createSphere();
    sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
    sphere.mouseEnabled = true;
    scene3D.gameObject.addChild(sphere);
    var capsule = feng3d.GameObjectFactory.createCapsule();
    capsule.transform.position = new feng3d.Vector3(3, 0, 0);
    capsule.mouseEnabled = true;
    scene3D.gameObject.addChild(capsule);
    var cylinder = feng3d.GameObjectFactory.createCylinder();
    cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
    cylinder.mouseEnabled = true;
    scene3D.gameObject.addChild(cylinder);
    scene3D.gameObject.on("click", function (event) {
        var transform = event.target;
        if (transform.getComponent(feng3d.MeshRenderer)) {
            var material = transform.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
            material.color.fromUnit(Math.random() * (1 << 24));
        }
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=MousePickTest.js.map