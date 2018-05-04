namespace feng3d
{

    export class Basic_SkyBox extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");

            var cubeTexture = new TextureCube([
                // 'resources/skybox/px.jpg',
                // 'resources/skybox/py.jpg',
                // 'resources/skybox/pz.jpg',
                // 'resources/skybox/nx.jpg',
                // 'resources/skybox/ny.jpg',
                // 'resources/skybox/nz.jpg',
                'resources/skybox/snow_positive_x.jpg',
                'resources/skybox/snow_positive_y.jpg',
                'resources/skybox/snow_positive_z.jpg',
                'resources/skybox/snow_negative_x.jpg',
                'resources/skybox/snow_negative_y.jpg',
                'resources/skybox/snow_negative_z.jpg',
            ]);

            var skybox = GameObject.create("skybox");
            var skyboxComponent = skybox.addComponent(SkyBox);
            skyboxComponent.texture = cubeTexture;
            scene.gameObject.addChild(skybox);

            camera.transform.z = -6;
            camera.transform.lookAt(new Vector3());
            camera.lens = new PerspectiveLens(90);

            var torusMaterial = new StandardMaterial();
            // torusMaterial.uniforms.u_specular.a = 0.5;
            torusMaterial.uniforms.u_ambient.fromUnit(0x111111);
            torusMaterial.uniforms.u_ambient.a = 0.25;
            torusMaterial.uniforms.s_envMap = cubeTexture;

            var torus = GameObject.create("torus");
            var model = torus.addComponent(MeshRenderer);
            model.geometry = new TorusGeometry(1.50, 0.60, 40, 20);
            model.material = torusMaterial;
            scene.gameObject.addChild(torus);

            ticker.onframe(() =>
            {
                torus.transform.rx += 2;
                torus.transform.ry += 1;
                camera.transform.position = new Vector3(0, 0, 0);
                camera.transform.ry += 0.5 * (windowEventProxy.clientX - canvas.clientLeft - canvas.clientWidth / 2) / 800;
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
}