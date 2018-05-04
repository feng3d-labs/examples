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
    var ScriptDemo = /** @class */ (function (_super) {
        __extends(ScriptDemo, _super);
        function ScriptDemo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScriptDemo.prototype.init = function () {
            var cube = this.cube = feng3d.GameObject.create();
            cube.transform.z = -7;
            this.gameObject.addChild(cube);
            var model = cube.addComponent(feng3d.MeshRenderer);
            model.geometry = new feng3d.CubeGeometry(1, 1, 1, 1, 1, 1, false);
            //材质
            var material = model.material = new feng3d.StandardMaterial();
            material.uniforms.s_diffuse.url = 'resources/m.png';
            material.fogMethod.enable = true;
            material.fogMethod.fogColor = new Color(1, 1, 0);
            material.fogMethod.minDistance = 2;
            material.fogMethod.maxDistance = 3;
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
    feng3d.ScriptDemo = ScriptDemo;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ScriptDemo.js.map