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
            var material = model.material = materialFactory.create("standard");
            material.uniforms.s_diffuse.url = 'resources/m.png';

            material.uniforms.u_fogMode = FogMode.LINEAR;
            material.uniforms.u_fogColor = new Color3(1, 1, 0);
            material.uniforms.u_fogMinDistance = 2;
            material.uniforms.u_fogMaxDistance = 3;
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