var feng3d;
(function (feng3d) {
    var acceleration = new feng3d.Vector3D(0, -9.8, 0);
    var view3D = new feng3d.Engine();
    var camera = view3D.camera;
    camera.transform.z = -500;
    camera.transform.lookAt(new feng3d.Vector3D());
    camera.gameObject.addComponent(feng3d.FPSController);
    //
    var scene = view3D.scene;
    var particle = feng3d.GameObject.create("particle");
    particle.addComponent(feng3d.MeshFilter).mesh = new feng3d.PointGeometry();
    var material = particle.addComponent(feng3d.MeshRenderer).material = new feng3d.StandardMaterial();
    material.renderMode = feng3d.RenderMode.POINTS;
    particle.transform.y = -100;
    scene.transform.addChild(particle.transform);
    var particleAnimator = particle.addComponent(feng3d.ParticleAnimator);
    particleAnimator.cycle = 10;
    var particleAnimatorSet = particleAnimator.animatorSet = new feng3d.ParticleAnimationSet();
    particleAnimatorSet.numParticles = 1000;
    //发射组件
    var emission = new feng3d.ParticleEmission();
    //每秒发射数量
    emission.rate = 50;
    //批量发射
    emission.bursts.push({ time: 1, particles: 100 }, { time: 2, particles: 100 }, { time: 3, particles: 100 }, { time: 4, particles: 100 }, { time: 5, particles: 100 });
    //通过组件来创建粒子初始状态
    particleAnimatorSet.addAnimation(emission);
    particleAnimatorSet.addAnimation(new feng3d.ParticlePosition());
    particleAnimatorSet.addAnimation(new feng3d.ParticleVelocity());
    particleAnimatorSet.setGlobal("acceleration", function () { return acceleration; });
    //通过函数来创建粒子初始状态
    particleAnimatorSet.generateFunctions.push({
        generate: function (particle) {
            particle.color = new feng3d.Color(1, 0, 0, 1).mix(new feng3d.Color(0, 1, 0, 1), particle.index / particle.total);
        }, priority: 0
    });
    particleAnimator.play();
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ParticleAnimatorTest.js.map