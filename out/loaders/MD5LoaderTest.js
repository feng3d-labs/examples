var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var object;
    var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
    var md5animUrl = "resources/hellknight/idle2.md5anim";
    var scene = view3D.scene;
    view3D.camera.gameObject.transform.z = -300;
    feng3d.MD5Loader.load(md5meshUrl, function (gameObject) {
        object = gameObject;
        gameObject.transform.rx = -90;
        gameObject.transform.ry = -90;
        useMatrial(gameObject);
        scene.gameObject.addChild(gameObject);
        //
        feng3d.MD5Loader.loadAnim(md5animUrl, function (animationClip) {
            animationClip.name = "idle2";
            var animation = gameObject.addComponent(feng3d.Animation);
            animation.animation = animationClip;
            animation.isplaying = true;
        });
    });
    function useMatrial(gameObject) {
        for (var i = 0; i < gameObject.numChildren; i++) {
            var child = gameObject.getChildAt(i);
            var model = child.getComponent(feng3d.MeshRenderer);
            if (model) {
                var material = model.material;
                material.diffuseMethod.difuseTexture.url = "resources/hellknight/hellknight_diffuse.jpg";
                material.normalMethod.normalTexture.url = "resources/hellknight/hellknight_normals.png";
                material.specularMethod.specularTexture.url = "resources/hellknight/hellknight_specular.png";
            }
        }
    }
})(feng3d || (feng3d = {}));
//# sourceMappingURL=MD5LoaderTest.js.map