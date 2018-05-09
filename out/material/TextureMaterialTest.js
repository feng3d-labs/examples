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
    var TextureMaterialTest = /** @class */ (function (_super) {
        __extends(TextureMaterialTest, _super);
        function TextureMaterialTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        TextureMaterialTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var cube = feng3d.GameObject.create();
            cube.transform.z = 3;
            cube.transform.y = -1;
            scene.gameObject.addChild(cube);
            //变化旋转与颜色
            setInterval(function () {
                cube.transform.ry += 1;
            }, 15);
            var model = cube.addComponent(feng3d.MeshRenderer);
            model.geometry = new feng3d.CubeGeometry({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
            // model.geometry = new PlaneGeometry();
            //材质
            model.material = feng3d.materialFactory.create("texture", {
                uniforms: { s_texture: { url: 'resources/m.png', flipY: false } }
            });
        };
        /**
         * 更新
         */
        TextureMaterialTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        TextureMaterialTest.prototype.dispose = function () {
        };
        return TextureMaterialTest;
    }(feng3d.Script));
    feng3d.TextureMaterialTest = TextureMaterialTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=TextureMaterialTest.js.map