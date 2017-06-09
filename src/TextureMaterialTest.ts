namespace feng3d
{
    export class TextureMaterialTest
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

            var model = cube.addComponent(MeshRenderer);
            cube.addComponent(MeshFilter).mesh = new CubeGeometry(100, 100, 100, 1, 1, 1, false);
            // model.geometry = new PlaneGeometry();
            //材质
            var textureMaterial = model.material = new TextureMaterial();
            //
            // var texture = textureMaterial.texture = new Texture2D('resources/sky.jpg');
            var texture = textureMaterial.texture = new Texture2D('resources/m.png');
            texture.flipY = false;
        }
    }
}