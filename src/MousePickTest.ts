module feng3d
{

    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    export class MousePickTest
    {

        view3D: View3D;
        controller: FPSController;
        cameraObj: GameObject;

        constructor()
        {

            this.init();

            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.cameraObj);
        }

        init()
        {
            
            this.view3D = new View3D();
            var scene3D = this.view3D.scene;

            var cube = GameObjectFactory.createCube();
            cube.mouseEnabled = true;
            scene3D.addChild(cube);

            var plane = GameObjectFactory.createPlane();
            plane.setPosition(150, 0, 0);
            plane.rotationX = 90;
            plane.mouseEnabled = true;
            scene3D.addChild(plane);

            var sphere = GameObjectFactory.createSphere();
            sphere.setPosition(-150, 0, 0);
            sphere.mouseEnabled = true;
            scene3D.addChild(sphere);

            var capsule = GameObjectFactory.createCapsule();
            capsule.setPosition(300, 0, 0);
            capsule.mouseEnabled = true;
            scene3D.addChild(capsule);

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.setPosition(-300, 0, 0);
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