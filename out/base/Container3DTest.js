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
/**
 * 测试3D容器
 */
var Container3DTest = /** @class */ (function (_super) {
    __extends(Container3DTest, _super);
    function Container3DTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.num = 0;
        return _this;
    }
    /**
     * 初始化时调用
     */
    Container3DTest.prototype.init = function () {
        //初始化颜色材质
        this.cube = feng3d.GameObjectFactory.createCube();
        this.gameObject.addChild(this.cube);
        this.colorMaterial = this.cube.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
        var cylinder = feng3d.GameObjectFactory.createCylinder();
        cylinder.transform.x = 2;
        this.cube.addChild(cylinder);
    };
    /**
     * 更新
     */
    Container3DTest.prototype.update = function () {
        console.log("update");
        //变化旋转与颜色
        this.cube.transform.ry += 1;
        this.num++;
        if (this.num % 60 == 0)
            this.colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
    };
    /**
     * 销毁时调用
     */
    Container3DTest.prototype.dispose = function () {
    };
    return Container3DTest;
}(feng3d.Script));
//# sourceMappingURL=Container3DTest.js.map