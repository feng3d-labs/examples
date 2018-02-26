namespace feng3d
{
    var view3D: Engine;
    var _particleMesh: GameObject;

    view3D = new Engine();
    var camera = view3D.camera;
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
    var material = meshRenderer.material = new StandardMaterial("resources/blue.png");
    material.diffuseMethod.difuseTexture.format = TextureFormat.RGBA;
    material.enableBlend = true;
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
    particleAnimator.animations.billboard.camera = view3D.camera.getComponent(Camera);
    particleAnimator.cycle = 10;
    view3D.scene.gameObject.addChild(_particleMesh);
}