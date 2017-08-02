var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var segment = feng3d.GameObject.create("segment");
    segment.transform.z = 300;
    view3D.scene.transform.addChild(segment.transform);
    //初始化材质
    segment.addComponent(feng3d.MeshRenderer).material = new feng3d.SegmentMaterial();
    var segmentGeometry = segment.addComponent(feng3d.MeshFilter).mesh = new feng3d.SegmentGeometry();
    var length = 200;
    var height = 200 / Math.PI;
    var preVec;
    for (var x = -length; x <= length; x++) {
        var angle = x / length * Math.PI;
        if (preVec == null) {
            preVec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
        }
        else {
            var vec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
            segmentGeometry.addSegment(new feng3d.Segment(preVec, vec));
            preVec = vec;
        }
    }
    //变化旋转
    setInterval(function () {
        segment.transform.ry += 1;
    }, 15);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=SegmentMaterialTest.js.map