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
var BillboardTest = /** @class */ (function (_super) {
    __extends(BillboardTest, _super);
    function BillboardTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
     * 初始化时调用
     */
    BillboardTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        camera.gameObject.addComponent(feng3d.FPSController);
        scene.background.setTo(0.3, 0.3, 0.3, 1);
        var cube = feng3d.GameObjectFactory.createCube();
        cube.transform.z = 3;
        scene.gameObject.addChild(cube);
        var gameObject = feng3d.GameObjectFactory.createPlane();
        gameObject.transform.y = 1.50;
        var holdSizeComponent = gameObject.addComponent(feng3d.HoldSizeComponent);
        holdSizeComponent.holdSize = 1;
        holdSizeComponent.camera = camera;
        var billboardComponent = gameObject.addComponent(feng3d.BillboardComponent);
        billboardComponent.camera = camera;
        cube.addChild(gameObject);
        //材质
        var model = gameObject.getComponent(feng3d.MeshRenderer);
        model.geometry = new feng3d.PlaneGeometry(40, 40, 1, 1, false);
        var textureMaterial = model.material = feng3d.materialFactory.create("standard");
        // textureMaterial.cullFace = CullFace.NONE;
        //
        var texture = textureMaterial.uniforms.s_diffuse.url = 'resources/m.png';
        // var texture = textureMaterial.texture = new ImageDataTexture();
        // var canvas2D = document.createElement("canvas");
        // canvas2D.width = 256;
        // canvas2D.height = 256;
        // var context2D = canvas2D.getContext("2d");
        // // context2D.fillStyle = "red";
        // // context2D.fillRect(0, 0, canvas2D.width, canvas2D.height);
        // context2D.fillStyle = "green";
        // context2D.font = '48px serif';
        // // context2D.fillText('Hello world', 50, 100);
        // context2D.fillText('Hello world', 0, 50);
        // // context2D.strokeText('Hello world', 50, 100);
        // var imageData = context2D.getImageData(0, 0, canvas2D.width, canvas2D.height);
        // texture.pixels = imageData;
        // gameObject.holdSize = 1;
    };
    /**
     * 更新
     */
    BillboardTest.prototype.update = function () {
    };
    /**
     * 销毁时调用
     */
    BillboardTest.prototype.dispose = function () {
    };
    return BillboardTest;
}(feng3d.Script));
//# sourceMappingURL=BillboardTest.js.map