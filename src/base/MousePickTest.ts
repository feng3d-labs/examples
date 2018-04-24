namespace feng3d
{
    export class MousePickTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {

            /**
             * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
             */
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            
            camera.transform.z = -5;
            camera.transform.lookAt(new Vector3());
            camera.gameObject.addComponent(FPSController);

            var cube = GameObjectFactory.createCube();
            cube.mouseEnabled = true;
            scene.gameObject.addChild(cube);

            var plane = GameObjectFactory.createPlane();
            plane.transform.position = new Vector3(1.50, 0, 0);
            plane.transform.rx = -90;
            plane.mouseEnabled = true;
            scene.gameObject.addChild(plane);

            var sphere = GameObjectFactory.createSphere();
            sphere.transform.position = new Vector3(-1.50, 0, 0);
            sphere.mouseEnabled = true;
            scene.gameObject.addChild(sphere);

            var capsule = GameObjectFactory.createCapsule();
            capsule.transform.position = new Vector3(3, 0, 0);
            capsule.mouseEnabled = true;
            scene.gameObject.addChild(capsule);

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.transform.position = new Vector3(-3, 0, 0);
            cylinder.mouseEnabled = true;
            scene.gameObject.addChild(cylinder);

            scene.gameObject.on("click", (event) =>
            {
                var transform = <Transform>event.target;
                if (transform.getComponent(MeshRenderer))
                {
                    var material = transform.getComponent(MeshRenderer).material = new ColorMaterial();
                    material.color.fromUnit(Math.random() * (1 << 24));
                }
            });
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