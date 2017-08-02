var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var pointGeometry = new feng3d.PointGeometry();
    var pointMaterial = new feng3d.PointMaterial();
    var object3D = feng3d.GameObject.create("plane");
    object3D.addComponent(feng3d.MeshFilter).mesh = pointGeometry;
    object3D.addComponent(feng3d.MeshRenderer).material = pointMaterial;
    object3D.transform.z = 300;
    view3D.scene.transform.addChild(object3D.transform);
    var length = 200;
    var height = 200 / Math.PI;
    for (var x = -length; x <= length; x = x + 4) {
        var angle = x / length * Math.PI;
        var vec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
        pointGeometry.addPoint(new feng3d.PointInfo(vec));
    }
    //变化旋转
    setInterval(function () {
        object3D.transform.ry += 1;
        pointMaterial.pointSize = 1 + 5 * Math.sin(object3D.transform.ry / 30);
    }, 15);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=PointMaterialTest.js.map