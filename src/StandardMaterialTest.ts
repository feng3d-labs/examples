module feng3d
{
    export class StandardMaterialTest
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
            // model.geometry = new PlaneGeometry();
            //材质
            var textureMaterial = model.material = new StandardMaterial();
            // textureMaterial.diffuseMethod.difuseTexture.url = 'resources/m.png';
            textureMaterial.diffuseMethod.difuseTexture.url = 'resources/nonpowerof2.png';
            textureMaterial.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
            // textureMaterial.diffuseMethod.alphaThreshold = 0.1;

            // textureMaterial.diffuseMethod.difuseTexture.anisotropy = 16;

            // textureMaterial.enableBlend = true;
            textureMaterial.diffuseMethod.color.a = 0.2;
        }
    }
}