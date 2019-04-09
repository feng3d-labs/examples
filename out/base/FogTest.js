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
var FogTest = /** @class */ (function (_super) {
    __extends(FogTest, _super);
    function FogTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    FogTest.prototype.init = function () {
        var cube = new feng3d.GameObject();
        cube.transform.z = -7;
        cube.transform.y = 0;
        this.gameObject.addChild(cube);
        var model = cube.addComponent(feng3d.Model);
        model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        //材质
        var material = model.material = feng3d.serialization.setValue(new feng3d.Material(), {
            uniforms: {
                s_diffuse: { source: { url: 'resources/m.png' } },
                u_fogMode: feng3d.FogMode.LINEAR,
                u_fogColor: new feng3d.Color3(1, 1, 0),
                u_fogMinDistance: 2,
                u_fogMaxDistance: 3,
            }
        });
        feng3d.ticker.onframe(function () {
            cube.transform.ry += 1;
        });
    };
    /**
     * 更新
     */
    FogTest.prototype.update = function () {
    };
    /**
     * 销毁时调用
     */
    FogTest.prototype.dispose = function () {
    };
    return FogTest;
}(feng3d.Script));
//# sourceMappingURL=FogTest.js.map