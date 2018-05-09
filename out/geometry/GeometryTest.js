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
    var GeometryTest = /** @class */ (function (_super) {
        __extends(GeometryTest, _super);
        function GeometryTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        GeometryTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var gameobject = feng3d.GameObject.create();
            var model = gameobject.addComponent(feng3d.MeshRenderer);
            var geometry = model.geometry = new feng3d.CustomGeometry();
            geometry.addGeometry(new feng3d.PlaneGeometry());
            var matrix3D = new feng3d.Matrix4x4();
            matrix3D.appendTranslation(0, 0.50, 0);
            geometry.addGeometry(new feng3d.SphereGeometry({ radius: 50 }), matrix3D);
            matrix3D.appendTranslation(0, 0.50, 0);
            var addGeometry = new feng3d.CubeGeometry();
            geometry.addGeometry(addGeometry, matrix3D);
            addGeometry.width = 0.50;
            matrix3D.appendTranslation(0, 0.50, 0);
            matrix3D.appendRotation(feng3d.Vector3.Z_AXIS, 45);
            geometry.addGeometry(addGeometry, matrix3D);
            gameobject.transform.z = 3;
            gameobject.transform.y = -1;
            scene.gameObject.addChild(gameobject);
            //初始化颜色材质
            var colorMaterial = model.material = feng3d.materialFactory.create("color");
            //变化旋转与颜色
            setInterval(function () {
                gameobject.transform.ry += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
            }, 1000);
        };
        /**
         * 更新
         */
        GeometryTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        GeometryTest.prototype.dispose = function () {
        };
        return GeometryTest;
    }(feng3d.Script));
    feng3d.GeometryTest = GeometryTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=GeometryTest.js.map