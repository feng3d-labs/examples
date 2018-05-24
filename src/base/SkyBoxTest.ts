class SkyBoxTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];

        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);
        //

        var skybox = feng3d.GameObject.create("skybox");
        var model = skybox.addComponent(feng3d.SkyBox);
        model.s_skyboxTexture = new feng3d.TextureCube({
            positive_x_url: 'resources/skybox/px.jpg',
            positive_y_url: 'resources/skybox/py.jpg',
            positive_z_url: 'resources/skybox/pz.jpg',
            negative_x_url: 'resources/skybox/nx.jpg',
            negative_y_url: 'resources/skybox/ny.jpg',
            negative_z_url: 'resources/skybox/nz.jpg'
        }
        );
        scene.gameObject.addChild(skybox);
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