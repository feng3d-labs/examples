var feng3d;
(function (feng3d) {
    class PrimitiveTest {
        constructor() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.controller = new feng3d.LookAtController(this.cameraObj);
            this.controller.lookAtPosition = new feng3d.Vector3D();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
        }
        process() {
            var time = new Date().getTime();
            var angle = (Math.round(time / 17) % 360);
            angle = angle * feng3d.MathConsts.DEGREES_TO_RADIANS;
            this.cameraObj.position = new feng3d.Vector3D(1000 * Math.sin(angle), 0, 1000 * Math.cos(angle));
            this.controller.update();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene3D = this.view3D.scene;
            var cube = new feng3d.CubeObject3D();
            cube.position = new feng3d.Vector3D(0, 0, 0);
            scene3D.addChild(cube);
            var plane = new feng3d.PlaneObject3D();
            plane.position = new feng3d.Vector3D(150, 0, 0);
            plane.rotationX = 90;
            scene3D.addChild(plane);
            var sphere = new feng3d.SphereObject3D();
            sphere.position = new feng3d.Vector3D(-150, 0, 0);
            scene3D.addChild(sphere);
            var capsule = new feng3d.CapsuleObject3D();
            capsule.position = new feng3d.Vector3D(300, 0, 0);
            scene3D.addChild(capsule);
            var cylinder = new feng3d.CylinderObject3D();
            cylinder.position = new feng3d.Vector3D(-300, 0, 0);
            scene3D.addChild(cylinder);
        }
    }
    feng3d.PrimitiveTest = PrimitiveTest;
})(feng3d || (feng3d = {}));
new feng3d.PrimitiveTest();
//# sourceMappingURL=PrimitiveTest.js.map