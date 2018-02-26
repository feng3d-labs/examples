var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var gameobject = feng3d.GameObject.create();
    var model = gameobject.addComponent(feng3d.MeshRenderer);
    var geometry = model.geometry = new feng3d.CustomGeometry();
    geometry.addGeometry(new feng3d.PlaneGeometry());
    var matrix3D = new feng3d.Matrix4x4();
    matrix3D.appendTranslation(0, 0.50, 0);
    geometry.addGeometry(new feng3d.SphereGeometry(50), matrix3D);
    matrix3D.appendTranslation(0, 0.50, 0);
    var addGeometry = new feng3d.CubeGeometry();
    geometry.addGeometry(addGeometry, matrix3D);
    addGeometry.width = 0.50;
    matrix3D.appendTranslation(0, 0.50, 0);
    matrix3D.appendRotation(feng3d.Vector3.Z_AXIS, 45);
    geometry.addGeometry(addGeometry, matrix3D);
    gameobject.transform.z = 3;
    gameobject.transform.y = -1;
    view3D.scene.gameObject.addChild(gameobject);
    //初始化颜色材质
    var colorMaterial = model.material = new feng3d.ColorMaterial();
    //变化旋转与颜色
    setInterval(function () {
        gameobject.transform.ry += 1;
    }, 15);
    setInterval(function () {
        colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
    }, 1000);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=GeometryTest.js.map