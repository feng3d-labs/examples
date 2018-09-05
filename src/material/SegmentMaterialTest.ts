class SegmentMaterialTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var segment = new feng3d.GameObject().value({ name: "segment" });
        segment.transform.z = 3;
        scene.gameObject.addChild(segment);

        //初始化材质
        var model = segment.addComponent(feng3d.Model);
        model.material = new feng3d.Material().value({ shaderName: "segment", renderParams: { renderMode: feng3d.RenderMode.LINES } });
        var segmentGeometry = model.geometry = new feng3d.SegmentGeometry();

        var length = 200;
        var height = 2 / Math.PI;
        var preVec: feng3d.Vector3;
        for (var x = -length; x <= length; x++)
        {
            var angle = x / length * Math.PI;
            if (preVec == null)
            {
                preVec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
            } else
            {
                var vec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
                segmentGeometry.segments.push({ start: preVec, end: vec });
                preVec = vec;
            }
        }

        //变化旋转
        setInterval(function ()
        {
            segment.transform.ry += 1;
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