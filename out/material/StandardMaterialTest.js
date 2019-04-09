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
        var cube = new feng3d.GameObject();
        cube.transform.z = 3;
        cube.transform.y = -1;
        scene.gameObject.addChild(cube);
        //变化旋转与颜色
        setInterval(function () {
            cube.transform.ry += 1;
        }, 15);
        var model = cube.addComponent(feng3d.Model);
        model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        // model.geometry = new PlaneGeometry();
        //材质
        var textureMaterial = model.material = new feng3d.Material();
        var uniforms = textureMaterial.uniforms;
        uniforms.s_diffuse.source = { url: 'resources/m.png' };
        // textureMaterial.uniforms.s_diffuse.url = 'resources/nonpowerof2.png';
        uniforms.s_diffuse.format = feng3d.TextureFormat.RGBA;
        // textureMaterial.diffuseMethod.alphaThreshold = 0.1;
        uniforms.s_diffuse.anisotropy = 16;
        uniforms.u_diffuse.a = 0.2;
        textureMaterial.renderParams.enableBlend = true;
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
//# sourceMappingURL=StandardMaterialTest.js.map