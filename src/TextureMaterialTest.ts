module feng3d
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
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var cube = new CubeObject3D();
            cube.transform.position.z = 300;
            this.view3D.scene.addChild(cube);

            //变化旋转与颜色
            setInterval(function ()
            {
                cube.transform.rotation.y += 1;
            }, 15);

            //材质
            var textureMaterial = cube.getOrCreateComponentByClass(Model).material = new TextureMaterial();
            //
            // var texture = textureMaterial.texture = new Texture2D('resources/sky.jpg');
            var texture = textureMaterial.texture = new Texture2D('resources/m.png');
            texture.flipY = false;
            texture.premulAlpha = true;
        }
    }
}

new feng3d.TextureMaterialTest();