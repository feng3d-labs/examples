function init() {
    var canvas = document.getElementById("glcanvas");
    var view3D = new feng3d.View3D(canvas);
    //初始化颜色材质
    var segmentMaterial = new feng3d.SegmentMaterial();
    var cube = new feng3d.Object3D("cube", [
        new feng3d.Geometry(),
        new feng3d.Space3D(0, 0, 300),
        segmentMaterial,
    ]);
    view3D.scene.addChild(cube);
    var segmentGeometry = new feng3d.SegmentGeometry();
    var geometry = cube.getComponentByClass(feng3d.Geometry);
    geometry.addComponent(segmentGeometry);
    segmentGeometry.addSegment(new feng3d.Segment(new feng3d.Vector3D(), new feng3d.Vector3D(100, 0, 0)));
    //变化旋转与颜色
    setInterval(function () {
        cube.space3D.ry += 1;
    }, 15);
}
init();
//# sourceMappingURL=segmentMaterial.js.map