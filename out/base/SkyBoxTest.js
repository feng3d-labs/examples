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
    var SkyBoxTest = /** @class */ (function (_super) {
        __extends(SkyBoxTest, _super);
        function SkyBoxTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        SkyBoxTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            camera.transform.z = -5;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.gameObject.addComponent(feng3d.FPSController);
            //
            var skybox = feng3d.GameObject.create("skybox");
            var model = skybox.addComponent(feng3d.SkyBox);
            model.texture = new feng3d.TextureCube([
                'resources/skybox/px.jpg',
                'resources/skybox/py.jpg',
                'resources/skybox/pz.jpg',
                'resources/skybox/nx.jpg',
                'resources/skybox/ny.jpg',
                'resources/skybox/nz.jpg'
            ]);
            scene.gameObject.addChild(skybox);
        };
        /**
         * 更新
         */
        SkyBoxTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        SkyBoxTest.prototype.dispose = function () {
        };
        return SkyBoxTest;
    }(feng3d.Script));
    feng3d.SkyBoxTest = SkyBoxTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=SkyBoxTest.js.map