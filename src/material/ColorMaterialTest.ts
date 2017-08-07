namespace feng3d
{
    var view3D = new Engine();

    var cube = GameObjectFactory.createCube();
    cube.transform.z = 300;
    view3D.scene.gameObject.addChild(cube);

    //初始化颜色材质
    var colorMaterial = cube.getComponent(MeshRenderer).material = new ColorMaterial();

    //变化旋转与颜色
    setInterval(function ()
    {
        cube.transform.ry += 1;
    }, 15);
    setInterval(function ()
    {
        colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
    }, 1000);
}