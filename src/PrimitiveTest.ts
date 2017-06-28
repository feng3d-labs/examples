namespace feng3d
{
    export class PrimitiveTest
    {
        view3D: View3D;
        controller: LookAtController;
        camera: Camera;

        constructor()
        {
            this.init();

            this.camera = this.view3D.camera;
            this.controller = new LookAtController(this.camera.gameObject);
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
            this.camera.transform.setPosition(1000 * Math.sin(angle), 0, 1000 * Math.cos(angle));

            this.controller.update();
        }

        init()
        {
            
            this.view3D = new View3D();
            var scene3D = this.view3D.scene;

            var cube = GameObjectFactory.createCube();
            scene3D.transform.addChild(cube.transform);

            var plane = GameObjectFactory.createPlane();
            plane.transform.setPosition(150, 0, 0);
            plane.transform.rotationX = 90;
            scene3D.transform.addChild(plane.transform);

            var sphere = GameObjectFactory.createSphere();
            sphere.transform.setPosition(-150, 0, 0);
            scene3D.transform.addChild(sphere.transform);

            var capsule = GameObjectFactory.createCapsule();
            capsule.transform.setPosition(300, 0, 0);
            scene3D.transform.addChild(capsule.transform);

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.transform.setPosition(-300, 0, 0);
            scene3D.transform.addChild(cylinder.transform);
        }
    }
}