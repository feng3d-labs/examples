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
    var StandardMaterialTest = /** @class */ (function (_super) {
        __extends(StandardMaterialTest, _super);
        function StandardMaterialTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        StandardMaterialTest.prototype.init = function () {
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
            model.geometry = new feng3d.CubeGeometry(1, 1, 1, 1, 1, 1, false);
            // model.geometry = new PlaneGeometry();
            //材质
            var textureMaterial = model.material = feng3d.materialFactory.create("standard");
            textureMaterial.uniforms.s_diffuse.url = 'resources/m.png';
            // textureMaterial.uniforms.s_diffuse.url = 'resources/nonpowerof2.png';
            textureMaterial.uniforms.s_diffuse.format = feng3d.TextureFormat.RGBA;
            // textureMaterial.diffuseMethod.alphaThreshold = 0.1;
            textureMaterial.uniforms.s_diffuse.anisotropy = 16;
            textureMaterial.renderParams.enableBlend = true;
            textureMaterial.uniforms.u_diffuse.a = 0.2;
        };
        /**
         * 更新
         */
        StandardMaterialTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        StandardMaterialTest.prototype.dispose = function () {
        };
        return StandardMaterialTest;
    }(feng3d.Script));
    feng3d.StandardMaterialTest = StandardMaterialTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=StandardMaterialTest.js.map