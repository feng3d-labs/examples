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
    var PointMaterialTest = /** @class */ (function (_super) {
        __extends(PointMaterialTest, _super);
        function PointMaterialTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        PointMaterialTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var pointGeometry = new feng3d.PointGeometry();
            var pointMaterial = new feng3d.PointMaterial();
            var gameObject = feng3d.GameObject.create("plane");
            var meshRenderer = gameObject.addComponent(feng3d.MeshRenderer);
            meshRenderer.geometry = pointGeometry;
            meshRenderer.material = pointMaterial;
            gameObject.transform.z = 3;
            scene.gameObject.addChild(gameObject);
            var length = 200;
            var height = 2 / Math.PI;
            for (var x = -length; x <= length; x = x + 4) {
                var angle = x / length * Math.PI;
                var vec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
                pointGeometry.addPoint(new feng3d.PointInfo(vec));
            }
            //变化旋转
            setInterval(function () {
                gameObject.transform.ry += 1;
                pointMaterial.pointSize = 1 + 5 * Math.sin(gameObject.transform.ry / 30);
            }, 15);
        };
        /**
         * 更新
         */
        PointMaterialTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        PointMaterialTest.prototype.dispose = function () {
        };
        return PointMaterialTest;
    }(feng3d.Script));
    feng3d.PointMaterialTest = PointMaterialTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=PointMaterialTest.js.map