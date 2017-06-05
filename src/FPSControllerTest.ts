module feng3d
{

    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    export class FPSControllerTest
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
            //
            this.process();
            setInterval(this.process.bind(this), 17);
        }

        process()
        {
            var screenPos = this.view3D.project(sphere.scenePosition);
            console.log("球体视窗坐标" + screenPos.toString());
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

            sphere = GameObjectFactory.createSphere();
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
    var sphere: GameObject;
}