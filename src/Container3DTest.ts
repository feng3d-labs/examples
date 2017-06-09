namespace feng3d
{

    /**
     * 测试3D容器
     */
    export class Container3DTest
    {

        view3D: View3D;
        constructor()
        {
            this.init();
        }

        init()
        {

            this.view3D = new View3D();

            //初始化颜色材质
            var cube = GameObjectFactory.createCube();
            cube.transform.z = 500;
            this.view3D.scene.addChild(cube.transform);

            var colorMaterial = cube.getComponent(MeshRenderer).material = new ColorMaterial();

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.transform.x = 200;
            cube.transform.addChild(cylinder.transform);

            //变化旋转与颜色
            setInterval(function ()
            {
                cube.transform.rotationY += 1;
            }, 15);
            setInterval(function ()
            {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        }
    }
}