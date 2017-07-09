namespace feng3d
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
            
            this.view3D = new View3D();

            var cube = GameObjectFactory.createCube();
            cube.transform.z = 300;
            this.view3D.scene.transform.addChild(cube.transform);

            //初始化颜色材质
            var colorMaterial = cube.getComponent(MeshRenderer).material = new ColorMaterial();

            //变化旋转与颜色
            setInterval(function ()
            {
                cube.transform.ry += 1;
            }, 15);
            setInterval(function ()
            {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        }
    }
}