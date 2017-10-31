module feng3d
{
    var view3D = new Engine();

    var scene = view3D.scene;

    var camera = view3D.camera;
    camera.transform.z = -500;
    camera.transform.lookAt(new Vector3D());
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