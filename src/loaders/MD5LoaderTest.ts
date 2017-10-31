module feng3d
{
    var view3D = new Engine();
    var object: GameObject;

    var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
    var md5animUrl = "resources/hellknight/idle2.md5anim";
    var scene = view3D.scene;

    view3D.camera.gameObject.transform.z = -300;

    MD5Loader.load(md5meshUrl, (object3D) =>
    {
        object = object3D;

        object3D.transform.rx = -90;
        object3D.transform.ry = -90;

        useMatrial(object3D);

        scene.gameObject.addChild(object3D);
        //
        MD5Loader.loadAnim(md5animUrl, (animationClip) =>
        {
            animationClip.name = "idle2";
            var animation = object3D.addComponent(Animation);
            animation.animation = animationClip;
            animation.isplaying = true;
        });
    });

    function useMatrial(object3D: GameObject)
    {
        for (var i = 0; i < object3D.numChildren; i++)
        {
            var child = object3D.getChildAt(i);
            var model = child.getComponent(MeshRenderer);
            if (model)
            {
                var material = <StandardMaterial>model.material;
                material.diffuseMethod.difuseTexture.url = "resources/hellknight/hellknight_diffuse.jpg";
                material.normalMethod.normalTexture.url = "resources/hellknight/hellknight_normals.png";
                material.specularMethod.specularTexture.url = "resources/hellknight/hellknight_specular.png";
            }
        }
    }
}