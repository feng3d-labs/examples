namespace feng3d
{
    interface FireVO
    {
        mesh: GameObject;
        animator: ParticleAnimator;
        light?: PointLight;
        strength: number;
    }

    export class Basic_Fire extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");

            var NUM_FIRES = 10;
            var cameraController: HoverController;
            var planeMaterial: StandardMaterial;
            var particleMaterial: StandardMaterial;
            var directionalLight: DirectionalLight;
            var particleGeometry: PlaneGeometry;
            var timer: Timer;
            var plane: GameObject;
            var fireObjects: FireVO[] = [];
            var move = false;
            var lastPanAngle = NaN;
            var lastTiltAngle = NaN;
            var lastMouseX = NaN;
            var lastMouseY = NaN;

            initEngine();
            initLights();
            initMaterials();
            initObjects();
            initListeners();

            function initEngine()
            {
                cameraController = new HoverController(camera.gameObject);
                cameraController.distance = 10;
                cameraController.minTiltAngle = 0;
                cameraController.maxTiltAngle = 90;
                cameraController.panAngle = 45;
                cameraController.tiltAngle = 20;
            }

            function initLights()
            {
                var gameObject = GameObject.create();
                directionalLight = gameObject.addComponent(DirectionalLight);
                directionalLight.transform.rx = 90;
                directionalLight.castsShadows = false;
                directionalLight.color.fromUnit(0xeedddd);
                directionalLight.intensity = .5;
                scene.gameObject.addChild(gameObject);
            }

            function initMaterials()
            {
                planeMaterial = new StandardMaterial("resources/floor_diffuse.jpg", "resources/floor_normal.jpg", "resources/floor_specular.jpg");
                planeMaterial["specular"] = 10;
                particleMaterial = new StandardMaterial("resources/blue.png");
                particleMaterial.diffuseMethod.difuseTexture.format = TextureFormat.RGBA;
                particleMaterial.renderParams.enableBlend = true;
            }

            function initParticles(particleAnimator: ParticleAnimator)
            {
                particleAnimator.animations.billboard.enable = true;
                particleAnimator.animations.billboard.camera = camera.getComponent(Camera);
                // fireAnimationSet["addAnimation"](new ParticleScaleNode(ParticlePropertiesMode.GLOBAL, false, false, 2.5, 0.5));
                // fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.GLOBAL, new Vector3(0, 80, 0)));
                // fireAnimationSet["addAnimation"](new ParticleColorNode(ParticlePropertiesMode.GLOBAL, true, true, false, false, new flash.ColorTransform(0, 0, 0, 1, 0xFF, 0x33, 0x01), new flash.ColorTransform(0, 0, 0, 1, 0x99)));
                // fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
                //通过函数来创建粒子初始状态
                particleAnimator.numParticles = 500;
                particleAnimator.generateFunctions.push({
                    generate: (particle) =>
                    {
                        particle.color = new Color(1, 0, 0, 1).mix(new Color(0, 1, 0, 1), particle.index / particle.total);

                        particle.birthTime = Math.random() * 5;
                        particle.lifetime = Math.random() * 4 + 0.1;
                        var degree1 = Math.random() * Math.PI * 2;
                        var degree2 = Math.random() * Math.PI * 2;
                        var r = <any>0.15;
                        particle.velocity = new Vector3(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
                    }, priority: 0
                });
                particleGeometry = new PlaneGeometry(0.10, 0.10, 1, 1, false);
            }

            function initObjects()
            {
                plane = GameObject.create();
                var model = plane.addComponent(MeshRenderer);
                model.geometry = new PlaneGeometry(10, 10);
                model.geometry.scaleUV(2, 2);
                model.material = planeMaterial;
                plane.transform.y = -0.20;
                scene.gameObject.addChild(plane);
                for (var i = 0; i < NUM_FIRES; i++)
                {
                    var particleMesh = GameObject.create();
                    var model = particleMesh.addComponent(MeshRenderer);
                    model.geometry = particleGeometry;
                    model.material = particleMaterial;
                    var particleAnimator = particleMesh.addComponent(ParticleAnimator);
                    initParticles(particleAnimator);
                    var degree = i / NUM_FIRES * Math.PI * 2;
                    particleMesh.transform.x = Math.sin(degree) * 4;
                    particleMesh.transform.z = Math.cos(degree) * 4;
                    particleMesh.transform.y = 0.05;
                    fireObjects.push({ mesh: particleMesh, animator: particleAnimator, strength: 0 });
                    scene.gameObject.addChild(particleMesh);
                }
                timer = ticker.repeat(1000, fireObjects.length, onTimer, this).start();
            }

            function initListeners()
            {
                ticker.onframe(onEnterFrame, this);
                windowEventProxy.on("mousedown", onMouseDown, this);
                windowEventProxy.on("mouseup", onMouseUp, this);
            }

            function getAllLights(): Array<any>
            {
                var lights: Array<any> = new Array();
                lights.push(directionalLight);
                for (var fireVO_key_a in fireObjects)
                {
                    var fireVO: FireVO = fireObjects[fireVO_key_a];
                    if (fireVO.light)
                        lights.push(fireVO.light);
                }
                return lights;
            }

            function onTimer()
            {
                var fireObject: FireVO = fireObjects[timer.currentCount - 1];
                var lightObject = GameObject.create();
                var light: PointLight = lightObject.addComponent(PointLight);
                light.color.fromUnit(0xFF3301);
                light.intensity = 0;

                lightObject.transform.position = fireObject.mesh.transform.position;
                fireObject.light = light;
            }

            function onEnterFrame()
            {
                if (move)
                {
                    cameraController.panAngle = 0.3 * (windowEventProxy.clientX - canvas.clientLeft - lastMouseX) + lastPanAngle;
                    cameraController.tiltAngle = 0.3 * (windowEventProxy.clientY - canvas.clientTop - lastMouseY) + lastTiltAngle;
                }
                var fireVO: FireVO;
                var fireVO_key_a;
                for (fireVO_key_a in fireObjects)
                {
                    fireVO = fireObjects[fireVO_key_a];
                    var light: PointLight = fireVO.light;
                    if (<any>!light)
                        continue;
                    if (fireVO.strength < 1)
                        fireVO.strength += 0.1;
                    light["fallOff"] = 3.80 + Math.random() * 0.20;
                    light["radius"] = 2 + Math.random() * 0.30;
                    light["diffuse"] = light["specular"] = fireVO.strength + Math.random() * .2;
                }
                // view["render"]();
            }

            function onMouseDown()
            {
                lastPanAngle = cameraController.panAngle;
                lastTiltAngle = cameraController.tiltAngle;
                lastMouseX = windowEventProxy.clientX - canvas.clientLeft;
                lastMouseY = windowEventProxy.clientY - canvas.clientTop;
                move = true;
            }

            function onMouseUp()
            {
                move = false;
            }
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
}