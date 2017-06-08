namespace feng3d
{
    export class ParticleAnimatorTest
    {
        view3D: View3D;
        controller: FPSController;
        cameraObj: GameObject;

        constructor()
        {
            this.init();

            this.cameraObj = this.view3D.camera;
            this.cameraObj.transform.z = -500;
            this.cameraObj.transform.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.view3D.camera);
        }

        init()
        {
            this.view3D = new View3D();

            var scene = this.view3D.scene;

            var particle = new GameObject("particle");
            particle.getOrCreateComponentByClass(MeshFilter).mesh = new PointGeometry();
            var material = particle.getOrCreateComponentByClass(MeshRenderer).material = new StandardMaterial();
            material.renderMode = RenderMode.POINTS;
            particle.transform.y = -100;
            scene.addChild(particle.transform);

            var particleAnimator = particle.getOrCreateComponentByClass(ParticleAnimator);
            particleAnimator.cycle = 10;
            particleAnimator.numParticles = 1000;
            //发射组件
            var emission = new ParticleEmission();
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
            particleAnimator.addAnimation(emission);
            particleAnimator.addAnimation(new ParticlePosition());
            particleAnimator.addAnimation(new ParticleVelocity());
            particleAnimator.setGlobal("acceleration", () => acceleration);
            //通过函数来创建粒子初始状态
            particleAnimator.generateFunctions.push({
                generate: (particle) =>
                {
                    particle.color = new Color(1, 0, 0, 1).mix(new Color(0, 1, 0, 1), particle.index / particle.total);
                }, priority: 0
            });
            particleAnimator.play();
        }
    }
    export var acceleration = new feng3d.Vector3D(0, -9.8, 0);
}
