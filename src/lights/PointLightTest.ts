class PointLightTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var light0 = new feng3d.GameObject().value({ name: "pointLight" });
        var light1 = new feng3d.GameObject().value({ name: "pointLight" });

        initObjects();
        initLights();

        feng3d.ticker.onframe(setPointLightPosition);

        camera.transform.z = -5;
        camera.transform.y = 2;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);
        //
        feng3d.windowEventProxy.on("keyup", (event) =>
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
            var material = new feng3d.StandardMaterial();
            material.uniforms.s_diffuse.url = 'resources/head_diffuse.jpg';
            material.uniforms.s_normal.url = 'resources/head_normals.jpg';
            material.uniforms.s_specular.url = 'resources/head_specular.jpg';
            material.uniforms.s_diffuse.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_diffuse.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_normal.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_normal.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_specular.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_specular.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;

            //初始化立方体
            var plane = new feng3d.GameObject();
            plane.transform.y = -1;
            var model = plane.addComponent(feng3d.Model);
            var geometry = model.geometry = new feng3d.PlaneGeometry().value({ width: 10, height: 10 });
            geometry.scaleUV(2, 2);
            model.material = material;
            scene.gameObject.addChild(plane);

            var cube = new feng3d.GameObject();
            var model = cube.addComponent(feng3d.Model);
            model.material = material;
            model.geometry = new feng3d.CubeGeometry().value({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
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
            var lightColor0 = new feng3d.Color4(1, 0, 0, 1);
            var model = light0.addComponent(feng3d.Model);
            model.geometry = new feng3d.SphereGeometry().value({ radius: 0.05 });
            //初始化点光源
            var pointLight0 = light0.addComponent(feng3d.PointLight);
            pointLight0.color = lightColor0.toColor3();
            model.material = new feng3d.ColorMaterial().value({ uniforms: { u_diffuseInput: lightColor0 } });
            scene.gameObject.addChild(light0);

            //
            var lightColor1 = new feng3d.Color4(0, 1, 0, 1);
            model = light1.addComponent(feng3d.Model);
            model.geometry = new feng3d.SphereGeometry().value({ radius: 0.05 });
            //初始化点光源
            var pointLight1 = light1.addComponent(feng3d.DirectionalLight);
            pointLight1.color = lightColor1.toColor3();
            model.material = new feng3d.ColorMaterial().value({ uniforms: { u_diffuseInput: lightColor1 } });
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