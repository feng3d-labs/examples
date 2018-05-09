var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var feng3d;
(function (feng3d) {
    var Basic_Fire = /** @class */ (function (_super) {
        __extends(Basic_Fire, _super);
        function Basic_Fire() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        Basic_Fire.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var NUM_FIRES = 10;
            var cameraController;
            var planeMaterial;
            var particleMaterial;
            var directionalLight;
            var particleGeometry;
            var timer;
            var plane;
            var fireObjects = [];
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
            function initEngine() {
                cameraController = new feng3d.HoverController(camera.gameObject);
                cameraController.distance = 10;
                cameraController.minTiltAngle = 0;
                cameraController.maxTiltAngle = 90;
                cameraController.panAngle = 45;
                cameraController.tiltAngle = 20;
            }
            function initLights() {
                var gameObject = feng3d.GameObject.create();
                directionalLight = gameObject.addComponent(feng3d.DirectionalLight);
                directionalLight.transform.rx = 90;
                directionalLight.castsShadows = false;
                directionalLight.color.fromUnit(0xeedddd);
                directionalLight.intensity = .5;
                scene.gameObject.addChild(gameObject);
            }
            function initMaterials() {
                planeMaterial = feng3d.materialFactory.create("standard");
                planeMaterial.uniforms.s_diffuse.url = "resources/floor_diffuse.jpg";
                planeMaterial.uniforms.s_normal.url = "resources/floor_normal.jpg";
                planeMaterial.uniforms.s_specular.url = "resources/floor_specular.jpg";
                planeMaterial["specular"] = 10;
                particleMaterial = feng3d.materialFactory.create("standard");
                particleMaterial.uniforms.s_diffuse.url = "resources/blue.png";
                particleMaterial.uniforms.s_diffuse.format = feng3d.TextureFormat.RGBA;
                particleMaterial.renderParams.enableBlend = true;
            }
            function initParticles(particleAnimator) {
                particleAnimator.animations.billboard.enable = true;
                particleAnimator.animations.billboard.camera = camera.getComponent(feng3d.Camera);
                // fireAnimationSet["addAnimation"](new ParticleScaleNode(ParticlePropertiesMode.GLOBAL, false, false, 2.5, 0.5));
                // fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.GLOBAL, new Vector3(0, 80, 0)));
                // fireAnimationSet["addAnimation"](new ParticleColorNode(ParticlePropertiesMode.GLOBAL, true, true, false, false, new flash.ColorTransform(0, 0, 0, 1, 0xFF, 0x33, 0x01), new flash.ColorTransform(0, 0, 0, 1, 0x99)));
                // fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
                //通过函数来创建粒子初始状态
                particleAnimator.numParticles = 500;
                particleAnimator.generateFunctions.push({
                    generate: function (particle) {
                        particle.color = new feng3d.Color4(1, 0, 0, 1).mix(new feng3d.Color4(0, 1, 0, 1), particle.index / particle.total);
                        particle.birthTime = Math.random() * 5;
                        particle.lifetime = Math.random() * 4 + 0.1;
                        var degree1 = Math.random() * Math.PI * 2;
                        var degree2 = Math.random() * Math.PI * 2;
                        var r = 0.15;
                        particle.velocity = new feng3d.Vector3(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
                    }, priority: 0
                });
                particleGeometry = new feng3d.PlaneGeometry({ width: 0.10, height: 0.10, segmentsW: 1, segmentsH: 1, yUp: false });
            }
            function initObjects() {
                plane = feng3d.GameObject.create();
                var model = plane.addComponent(feng3d.MeshRenderer);
                model.geometry = new feng3d.PlaneGeometry({ width: 10, height: 10 });
                model.geometry.scaleUV(2, 2);
                model.material = planeMaterial;
                plane.transform.y = -0.20;
                scene.gameObject.addChild(plane);
                for (var i = 0; i < NUM_FIRES; i++) {
                    var particleMesh = feng3d.GameObject.create();
                    var model = particleMesh.addComponent(feng3d.MeshRenderer);
                    model.geometry = particleGeometry;
                    model.material = particleMaterial;
                    var particleAnimator = particleMesh.addComponent(feng3d.ParticleAnimator);
                    initParticles(particleAnimator);
                    var degree = i / NUM_FIRES * Math.PI * 2;
                    particleMesh.transform.x = Math.sin(degree) * 4;
                    particleMesh.transform.z = Math.cos(degree) * 4;
                    particleMesh.transform.y = 0.05;
                    fireObjects.push({ mesh: particleMesh, animator: particleAnimator, strength: 0 });
                    scene.gameObject.addChild(particleMesh);
                }
                timer = feng3d.ticker.repeat(1000, fireObjects.length, onTimer, this).start();
            }
            function initListeners() {
                feng3d.ticker.onframe(onEnterFrame, this);
                feng3d.windowEventProxy.on("mousedown", onMouseDown, this);
                feng3d.windowEventProxy.on("mouseup", onMouseUp, this);
            }
            function getAllLights() {
                var lights = new Array();
                lights.push(directionalLight);
                for (var fireVO_key_a in fireObjects) {
                    var fireVO = fireObjects[fireVO_key_a];
                    if (fireVO.light)
                        lights.push(fireVO.light);
                }
                return lights;
            }
            function onTimer() {
                var fireObject = fireObjects[timer.currentCount - 1];
                var lightObject = feng3d.GameObject.create();
                var light = lightObject.addComponent(feng3d.PointLight);
                light.color.fromUnit(0xFF3301);
                light.intensity = 0;
                lightObject.transform.position = fireObject.mesh.transform.position;
                fireObject.light = light;
            }
            function onEnterFrame() {
                if (move) {
                    cameraController.panAngle = 0.3 * (feng3d.windowEventProxy.clientX - canvas.clientLeft - lastMouseX) + lastPanAngle;
                    cameraController.tiltAngle = 0.3 * (feng3d.windowEventProxy.clientY - canvas.clientTop - lastMouseY) + lastTiltAngle;
                }
                var fireVO;
                var fireVO_key_a;
                for (fireVO_key_a in fireObjects) {
                    fireVO = fireObjects[fireVO_key_a];
                    var light = fireVO.light;
                    if (!light)
                        continue;
                    if (fireVO.strength < 1)
                        fireVO.strength += 0.1;
                    light["fallOff"] = 3.80 + Math.random() * 0.20;
                    light["radius"] = 2 + Math.random() * 0.30;
                    light["diffuse"] = light["specular"] = fireVO.strength + Math.random() * .2;
                }
                // view["render"]();
            }
            function onMouseDown() {
                lastPanAngle = cameraController.panAngle;
                lastTiltAngle = cameraController.tiltAngle;
                lastMouseX = feng3d.windowEventProxy.clientX - canvas.clientLeft;
                lastMouseY = feng3d.windowEventProxy.clientY - canvas.clientTop;
                move = true;
            }
            function onMouseUp() {
                move = false;
            }
        };
        /**
         * 更新
         */
        Basic_Fire.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        Basic_Fire.prototype.dispose = function () {
        };
        return Basic_Fire;
    }(feng3d.Script));
    feng3d.Basic_Fire = Basic_Fire;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_Fire.js.map