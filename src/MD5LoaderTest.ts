namespace feng3d
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
            
            this.view3D = new View3D();

            // //变化旋转
            setInterval(function ()
            {
                if (object)
                {
                    object.transform.rotationY += 1;
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

                object3D.transform.y = -100;
                object3D.transform.rotationX = -90;

                object = object3D;

                useMatrial(object3D, "resources/hellknight/hellknight_diffuse.jpg");

                object.transform.z = 300;
                scene.addChild(object3D.transform);
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

            //初始化光源
            var light1 = new GameObject();
            var pointLight1 = new PointLight();
            pointLight1.color = new Color(0, 1, 0, 1);
            light1.addComponent(pointLight1);
            scene.addChild(light1.transform);
        }

        private useMatrial(object3D: GameObject, imageUrl: string)
        {
            var material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = imageUrl;

            for (var i = 0; i < object3D.transform.childCount; i++)
            {
                var child = object3D.transform.getChildAt(i);
                var model = child.getComponent(MeshRenderer);
                if (model)
                {
                    model.material = material;
                }
            }
        }
    }
    var object: GameObject;
}