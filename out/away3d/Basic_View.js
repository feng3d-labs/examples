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
    var Basic_View = /** @class */ (function (_super) {
        __extends(Basic_View, _super);
        function Basic_View() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        Basic_View.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            camera.transform.z = -6;
            camera.transform.y = 5;
            camera.transform.lookAt(new feng3d.Vector3());
            var plane = feng3d.GameObject.create();
            var model = plane.addComponent(feng3d.MeshRenderer);
            model.geometry = new feng3d.PlaneGeometry({ width: 7, height: 7 });
            var material = model.material = feng3d.materialFactory.create("standard");
            material.uniforms.s_diffuse.url = "resources/floor_diffuse.jpg";
            scene.gameObject.addChild(plane);
            feng3d.ticker.onframe(function () {
                plane.transform.ry += 1;
            });
        };
        /**
         * 更新
         */
        Basic_View.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        Basic_View.prototype.dispose = function () {
        };
        return Basic_View;
    }(feng3d.Script));
    feng3d.Basic_View = Basic_View;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_View.js.map