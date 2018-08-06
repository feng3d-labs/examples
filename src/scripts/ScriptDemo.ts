class ScriptDemo extends feng3d.Script
{
    cube: feng3d.GameObject;

    init()
    {
        var cube = this.cube = feng3d.GameObject.create();
        cube.transform.z = -7;
        this.gameObject.addChild(cube);

        var model = cube.addComponent(feng3d.Model);
        model.geometry = new feng3d.CubeGeometry({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        //材质
        var material = model.material = feng3d.materialFactory.create("standard");
        material.uniforms.s_diffuse.url = 'resources/m.png';

        material.uniforms.u_fogMode = feng3d.FogMode.LINEAR;
        material.uniforms.u_fogColor = new feng3d.Color3(1, 1, 0);
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