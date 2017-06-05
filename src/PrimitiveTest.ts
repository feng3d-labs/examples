module feng3d
{
    export class PrimitiveTest
    {
        view3D: View3D;
        controller: LookAtController;
        cameraObj: GameObject;

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
            angle = angle * Math.DEG2RAD;
            this.cameraObj.setPosition(1000 * Math.sin(angle), 0, 1000 * Math.cos(angle));

            this.controller.update();
        }

        init()
        {
            
            this.view3D = new View3D();
            var scene3D = this.view3D.scene;

            var cube = GameObjectFactory.createCube();
            scene3D.addChild(cube);

            var plane = GameObjectFactory.createPlane();
            plane.setPosition(150, 0, 0);
            plane.rotationX = 90;
            scene3D.addChild(plane);

            var sphere = GameObjectFactory.createSphere();
            sphere.setPosition(-150, 0, 0);
            scene3D.addChild(sphere);

            var capsule = GameObjectFactory.createCapsule();
            capsule.setPosition(300, 0, 0);
            scene3D.addChild(capsule);

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.setPosition(-300, 0, 0);
            scene3D.addChild(cylinder);
        }
    }
}