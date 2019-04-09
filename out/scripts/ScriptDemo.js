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
var ScriptDemo = /** @class */ (function (_super) {
    __extends(ScriptDemo, _super);
    function ScriptDemo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScriptDemo.prototype.init = function () {
        var cube = this.cube = new feng3d.GameObject();
        cube.transform.z = -7;
        this.gameObject.addChild(cube);
        var model = cube.addComponent(feng3d.Model);
        model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        //材质
        var material = model.material = new feng3d.Material();
        var uniforms = material.uniforms;
        uniforms.s_diffuse.source = { url: 'resources/m.png' };
        uniforms.u_fogMode = feng3d.FogMode.LINEAR;
        uniforms.u_fogColor = new feng3d.Color3(1, 1, 0);
        uniforms.u_fogMinDistance = 2;
        uniforms.u_fogMaxDistance = 3;
    };
    ScriptDemo.prototype.update = function () {
        this.cube.transform.ry += 1;
        // log("this.cube.transform.ry: " + this.cube.transform.ry);
    };
    /**
     * 销毁
     */
    ScriptDemo.prototype.dispose = function () {
        this.cube.dispose();
        this.cube = null;
    };
    return ScriptDemo;
}(feng3d.Script));
//# sourceMappingURL=ScriptDemo.js.map