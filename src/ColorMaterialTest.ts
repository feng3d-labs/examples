module feng3d
{
    export class ColorMaterialTest
    {
        view3D: View3D;
        constructor()
        {

            this.init();
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var cube = new CubeObject3D();
            cube.position.z = 300;
            this.view3D.scene.addChild(cube);

            //初始化颜色材质
            var colorMaterial = cube.getOrCreateComponentByClass(Model).material = new ColorMaterial();

            //变化旋转与颜色
            setInterval(function ()
            {
                cube.rotation.y += 1;
            }, 15);
            setInterval(function ()
            {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        }
    }
}

new feng3d.ColorMaterialTest();