class PrimitiveTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");


        var cube = feng3d.GameObject.createPrimitive("Cube");
        this.gameObject.addChild(cube);

        var plane = feng3d.GameObject.createPrimitive("Plane");
        plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
        plane.transform.rx = -90;
        this.gameObject.addChild(plane);

        var sphere = feng3d.GameObject.createPrimitive("Sphere");
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        this.gameObject.addChild(sphere);

        var capsule = feng3d.GameObject.createPrimitive("Capsule");
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        this.gameObject.addChild(capsule);

        var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        this.gameObject.addChild(cylinder);

        var controller = new feng3d.LookAtController(camera.gameObject);
        controller.lookAtPosition = new feng3d.Vector3();
        //
        setInterval(() =>
        {
            var time = new Date().getTime();
            var angle = (Math.round(time / 17) % 360);
            angle = angle * Math.DEG2RAD;
            camera.transform.position = new feng3d.Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));

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