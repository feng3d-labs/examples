class SkyBoxTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];

        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent("FPSController");
        //

        var skybox = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "skybox" });
        var model = skybox.addComponent("SkyBox");
        model.s_skyboxTexture = feng3d.serialization.setValue(new feng3d.TextureCube(), {
            rawData: {
                type: "path", paths: [
                    'resources/skybox/px.jpg',
                    'resources/skybox/py.jpg',
                    'resources/skybox/pz.jpg',
                    'resources/skybox/nx.jpg',
                    'resources/skybox/ny.jpg',
                    'resources/skybox/nz.jpg'
                ]
            }
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