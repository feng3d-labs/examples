module feng3d
{
    export class ParticleAnimatorTest
    {
        view3D: View3D;
        controller: FPSController;
        cameraObj: Object3D;

        constructor()
        {

            this.init();

            this.cameraObj = new Object3D("camera");
            this.cameraObj.transform.position.z = -500;
            this.cameraObj.transform.lookAt(new Vector3D());
            this.cameraObj.addComponent(this.view3D.camera);
            //
            this.controller = new FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);


            input.addEventListener("mousedown", this.onMousedown, this);
            input.addEventListener("mouseup", this.onMouseup, this);
        }

        private onMousedown()
        {

            this.controller.target = this.cameraObj.transform;
        }

        private onMouseup()
        {

            this.controller.target = null;
        }

        process()
        {

            this.controller.update();
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var scene = this.view3D.scene;

            var particle = new Object3D("particle");
            particle.getOrCreateComponentByClass(Model).geometry = new PointGeometry();
            particle.getOrCreateComponentByClass(Model).material = new ParticleMaterial();
            particle.transform.position.y = -100;
            scene.addChild(particle);

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
            particleAnimator.addComponent(emission);
            particleAnimator.addComponent(new ParticlePosition());
            particleAnimator.addComponent(new ParticleVelocity());
            particleAnimator.particleGlobal.acceleration = new Vector3D(0, -9.8, 0);
            //通过函数来创建粒子初始状态
            particleAnimator.generateFunctions.push({
                generate: (particle) =>
                {
                    particle.color = new Color(1, 0, 0, 1).mix(new Color(0, 1, 0, 1), particle.index / particle.total);
                }, priority: 0
            });
        }
    }
}

new feng3d.ParticleAnimatorTest();