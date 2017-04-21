var feng3d;
(function (feng3d) {
    class PointMaterialTest {
        constructor() {
            this.init();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var pointGeometry = new feng3d.PointGeometry();
            var pointMaterial = new feng3d.PointMaterial();
            var object3D = new feng3d.GameObject("plane");
            object3D.getOrCreateComponentByClass(feng3d.Model).geometry = pointGeometry;
            object3D.getOrCreateComponentByClass(feng3d.Model).material = pointMaterial;
            object3D.z = 300;
            this.view3D.scene.addChild(object3D);
            var length = 200;
            var height = 200 / Math.PI;
            for (var x = -length; x <= length; x = x + 4) {
                var angle = x / length * Math.PI;
                var vec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
                pointGeometry.addPoint(new feng3d.PointInfo(vec));
            }
            //变化旋转
            setInterval(function () {
                object3D.rotationY += 1;
                pointMaterial.pointSize = 1 + 5 * Math.sin(object3D.rotationY / 30);
            }, 15);
        }
    }
    feng3d.PointMaterialTest = PointMaterialTest;
})(feng3d || (feng3d = {}));
new feng3d.PointMaterialTest();
//# sourceMappingURL=PointMaterialTest.js.map