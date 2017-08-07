namespace feng3d
{

    /**
     * 测试3D容器
     */
    var view3D = new Engine();
    var scene = view3D.scene;

    //初始化颜色材质
    var cube = GameObjectFactory.createCube();
    cube.transform.z = 500;
    scene.gameObject.addChild(cube);

    var colorMaterial = cube.getComponent(MeshRenderer).material = new ColorMaterial();

    var cylinder = GameObjectFactory.createCylinder();
    cylinder.transform.x = 200;
    cube.addChild(cylinder);

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