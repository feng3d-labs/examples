class MousePickTest extends feng3d.Script
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
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);

        var cube = feng3d.gameObjectFactory.createCube();
        cube.mouseEnabled = true;
        scene.gameObject.addChild(cube);

        var plane = feng3d.gameObjectFactory.createPlane();
        plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
        plane.transform.rx = -90;
        plane.mouseEnabled = true;
        scene.gameObject.addChild(plane);

        var sphere = feng3d.gameObjectFactory.createSphere();
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        sphere.mouseEnabled = true;
        scene.gameObject.addChild(sphere);

        var capsule = feng3d.gameObjectFactory.createCapsule();
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        capsule.mouseEnabled = true;
        scene.gameObject.addChild(capsule);

        var cylinder = feng3d.gameObjectFactory.createCylinder();
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        cylinder.mouseEnabled = true;
        scene.gameObject.addChild(cylinder);

        scene.gameObject.on("click", (event) =>
        {
            var transform = <feng3d.Transform>event.target;
            if (transform.getComponent(feng3d.MeshRenderer))
            {
                var material = transform.getComponent(feng3d.MeshRenderer).material = feng3d.materialFactory.create("color");
                material.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 24));
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