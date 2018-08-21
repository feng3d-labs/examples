class Basic_SkyBox extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var cubeTexture = new feng3d.TextureCube({
            positive_x_url: 'resources/skybox/snow_positive_x.jpg',
            positive_y_url: 'resources/skybox/snow_positive_y.jpg',
            positive_z_url: 'resources/skybox/snow_positive_z.jpg',
            negative_x_url: 'resources/skybox/snow_negative_x.jpg',
            negative_y_url: 'resources/skybox/snow_negative_y.jpg',
            negative_z_url: 'resources/skybox/snow_negative_z.jpg',
        });

        var skybox = feng3d.GameObject.create("skybox");
        var skyboxComponent = skybox.addComponent(feng3d.SkyBox);
        skyboxComponent.s_skyboxTexture = cubeTexture;
        scene.gameObject.addChild(skybox);

        camera.transform.z = -6;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.lens = new feng3d.PerspectiveLens(90);

        var torusMaterial = new feng3d.StandardMaterial();
        // torusMaterial.uniforms.u_specular.a = 0.5;
        // torusMaterial.uniforms.u_ambient.fromUnit(0x111111);
        // torusMaterial.uniforms.u_ambient.a = 0.25;
        torusMaterial.uniforms.s_envMap = cubeTexture;

        var torus = feng3d.GameObject.create("torus");
        var model = torus.addComponent(feng3d.Model);
        model.geometry = new feng3d.TorusGeometry({ radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
        model.material = torusMaterial;
        scene.gameObject.addChild(torus);

        feng3d.ticker.onframe(() =>
        {
            torus.transform.rx += 2;
            torus.transform.ry += 1;
            camera.transform.position = new feng3d.Vector3(0, 0, 0);
            camera.transform.ry += 0.5 * (feng3d.windowEventProxy.clientX - canvas.clientLeft - canvas.clientWidth / 2) / 800;
            camera.transform.moveBackward(6);
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