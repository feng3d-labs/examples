namespace feng3d
{
    export class ScriptDemo extends Script
    {
        cube: GameObject;

        init()
        {
            var cube = this.cube = GameObject.create();
            cube.transform.z = -7;
            this.gameObject.addChild(cube);

            var model = cube.addComponent(MeshRenderer);
            model.geometry = new CubeGeometry(1, 1, 1, 1, 1, 1, false);
            //材质
            var material = model.material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/m.png';

            material.fogMethod.enable = true;
            material.fogMethod.fogColor = new Color(1, 1, 0);
            material.fogMethod.minDistance = 2;
            material.fogMethod.maxDistance = 3;
        }

        update()
        {
            this.cube.transform.ry += 1;
            // log("this.cube.transform.ry: " + this.cube.transform.ry);
        }

        /**
         * 销毁
         */
        dispose()
        {
            this.cube.dispose();
            this.cube = null;
        }
    }
}