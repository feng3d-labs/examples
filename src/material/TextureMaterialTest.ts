namespace feng3d
{
    var view3D = new Engine();

    var cube = GameObject.create();
    cube.transform.z = 300;
    cube.transform.y = -100;
    view3D.scene.transform.addChild(cube.transform);

    //变化旋转与颜色
    setInterval(function ()
    {
        cube.transform.ry += 1;
    }, 15);

    var model = cube.addComponent(MeshRenderer);
    cube.addComponent(MeshFilter).mesh = new CubeGeometry(100, 100, 100, 1, 1, 1, false);
    // model.geometry = new PlaneGeometry();
    //材质
    var textureMaterial = model.material = new TextureMaterial();
    //
    // var texture = textureMaterial.texture = new Texture2D('resources/sky.jpg');
    var texture = textureMaterial.texture = new Texture2D('resources/m.png');
    texture.flipY = false;
}