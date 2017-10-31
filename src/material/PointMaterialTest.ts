module feng3d
{
    var view3D = new Engine();

    var pointGeometry = new PointGeometry();
    var pointMaterial = new PointMaterial();
    var object3D = GameObject.create("plane");
    var meshRenderer = object3D.addComponent(MeshRenderer);
    meshRenderer.geometry = pointGeometry;
    meshRenderer.material = pointMaterial;
    object3D.transform.z = 300;
    view3D.scene.gameObject.addChild(object3D);

    var length = 200;
    var height = 200 / Math.PI;
    for (var x = -length; x <= length; x = x + 4)
    {
        var angle = x / length * Math.PI;
        var vec = new Vector3D(x, Math.sin(angle) * height, 0);
        pointGeometry.addPoint(new PointInfo(vec));
    }

    //变化旋转
    setInterval(function ()
    {
        object3D.transform.ry += 1;
        pointMaterial.pointSize = 1 + 5 * Math.sin(object3D.transform.ry / 30);
    }, 15);
}