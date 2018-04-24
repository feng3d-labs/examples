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
    var MousePickTest = /** @class */ (function (_super) {
        __extends(MousePickTest, _super);
        function MousePickTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        MousePickTest.prototype.init = function () {
            /**
             * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
             */
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            camera.transform.z = -5;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.gameObject.addComponent(feng3d.FPSController);
            var cube = feng3d.GameObjectFactory.createCube();
            cube.mouseEnabled = true;
            scene.gameObject.addChild(cube);
            var plane = feng3d.GameObjectFactory.createPlane();
            plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
            plane.transform.rx = -90;
            plane.mouseEnabled = true;
            scene.gameObject.addChild(plane);
            var sphere = feng3d.GameObjectFactory.createSphere();
            sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
            sphere.mouseEnabled = true;
            scene.gameObject.addChild(sphere);
            var capsule = feng3d.GameObjectFactory.createCapsule();
            capsule.transform.position = new feng3d.Vector3(3, 0, 0);
            capsule.mouseEnabled = true;
            scene.gameObject.addChild(capsule);
            var cylinder = feng3d.GameObjectFactory.createCylinder();
            cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
            cylinder.mouseEnabled = true;
            scene.gameObject.addChild(cylinder);
            scene.gameObject.on("click", function (event) {
                var transform = event.target;
                if (transform.getComponent(feng3d.MeshRenderer)) {
                    var material = transform.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
                    material.color.fromUnit(Math.random() * (1 << 24));
                }
            });
        };
        /**
         * 更新
         */
        MousePickTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        MousePickTest.prototype.dispose = function () {
        };
        return MousePickTest;
    }(feng3d.Script));
    feng3d.MousePickTest = MousePickTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=MousePickTest.js.map