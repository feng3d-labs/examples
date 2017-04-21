module feng3d
{
    export class MD5LoaderTest
    {
        view3D: View3D;

        constructor()
        {

            this.init();
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            // //变化旋转
            setInterval(function ()
            {
                if (object)
                {
                    object.rotationY += 1;
                }
            }, 15);

            var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
            var md5animUrl = "resources/hellknight/idle2.md5anim";
            var scene = this.view3D.scene;
            var skeletonAnimator: SkeletonAnimator
            var useMatrial = this.useMatrial;

            var md5Loader = new MD5Loader();
            md5Loader.load(md5meshUrl, function (object3D: GameObject, animator: SkeletonAnimator)
            {

                object3D.y = -100;
                object3D.rotationX = -90;

                object = object3D;

                useMatrial(object3D, "resources/hellknight/hellknight_diffuse.jpg");

                object.z = 300;
                scene.addChild(object3D);
                skeletonAnimator = animator;
                //
                md5Loader.loadAnim(md5animUrl, function (skeletonClipNode: SkeletonClipNode)
                {
                    skeletonClipNode.name = "idle2";
                    skeletonAnimator.animations.push(skeletonClipNode);
                    skeletonClipNode.looping = true;
                    skeletonAnimator.play();
                });
            });
        }

        private useMatrial(object3D: GameObject, imageUrl: string)
        {
            var material = new SkeletonAnimatorMaterial();
            material.texture = new Texture2D(imageUrl);

            for (var i = 0; i < object3D.numChildren; i++)
            {
                var child = object3D.getChildAt(i);
                var model = child.getComponentByType(Model);
                if (model)
                {
                    model.material = material;
                }
            }
        }
    }
    var object: Object3D;
}

new feng3d.MD5LoaderTest();