namespace feng3d
{
    var view3D = new Engine();
    var object3d = GameObject.create();
    var model = object3d.addComponent(MeshRenderer);

    var geometry = object3d.addComponent(MeshFilter).mesh = new Geometry();
    geometry.addGeometry(new PlaneGeometry());
    var matrix3D = new Matrix3D();
    matrix3D.appendTranslation(0, 50, 0);
    geometry.addGeometry(new SphereGeometry(50), matrix3D);

    matrix3D.appendTranslation(0, 50, 0);
    var addGeometry = new CubeGeometry();
    geometry.addGeometry(addGeometry, matrix3D);

    addGeometry.width = 50;
    matrix3D.appendTranslation(0, 50, 0);
    matrix3D.appendRotation(Vector3D.Z_AXIS, 45);
    geometry.addGeometry(addGeometry, matrix3D);

    object3d.transform.z = 300;
    object3d.transform.y = -100;
    view3D.scene.transform.addChild(object3d.transform);

    //初始化颜色材质
    var colorMaterial = model.material = new ColorMaterial();

    //变化旋转与颜色
    setInterval(function ()
    {
        object3d.transform.ry += 1;
    }, 15);
    setInterval(function ()
    {
        colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
    }, 1000);
}