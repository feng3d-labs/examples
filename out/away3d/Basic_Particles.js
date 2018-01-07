var feng3d;
(function (feng3d) {
    var view3D;
    var _particleMesh;
    view3D = new feng3d.Engine();
    var camera = view3D.camera;
    camera.transform.x = 10;
    camera.transform.lookAt(new feng3d.Vector3D());
    camera.gameObject.addComponent(feng3d.FPSController);
    // _particleAnimationSet = new ParticleAnimationSet(true, true);
    // _particleAnimationSet["addAnimation"](new ParticleBillboardNode());
    // _particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
    // _particleAnimationSet["initParticleFunc"] = flash.bind(initParticleFunc, this);
    _particleMesh = feng3d.GameObject.create("particle");
    // _particleMesh.geometry = new PointGeometry();
    var meshRenderer = _particleMesh.addComponent(feng3d.MeshRenderer);
    meshRenderer.geometry = new feng3d.PlaneGeometry(0.10, 0.10, 1, 1, false);
    var material = meshRenderer.material = new feng3d.StandardMaterial("resources/blue.png");
    material.diffuseMethod.difuseTexture.format = feng3d.TextureFormat.RGBA;
    material.enableBlend = true;
    var particleAnimator = _particleMesh.addComponent(feng3d.ParticleAnimator);
    particleAnimator.numParticles = 20000;
    //通过函数来创建粒子初始状态
    particleAnimator.generateFunctions.push({
        generate: function (particle) {
            particle.birthTime = Math.random() * 5 - 5;
            particle.lifetime = 5;
            var degree1 = Math.random() * Math.PI;
            var degree2 = Math.random() * Math.PI * 2;
            var r = Math.random() * 0.50 + 4;
            particle.velocity = new feng3d.Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
        }, priority: 0
    });
    particleAnimator.animations.billboard.enable = true;
    particleAnimator.animations.billboard.camera = view3D.camera.getComponent(feng3d.Camera);
    particleAnimator.cycle = 10;
    view3D.scene.gameObject.addChild(_particleMesh);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_Particles.js.map