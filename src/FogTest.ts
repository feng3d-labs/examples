module feng3d
{
    export class FogTest
    {
        view3D: View3D;
        constructor()
        {
            this.init();
        }

        init()
        {
            
            this.view3D = new View3D();

            var cube = new GameObject();
            cube.z = 300;
            cube.y = -100;
            this.view3D.scene.addChild(cube);

            //变化旋转与颜色
            setInterval(function ()
            {
                cube.rotationY += 1;
            }, 15);

            var model = cube.getOrCreateComponentByClass(Model);
            model.geometry = new CubeGeometry(100, 100, 100, 1, 1, 1, false);
            //材质
            var material = model.material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/m.png';

            var fogMethod = new FogMethod(new Color(1, 1, 0), 200, 300);
            material.addMethod(fogMethod);
        }
    }
}