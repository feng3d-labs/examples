namespace examples
{
    var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent("Scene")
    scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

    var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent("Camera");
    camera.transform.position = new feng3d.Vector3(0, 1, -10);
    scene.gameObject.addChild(camera.gameObject);

    var engine = new feng3d.View(null, scene, camera);

    camera.transform.z = -5;
    camera.transform.lookAt(new feng3d.Vector3());
    camera.gameObject.addComponent("FPSController");
    //

    var skybox = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "skybox" });
    const model = skybox.addComponent("SkyBox");
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