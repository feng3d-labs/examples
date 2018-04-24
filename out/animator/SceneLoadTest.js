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
    var SceneLoadTest = /** @class */ (function (_super) {
        __extends(SceneLoadTest, _super);
        function SceneLoadTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        SceneLoadTest.prototype.init = function () {
            var view3D = new feng3d.Engine();
            feng3d.Loader.loadText("resources/scene/Untitled.scene", function (content) {
                var json = JSON.parse(content);
                var sceneobject = feng3d.serialization.deserialize(json);
                var scene = sceneobject.getComponent(feng3d.Scene3D);
                scene.initCollectComponents();
                view3D.scene = scene;
            });
        };
        /**
         * 更新
         */
        SceneLoadTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        SceneLoadTest.prototype.dispose = function () {
        };
        return SceneLoadTest;
    }(feng3d.Script));
    feng3d.SceneLoadTest = SceneLoadTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=SceneLoadTest.js.map