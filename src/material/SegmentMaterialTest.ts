namespace feng3d
{

    export class SegmentMaterialTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");

            var segment = GameObject.create("segment");
            segment.transform.z = 3;
            scene.gameObject.addChild(segment);

            //初始化材质
            var meshRenderer = segment.addComponent(MeshRenderer);
            meshRenderer.material = materialFactory.create("segment", { renderParams: { renderMode: RenderMode.LINES } });
            var segmentGeometry = meshRenderer.geometry = new SegmentGeometry();

            var length = 200;
            var height = 2 / Math.PI;
            var preVec: Vector3;
            for (var x = -length; x <= length; x++)
            {
                var angle = x / length * Math.PI;
                if (preVec == null)
                {
                    preVec = new Vector3(x / 100, Math.sin(angle) * height, 0);
                } else
                {
                    var vec = new Vector3(x / 100, Math.sin(angle) * height, 0);
                    segmentGeometry.addSegment(new Segment(preVec, vec));
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
}