var feng3d;
(function (feng3d) {
    class GeometryTest {
        constructor() {
            this.init();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var object3d = new feng3d.Object3D();
            var model = object3d.getOrCreateComponentByClass(feng3d.Model);
            var geometry = model.geometry = new feng3d.Geometry();
            geometry.addGeometry(new feng3d.PlaneGeometry());
            var matrix3D = new feng3d.Matrix3D();
            matrix3D.appendTranslation(0, 50, 0);
            geometry.addGeometry(new feng3d.SphereGeometry(50), matrix3D);
            matrix3D.appendTranslation(0, 50, 0);
            var addGeometry = new feng3d.CubeGeometry();
            geometry.addGeometry(addGeometry, matrix3D);
            addGeometry.width = 50;
            matrix3D.appendTranslation(0, 50, 0);
            matrix3D.appendRotation(45, feng3d.Vector3D.Z_AXIS);
            geometry.addGeometry(addGeometry, matrix3D);
            object3d.position.z = 300;
            object3d.position.y = -100;
            this.view3D.scene.addChild(object3d);
            //初始化颜色材质
            var colorMaterial = model.material = new feng3d.ColorMaterial();
            //变化旋转与颜色
            setInterval(function () {
                object3d.rotation.y += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        }
    }
    feng3d.GeometryTest = GeometryTest;
})(feng3d || (feng3d = {}));
new feng3d.GeometryTest();
//# sourceMappingURL=GeometryTest.js.map