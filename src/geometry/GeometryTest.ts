class GeometryTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var gameobject = new feng3d.GameObject();
        var model = gameobject.addComponent(feng3d.Renderable);

        var geometry = model.geometry = new feng3d.CustomGeometry();
        geometry.addGeometry(new feng3d.PlaneGeometry());
        var matrix = new feng3d.Matrix4x4();
        matrix.appendTranslation(0, 0.50, 0);
        geometry.addGeometry(feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 50 }), matrix);

        matrix.appendTranslation(0, 0.50, 0);
        var addGeometry = new feng3d.CubeGeometry();
        geometry.addGeometry(addGeometry, matrix);

        addGeometry.width = 0.50;
        matrix.appendTranslation(0, 0.50, 0);
        matrix.appendRotation(feng3d.Vector3.Z_AXIS, 45);
        geometry.addGeometry(addGeometry, matrix);

        gameobject.transform.z = 3;
        gameobject.transform.y = -1;
        scene.gameObject.addChild(gameobject);

        //初始化颜色材质
        model.material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color" });
        var colorUniforms = <feng3d.ColorUniforms>model.material.uniforms;

        //变化旋转与颜色
        setInterval(function ()
        {
            gameobject.transform.ry += 1;
        }, 15);
        setInterval(function ()
        {
            colorUniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
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