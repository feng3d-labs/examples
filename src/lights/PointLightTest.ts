module feng3d
{
    var light0 = GameObject.create("pointLight");
    var light1 = GameObject.create("pointLight");

    var view3D = new Engine();

    var scene = view3D.scene;

    initObjects();
    initLights();

    ticker.on("enterFrame", setPointLightPosition);

    var camera = view3D.camera;
    camera.transform.z = -500;
    camera.transform.y = 200;
    camera.transform.lookAt(new Vector3D());
    camera.gameObject.addComponent(FPSController);
    //
    input.on("keyup", (event) =>
    {
        var inputEvent: InputEvent = event.data;
        var boardKey = String.fromCharCode(inputEvent.keyCode).toLocaleLowerCase();
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
        var material = new StandardMaterial();
        material.diffuseMethod.difuseTexture.url = 'resources/head_diffuse.jpg';
        material.normalMethod.normalTexture.url = 'resources/head_normals.jpg';
        material.specularMethod.specularTexture.url = 'resources/head_specular.jpg';
        material.diffuseMethod.difuseTexture.wrapS = GL.MIRRORED_REPEAT;
        material.diffuseMethod.difuseTexture.wrapT = GL.MIRRORED_REPEAT;
        material.normalMethod.normalTexture.wrapS = GL.MIRRORED_REPEAT;
        material.normalMethod.normalTexture.wrapT = GL.MIRRORED_REPEAT;
        material.specularMethod.specularTexture.wrapS = GL.MIRRORED_REPEAT;
        material.specularMethod.specularTexture.wrapT = GL.MIRRORED_REPEAT;

        //初始化立方体
        var plane = GameObject.create();
        plane.transform.y = -100;
        var model = plane.addComponent(MeshRenderer);
        var geometry = model.geometry = new PlaneGeometry(1000, 1000);
        geometry.scaleUV(2, 2);
        model.material = material;
        scene.gameObject.addChild(plane);

        var cube = GameObject.create();
        var model = cube.addComponent(MeshRenderer);
        model.material = material;
        model.geometry = new CubeGeometry(100, 100, 100, 1, 1, 1, false);
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
        var lightColor0 = new Color(1, 0, 0, 1);
        var meshRenderer = light0.addComponent(MeshRenderer);
        meshRenderer.geometry = new SphereGeometry(5);
        //初始化点光源
        var pointLight0 = light0.addComponent(PointLight);
        pointLight0.color = lightColor0;
        meshRenderer.material = new ColorMaterial(lightColor0);
        scene.gameObject.addChild(light0);

        //
        var lightColor1 = new Color(0, 1, 0, 1);
        meshRenderer = light1.addComponent(MeshRenderer);
        meshRenderer.geometry = new SphereGeometry(5);
        //初始化点光源
        var pointLight1 = light1.addComponent(DirectionalLight);
        pointLight1.color = lightColor1;
        meshRenderer.material = new ColorMaterial(lightColor1);
        scene.gameObject.addChild(light1);
    }

    function setPointLightPosition()
    {
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
}

