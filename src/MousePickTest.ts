module feng3d
{

    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    export class MousePickTest
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
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);
            var scene3D = this.view3D.scene;

            var cube = new CubeObject3D();
            cube.position = new Vector3D(0, 0, 0);
            cube.mouseEnabled = true;
            scene3D.addChild(cube);

            var plane = new PlaneObject3D();
            plane.position = new Vector3D(150, 0, 0);
            plane.rotationX = 90;
            plane.mouseEnabled = true;
            scene3D.addChild(plane);

            var sphere = new SphereObject3D();
            sphere.position = new Vector3D(-150, 0, 0);
            sphere.mouseEnabled = true;
            scene3D.addChild(sphere);

            var capsule = new CapsuleObject3D();
            capsule.position = new Vector3D(300, 0, 0);
            capsule.mouseEnabled = true;
            scene3D.addChild(capsule);

            var cylinder = new CylinderObject3D();
            cylinder.position = new Vector3D(-300, 0, 0);
            cylinder.mouseEnabled = true;
            scene3D.addChild(cylinder);

            scene3D.addEventListener(Mouse3DEvent.CLICK, this.onMouseClick, this);
        }

        onMouseClick(event: Event)
        {
            var object3D: Object3D = <Object3D>event.target;
            var material = object3D.getComponentByType(Model).material = new ColorMaterial();
            material.color.fromUnit(Math.random() * (1 << 24));
        }
    }
}

new feng3d.MousePickTest();