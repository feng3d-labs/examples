namespace feng3d
{
    export class ParticleAnimatorTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];

            var acceleration = new feng3d.Vector3(0, -9.8, 0);
            camera.transform.z = -5;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.gameObject.addComponent(feng3d.FPSController);

            var particle = feng3d.GameObject.create("particle");
            var meshRenderer = particle.addComponent(feng3d.MeshRenderer);
            meshRenderer.geometry = new feng3d.PointGeometry();
            var material = meshRenderer.material = new feng3d.StandardMaterial();
            material.renderMode = feng3d.RenderMode.POINTS;
            particle.transform.y = -1;
            scene.gameObject.addChild(particle);

            var particleAnimator = particle.addComponent(feng3d.ParticleAnimator);
            particleAnimator.cycle = 10;
            particleAnimator.numParticles = 1000;
            //发射组件
            var emission = particleAnimator.animations.emission;
            //每秒发射数量
            emission.rate = 50;
            //批量发射
            emission.bursts.push(
                { time: 1, particles: 100 },
                { time: 2, particles: 100 },
                { time: 3, particles: 100 },
                { time: 4, particles: 100 },
                { time: 5, particles: 100 },
            );
            //通过组件来创建粒子初始状态
            particleAnimator.animations.position.enable = true;
            particleAnimator.animations.velocity.enable = true;
            particleAnimator.particleGlobal.acceleration = acceleration;
            //通过函数来创建粒子初始状态
            particleAnimator.generateFunctions.push({
                generate: (particle) =>
                {
                    particle.color = new feng3d.Color(1, 0, 0, 1).mix(new feng3d.Color(0, 1, 0, 1), particle.index / particle.total);
                }, priority: 0
            });
            particleAnimator.isPlaying = true;
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