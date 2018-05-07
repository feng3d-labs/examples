namespace feng3d
{

    export class Basic_Particles extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");

            var _particleMesh: GameObject;

            camera.transform.x = 10;
            camera.transform.lookAt(new Vector3());
            camera.gameObject.addComponent(FPSController);

            // _particleAnimationSet = new ParticleAnimationSet(true, true);
            // _particleAnimationSet["addAnimation"](new ParticleBillboardNode());
            // _particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
            // _particleAnimationSet["initParticleFunc"] = flash.bind(initParticleFunc, this);

            _particleMesh = GameObject.create("particle");
            // _particleMesh.geometry = new PointGeometry();
            var meshRenderer = _particleMesh.addComponent(MeshRenderer);
            meshRenderer.geometry = new PlaneGeometry(0.10, 0.10, 1, 1, false);
            var material = meshRenderer.material = materialFactory.create("standard");
            material.uniforms.s_diffuse.url = "resources/blue.png";
            material.uniforms.s_diffuse.format = TextureFormat.RGBA;
            material.renderParams.enableBlend = true;
            var particleAnimator = _particleMesh.addComponent(ParticleAnimator);

            particleAnimator.numParticles = 20000;
            //通过函数来创建粒子初始状态
            particleAnimator.generateFunctions.push({
                generate: (particle) =>
                {
                    particle.birthTime = Math.random() * 5 - 5;
                    particle.lifetime = 5;
                    var degree1 = Math.random() * Math.PI;
                    var degree2 = Math.random() * Math.PI * 2;
                    var r = Math.random() * 0.50 + 4;
                    particle.velocity = new Vector3(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
                }, priority: 0
            });
            particleAnimator.animations.billboard.enable = true;
            particleAnimator.animations.billboard.camera = camera.getComponent(Camera);
            particleAnimator.cycle = 10;
            scene.gameObject.addChild(_particleMesh);
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
}