var feng3d;
(function (feng3d) {
    /**
     * 测试3D容器
     */
    var Container3DTest = (function () {
        function Container3DTest() {
            this.init();
        }
        Container3DTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            //初始化颜色材质
            var colorMaterial = new feng3d.ColorMaterial();
            var cube = new feng3d.Object3D("cube", [
                feng3d.primitives.createCube(),
                new feng3d.Space3D(0, 0, 500),
                colorMaterial,
            ]);
            this.view3D.scene.addChild(cube);
            var cylinderColorMaterial = new feng3d.ColorMaterial();
            var cylinder = new feng3d.Object3D("cylinder", [
                feng3d.primitives.createCylinder(),
                new feng3d.Space3D(200, 0, 0, 0, 0, 0),
                cylinderColorMaterial,
            ]);
            cube.addChild(cylinder);
            //变化旋转与颜色
            setInterval(function () {
                cube.space3D.ry += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.color.color = Math.random() * (1 << 32 - 1);
            }, 1000);
        };
        return Container3DTest;
    }());
    feng3d.Container3DTest = Container3DTest;
})(feng3d || (feng3d = {}));
new feng3d.Container3DTest();
//# sourceMappingURL=Container3DTest.js.map