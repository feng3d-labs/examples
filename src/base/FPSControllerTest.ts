namespace feng3d
{
    export class FPSControllerTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];

            var cube = GameObjectFactory.createCube();
            this.gameObject.addChild(cube);

            var plane = GameObjectFactory.createPlane();
            plane.transform.position = new Vector3(1.50, 0, 0);
            plane.transform.rx = -90;
            this.gameObject.addChild(plane);

            var sphere = GameObjectFactory.createSphere();
            sphere.transform.position = new Vector3(-1.50, 0, 0);
            this.gameObject.addChild(sphere);

            var capsule = GameObjectFactory.createCapsule();
            capsule.transform.position = new Vector3(3, 0, 0);
            this.gameObject.addChild(capsule);

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.transform.position = new Vector3(-3, 0, 0);
            this.gameObject.addChild(cylinder);

            camera.transform.z = -5;
            camera.transform.lookAt(new Vector3());
            //
            camera.gameObject.addComponent(FPSController);
        }
        /**
         * 更新
         */
        update()
        {
        }

        /**
        * 销毁时调用
        */
        dispose()
        {

        }
    }
}