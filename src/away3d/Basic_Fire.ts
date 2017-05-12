module feng3d
{
    export class Basic_Fire
    {
        public static NUM_FIRES: number;
        private scene: Scene3D;
        private camera: GameObject;
        private view: View3D;
        private cameraController: HoverController;
        private planeMaterial: TextureMultiPassMaterial;
        private particleMaterial: TextureMaterial;
        private directionalLight: DirectionalLight;
        private timer: egret.Timer;
        private plane: GameObject;
        private fireObjects: Array<FireVO> = new Array<FireVO>();
        private move: boolean = false;
        private lastPanAngle: number = NaN;
        private lastTiltAngle: number = NaN;
        private lastMouseX: number = NaN;
        private lastMouseY: number = NaN;

        public constructor()
        {
            super();
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
            var _self__: any = this;
            this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
            this.stage["align"] = flash.StageAlign.TOP_LEFT;
            this.scene = new Scene3D();
            this.camera = new Camera3D();
            this.view = new View3D();
            this.view["antiAlias"] = 4;
            this.view["scene"] = this.scene;
            this.view["camera"] = this.camera;
            this.cameraController = new HoverController(this.camera);
            this.cameraController["distance"] = 1000;
            this.cameraController["minTiltAngle"] = 0;
            this.cameraController["maxTiltAngle"] = 90;
            this.cameraController["panAngle"] = 45;
            this.cameraController["tiltAngle"] = 20;
            this.view["addSourceURL"]("srcview/index.html");
            _self__.addChild(this.view);
            this.Signature = (<egret.Sprite>(new this.SignatureSwf()));
            this.SignatureBitmap = new flash.Bitmap(new flash.BitmapData(this.Signature.width, this.Signature.height, true, 0));
            this.stage["quality"] = flash.StageQuality.HIGH;
            this.SignatureBitmap.bitmapData.draw2(this.Signature);
            this.stage["quality"] = flash.StageQuality.LOW;
            _self__.addChild(this.SignatureBitmap);
            _self__.addChild(new AwayStats(this.view));
        }

        private initLights()
        {
            this.directionalLight = new DirectionalLight(0, -1, 0);
            this.directionalLight["castsShadows"] = false;
            this.directionalLight["color"] = 0xeedddd;
            this.directionalLight["diffuse"] = .5;
            this.directionalLight["ambient"] = .5;
            this.directionalLight["specular"] = 0;
            this.directionalLight["ambientColor"] = 0x808090;
            this.view["scene"].addChild(this.directionalLight);
            this.lightPicker = new StaticLightPicker([this.directionalLight]);
        }

        private initMaterials()
        {
            this.planeMaterial = new TextureMultiPassMaterial(Cast.bitmapTexture(Basic_Fire.FloorDiffuse));
            this.planeMaterial["specularMap"] = Cast.bitmapTexture(Basic_Fire.FloorSpecular);
            this.planeMaterial["normalMap"] = Cast.bitmapTexture(Basic_Fire.FloorNormals);
            this.planeMaterial["lightPicker"] = this.lightPicker;
            this.planeMaterial["repeat"] = true;
            this.planeMaterial["mipmap"] = false;
            this.planeMaterial["specular"] = 10;
            this.particleMaterial = new TextureMaterial(Cast.bitmapTexture(Basic_Fire.FireTexture));
            this.particleMaterial["blendMode"] = egret.BlendMode.ADD;
        }

        private initParticles()
        {
            this.fireAnimationSet = new ParticleAnimationSet(true, true);
            this.fireAnimationSet["addAnimation"](new ParticleBillboardNode());
            this.fireAnimationSet["addAnimation"](new ParticleScaleNode(ParticlePropertiesMode.GLOBAL, false, false, 2.5, 0.5));
            this.fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.GLOBAL, new Vector3D(0, 80, 0)));
            this.fireAnimationSet["addAnimation"](new ParticleColorNode(ParticlePropertiesMode.GLOBAL, true, true, false, false, new flash.ColorTransform(0, 0, 0, 1, 0xFF, 0x33, 0x01), new flash.ColorTransform(0, 0, 0, 1, 0x99)));
            this.fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
            this.fireAnimationSet["initParticleFunc"] = flash.bind(this.initParticleFunc, this);
            var particle: Geometry = <any>new PlaneGeometry(10, 10, 1, 1, false);
            var geometrySet: Array<Geometry> = new Array<Geometry>();
            for (var i: number = flash.checkInt(0); i < 500; i++)
                geometrySet.push(particle);
            this.particleGeometry = ParticleGeometryHelper.generateGeometry(geometrySet);
        }

        private initObjects()
        {
            this.plane = new Mesh(new PlaneGeometry(1000, 1000), this.planeMaterial);
            this.plane["geometry"].scaleUV(2, 2);
            this.plane["y"] = -20;
            this.scene["addChild"](this.plane);
            for (var i: number = flash.checkInt(0); i < Basic_Fire.NUM_FIRES; i++)
            {
                var particleMesh: Mesh = <any>new Mesh(this.particleGeometry, this.particleMaterial);
                var animator: ParticleAnimator = <any>new ParticleAnimator(this.fireAnimationSet);
                particleMesh["animator"] = animator;
                var degree: number = i / Basic_Fire.NUM_FIRES * Math.PI * 2;
                particleMesh["x"] = Math.sin(degree) * 400;
                particleMesh["z"] = Math.cos(degree) * 400;
                particleMesh["y"] = 5;
                this.fireObjects.push(new FireVO(particleMesh, animator));
                this.view["scene"].addChild(particleMesh);
            }
            this.timer = new egret.Timer(1000, this.fireObjects.length);
            this.timer.addEventListener(egret.TimerEvent.TIMER, flash.bind(this.onTimer, this), null);
            this.timer.start();
        }

        private initListeners()
        {
            var _self__: any = this;
            _self__.addEventListener(egret.Event.ENTER_FRAME, flash.bind(this.onEnterFrame, this), null);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, flash.bind(this.onMouseDown, this), null);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, flash.bind(this.onMouseUp, this), null);
            this.stage.addEventListener(egret.Event.RESIZE, flash.bind(this.onResize, this), null);
            this.onResize();
        }

        private initParticleFunc(prop: ParticleProperties)
        {
            prop["startTime"] = Math.random() * 5;
            prop["duration"] = Math.random() * 4 + 0.1;
            var degree1: number = Math.random() * Math.PI * 2;
            var degree2: number = Math.random() * Math.PI * 2;
            var r: number = <any>15;
            prop[ParticleVelocityNode.VELOCITY_VECTOR3D] = new Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
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

        private onTimer(e: egret.TimerEvent)
        {
            var fireObject: FireVO = this.fireObjects[this.timer.currentCount - 1];
            fireObject.animator["start"]();
            var light: PointLight = <any>new PointLight();
            light["color"] = 0xFF3301;
            light["diffuse"] = 0;
            light["specular"] = 0;
            light["position"] = fireObject.mesh["position"];
            fireObject.light = light;
            this.lightPicker["lights"] = this.getAllLights();
        }

        private onEnterFrame(event: egret.Event)
        {
            if (this.move)
            {
                this.cameraController["panAngle"] = 0.3 * (this.stage["mouseX"] - this.lastMouseX) + this.lastPanAngle;
                this.cameraController["tiltAngle"] = 0.3 * (this.stage["mouseY"] - this.lastMouseY) + this.lastTiltAngle;
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
            this.view["render"]();
        }

        private onMouseDown(event: flash.MouseEvent)
        {
            this.lastPanAngle = this.cameraController["panAngle"];
            this.lastTiltAngle = this.cameraController["tiltAngle"];
            this.lastMouseX = this.stage["mouseX"];
            this.lastMouseY = this.stage["mouseY"];
            this.move = true;
            this.stage.addEventListener(flash.Event.MOUSE_LEAVE, flash.bind(this.onStageMouseLeave, this), null);
        }

        private onMouseUp(event: flash.MouseEvent)
        {
            this.move = false;
            this.stage.removeEventListener(flash.Event.MOUSE_LEAVE, flash.bind(this.onStageMouseLeave, this), null);
        }

        private onStageMouseLeave(event: egret.Event)
        {
            this.move = false;
            this.stage.removeEventListener(flash.Event.MOUSE_LEAVE, flash.bind(this.onStageMouseLeave, this), null);
        }

        private onResize(event: egret.Event = null)
        {
            this.view["width"] = this.stage.stageWidth;
            this.view["height"] = this.stage.stageHeight;
            this.SignatureBitmap.y = this.stage.stageHeight - this.Signature.height;
        }

    }

    class FireVO extends egret.HashObject
    {
        public mesh: Mesh;
        public animator: ParticleAnimator;
        public light: PointLight;
        public strength: number = 0;

        public constructor(mesh: Mesh, animator: ParticleAnimator)
        {
            super();
            this.mesh = mesh;
            this.animator = animator;
        }

    }

    Basic_Fire.NUM_FIRES = 10;
    flash.extendsClass("Basic_Fire", "egret.Sprite")

}