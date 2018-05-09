namespace feng3d
{

    export class PointLightTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");

            var light0 = GameObject.create("pointLight");
            var light1 = GameObject.create("pointLight");

            initObjects();
            initLights();

            ticker.onframe(setPointLightPosition);

            camera.transform.z = -5;
            camera.transform.y = 2;
            camera.transform.lookAt(new Vector3());
            camera.gameObject.addComponent(FPSController);
            //
            windowEventProxy.on("keyup", (event) =>
            {
                var boardKey = String.fromCharCode(event.keyCode).toLocaleLowerCase();
                switch (boardKey)
                {
                    case "c":
                        clearObjects();
                        break;
                    case "b":
                        initObjects();
                        scene.gameObject.addChild(light0);
                        scene.gameObject.addChild(light1);
                        break;
                }
            });

            function initObjects()
            {
                var material = materialFactory.create("standard");
                material.uniforms.s_diffuse.url = 'resources/head_diffuse.jpg';
                material.uniforms.s_normal.url = 'resources/head_normals.jpg';
                material.uniforms.s_specular.url = 'resources/head_specular.jpg';
                material.uniforms.s_diffuse.wrapS = TextureWrap.MIRRORED_REPEAT;
                material.uniforms.s_diffuse.wrapT = TextureWrap.MIRRORED_REPEAT;
                material.uniforms.s_normal.wrapS = TextureWrap.MIRRORED_REPEAT;
                material.uniforms.s_normal.wrapT = TextureWrap.MIRRORED_REPEAT;
                material.uniforms.s_specular.wrapS = TextureWrap.MIRRORED_REPEAT;
                material.uniforms.s_specular.wrapT = TextureWrap.MIRRORED_REPEAT;

                //初始化立方体
                var plane = GameObject.create();
                plane.transform.y = -1;
                var model = plane.addComponent(MeshRenderer);
                var geometry = model.geometry = new PlaneGeometry({ width: 10, height: 10 });
                geometry.scaleUV(2, 2);
                model.material = material;
                scene.gameObject.addChild(plane);

                var cube = GameObject.create();
                var model = cube.addComponent(MeshRenderer);
                model.material = material;
                model.geometry = new CubeGeometry({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
                model.geometry.scaleUV(2, 2);
                scene.gameObject.addChild(cube);
            }

            function clearObjects()
            {
                for (var i = scene.gameObject.numChildren - 1; i >= 0; i--)
                {
                    scene.gameObject.removeChildAt(i);
                }
            }

            function initLights()
            {
                //
                var lightColor0 = new Color4(1, 0, 0, 1);
                var meshRenderer = light0.addComponent(MeshRenderer);
                meshRenderer.geometry = new SphereGeometry({ radius: 0.05 });
                //初始化点光源
                var pointLight0 = light0.addComponent(PointLight);
                pointLight0.color = lightColor0.toColor3();
                meshRenderer.material = materialFactory.create("color", { uniforms: { u_diffuseInput: lightColor0 } });
                scene.gameObject.addChild(light0);

                //
                var lightColor1 = new Color4(0, 1, 0, 1);
                meshRenderer = light1.addComponent(MeshRenderer);
                meshRenderer.geometry = new SphereGeometry({ radius: 0.05 });
                //初始化点光源
                var pointLight1 = light1.addComponent(DirectionalLight);
                pointLight1.color = lightColor1.toColor3();
                meshRenderer.material = materialFactory.create("color", { uniforms: { u_diffuseInput: lightColor1 } });
                scene.gameObject.addChild(light1);
            }

            function setPointLightPosition()
            {
                var time = new Date().getTime();
                //
                var angle = time / 1000;
                light0.transform.x = Math.sin(angle) * 3;
                light0.transform.z = Math.cos(angle) * 3;
                //
                angle = angle + Math.PI / 2;
                light1.transform.x = Math.sin(angle) * 3;
                light1.transform.z = Math.cos(angle) * 3;
                light1.transform.lookAt(new feng3d.Vector3());
            }
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