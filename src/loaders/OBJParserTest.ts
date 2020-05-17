class OBJParserTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var object: feng3d.GameObject;

        // //变化旋转
        setInterval(function ()
        {
            if (object)
            {
                object.transform.ry += 1;
            }
        }, 15);

        // var objUrl = "resources/cube.obj";
        var objUrl = "resources/head.obj";

        var material = feng3d.serialization.setValue(new feng3d.Material(), {
            uniforms: {
                s_diffuse: { source: { url: "resources/head_diffuse.jpg" } },
                s_normal: { source: { url: "resources/head_normals.jpg" } },
                s_specular: { source: { url: "resources/head_specular.jpg" } },
            }
        });
        // var material = materialFactory.create("color");
        material.renderParams.cullFace = feng3d.CullFace.NONE;

        feng3d.objLoader.load(objUrl, function (gameObject: feng3d.GameObject)
        {
            object = gameObject;
            object.transform.sx = 20;
            object.transform.sy = 20;
            object.transform.sz = 20;
            object.transform.z = 300;
            scene.gameObject.addChild(gameObject);

            var models = gameObject.getComponentsInChildren(feng3d.Renderer);
            models.forEach(element =>
            {
                element.material = material;
            });
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