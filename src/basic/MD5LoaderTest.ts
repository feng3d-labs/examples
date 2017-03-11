module feng3d {
    export class MD5LoaderTest {
        view3D: View3D;

        constructor() {

            this.init();
        }

        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            // //变化旋转
            setInterval(function () {
                if (object) {
                    object.transform.rotation.y += 1;
                }
            }, 15);

            var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
            var md5animUrl = "resources/hellknight/idle2.md5anim";
            var scene = this.view3D.scene;
            var skeletonAnimator: SkeletonAnimator
            var useMatrial = this.useMatrial;

            var image = new Image();
            image.onload = function () {

                var md5Loader = new MD5Loader();
                md5Loader.load(md5meshUrl, function (object3D: Object3D, animator: SkeletonAnimator) {

                    object3D.transform.position.y = -100;
                    object3D.transform.rotation.x = -90;

                    object = object3D;

                    useMatrial(object3D, image);

                    object.transform.position.z = 300;
                    skeletonAnimator = animator;
                    //
                    md5Loader.loadAnim(md5animUrl, function (skeletonClipNode: SkeletonClipNode) {
                        skeletonClipNode.name = "idle2";
                        skeletonAnimator.animations.push(skeletonClipNode);
                        skeletonClipNode.looping = true;
                        skeletonAnimator.play();
                        scene.addChild(object3D);
                    });
                });
            };
            image.src = "resources/hellknight/hellknight_diffuse.jpg"

        }

        private useMatrial(object3D: Object3D, image: HTMLImageElement) {

            var material = new SkeletonAnimatorMaterial();
            material.texture = new Texture2D(image);

            for (var i = 0; i < object3D.numChildren; i++) {

                var child = object3D.getChildAt(i);
                var meshRenderer = child.getComponentByClass(MeshRenderer);
                if (meshRenderer) {
                    meshRenderer.material = material;
                }
            }

        }

    }
    var object: Object3D;
}

new feng3d.MD5LoaderTest();