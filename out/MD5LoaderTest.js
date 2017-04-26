var feng3d;
(function (feng3d) {
    class MD5LoaderTest {
        constructor() {
            this.init();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            // //变化旋转
            setInterval(function () {
                if (object) {
                    object.rotationY += 1;
                }
            }, 15);
            var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
            var md5animUrl = "resources/hellknight/idle2.md5anim";
            var scene = this.view3D.scene;
            var skeletonAnimator;
            var useMatrial = this.useMatrial;
            var md5Loader = new feng3d.MD5Loader();
            md5Loader.load(md5meshUrl, function (object3D, animator) {
                object3D.y = -100;
                object3D.rotationX = -90;
                object = object3D;
                useMatrial(object3D, "resources/hellknight/hellknight_diffuse.jpg");
                object.z = 300;
                scene.addChild(object3D);
                skeletonAnimator = animator;
                //
                md5Loader.loadAnim(md5animUrl, function (skeletonClipNode) {
                    skeletonClipNode.name = "idle2";
                    skeletonAnimator.animations.push(skeletonClipNode);
                    skeletonClipNode.looping = true;
                    skeletonAnimator.play();
                });
            });
        }
        useMatrial(object3D, imageUrl) {
            var material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = imageUrl;
            for (var i = 0; i < object3D.numChildren; i++) {
                var child = object3D.getChildAt(i);
                var model = child.getComponentByType(feng3d.Model);
                if (model) {
                    model.material = material;
                }
            }
        }
    }
    feng3d.MD5LoaderTest = MD5LoaderTest;
    var object;
})(feng3d || (feng3d = {}));
new feng3d.MD5LoaderTest();
//# sourceMappingURL=MD5LoaderTest.js.map