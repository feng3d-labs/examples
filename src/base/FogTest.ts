module feng3d
{
    var view3D = new Engine();
    var scene = view3D.scene;

    var cube = GameObject.create();
    cube.transform.z = 300;
    cube.transform.y = -100;
    scene.gameObject.addChild(cube);

    var model = cube.addComponent(MeshRenderer);
    model.geometry = new CubeGeometry(100, 100, 100, 1, 1, 1, false);
    //材质
    var material = model.material = new StandardMaterial();
    material.diffuseMethod.difuseTexture.url = 'resources/m.png';

    var fogMethod = new FogMethod(new Color(1, 1, 0), 200, 300);
    material.addMethod(fogMethod);

    ticker.on("enterFrame", (e) =>
    {
        cube.transform.ry += 1;
    });
}