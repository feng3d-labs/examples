module feng3d
{
    export class SegmentMaterialTest
    {
        view3D: View3D;
        constructor()
        {

            this.init();
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var segment = new Object3D("segment");
            segment.position.z = 300;
            this.view3D.scene.addChild(segment);

            //初始化材质
            segment.getOrCreateComponentByClass(Model).material = new SegmentMaterial();
            var segmentGeometry = segment.getOrCreateComponentByClass(Model).geometry = new SegmentGeometry();

            var length = 200;
            var height = 200 / Math.PI;
            var preVec: Vector3D;
            for (var x = -length; x <= length; x++)
            {

                var angle = x / length * Math.PI;
                if (preVec == null)
                {
                    preVec = new Vector3D(x, Math.sin(angle) * height, 0);
                } else
                {
                    var vec = new Vector3D(x, Math.sin(angle) * height, 0);
                    segmentGeometry.addSegment(new Segment(preVec, vec));
                    preVec = vec;
                }
            }

            //变化旋转
            setInterval(function ()
            {
                segment.rotation.y += 1;
            }, 15);
        }
    }
}

new feng3d.SegmentMaterialTest();