var feng3d;
(function (feng3d) {
    var light0 = feng3d.GameObject.create("pointLight");
    var light1 = feng3d.GameObject.create("pointLight");
    var view3D = new feng3d.Engine();
    var scene = view3D.scene;
    initObjects();
    initLights();
    feng3d.ticker.onframe(setPointLightPosition);
    var camera = view3D.camera;
    camera.transform.z = -500;
    camera.transform.y = 200;
    camera.transform.lookAt(new feng3d.Vector3D());
    camera.gameObject.addComponent(feng3d.FPSController);
    //
    feng3d.windowEventProxy.on("keyup", function (event) {
        var boardKey = String.fromCharCode(event.keyCode).toLocaleLowerCase();
        switch (boardKey) {
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
    function initObjects() {
        var material = new feng3d.StandardMaterial();
        material.diffuseMethod.difuseTexture.url = 'resources/head_diffuse.jpg';
        material.normalMethod.normalTexture.url = 'resources/head_normals.jpg';
        material.specularMethod.specularTexture.url = 'resources/head_specular.jpg';
        material.diffuseMethod.difuseTexture.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
        material.diffuseMethod.difuseTexture.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;
        material.normalMethod.normalTexture.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
        material.normalMethod.normalTexture.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;
        material.specularMethod.specularTexture.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
        material.specularMethod.specularTexture.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;
        //初始化立方体
        var plane = feng3d.GameObject.create();
        plane.transform.y = -100;
        var model = plane.addComponent(feng3d.MeshRenderer);
        var geometry = model.geometry = new feng3d.PlaneGeometry(1000, 1000);
        geometry.scaleUV(2, 2);
        model.material = material;
        scene.gameObject.addChild(plane);
        var cube = feng3d.GameObject.create();
        var model = cube.addComponent(feng3d.MeshRenderer);
        model.material = material;
        model.geometry = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
        model.geometry.scaleUV(2, 2);
        scene.gameObject.addChild(cube);
    }
    function clearObjects() {
        for (var i = scene.gameObject.numChildren - 1; i >= 0; i--) {
            scene.gameObject.removeChildAt(i);
        }
    }
    function initLights() {
        //
        var lightColor0 = new feng3d.Color(1, 0, 0, 1);
        var meshRenderer = light0.addComponent(feng3d.MeshRenderer);
        meshRenderer.geometry = new feng3d.SphereGeometry(5);
        //初始化点光源
        var pointLight0 = light0.addComponent(feng3d.PointLight);
        pointLight0.color = lightColor0;
        meshRenderer.material = new feng3d.ColorMaterial(lightColor0);
        scene.gameObject.addChild(light0);
        //
        var lightColor1 = new feng3d.Color(0, 1, 0, 1);
        meshRenderer = light1.addComponent(feng3d.MeshRenderer);
        meshRenderer.geometry = new feng3d.SphereGeometry(5);
        //初始化点光源
        var pointLight1 = light1.addComponent(feng3d.DirectionalLight);
        pointLight1.color = lightColor1;
        meshRenderer.material = new feng3d.ColorMaterial(lightColor1);
        scene.gameObject.addChild(light1);
    }
    function setPointLightPosition() {
        var time = new Date().getTime();
        //
        var angle = time / 1000;
        light0.transform.x = Math.sin(angle) * 300;
        light0.transform.z = Math.cos(angle) * 300;
        //
        angle = angle + Math.PI / 2;
        light1.transform.x = Math.sin(angle) * 300;
        light1.transform.z = Math.cos(angle) * 300;
        light1.transform.lookAt(new feng3d.Vector3D());
    }
})(feng3d || (feng3d = {}));
//# sourceMappingURL=PointLightTest.js.map