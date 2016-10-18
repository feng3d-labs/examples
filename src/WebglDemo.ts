module feng3d {

    export class WebglDemo {

        view3D: View3D;
        controller: LookAtController;

        constructor() {

            this.init();

            this.controller = new LookAtController(this.view3D.camera);
            this.view3D.camera.space3D.z = -1000;
            setInterval(this.process.bind(this), 500);
        }

        process() {
            this.controller.lookAtPosition = new Vector3D(Math.random() * 10, 0, 0);
            this.controller.update();
        }

        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);
            var scene3D = this.view3D.scene;

            var cube = new Object3D("cube", [
                primitives.createCube(),
                new Space3D(-100, 100, 300, 45, 45.0),
            ]);
            scene3D.addChild(cube);

            var plane = new Object3D("plane", [
                primitives.createPlane(),
                new Space3D(100, 100, 300, 90, 0, 45),
            ]);
            scene3D.addChild(plane);

            var sphere = new Object3D("sphere", [
                primitives.createSphere(),
                new Space3D(0, -100, 300, 90, 0, 45),
            ]);
            scene3D.addChild(sphere);

            var capsule = new Object3D("capsule", [
                primitives.createCapsule(),
                new Space3D(200, -50, 500, 0, 0, 0),
            ]);
            scene3D.addChild(capsule);

            var cylinder = new Object3D("cylinder", [
                primitives.createCylinder(),
                new Space3D(200, -200, 500, -90, 0, 0),
            ]);
            scene3D.addChild(cylinder);
        }

    }

}

new feng3d.WebglDemo();