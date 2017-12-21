namespace feng3d
{
    var acceleration = new feng3d.Vector3D(0, -9.8, 0);
    var view3D = new Engine();
    var camera = view3D.camera;
    camera.transform.z = -500;
    camera.transform.lookAt(new Vector3D());
    camera.gameObject.addComponent(FPSController);
    //
    var scene = view3D.scene;

    var particle = GameObject.create("particle");
    var meshRenderer = particle.addComponent(MeshRenderer);
    meshRenderer.geometry = new PointGeometry();
    var material = meshRenderer.material = new StandardMaterial();
    material.renderMode = RenderMode.POINTS;
    particle.transform.y = -100;
    scene.gameObject.addChild(particle);

    var particleAnimator = particle.addComponent(ParticleAnimator);
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
            particle.color = new Color(1, 0, 0, 1).mix(new Color(0, 1, 0, 1), particle.index / particle.total);
        }, priority: 0
    });
    particleAnimator.isPlaying = true;
}
