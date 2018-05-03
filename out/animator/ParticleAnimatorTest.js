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
    var ParticleAnimatorTest = /** @class */ (function (_super) {
        __extends(ParticleAnimatorTest, _super);
        function ParticleAnimatorTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        ParticleAnimatorTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var acceleration = new feng3d.Vector3(0, -9.8, 0);
            camera.transform.z = -5;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.gameObject.addComponent(feng3d.FPSController);
            var particle = feng3d.GameObject.create("particle");
            var meshRenderer = particle.addComponent(feng3d.MeshRenderer);
            meshRenderer.geometry = new feng3d.PointGeometry();
            var material = meshRenderer.material = new feng3d.StandardMaterial();
            material.renderParams.renderMode = feng3d.RenderMode.POINTS;
            particle.transform.y = -1;
            scene.gameObject.addChild(particle);
            var particleAnimator = particle.addComponent(feng3d.ParticleAnimator);
            particleAnimator.cycle = 10;
            particleAnimator.numParticles = 1000;
            //发射组件
            var emission = particleAnimator.animations.emission;
            //每秒发射数量
            emission.rate = 50;
            //批量发射
            emission.bursts.push({ time: 1, particles: 100 }, { time: 2, particles: 100 }, { time: 3, particles: 100 }, { time: 4, particles: 100 }, { time: 5, particles: 100 });
            //通过组件来创建粒子初始状态
            particleAnimator.animations.position.enable = true;
            particleAnimator.animations.velocity.enable = true;
            particleAnimator.particleGlobal.acceleration = acceleration;
            //通过函数来创建粒子初始状态
            particleAnimator.generateFunctions.push({
                generate: function (particle) {
                    particle.color = new feng3d.Color(1, 0, 0, 1).mix(new feng3d.Color(0, 1, 0, 1), particle.index / particle.total);
                }, priority: 0
            });
            particleAnimator.isPlaying = true;
        };
        /**
         * 更新
         */
        ParticleAnimatorTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        ParticleAnimatorTest.prototype.dispose = function () {
        };
        return ParticleAnimatorTest;
    }(feng3d.Script));
    feng3d.ParticleAnimatorTest = ParticleAnimatorTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ParticleAnimatorTest.js.map