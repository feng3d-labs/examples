var feng3d;
(function (feng3d) {
    var view3D;
    var _cameraController;
    var _particleMesh;
    var _move = false;
    var _lastPanAngle = NaN;
    var _lastTiltAngle = NaN;
    var _lastMouseX = NaN;
    var _lastMouseY = NaN;
    view3D = new feng3d.Engine();
    _cameraController = new feng3d.HoverController(view3D.camera.gameObject, null, 45, 20, 1000);
    // _particleAnimationSet = new ParticleAnimationSet(true, true);
    // _particleAnimationSet["addAnimation"](new ParticleBillboardNode());
    // _particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
    // _particleAnimationSet["initParticleFunc"] = flash.bind(initParticleFunc, this);
    _particleMesh = feng3d.GameObject.create("particle");
    // _particleMesh.geometry = new PointGeometry();
    _particleMesh.addComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(10, 10, 1, 1, false);
    var material = _particleMesh.addComponent(feng3d.MeshRenderer).material = new feng3d.StandardMaterial("resources/blue.png");
    material.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
    material.enableBlend = true;
    var particleAnimationSet = new feng3d.ParticleAnimationSet();
    particleAnimationSet.numParticles = 20000;
    //通过函数来创建粒子初始状态
    particleAnimationSet.generateFunctions.push({
        generate: function (particle) {
            particle.birthTime = Math.random() * 5 - 5;
            particle.lifetime = 5;
            var degree1 = Math.random() * Math.PI;
            var degree2 = Math.random() * Math.PI * 2;
            var r = Math.random() * 50 + 400;
            particle.velocity = new feng3d.Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
        }, priority: 0
    });
    particleAnimationSet.addAnimation(new feng3d.ParticleBillboard(view3D.camera.getComponent(feng3d.Camera)));
    var particleAnimator = _particleMesh.addComponent(feng3d.ParticleAnimator);
    particleAnimator.animatorSet = particleAnimationSet;
    particleAnimator.cycle = 10;
    particleAnimator.play();
    view3D.scene.transform.addChild(_particleMesh.transform);
    feng3d.ticker.on("enterFrame", onEnterFrame);
    feng3d.input.on("mousedown", onMouseDown);
    feng3d.input.on("mouseup", onMouseUp);
    function onEnterFrame(event) {
        if (_move) {
            _cameraController["panAngle"] = 0.3 * (feng3d.input.clientX - view3D.canvas.clientLeft - _lastMouseX) + _lastPanAngle;
            _cameraController["tiltAngle"] = 0.3 * (feng3d.input.clientY - view3D.canvas.clientTop - _lastMouseY) + _lastTiltAngle;
        }
    }
    function onMouseDown(event) {
        _lastPanAngle = _cameraController["panAngle"];
        _lastTiltAngle = _cameraController["tiltAngle"];
        _lastMouseX = feng3d.input.clientX - view3D.canvas.clientLeft;
        _lastMouseY = feng3d.input.clientY - view3D.canvas.clientTop;
        _move = true;
    }
    function onMouseUp(event) {
        _move = false;
    }
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_Particles.js.map