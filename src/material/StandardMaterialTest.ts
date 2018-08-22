class StandardMaterialTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var cube = new feng3d.GameObject();
        cube.transform.z = 3;
        cube.transform.y = -1;
        scene.gameObject.addChild(cube);

        //变化旋转与颜色
        setInterval(function ()
        {
            cube.transform.ry += 1;
        }, 15);

        var model = cube.addComponent(feng3d.Model);
        model.geometry = new feng3d.CubeGeometry().value({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        // model.geometry = new PlaneGeometry();
        //材质
        var textureMaterial = model.material = new feng3d.StandardMaterial();
        textureMaterial.uniforms.s_diffuse.url = 'resources/m.png';
        // textureMaterial.uniforms.s_diffuse.url = 'resources/nonpowerof2.png';
        textureMaterial.uniforms.s_diffuse.format = feng3d.TextureFormat.RGBA;
        // textureMaterial.diffuseMethod.alphaThreshold = 0.1;

        textureMaterial.uniforms.s_diffuse.anisotropy = 16;

        textureMaterial.renderParams.enableBlend = true;
        textureMaterial.uniforms.u_diffuse.a = 0.2;
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