namespace feng3d
{
    var view3D: Engine;
    var _cameraController: HoverController;
    var _particleMesh: GameObject;
    var _move = false;
    var _lastPanAngle = NaN;
    var _lastTiltAngle = NaN;
    var _lastMouseX = NaN;
    var _lastMouseY = NaN;

    view3D = new Engine();

    _cameraController = new HoverController(view3D.camera.gameObject, null, 45, 20, 1000);

    // _particleAnimationSet = new ParticleAnimationSet(true, true);
    // _particleAnimationSet["addAnimation"](new ParticleBillboardNode());
    // _particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
    // _particleAnimationSet["initParticleFunc"] = flash.bind(initParticleFunc, this);

    _particleMesh = GameObject.create("particle");
    // _particleMesh.geometry = new PointGeometry();
    _particleMesh.addComponent(MeshFilter).mesh = new PlaneGeometry(10, 10, 1, 1, false);
    var material = _particleMesh.addComponent(MeshRenderer).material = new StandardMaterial("resources/blue.png");
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
    particleAnimator.play();
    view3D.scene.gameObject.addChild(_particleMesh);

    ticker.on("enterFrame", onEnterFrame);
    input.on("mousedown", onMouseDown);
    input.on("mouseup", onMouseUp);

    function onEnterFrame(event: InputEvent)
    {
        if (_move)
        {
            _cameraController["panAngle"] = 0.3 * (input.clientX - view3D.canvas.clientLeft - _lastMouseX) + _lastPanAngle;
            _cameraController["tiltAngle"] = 0.3 * (input.clientY - view3D.canvas.clientTop - _lastMouseY) + _lastTiltAngle;
        }
    }

    function onMouseDown(event: InputEvent)
    {
        _lastPanAngle = _cameraController["panAngle"];
        _lastTiltAngle = _cameraController["tiltAngle"];
        _lastMouseX = input.clientX - view3D.canvas.clientLeft;
        _lastMouseY = input.clientY - view3D.canvas.clientTop;
        _move = true;
    }

    function onMouseUp(event: InputEvent)
    {
        _move = false;
    }

}