namespace feng3d
{
    export class ScriptDemo extends Script
    {
        cube: GameObject;

        init()
        {
            var cube = this.cube = GameObject.create();
            cube.transform.z = 300;
            cube.transform.y = -100;
            this.transform.addChild(cube.transform);

            var model = cube.addComponent(MeshRenderer);
            cube.addComponent(MeshFilter).mesh = new CubeGeometry(100, 100, 100, 1, 1, 1, false);
            //材质
            var material = model.material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/m.png';

            var fogMethod = new FogMethod(new Color(1, 1, 0), 200, 300);
            material.addMethod(fogMethod);
        }

        update()
        {
            this.cube.transform.ry += 1;
            // console.log("this.cube.transform.ry: " + this.cube.transform.ry);
        }

        /**
         * 销毁
         */
        dispose()
        {
            super.dispose();
            this.cube.dispose();
            this.cube = null;
        }
    }
}