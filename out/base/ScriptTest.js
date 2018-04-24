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
    var ScriptTest = /** @class */ (function (_super) {
        __extends(ScriptTest, _super);
        function ScriptTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        ScriptTest.prototype.init = function () {
            var sc = this.gameObject.addScript("out/scripts/ScriptDemo.ts");
            // windowEventProxy.on("keyup", (e) =>
            // {
            //     if (e.keyCode == 82)
            //     {
            //         GameObjectUtil.removeScript(scene3D.gameObject, path);
            //         GameObjectUtil.addScript(scene3D.gameObject, path);
            //     } else if (e.keyCode == 84)
            //     {
            //         GameObjectUtil.reloadJS(path);
            //     }
            // })
        };
        /**
         * 更新
         */
        ScriptTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        ScriptTest.prototype.dispose = function () {
        };
        return ScriptTest;
    }(feng3d.Script));
    feng3d.ScriptTest = ScriptTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ScriptTest.js.map