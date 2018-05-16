class PointMaterialTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var pointGeometry = new feng3d.PointGeometry();
        var pointMaterial = feng3d.materialFactory.create("point", { renderParams: { renderMode: feng3d.RenderMode.POINTS } });
        var gameObject = feng3d.GameObject.create("plane");
        var meshRenderer = gameObject.addComponent(feng3d.MeshRenderer);
        meshRenderer.geometry = pointGeometry;
        meshRenderer.material = pointMaterial;
        gameObject.transform.z = 3;
        scene.gameObject.addChild(gameObject);

        var length = 200;
        var height = 2 / Math.PI;
        for (var x = -length; x <= length; x = x + 4)
        {
            var angle = x / length * Math.PI;
            var vec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
            pointGeometry.points.push({ position: vec });
        }

        //变化旋转
        setInterval(function ()
        {
            gameObject.transform.ry += 1;
            pointMaterial.uniforms.u_PointSize = 1 + 5 * Math.sin(gameObject.transform.ry / 30);
        }, 15);
    }
    /**
     * 更新
     */
    update()
    {
    }

    /**
    * 销毁时调用
    */
    dispose()
    {

    }
}