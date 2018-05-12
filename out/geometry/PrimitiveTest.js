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
    var PrimitiveTest = /** @class */ (function (_super) {
        __extends(PrimitiveTest, _super);
        function PrimitiveTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        PrimitiveTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var cube = feng3d.gameObjectFactory.createCube();
            this.gameObject.addChild(cube);
            var plane = feng3d.gameObjectFactory.createPlane();
            plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
            plane.transform.rx = -90;
            this.gameObject.addChild(plane);
            var sphere = feng3d.gameObjectFactory.createSphere();
            sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
            this.gameObject.addChild(sphere);
            var capsule = feng3d.gameObjectFactory.createCapsule();
            capsule.transform.position = new feng3d.Vector3(3, 0, 0);
            this.gameObject.addChild(capsule);
            var cylinder = feng3d.gameObjectFactory.createCylinder();
            cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
            this.gameObject.addChild(cylinder);
            var controller = new feng3d.LookAtController(camera.gameObject);
            controller.lookAtPosition = new feng3d.Vector3();
            //
            setInterval(function () {
                var time = new Date().getTime();
                var angle = (Math.round(time / 17) % 360);
                angle = angle * feng3d.FMath.DEG2RAD;
                camera.transform.position = new feng3d.Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));
                controller.update();
            }, 17);
        };
        /**
         * 更新
         */
        PrimitiveTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        PrimitiveTest.prototype.dispose = function () {
        };
        return PrimitiveTest;
    }(feng3d.Script));
    feng3d.PrimitiveTest = PrimitiveTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=PrimitiveTest.js.map