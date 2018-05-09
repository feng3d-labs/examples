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
    var FogTest = /** @class */ (function (_super) {
        __extends(FogTest, _super);
        function FogTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        FogTest.prototype.init = function () {
            var cube = feng3d.GameObject.create();
            cube.transform.z = -7;
            cube.transform.y = 0;
            this.gameObject.addChild(cube);
            var model = cube.addComponent(feng3d.MeshRenderer);
            model.geometry = new feng3d.CubeGeometry({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
            //材质
            var material = model.material = feng3d.materialFactory.create("standard");
            material.uniforms.s_diffuse.url = 'resources/m.png';
            material.uniforms.u_fogMode = feng3d.FogMode.LINEAR;
            material.uniforms.u_fogColor = new feng3d.Color3(1, 1, 0);
            material.uniforms.u_fogMinDistance = 2;
            material.uniforms.u_fogMaxDistance = 3;
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
    feng3d.FogTest = FogTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=FogTest.js.map