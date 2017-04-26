module feng3d
{

    export class PrimitiveTest
    {

        view3D: View3D;
        controller: LookAtController;
        cameraObj: Object3D;

        constructor()
        {

            this.init();

            this.cameraObj = this.view3D.camera;
            this.controller = new LookAtController(this.cameraObj);
            this.controller.lookAtPosition = new Vector3D();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
        }

        process()
        {

            var time = new Date().getTime();
            var angle = (Math.round(time / 17) % 360);
            angle = angle * MathConsts.DEGREES_TO_RADIANS;
            this.cameraObj.setPosition(1000 * Math.sin(angle), 0, 1000 * Math.cos(angle));

            this.controller.update();
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);
            var scene3D = this.view3D.scene;

            var cube = new CubeObject3D();
            cube.setPosition(0, 0, 0);
            scene3D.addChild(cube);

            var plane = new PlaneObject3D();
            plane.setPosition(150, 0, 0);
            plane.rotationX = 90;
            scene3D.addChild(plane);

            var sphere = new SphereObject3D();
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
}

new feng3d.PrimitiveTest();