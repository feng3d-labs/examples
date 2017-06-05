namespace feng3d
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
            this.cameraObj.transform.z = -500;
            this.cameraObj.transform.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.cameraObj);
        }

        init()
        {
            
            this.view3D = new View3D();
            var scene3D = this.view3D.scene;

            var cube = GameObjectFactory.createCube();
            cube.transform.mouseEnabled = true;
            scene3D.addChild(cube.transform);

            var plane = GameObjectFactory.createPlane();
            plane.transform.setPosition(150, 0, 0);
            plane.transform.rotationX = 90;
            plane.transform.mouseEnabled = true;
            scene3D.addChild(plane.transform);

            var sphere = GameObjectFactory.createSphere();
            sphere.transform.setPosition(-150, 0, 0);
            sphere.transform.mouseEnabled = true;
            scene3D.addChild(sphere.transform);

            var capsule = GameObjectFactory.createCapsule();
            capsule.transform.setPosition(300, 0, 0);
            capsule.transform.mouseEnabled = true;
            scene3D.addChild(capsule.transform);

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.transform.setPosition(-300, 0, 0);
            cylinder.transform.mouseEnabled = true;
            scene3D.addChild(cylinder.transform);

            scene3D.addEventListener(Mouse3DEvent.CLICK, this.onMouseClick, this);
        }

        onMouseClick(event: Event)
        {
            var object3D: Object3D = <Object3D>event.target;
            var material = object3D.getComponentByType(MeshRenderer).material = new ColorMaterial();
            material.color.fromUnit(Math.random() * (1 << 24));
        }
    }
}