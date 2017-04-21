var feng3d;
(function (feng3d) {
    class SegmentMaterialTest {
        constructor() {
            this.init();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var segment = new feng3d.GameObject("segment");
            segment.z = 300;
            this.view3D.scene.addChild(segment);
            //初始化材质
            segment.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.SegmentMaterial();
            var segmentGeometry = segment.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.SegmentGeometry();
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
                segment.rotationY += 1;
            }, 15);
        }
    }
    feng3d.SegmentMaterialTest = SegmentMaterialTest;
})(feng3d || (feng3d = {}));
new feng3d.SegmentMaterialTest();
//# sourceMappingURL=SegmentMaterialTest.js.map