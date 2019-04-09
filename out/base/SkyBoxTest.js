var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        var skybox = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "skybox" });
        var model = skybox.addComponent(feng3d.SkyBox);
        model.s_skyboxTexture = feng3d.serialization.setValue(new feng3d.TextureCube(), {
            positive_x_url: 'resources/skybox/px.jpg',
            positive_y_url: 'resources/skybox/py.jpg',
            positive_z_url: 'resources/skybox/pz.jpg',
            negative_x_url: 'resources/skybox/nx.jpg',
            negative_y_url: 'resources/skybox/ny.jpg',
            negative_z_url: 'resources/skybox/nz.jpg'
        });
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
//# sourceMappingURL=SkyBoxTest.js.map