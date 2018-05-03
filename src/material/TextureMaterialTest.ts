namespace feng3d
{

    export class TextureMaterialTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");

            var cube = GameObject.create();
            cube.transform.z = 3;
            cube.transform.y = -1;
            scene.gameObject.addChild(cube);

            //变化旋转与颜色
            setInterval(function ()
            {
                cube.transform.ry += 1;
            }, 15);

            var model = cube.addComponent(MeshRenderer);
            model.geometry = new CubeGeometry(1, 1, 1, 1, 1, 1, false);
            // model.geometry = new PlaneGeometry();
            //材质
            var textureMaterial = model.material = new TextureMaterial();
            //
            // var texture = textureMaterial.texture = new Texture2D('resources/sky.jpg');
            var texture = textureMaterial.uniforms.s_texture = new Texture2D('resources/m.png');
            texture.flipY = false;
        }
        /**
         * 更新
         */
        update()
        {
        }

        /**
        * 销毁时调用
        */
        dispose()
        {

        }
    }
}