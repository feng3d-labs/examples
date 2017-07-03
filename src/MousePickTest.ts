namespace feng3d
{

    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    export class MousePickTest
    {

        view3D: View3D;
        controller: FPSController;
        camera: Camera;

        constructor()
        {
            this.init();

            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.camera.gameObject);
        }

        init()
        {
            this.view3D = new View3D();
            var scene3D = this.view3D.scene;

            var cube = GameObjectFactory.createCube();
            cube.transform.mouseEnabled = true;
            scene3D.transform.addChild(cube.transform);

            var plane = GameObjectFactory.createPlane();
            plane.transform.setPosition(150, 0, 0);
            plane.transform.rotationX = 90;
            plane.transform.mouseEnabled = true;
            scene3D.transform.addChild(plane.transform);

            var sphere = GameObjectFactory.createSphere();
            sphere.transform.setPosition(-150, 0, 0);
            sphere.transform.mouseEnabled = true;
            scene3D.transform.addChild(sphere.transform);

            var capsule = GameObjectFactory.createCapsule();
            capsule.transform.setPosition(300, 0, 0);
            capsule.transform.mouseEnabled = true;
            scene3D.transform.addChild(capsule.transform);

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.transform.setPosition(-300, 0, 0);
            cylinder.transform.mouseEnabled = true;
            scene3D.transform.addChild(cylinder.transform);

            Event.on(scene3D.transform, <any>Mouse3DEvent.CLICK, this.onMouseClick, this);
        }

        onMouseClick(event: EventVO<any>)
        {
            var object3D = <Transform>event.target;
            var material = object3D.getComponent(MeshRenderer).material = new ColorMaterial();
            material.color.fromUnit(Math.random() * (1 << 24));
        }
    }
}