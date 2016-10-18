var feng3d;
(function (feng3d) {
    var ColorMaterialTest = (function () {
        function ColorMaterialTest() {
            this.init();
        }
        ColorMaterialTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            //初始化颜色材质
            var colorMaterial = new feng3d.ColorMaterial();
            var cube = new feng3d.Object3D("cube", [
                feng3d.primitives.createCube(),
                new feng3d.Space3D(0, 0, 300),
                colorMaterial,
            ]);
            this.view3D.scene.addChild(cube);
            //变化旋转与颜色
            setInterval(function () {
                cube.space3D.ry += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.color.color = Math.random() * (1 << 32 - 1);
            }, 1000);
        };
        return ColorMaterialTest;
    }());
    feng3d.ColorMaterialTest = ColorMaterialTest;
})(feng3d || (feng3d = {}));
new feng3d.ColorMaterialTest();
//# sourceMappingURL=ColorMaterialTest.js.map