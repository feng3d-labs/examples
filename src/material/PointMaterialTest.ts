namespace feng3d
{
    var view3D = new Engine();

    var pointGeometry = new PointGeometry();
    var pointMaterial = new PointMaterial();
    var gameObject = GameObject.create("plane");
    var meshRenderer = gameObject.addComponent(MeshRenderer);
    meshRenderer.geometry = pointGeometry;
    meshRenderer.material = pointMaterial;
    gameObject.transform.z = 300;
    view3D.scene.gameObject.addChild(gameObject);

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
        gameObject.transform.ry += 1;
        pointMaterial.pointSize = 1 + 5 * Math.sin(gameObject.transform.ry / 30);
    }, 15);
}