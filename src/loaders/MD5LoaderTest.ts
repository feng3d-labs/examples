class MD5LoaderTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");

        var object: feng3d.GameObject;

        var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
        var md5animUrl = "resources/hellknight/idle2.md5anim";

        camera.gameObject.transform.z = -300;

        feng3d.md5Loader.load(md5meshUrl, (gameObject) =>
        {
            object = gameObject;

            gameObject.transform.rx = -90;
            gameObject.transform.ry = -90;

            useMatrial(gameObject);

            scene.gameObject.addChild(gameObject);
            //
            feng3d.md5Loader.loadAnim(md5animUrl, (animationClip) =>
            {
                animationClip.name = "idle2";
                var animation = gameObject.addComponent("Animation");
                animation.animation = animationClip;
                animation.isplaying = true;
            });
        });

        function useMatrial(gameObject: feng3d.GameObject)
        {
            for (var i = 0; i < gameObject.numChildren; i++)
            {
                var child = gameObject.getChildAt(i);
                var model = child.getComponent("Renderable");
                if (model)
                {
                    feng3d.serialization.setValue(model.material, {
                        uniforms: {
                            s_diffuse: { __class__: "feng3d.Texture2D", source: { url: "resources/hellknight/hellknight_diffuse.jpg" } },
                            s_normal: { __class__: "feng3d.Texture2D", source: { url: "resources/hellknight/hellknight_normals.png" } },
                            s_specular: { __class__: "feng3d.Texture2D", source: { url: "resources/hellknight/hellknight_specular.png" } },
                        },
                    })
                }
            }
        }
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