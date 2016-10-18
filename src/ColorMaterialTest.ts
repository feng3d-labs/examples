module feng3d {
    export class ColorMaterialTest {
        view3D: View3D;
        constructor() {

            this.init();
        }

        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            //初始化颜色材质
            var colorMaterial = new ColorMaterial();
            var cube = new Object3D("cube", [
                primitives.createCube(),
                new Space3D(0, 0, 300),
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
        }
    }
}

new feng3d.ColorMaterialTest();