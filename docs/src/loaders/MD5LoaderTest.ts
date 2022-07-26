namespace examples
{
    var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent(feng3d.Scene)
    scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

    var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent(feng3d.Camera);
    camera.transform.position = new feng3d.Vector3(0, 1, -10);
    scene.gameObject.addChild(camera.gameObject);

    var engine = new feng3d.View(null, scene, camera);

    var object: feng3d.GameObject;

    var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
    var md5animUrl = "resources/hellknight/idle2.md5anim";

    camera.gameObject.transform.z = -300;

    feng3d.md5Loader.load(md5meshUrl, (gameObject) =>
    {
        object = gameObject;

        useMatrial(gameObject);

        scene.gameObject.addChild(gameObject);
        //
        feng3d.md5Loader.loadAnim(md5animUrl, (animationClip) =>
        {
            animationClip.name = "idle2";
            var animation = gameObject.addComponent(feng3d.Animation);
            animation.animation = animationClip;
            animation.isplaying = true;


            gameObject.transform.rx = -90;
            gameObject.transform.ry = -90;
            gameObject.transform.rz = -90;
        });
    });

    function useMatrial(gameObject: feng3d.GameObject)
    {
        for (var i = 0; i < gameObject.numChildren; i++)
        {
            var child = gameObject.getChildAt(i);
            var model = child.getComponent(feng3d.Renderable);
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