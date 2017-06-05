namespace feng3d
{
    export class Basic_Fire
    {
        public static NUM_FIRES: number = 10;
        private scene: Scene3D;
        private camera: GameObject;
        private view: View3D;
        private cameraController: HoverController;
        private planeMaterial: StandardMaterial;
        private particleMaterial: StandardMaterial;
        private directionalLight: DirectionalLight;
        private fireAnimationSet: ParticleAnimator;
        private particleGeometry: Geometry;
        private timer: Timer;
        private plane: GameObject;
        private fireObjects: Array<FireVO> = new Array<FireVO>();
        private move: boolean = false;
        private lastPanAngle: number = NaN;
        private lastTiltAngle: number = NaN;
        private lastMouseX: number = NaN;
        private lastMouseY: number = NaN;

        public constructor()
        {
            this.init();
        }

        private init()
        {
            this.initEngine();
            this.initLights();
            this.initMaterials();
            this.initParticles();
            this.initObjects();
            this.initListeners();
        }

        private initEngine()
        {
            
            var view3D = this.view = new View3D();

            this.camera = view3D.camera;
            this.scene = view3D.scene;
            this.cameraController = new HoverController(this.camera);
            this.cameraController.distance = 1000;
            this.cameraController.minTiltAngle = 0;
            this.cameraController.maxTiltAngle = 90;
            this.cameraController.panAngle = 45;
            this.cameraController.tiltAngle = 20;
        }

        private initLights()
        {
            this.directionalLight = new DirectionalLight(0, -1, 0);
            this.directionalLight.castsShadows = false;
            this.directionalLight.color.fromUnit(0xeedddd);
            this.directionalLight.intensity = .5;
            var gameObject = new GameObject();
            gameObject.addComponent(this.directionalLight);
            this.scene.addChild(gameObject.transform);
        }

        private initMaterials()
        {
            this.planeMaterial = new StandardMaterial("resources/floor_diffuse.jpg", "resources/floor_normal.jpg", "resources/floor_specular.jpg");
            this.planeMaterial["specular"] = 10;
            this.particleMaterial = new StandardMaterial("resources/blue.png");
            this.particleMaterial.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
            this.particleMaterial.enableBlend = true;
        }

        private initParticles()
        {
            this.fireAnimationSet = new ParticleAnimator();
            this.fireAnimationSet.addAnimation(new ParticleBillboard());
            // this.fireAnimationSet["addAnimation"](new ParticleScaleNode(ParticlePropertiesMode.GLOBAL, false, false, 2.5, 0.5));
            // this.fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.GLOBAL, new Vector3D(0, 80, 0)));
            // this.fireAnimationSet["addAnimation"](new ParticleColorNode(ParticlePropertiesMode.GLOBAL, true, true, false, false, new flash.ColorTransform(0, 0, 0, 1, 0xFF, 0x33, 0x01), new flash.ColorTransform(0, 0, 0, 1, 0x99)));
            // this.fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
            //通过函数来创建粒子初始状态
            this.fireAnimationSet.numParticles = 500;
            this.fireAnimationSet.generateFunctions.push({
                generate: (particle) =>
                {
                    particle.color = new Color(1, 0, 0, 1).mix(new Color(0, 1, 0, 1), particle.index / particle.total);

                    particle.birthTime = Math.random() * 5;
                    particle.lifetime = Math.random() * 4 + 0.1;
                    var degree1: number = Math.random() * Math.PI * 2;
                    var degree2: number = Math.random() * Math.PI * 2;
                    var r: number = <any>15;
                    particle.velocity = new Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
                }, priority: 0
            });
            this.particleGeometry = new PlaneGeometry(10, 10, 1, 1, false);
        }

        private initObjects()
        {
            this.plane = new GameObject();
            var model = this.plane.getOrCreateComponentByClass(MeshRenderer);
            this.plane.getOrCreateComponentByClass(MeshFilter).mesh = new PlaneGeometry(1000, 1000);
            this.plane.getOrCreateComponentByClass(MeshFilter).mesh.scaleUV(2, 2);
            model.material = this.planeMaterial;
            this.plane.transform.y = -20;
            this.scene.addChild(this.plane.transform);
            for (var i: number = 0; i < Basic_Fire.NUM_FIRES; i++)
            {
                var particleMesh = new GameObject();
                var model = particleMesh.getOrCreateComponentByClass(MeshRenderer);
                particleMesh.getOrCreateComponentByClass(MeshFilter).mesh = this.particleGeometry;
                model.material = this.particleMaterial;
                particleMesh.addComponent(this.fireAnimationSet);
                var degree: number = i / Basic_Fire.NUM_FIRES * Math.PI * 2;
                particleMesh.transform.x = Math.sin(degree) * 400;
                particleMesh.transform.z = Math.cos(degree) * 400;
                particleMesh.transform.y = 5;
                this.fireObjects.push(new FireVO(particleMesh));
                this.view.scene.addChild(particleMesh.transform);
            }
            this.timer = new Timer(1000, this.fireObjects.length);
            this.timer.addEventListener(TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
        }

        private initListeners()
        {
            ticker.addEventListener(Event.ENTER_FRAME, this.onEnterFrame, this);
            input.addEventListener(inputType.MOUSE_DOWN, this.onMouseDown, this);
            input.addEventListener(inputType.MOUSE_UP, this.onMouseUp, this);
        }

        private getAllLights(): Array<any>
        {
            var lights: Array<any> = new Array();
            lights.push(this.directionalLight);
            for (var fireVO_key_a in this.fireObjects)
            {
                var fireVO: FireVO = this.fireObjects[fireVO_key_a];
                if (fireVO.light)
                    lights.push(fireVO.light);
            }
            return lights;
        }

        private onTimer(e: TimerEvent)
        {
            var fireObject: FireVO = this.fireObjects[this.timer.currentCount - 1];
            // fireObject.animator["start"]();
            var light: PointLight = <any>new PointLight();
            light.color.fromUnit(0xFF3301);
            light.intensity = 0;
            var lightObject = new GameObject();
            lightObject.addComponent(light);
            lightObject.transform.position = fireObject.mesh.transform.position;
            fireObject.light = light;
        }

        private onEnterFrame(event: Event)
        {
            if (this.move)
            {
                this.cameraController.panAngle = 0.3 * (this.view.mousePos.x - this.lastMouseX) + this.lastPanAngle;
                this.cameraController.tiltAngle = 0.3 * (this.view.mousePos.y - this.lastMouseY) + this.lastTiltAngle;
            }
            var fireVO: FireVO;
            var fireVO_key_a;
            for (fireVO_key_a in this.fireObjects)
            {
                fireVO = this.fireObjects[fireVO_key_a];
                var light: PointLight = fireVO.light;
                if (<any>!light)
                    continue;
                if (fireVO.strength < 1)
                    fireVO.strength += 0.1;
                light["fallOff"] = 380 + Math.random() * 20;
                light["radius"] = 200 + Math.random() * 30;
                light["diffuse"] = light["specular"] = fireVO.strength + Math.random() * .2;
            }
            // this.view["render"]();
        }

        private onMouseDown(event: Event)
        {
            this.lastPanAngle = this.cameraController.panAngle;
            this.lastTiltAngle = this.cameraController.tiltAngle;
            this.lastMouseX = this.view.mousePos.x;
            this.lastMouseY = this.view.mousePos.y;
            this.move = true;
        }

        private onMouseUp(event: Event)
        {
            this.move = false;
        }
    }

    class FireVO
    {
        public mesh: GameObject;
        public animator: ParticleAnimator;
        public light: PointLight;
        public strength: number = 0;

        public constructor(mesh: GameObject, animator: ParticleAnimator = null)
        {
            this.mesh = mesh;
            this.animator = animator;
        }

    }
}