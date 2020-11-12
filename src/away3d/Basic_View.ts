class Basic_View extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");


        camera.transform.z = -6;
        camera.transform.y = 5;
        camera.transform.lookAt(new feng3d.Vector3());

        var plane = new feng3d.GameObject();
        var model = plane.addComponent("Renderable");
        model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 7, height: 7 });
        var material = model.material = feng3d.serialization.setValue(new feng3d.Material(), { uniforms: { s_diffuse: { __class__: "feng3d.Texture2D", source: { url: "resources/floor_diffuse.jpg" } } } });
        scene.gameObject.addChild(plane);

        feng3d.ticker.onframe(() =>
        {
            plane.transform.ry += 1;
        });
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