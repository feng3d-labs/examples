namespace feng3d
{

    export class PrimitiveTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");


            var cube = gameObjectFactory.createCube();
            this.gameObject.addChild(cube);

            var plane = gameObjectFactory.createPlane();
            plane.transform.position = new Vector3(1.50, 0, 0);
            plane.transform.rx = -90;
            this.gameObject.addChild(plane);

            var sphere = gameObjectFactory.createSphere();
            sphere.transform.position = new Vector3(-1.50, 0, 0);
            this.gameObject.addChild(sphere);

            var capsule = gameObjectFactory.createCapsule();
            capsule.transform.position = new Vector3(3, 0, 0);
            this.gameObject.addChild(capsule);

            var cylinder = gameObjectFactory.createCylinder();
            cylinder.transform.position = new Vector3(-3, 0, 0);
            this.gameObject.addChild(cylinder);

            var controller = new LookAtController(camera.gameObject);
            controller.lookAtPosition = new Vector3();
            //
            setInterval(() =>
            {
                var time = new Date().getTime();
                var angle = (Math.round(time / 17) % 360);
                angle = angle * FMath.DEG2RAD;
                camera.transform.position = new Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));

                controller.update();
            }, 17);
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