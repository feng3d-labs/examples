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

        var cube = feng3d.GameObject.createPrimitive("Cube");
        cube.mouseEnabled = true;
        cube.getComponent(feng3d.Renderable).material = new feng3d.Material();
        scene.gameObject.addChild(cube);

        var sphere = feng3d.GameObject.createPrimitive("Sphere");
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        sphere.mouseEnabled = true;
        sphere.getComponent(feng3d.Renderable).material = new feng3d.Material();
        scene.gameObject.addChild(sphere);

        var capsule = feng3d.GameObject.createPrimitive("Capsule");
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        capsule.mouseEnabled = true;
        capsule.getComponent(feng3d.Renderable).material = new feng3d.Material();
        scene.gameObject.addChild(capsule);

        var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        cylinder.mouseEnabled = true;
        cylinder.getComponent(feng3d.Renderable).material = new feng3d.Material();
        scene.gameObject.addChild(cylinder);

        scene.on("click", (event) =>
        {
            var gameObject = <feng3d.GameObject>event.target;
            if (gameObject.getComponent(feng3d.Renderable))
            {
                var uniforms = <feng3d.StandardUniforms>gameObject.getComponent(feng3d.Renderable).material.uniforms;
                uniforms.u_diffuse.fromUnit(Math.random() * (1 << 24));
            }
        });

        // var engines = feng3d.Feng3dObject.getObjects(feng3d.Engine);

        // engines[0].mouse3DManager.mouseInput.catchMouseMove = true;

        // scene.on("mouseover", (event) =>
        // {
        //     var gameObject = <feng3d.GameObject>event.target;
        //     if (gameObject.getComponent(feng3d.Renderable))
        //     {
        //         var uniforms = <feng3d.StandardUniforms>gameObject.getComponent(feng3d.Renderable).material.uniforms;
        //         uniforms.u_diffuse.setTo(0, 1, 0);
        //     }
        // });

        // scene.on("mouseout", (event) =>
        // {
        //     var gameObject = <feng3d.GameObject>event.target;
        //     if (gameObject.getComponent(feng3d.Renderable))
        //     {
        //         var uniforms = <feng3d.StandardUniforms>gameObject.getComponent(feng3d.Renderable).material.uniforms;
        //         uniforms.u_diffuse.setTo(1, 1, 1);
        //     }
        // });
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