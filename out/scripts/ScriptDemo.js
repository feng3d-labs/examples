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
    var ScriptDemo = (function (_super) {
        __extends(ScriptDemo, _super);
        function ScriptDemo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScriptDemo.prototype.init = function () {
            var cube = this.cube = feng3d.GameObject.create();
            cube.transform.z = 300;
            cube.transform.y = -100;
            this.transform.addChild(cube.transform);
            var model = cube.addComponent(feng3d.MeshRenderer);
            cube.addComponent(feng3d.MeshFilter).mesh = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
            //材质
            var material = model.material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/m.png';
            var fogMethod = new feng3d.FogMethod(new feng3d.Color(1, 1, 0), 200, 300);
            material.addMethod(fogMethod);
        };
        ScriptDemo.prototype.update = function () {
            this.cube.transform.ry += 1;
            // console.log("this.cube.transform.ry: " + this.cube.transform.ry);
        };
        /**
         * 销毁
         */
        ScriptDemo.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.cube.dispose();
            this.cube = null;
        };
        return ScriptDemo;
    }(feng3d.Script));
    feng3d.ScriptDemo = ScriptDemo;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ScriptDemo.js.map