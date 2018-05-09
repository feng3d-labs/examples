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
    var Basic_Particles = /** @class */ (function (_super) {
        __extends(Basic_Particles, _super);
        function Basic_Particles() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        Basic_Particles.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var _particleMesh;
            camera.transform.x = 10;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.gameObject.addComponent(feng3d.FPSController);
            // _particleAnimationSet = new ParticleAnimationSet(true, true);
            // _particleAnimationSet["addAnimation"](new ParticleBillboardNode());
            // _particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
            // _particleAnimationSet["initParticleFunc"] = flash.bind(initParticleFunc, this);
            _particleMesh = feng3d.GameObject.create("particle");
            // _particleMesh.geometry = new PointGeometry();
            var meshRenderer = _particleMesh.addComponent(feng3d.MeshRenderer);
            meshRenderer.geometry = new feng3d.PlaneGeometry({ width: 0.10, height: 0.10, segmentsH: 1, segmentsW: 1, yUp: false });
            var material = meshRenderer.material = feng3d.materialFactory.create("standard");
            material.uniforms.s_diffuse.url = "resources/blue.png";
            material.uniforms.s_diffuse.format = feng3d.TextureFormat.RGBA;
            material.renderParams.enableBlend = true;
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
                    particle.velocity = new feng3d.Vector3(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
                }, priority: 0
            });
            particleAnimator.animations.billboard.enable = true;
            particleAnimator.animations.billboard.camera = camera.getComponent(feng3d.Camera);
            particleAnimator.cycle = 10;
            scene.gameObject.addChild(_particleMesh);
        };
        /**
         * 更新
         */
        Basic_Particles.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        Basic_Particles.prototype.dispose = function () {
        };
        return Basic_Particles;
    }(feng3d.Script));
    feng3d.Basic_Particles = Basic_Particles;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_Particles.js.map