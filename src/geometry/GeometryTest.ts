namespace feng3d
{
    var view3D = new Engine();
    var gameobject = GameObject.create();
    var model = gameobject.addComponent(MeshRenderer);

    var geometry = model.geometry = new CustomGeometry();
    geometry.addGeometry(new PlaneGeometry());
    var matrix3D = new Matrix4x4();
    matrix3D.appendTranslation(0, 0.50, 0);
    geometry.addGeometry(new SphereGeometry(50), matrix3D);

    matrix3D.appendTranslation(0, 0.50, 0);
    var addGeometry = new CubeGeometry();
    geometry.addGeometry(addGeometry, matrix3D);

    addGeometry.width = 0.50;
    matrix3D.appendTranslation(0, 0.50, 0);
    matrix3D.appendRotation(Vector3.Z_AXIS, 45);
    geometry.addGeometry(addGeometry, matrix3D);

    gameobject.transform.z = 3;
    gameobject.transform.y = -1;
    view3D.scene.gameObject.addChild(gameobject);

    //初始化颜色材质
    var colorMaterial = model.material = new ColorMaterial();

    //变化旋转与颜色
    setInterval(function ()
    {
        gameobject.transform.ry += 1;
    }, 15);
    setInterval(function ()
    {
        colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
    }, 1000);
}