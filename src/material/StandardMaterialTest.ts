namespace feng3d
{

    export class StandardMaterialTest extends feng3d.Script
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
            var textureMaterial = model.material = new StandardMaterial();
            textureMaterial.diffuseMethod.difuseTexture.url = 'resources/m.png';
            // textureMaterial.diffuseMethod.difuseTexture.url = 'resources/nonpowerof2.png';
            textureMaterial.diffuseMethod.difuseTexture.format = TextureFormat.RGBA;
            // textureMaterial.diffuseMethod.alphaThreshold = 0.1;

            textureMaterial.diffuseMethod.difuseTexture.anisotropy = 16;

            textureMaterial.enableBlend = true;
            textureMaterial.diffuseMethod.color.a = 0.2;
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