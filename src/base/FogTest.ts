namespace feng3d
{
    var view3D = new Engine();
    var scene = view3D.scene;

    var cube = GameObject.create();
    cube.transform.z = 3;
    cube.transform.y = -1;
    scene.gameObject.addChild(cube);

    var model = cube.addComponent(MeshRenderer);
    model.geometry = new CubeGeometry(1, 1, 1, 1, 1, 1, false);
    //材质
    var material = model.material = new StandardMaterial();
    material.diffuseMethod.difuseTexture.url = 'resources/m.png';

    material.fogMethod.enable = true;
    material.fogMethod.fogColor = new Color(1, 1, 0);
    material.fogMethod.minDistance = 2;
    material.fogMethod.maxDistance = 3;

    ticker.onframe(() =>
    {
        cube.transform.ry += 1;
    });
}