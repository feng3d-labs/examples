module feng3d
{

    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    export class FPSControllerTest
    {

        view3D: View3D;
        controller: FPSController;
        cameraObj: Object3D;

        constructor()
        {

            this.init();

            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new Vector3D());
            //
            this.controller = new FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);


            input.addEventListener("mousedown", this.onMousedown, this);
            input.addEventListener("mouseup", this.onMouseup, this);
        }

        private onMousedown()
        {
            this.controller.target = this.cameraObj;
        }

        private onMouseup()
        {

            this.controller.target = null;
        }

        process()
        {

            this.controller.update();

            var screenPos = this.view3D.project(sphere.scenePosition);
            console.log("球体视窗坐标" + screenPos.toString());
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);
            var scene3D = this.view3D.scene;

            var cube = new CubeObject3D();
            scene3D.addChild(cube);

            var plane = new PlaneObject3D();
            plane.setPosition(150, 0, 0);
            plane.rotationX = 90;
            scene3D.addChild(plane);

            sphere = new SphereObject3D();
            sphere.setPosition(-150, 0, 0);
            scene3D.addChild(sphere);

            var capsule = new CapsuleObject3D();
            capsule.setPosition(300, 0, 0);
            scene3D.addChild(capsule);

            var cylinder = new CylinderObject3D();
            cylinder.setPosition(-300, 0, 0);
            scene3D.addChild(cylinder);
        }
    }
    var sphere: SphereObject3D;
}

new feng3d.FPSControllerTest();