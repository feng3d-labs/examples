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
    var Basic_SkyBox = /** @class */ (function (_super) {
        __extends(Basic_SkyBox, _super);
        function Basic_SkyBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        Basic_SkyBox.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var cubeTexture = new feng3d.TextureCube([
                // 'resources/skybox/px.jpg',
                // 'resources/skybox/py.jpg',
                // 'resources/skybox/pz.jpg',
                // 'resources/skybox/nx.jpg',
                // 'resources/skybox/ny.jpg',
                // 'resources/skybox/nz.jpg',
                'resources/skybox/snow_positive_x.jpg',
                'resources/skybox/snow_positive_y.jpg',
                'resources/skybox/snow_positive_z.jpg',
                'resources/skybox/snow_negative_x.jpg',
                'resources/skybox/snow_negative_y.jpg',
                'resources/skybox/snow_negative_z.jpg',
            ]);
            var skybox = feng3d.GameObject.create("skybox");
            var skyboxComponent = skybox.addComponent(feng3d.SkyBox);
            skyboxComponent.texture = cubeTexture;
            scene.gameObject.addChild(skybox);
            camera.transform.z = -6;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.lens = new feng3d.PerspectiveLens(90);
            var torusMaterial = new feng3d.StandardMaterial();
            // torusMaterial.uniforms.u_specular.a = 0.5;
            torusMaterial.uniforms.u_ambient.fromUnit(0x111111);
            torusMaterial.uniforms.u_ambient.a = 0.25;
            torusMaterial.uniforms.s_envMap = cubeTexture;
            var torus = feng3d.GameObject.create("torus");
            var model = torus.addComponent(feng3d.MeshRenderer);
            model.geometry = new feng3d.TorusGeometry(1.50, 0.60, 40, 20);
            model.material = torusMaterial;
            scene.gameObject.addChild(torus);
            feng3d.ticker.onframe(function () {
                torus.transform.rx += 2;
                torus.transform.ry += 1;
                camera.transform.position = new feng3d.Vector3(0, 0, 0);
                camera.transform.ry += 0.5 * (feng3d.windowEventProxy.clientX - canvas.clientLeft - canvas.clientWidth / 2) / 800;
                camera.transform.moveBackward(6);
            });
        };
        /**
         * 更新
         */
        Basic_SkyBox.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        Basic_SkyBox.prototype.dispose = function () {
        };
        return Basic_SkyBox;
    }(feng3d.Script));
    feng3d.Basic_SkyBox = Basic_SkyBox;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_SkyBox.js.map