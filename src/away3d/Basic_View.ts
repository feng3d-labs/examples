namespace feng3d
{
    var view = new Engine();
    var scene = view.scene;

    view.camera.transform.z = -600;
    view.camera.transform.y = 500;
    view.camera.transform.lookAt(new Vector3D());

    var plane = GameObject.create();
    plane.addComponent(MeshFilter).mesh = new PlaneGeometry(700, 700);
    var model = plane.addComponent(MeshRenderer);
    var material = model.material = new StandardMaterial("resources/floor_diffuse.jpg");
    scene.gameObject.addChild(plane);

    ticker.on("enterFrame", (e) =>
    {
        plane.transform.ry += 1;
    });
}