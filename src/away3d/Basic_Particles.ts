module feng3d
{
    var view3D: Engine;
    var _particleMesh: GameObject;

    view3D = new Engine();
    var camera = view3D.camera;
    camera.transform.x = 1000;
    camera.transform.lookAt(new Vector3D());
    camera.gameObject.addComponent(FPSController);

    // _particleAnimationSet = new ParticleAnimationSet(true, true);
    // _particleAnimationSet["addAnimation"](new ParticleBillboardNode());
    // _particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
    // _particleAnimationSet["initParticleFunc"] = flash.bind(initParticleFunc, this);

    _particleMesh = GameObject.create("particle");
    // _particleMesh.geometry = new PointGeometry();
    var meshRenderer = _particleMesh.addComponent(MeshRenderer);
    meshRenderer.geometry = new PlaneGeometry(10, 10, 1, 1, false);
    var material = meshRenderer.material = new StandardMaterial("resources/blue.png");
    material.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
    material.enableBlend = true;

    var particleAnimationSet = new ParticleAnimationSet();
    particleAnimationSet.numParticles = 20000;
    //通过函数来创建粒子初始状态
    particleAnimationSet.generateFunctions.push({
        generate: (particle) =>
        {
            particle.birthTime = Math.random() * 5 - 5;
            particle.lifetime = 5;
            var degree1 = Math.random() * Math.PI;
            var degree2 = Math.random() * Math.PI * 2;
            var r = Math.random() * 50 + 400;
            particle.velocity = new Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
        }, priority: 0
    });
    particleAnimationSet.addAnimation(new ParticleBillboard(view3D.camera.getComponent(Camera)));
    var particleAnimator = _particleMesh.addComponent(ParticleAnimator);
    particleAnimator.animatorSet = particleAnimationSet;
    particleAnimator.cycle = 10;
    view3D.scene.gameObject.addChild(_particleMesh);
}