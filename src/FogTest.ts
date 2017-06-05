namespace feng3d
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
            cube.transform.z = 300;
            cube.transform.y = -100;
            this.view3D.scene.addChild(cube.transform);

            //变化旋转与颜色
            setInterval(function ()
            {
                cube.transform.rotationY += 1;
            }, 15);

            var model = cube.getOrCreateComponentByClass(MeshRenderer);
            cube.getOrCreateComponentByClass(MeshFilter).mesh = new CubeGeometry(100, 100, 100, 1, 1, 1, false);
            //材质
            var material = model.material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/m.png';

            var fogMethod = new FogMethod(new Color(1, 1, 0), 200, 300);
            material.addMethod(fogMethod);
        }
    }
}