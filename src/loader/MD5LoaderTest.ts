namespace feng3d
{
    var view3D = new Engine();
    var object: GameObject;

    // //变化旋转
    setInterval(function ()
    {
        if (object)
        {
            object.transform.ry += 1;
        }
    }, 15);

    var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
    var md5animUrl = "resources/hellknight/idle2.md5anim";
    var scene = view3D.scene;
    var skeletonAnimator: SkeletonAnimator

    //初始化光源
    var light1 = GameObject.create();
    var pointLight1 = light1.addComponent(PointLight);
    pointLight1.color = new Color(0, 1, 0, 1);
    scene.gameObject.addChild(light1);

    MD5Loader.load(md5meshUrl, (object3D, animator) =>
    {

        object3D.transform.y = -100;
        object3D.transform.rx = -90;

        object = object3D;

        useMatrial(object3D, "resources/hellknight/hellknight_diffuse.jpg");

        object.transform.z = 300;
        scene.gameObject.addChild(object3D);
        skeletonAnimator = animator;
        //
        MD5Loader.loadAnim(md5animUrl, (skeletonClipNode) =>
        {
            skeletonClipNode.name = "idle2";
            skeletonAnimator.animations.push(skeletonClipNode);
            skeletonClipNode.looping = true;
            skeletonAnimator.play();
        });
    });

    function useMatrial(object3D: GameObject, imageUrl: string)
    {
        var material = new StandardMaterial();
        material.diffuseMethod.difuseTexture.url = imageUrl;

        for (var i = 0; i < object3D.numChildren; i++)
        {
            var child = object3D.getChildAt(i);
            var model = child.getComponent(MeshRenderer);
            if (model)
            {
                model.material = material;
            }
        }
    }
}