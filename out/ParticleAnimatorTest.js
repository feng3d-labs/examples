var feng3d;
(function (feng3d) {
    class ParticleAnimatorTest {
        constructor() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.transform.position.z = -500;
            this.cameraObj.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        onMousedown() {
            this.controller.target = this.cameraObj.transform;
        }
        onMouseup() {
            this.controller.target = null;
        }
        process() {
            this.controller.update();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene = this.view3D.scene;
            var particle = new feng3d.Object3D("particle");
            particle.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.PointGeometry();
            particle.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ParticleMaterial();
            particle.transform.position.y = -100;
            scene.addChild(particle);
            var particleAnimator = particle.getOrCreateComponentByClass(feng3d.ParticleAnimator);
            particleAnimator.cycle = 10;
            particleAnimator.numParticles = 1000;
            //发射组件
            var emission = new feng3d.ParticleEmission();
            //每秒发射数量
            emission.rate = 50;
            //批量发射
            emission.bursts.push({ time: 1, particles: 100 }, { time: 2, particles: 100 }, { time: 3, particles: 100 }, { time: 4, particles: 100 }, { time: 5, particles: 100 });
            //通过组件来创建粒子初始状态
            particleAnimator.addComponent(emission);
            particleAnimator.addComponent(new feng3d.ParticlePosition());
            particleAnimator.addComponent(new feng3d.ParticleVelocity());
            particleAnimator.particleGlobal.acceleration = new feng3d.Vector3D(0, -9.8, 0);
            //通过函数来创建粒子初始状态
            particleAnimator.generateFunctions.push({
                generate: (particle) => {
                    particle.color = new feng3d.Color(1, 0, 0, 1).mix(new feng3d.Color(0, 1, 0, 1), particle.index / particle.total);
                }, priority: 0
            });
        }
    }
    feng3d.ParticleAnimatorTest = ParticleAnimatorTest;
})(feng3d || (feng3d = {}));
new feng3d.ParticleAnimatorTest();
//# sourceMappingURL=ParticleAnimatorTest.js.map