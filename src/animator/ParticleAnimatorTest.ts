class ParticleAnimatorTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];

        var acceleration = new feng3d.Vector3(0, -9.8, 0);
        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);

        var particle = feng3d.GameObject.create("particle");
        var particleSystem = particle.addComponent(feng3d.ParticleSystem);
        particle.transform.y = -1;
        scene.gameObject.addChild(particle);

        particleSystem.cycle = 10;
        particleSystem.numParticles = 1000;
        //发射组件
        var emission = particleSystem.animations.emission;
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
        particleSystem.animations.position.enable = true;
        particleSystem.animations.velocity.enable = true;
        particleSystem.particleGlobal.acceleration = acceleration;
        //通过函数来创建粒子初始状态
        particleSystem.generateFunctions.push({
            generate: (particle, particleSystem) =>
            {
                particle.color = new feng3d.Color4(1, 0, 0, 1).mix(new feng3d.Color4(0, 1, 0, 1), particle.index / particleSystem.numParticles);
            }, priority: 0
        });
        particleSystem.isPlaying = true;
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