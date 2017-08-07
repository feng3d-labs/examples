var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var object3d = feng3d.GameObject.create();
    var model = object3d.addComponent(feng3d.MeshRenderer);
    var geometry = object3d.addComponent(feng3d.MeshFilter).mesh = new feng3d.Geometry();
    geometry.addGeometry(new feng3d.PlaneGeometry());
    var matrix3D = new feng3d.Matrix3D();
    matrix3D.appendTranslation(0, 50, 0);
    geometry.addGeometry(new feng3d.SphereGeometry(50), matrix3D);
    matrix3D.appendTranslation(0, 50, 0);
    var addGeometry = new feng3d.CubeGeometry();
    geometry.addGeometry(addGeometry, matrix3D);
    addGeometry.width = 50;
    matrix3D.appendTranslation(0, 50, 0);
    matrix3D.appendRotation(feng3d.Vector3D.Z_AXIS, 45);
    geometry.addGeometry(addGeometry, matrix3D);
    object3d.transform.z = 300;
    object3d.transform.y = -100;
    view3D.scene.gameObject.addChild(object3d);
    //初始化颜色材质
    var colorMaterial = model.material = new feng3d.ColorMaterial();
    //变化旋转与颜色
    setInterval(function () {
        object3d.transform.ry += 1;
    }, 15);
    setInterval(function () {
        colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
    }, 1000);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=GeometryTest.js.map