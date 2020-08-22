class ColorMaterialTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var cube = feng3d.GameObject.createPrimitive("Cube");
        cube.transform.z = 3;
        scene.gameObject.addChild(cube);

        //初始化颜色材质
        var colorMaterial = cube.getComponent(feng3d.Renderable).material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color" });

        //变化旋转与颜色
        setInterval(function ()
        {
            cube.transform.ry += 1;
        }, 15);
        setInterval(function ()
        {
            (<feng3d.ColorUniforms>colorMaterial.uniforms).u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
        }, 1000);
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