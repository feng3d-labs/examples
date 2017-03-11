var canvas = document.getElementById("glcanvas");
this.view3D = new feng3d.View3D(canvas);

var segment = new feng3d.Object3D("segment");
segment.transform.position.z = 300;
this.view3D.scene.addChild(segment);

//初始化材质
segment.getOrCreateComponentByClass(feng3d.MeshRenderer).material = new feng3d.SegmentMaterial();
var segmentGeometry = segment.getOrCreateComponentByClass(feng3d.MeshFilter).geometry = new feng3d.SegmentGeometry();

var length = 200;
var height = 200 / Math.PI;
var preVec: feng3d.Vector3D;
for (var x = -length; x <= length; x++) {

    var angle = x / length * Math.PI;
    if (preVec == null) {
        preVec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
    } else {
        var vec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
        segmentGeometry.addSegment(new feng3d.Segment(preVec, vec));
        preVec = vec;
    }
}

//变化旋转
setInterval(function () {
    segment.transform.rotation.y += 1;
}, 15);