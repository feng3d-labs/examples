var feng3d;
(function (feng3d) {
    /**
     * 测试3D容器
     */
    class Container3DTest {
        constructor() {
            this.init();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            //初始化颜色材质
            var cube = new feng3d.CubeObject3D();
            cube.z = 500;
            this.view3D.scene.addChild(cube);
            var colorMaterial = cube.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial();
            var cylinder = new feng3d.CylinderObject3D();
            cylinder.x = 200;
            cube.addChild(cylinder);
            //变化旋转与颜色
            setInterval(function () {
                cube.rotationY += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        }
    }
    feng3d.Container3DTest = Container3DTest;
})(feng3d || (feng3d = {}));
new feng3d.Container3DTest();
//# sourceMappingURL=Container3DTest.js.map