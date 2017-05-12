module feng3d
{
    export class Basic_Particles
    {
        private _view: View3D;
        private _cameraController: HoverController;
        private _particleMesh: GameObject;
        private _move: boolean = false;
        private _lastPanAngle: number = NaN;
        private _lastTiltAngle: number = NaN;
        private _lastMouseX: number = NaN;
        private _lastMouseY: number = NaN;

        public constructor()
        {
            var canvas = document.getElementById("glcanvas");
            var view3D = this._view = new View3D(canvas);

            this._cameraController = new HoverController(this._view.camera, null, 45, 20, 1000);

            // this._particleAnimationSet = new ParticleAnimationSet(true, true);
            // this._particleAnimationSet["addAnimation"](new ParticleBillboardNode());
            // this._particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
            // this._particleAnimationSet["initParticleFunc"] = flash.bind(this.initParticleFunc, this);

            this._particleMesh = new GameObject("particle");
            // this._particleMesh.getOrCreateComponentByClass(Model).geometry = new PointGeometry();
            this._particleMesh.getOrCreateComponentByClass(Model).geometry = new PlaneGeometry(10, 10, 1, 1, false);
            var material = this._particleMesh.getOrCreateComponentByClass(Model).material = new StandardMaterial();
            // material.renderMode = RenderMode.TRIANGLES;
            // var material: TextureMaterial = <any>new TextureMaterial(Cast.bitmapTexture(this.ParticleImg));
            // material.blendMode = egret.BlendMode.ADD;

            var particleAnimator = new ParticleAnimator();
            particleAnimator.cycle = 10;
            particleAnimator.numParticles = 20000;
            //通过函数来创建粒子初始状态
            particleAnimator.generateFunctions.push({
                generate: (particle) =>
                {
                    particle.birthTime = Math.random() * 5 - 5;
                    particle.lifetime = 5;
                    var degree1: number = Math.random() * Math.PI;
                    var degree2: number = Math.random() * Math.PI * 2;
                    var r: number = Math.random() * 50 + 400;
                    particle.velocity = new Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
                    particle.color = new Color(1, 0, 0, 1).mix(new Color(0, 1, 0, 1), particle.index / particle.total);
                }, priority: 0
            });
            this._particleMesh.addComponent(particleAnimator);
            // this._particleAnimator.start();
            this._view.scene.addChild(this._particleMesh);

            ticker.addEventListener(Event.ENTER_FRAME, this.onEnterFrame, this);
            input.addEventListener(inputType.MOUSE_DOWN, this.onMouseDown, this);
            input.addEventListener(inputType.MOUSE_UP, this.onMouseUp, this);
        }

        private onEnterFrame(event: Event)
        {
            if (this._move)
            {
                this._cameraController["panAngle"] = 0.3 * (this._view.mousePos.x - this._lastMouseX) + this._lastPanAngle;
                this._cameraController["tiltAngle"] = 0.3 * (this._view.mousePos.y - this._lastMouseY) + this._lastTiltAngle;
            }
        }

        private onMouseDown(event: Event)
        {
            this._lastPanAngle = this._cameraController["panAngle"];
            this._lastTiltAngle = this._cameraController["tiltAngle"];
            this._lastMouseX = this._view.mousePos.x;
            this._lastMouseY = this._view.mousePos.y;
            this._move = true;
        }

        private onMouseUp(event: Event)
        {
            this._move = false;
        }

    }
}