var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var scene = view3D.scene;
    var cubeTexture = new feng3d.TextureCube([
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
    var skybox = feng3d.GameObject.create("skybox");
    var model = skybox.addComponent(feng3d.MeshRenderer);
    skybox.addComponent(feng3d.MeshFilter).mesh = new feng3d.SkyBoxGeometry();
    var material = model.material = new feng3d.SkyBoxMaterial();
    material.texture = cubeTexture;
    scene.gameObject.addChild(skybox);
    var camera = view3D.camera;
    camera.transform.z = -600;
    camera.transform.lookAt(new feng3d.Vector3D());
    camera.lens = new feng3d.PerspectiveLens(90);
    var torusMaterial = new feng3d.StandardMaterial();
    torusMaterial.specularMethod.specular = 0.5;
    torusMaterial.ambientMethod.color.fromUnit(0x111111);
    torusMaterial.ambientMethod.color.a = 0.25;
    torusMaterial.addMethod(new feng3d.EnvMapMethod(cubeTexture, 1));
    var torus = feng3d.GameObject.create("torus");
    var model = torus.addComponent(feng3d.MeshRenderer);
    torus.addComponent(feng3d.MeshFilter).mesh = new feng3d.TorusGeometry(150, 60, 40, 20);
    model.material = torusMaterial;
    scene.gameObject.addChild(torus);
    feng3d.ticker.on("enterFrame", function (e) {
        torus.transform.rx += 2;
        torus.transform.ry += 1;
        camera.transform.position = new feng3d.Vector3D(0, 0, 0);
        camera.transform.ry += 0.5 * (feng3d.input.clientX - view3D.canvas.clientLeft - view3D.canvas.width / 2) / 800;
        camera.transform.moveBackward(600);
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_SkyBox.js.map