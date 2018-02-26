var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var segment = feng3d.GameObject.create("segment");
    segment.transform.z = 3;
    view3D.scene.gameObject.addChild(segment);
    //初始化材质
    var meshRenderer = segment.addComponent(feng3d.MeshRenderer);
    meshRenderer.material = new feng3d.SegmentMaterial();
    var segmentGeometry = meshRenderer.geometry = new feng3d.SegmentGeometry();
    var length = 200;
    var height = 2 / Math.PI;
    var preVec;
    for (var x = -length; x <= length; x++) {
        var angle = x / length * Math.PI;
        if (preVec == null) {
            preVec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
        }
        else {
            var vec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
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