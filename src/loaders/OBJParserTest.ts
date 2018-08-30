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

        var material = new feng3d.StandardMaterial();
        material.uniforms.s_diffuse.url = "resources/head_diffuse.jpg";
        material.uniforms.s_normal.url = "resources/head_normals.jpg";
        material.uniforms.s_specular.url = "resources/head_specular.jpg";
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

            var models = gameObject.getComponentsInChildren(feng3d.Model);
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