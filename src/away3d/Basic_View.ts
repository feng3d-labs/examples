namespace feng3d
{
    var view = new Engine();
    var scene = view.scene;

    view.camera.transform.z = -6;
    view.camera.transform.y = 5;
    view.camera.transform.lookAt(new Vector3D());

    var plane = GameObject.create();
    var model = plane.addComponent(MeshRenderer);
    model.geometry = new PlaneGeometry(7, 7);
    var material = model.material = new StandardMaterial("resources/floor_diffuse.jpg");
    scene.gameObject.addChild(plane);

    ticker.onframe( () =>
    {
        plane.transform.ry += 1;
    });
}