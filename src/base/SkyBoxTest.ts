namespace feng3d
{
    export class SkyBoxTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            
            camera.transform.z = -5;
            camera.transform.lookAt(new Vector3());
            camera.gameObject.addComponent(FPSController);
            //

            var skybox = GameObject.create("skybox");
            var model = skybox.addComponent(SkyBox);
            model.texture = new TextureCube([
                'resources/skybox/px.jpg',
                'resources/skybox/py.jpg',
                'resources/skybox/pz.jpg',
                'resources/skybox/nx.jpg',
                'resources/skybox/ny.jpg',
                'resources/skybox/nz.jpg'
            ]
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
}