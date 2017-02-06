module feng3d {

    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    export class FPSControllerTest {

        view3D: View3D;
        controller: FPSController;
        cameraObj: Object3D;

        constructor() {

            this.init();

            this.cameraObj = new Object3D("camera");
            this.cameraObj.transform.z = -500;
            this.cameraObj.transform.lookAt(new Vector3D());
            this.cameraObj.addComponent(this.view3D.camera);
            //
            this.controller = new FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);


            $mouseKeyInput.addEventListener("mousedown", this.onMousedown, this);
            $mouseKeyInput.addEventListener("mouseup", this.onMouseup, this);
        }

        private onMousedown() {

            this.controller.target = this.cameraObj.transform;
        }

        private onMouseup() {

            this.controller.target = null;
        }

        process() {

            this.controller.update();
        }

        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);
            var scene3D = this.view3D.scene;

            var cube = $object3DFactory.createCube();
            cube.transform.position = new Vector3D(0, 0, 0);
            scene3D.addChild(cube);

            var plane = $object3DFactory.createPlane();
            plane.transform.position = new Vector3D(150, 0, 0);
            plane.transform.rotation = new Vector3D(90, 0, 0);
            scene3D.addChild(plane);

            var sphere = $object3DFactory.createSphere();
            sphere.transform.position = new Vector3D(-150, 0, 0);
            scene3D.addChild(sphere);

            var capsule = $object3DFactory.createCapsule();
            capsule.transform.position = new Vector3D(300, 0, 0);
            scene3D.addChild(capsule);

            var cylinder = $object3DFactory.createCylinder();
            cylinder.transform.position = new Vector3D(-300, 0, 0);
            scene3D.addChild(cylinder);
        }
    }
}

new feng3d.FPSControllerTest();