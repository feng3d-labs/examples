module feng3d
{
    var view3D = new Engine();

    var scene = view3D.scene;

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

    var camera = view3D.camera;
    camera.transform.z = -600;
    camera.transform.lookAt(new Vector3D());
    camera.lens = new PerspectiveLens(90);

    var torusMaterial = new StandardMaterial();
    torusMaterial.specularMethod.specular = 0.5;
    torusMaterial.ambientMethod.color.fromUnit(0x111111);
    torusMaterial.ambientMethod.color.a = 0.25;
    torusMaterial.addMethod(new EnvMapMethod(cubeTexture, 1));

    var torus = GameObject.create("torus");
    var model = torus.addComponent(MeshRenderer);
    model.geometry = new TorusGeometry(150, 60, 40, 20);
    model.material = torusMaterial;
    scene.gameObject.addChild(torus);

    ticker.on("enterFrame", (e) =>
    {
        torus.transform.rx += 2;
        torus.transform.ry += 1;
        camera.transform.position = new Vector3D(0, 0, 0);
        camera.transform.ry += 0.5 * (input.clientX - view3D.gl.canvas.clientLeft - view3D.gl.canvas.width / 2) / 800;
        camera.transform.moveBackward(600);
    });
}