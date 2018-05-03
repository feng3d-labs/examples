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
    var ColorMaterialTest = /** @class */ (function (_super) {
        __extends(ColorMaterialTest, _super);
        function ColorMaterialTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        ColorMaterialTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var cube = feng3d.GameObjectFactory.createCube();
            cube.transform.z = 3;
            scene.gameObject.addChild(cube);
            //初始化颜色材质
            var colorMaterial = cube.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
            //变化旋转与颜色
            setInterval(function () {
                cube.transform.ry += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        };
        /**
         * 更新
         */
        ColorMaterialTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        ColorMaterialTest.prototype.dispose = function () {
        };
        return ColorMaterialTest;
    }(feng3d.Script));
    feng3d.ColorMaterialTest = ColorMaterialTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ColorMaterialTest.js.map