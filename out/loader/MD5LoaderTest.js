var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var object;
    // //变化旋转
    setInterval(function () {
        if (object) {
            object.transform.ry += 1;
        }
    }, 15);
    var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
    var md5animUrl = "resources/hellknight/idle2.md5anim";
    var scene = view3D.scene;
    var skeletonAnimator;
    //初始化光源
    var light1 = feng3d.GameObject.create();
    var pointLight1 = light1.addComponent(feng3d.PointLight);
    pointLight1.color = new feng3d.Color(0, 1, 0, 1);
    scene.transform.addChild(light1.transform);
    feng3d.MD5Loader.load(md5meshUrl, function (object3D, animator) {
        object3D.transform.y = -100;
        object3D.transform.rx = -90;
        object = object3D;
        useMatrial(object3D, "resources/hellknight/hellknight_diffuse.jpg");
        object.transform.z = 300;
        scene.transform.addChild(object3D.transform);
        skeletonAnimator = animator;
        //
        feng3d.MD5Loader.loadAnim(md5animUrl, function (skeletonClipNode) {
            skeletonClipNode.name = "idle2";
            skeletonAnimator.animations.push(skeletonClipNode);
            skeletonClipNode.looping = true;
            skeletonAnimator.play();
        });
    });
    function useMatrial(object3D, imageUrl) {
        var material = new feng3d.StandardMaterial();
        material.diffuseMethod.difuseTexture.url = imageUrl;
        for (var i = 0; i < object3D.transform.numChildren; i++) {
            var child = object3D.transform.getChildAt(i);
            var model = child.getComponent(feng3d.MeshRenderer);
            if (model) {
                model.material = material;
            }
        }
    }
})(feng3d || (feng3d = {}));
//# sourceMappingURL=MD5LoaderTest.js.map