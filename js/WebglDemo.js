var feng3d;
(function (feng3d) {
    class WebglDemo {
        constructor() {
            this.init();
            this.controller = new feng3d.LookAtController(this.view3D.camera);
            this.view3D.camera.space3D.z = -1000;
            setInterval(this.process.bind(this), 500);
        }
        process() {
            this.controller.lookAtPosition = new feng3d.Vector3D(Math.random() * 10, 0, 0);
            this.controller.update();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene3D = this.view3D.scene;
            var cube = new feng3d.Object3D("cube", [
                feng3d.primitives.createCube(),
                new feng3d.Space3D(-100, 100, 300, 45, 45.0),
            ]);
            scene3D.addChild(cube);
            var plane = new feng3d.Object3D("plane", [
                feng3d.primitives.createPlane(),
                new feng3d.Space3D(100, 100, 300, 90, 0, 45),
            ]);
            scene3D.addChild(plane);
            var sphere = new feng3d.Object3D("sphere", [
                feng3d.primitives.createSphere(),
                new feng3d.Space3D(0, -100, 300, 90, 0, 45),
            ]);
            scene3D.addChild(sphere);
            var capsule = new feng3d.Object3D("capsule", [
                feng3d.primitives.createCapsule(),
                new feng3d.Space3D(200, -50, 500, 0, 0, 0),
            ]);
            scene3D.addChild(capsule);
            var cylinder = new feng3d.Object3D("cylinder", [
                feng3d.primitives.createCylinder(),
                new feng3d.Space3D(200, -200, 500, -90, 0, 0),
            ]);
            scene3D.addChild(cylinder);
        }
    }
    feng3d.WebglDemo = WebglDemo;
})(feng3d || (feng3d = {}));
new feng3d.WebglDemo();
//# sourceMappingURL=WebglDemo.js.map