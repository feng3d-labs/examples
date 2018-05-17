class Basic_Particles extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var _particleMesh: feng3d.GameObject;

        camera.transform.x = 10;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);

        // _particleAnimationSet = new ParticleAnimationSet(true, true);
        // _particleAnimationSet["addAnimation"](new ParticleBillboardNode());
        // _particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
        // _particleAnimationSet["initParticleFunc"] = flash.bind(initParticleFunc, this);

        _particleMesh = feng3d.GameObject.create("particle");
        // _particleMesh.geometry = new PointGeometry();
        var particleSystem = _particleMesh.addComponent(feng3d.ParticleSystem);
        particleSystem.geometry = new feng3d.PlaneGeometry({ width: 0.10, height: 0.10, segmentsH: 1, segmentsW: 1, yUp: false });
        particleSystem.material = feng3d.materialFactory.create("particle", {
            uniforms: {
                s_diffuse: {
                    url: "resources/blue.png", format: feng3d.TextureFormat.RGBA
                }
            },
            renderParams: { enableBlend: true }
        });

        particleSystem.numParticles = 20000;
        //通过函数来创建粒子初始状态
        particleSystem.generateFunctions.push({
            generate: (particle) =>
            {
                particle.birthTime = Math.random() * 5 - 5;
                particle.lifetime = 5;
                var degree1 = Math.random() * Math.PI;
                var degree2 = Math.random() * Math.PI * 2;
                var r = Math.random() * 0.50 + 4;
                particle.velocity = new feng3d.Vector3(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
            }, priority: 0
        });
        particleSystem.animations.billboard.enable = true;
        particleSystem.animations.billboard.camera = camera.getComponent(feng3d.Camera);
        particleSystem.cycle = 10;
        scene.gameObject.addChild(_particleMesh);
    }
    /**
     * 更新
     */
    update()
    {
    }

    /**
    * 销毁时调用
    */
    dispose()
    {

    }
}