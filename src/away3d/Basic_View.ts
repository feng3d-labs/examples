class Basic_View extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");


        camera.transform.z = -6;
        camera.transform.y = 5;
        camera.transform.lookAt(new feng3d.Vector3());

        var plane = feng3d.GameObject.create();
        var model = plane.addComponent(feng3d.MeshRenderer);
        model.geometry = new feng3d.PlaneGeometry({ width: 7, height: 7 });
        var material = model.material = feng3d.materialFactory.create("standard");
        material.uniforms.s_diffuse.url = "resources/floor_diffuse.jpg";
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