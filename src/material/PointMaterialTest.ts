module feng3d {
    export class PointMaterialTest {
        view3D: View3D;
        constructor() {

            this.init();
        }

        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var pointGeometry = new PointGeometry();
            var pointMaterial = new PointMaterial();
            var object3D = new Object3D("plane");
            object3D.getOrCreateComponentByClass(MeshFilter).geometry = pointGeometry;
            object3D.getOrCreateComponentByClass(MeshRenderer).material = pointMaterial;
            object3D.transform.z = 300;
            this.view3D.scene.addChild(object3D);

            var length = 200;
            var height = 200 / Math.PI;
            for (var x = -length; x <= length; x = x + 4) {

                var angle = x / length * Math.PI;
                var vec = new Vector3D(x, Math.sin(angle) * height, 0);
                pointGeometry.addPoint(new Point(vec));
            }

            //变化旋转
            setInterval(function () {
                object3D.transform.ry += 1;

                pointMaterial.pointSize = 1 + 5 * Math.sin(object3D.transform.ry / 30);

            }, 15);
        }
    }
}

new feng3d.PointMaterialTest();