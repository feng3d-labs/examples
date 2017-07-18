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
        ScriptDemo.prototype.update = function () {
            // console.log("this.transform.ry: " + this.transform.ry);
        };
        return ScriptDemo;
    }(feng3d.Behaviour));
    feng3d.ScriptDemo = ScriptDemo;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ScriptDemo.js.map