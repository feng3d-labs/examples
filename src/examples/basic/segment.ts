function init() {

    var canvas = document.getElementById("glcanvas");
    var view3D = new feng3d.View3D(canvas);

    //初始化颜色材质
    var segmentMaterial = new feng3d.SegmentMaterial();
    var segmentObject3D = new feng3d.Object3D("cube", [
        new feng3d.Geometry(),
        new feng3d.Space3D(0, 0, 300),
        segmentMaterial,
    ]);
    view3D.scene.addChild(segmentObject3D);

    var segmentGeometry = new feng3d.SegmentGeometry();
    var geometry = segmentObject3D.getComponentByClass(feng3d.Geometry);
    geometry.addComponent(segmentGeometry);

    segmentGeometry.addSegment(new feng3d.Segment(new feng3d.Vector3D(), new feng3d.Vector3D(100, 0, 0)));
    segmentGeometry.addSegment(new feng3d.Segment(new feng3d.Vector3D(100, 0, 0), new feng3d.Vector3D(100, 100, 0)));
    segmentGeometry.addSegment(new feng3d.Segment(new feng3d.Vector3D(100, 100, 0), new feng3d.Vector3D()));

    //变化旋转与颜色
    setInterval(function () {
        segmentObject3D.space3D.ry += 1;
    }, 15);
}

init();