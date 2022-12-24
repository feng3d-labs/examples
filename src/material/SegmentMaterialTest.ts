import { Camera, Color4, Material, MeshRenderer, Node3D, Scene, SegmentGeometry, serialization, Vector3, View } from 'feng3d';

var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

var segment = serialization.setValue(new Node3D(), { name: "segment" });
segment.z = 3;
scene.node3d.addChild(segment);

//初始化材质
var model = segment.addComponent(MeshRenderer);
model.material = Material.getDefault("Segment-Material");
var segmentGeometry = model.geometry = new SegmentGeometry();

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
        segmentGeometry.addSegment({ start: preVec, end: vec });
        preVec = vec;
    }
}

//变化旋转
setInterval(function ()
{
    segment.ry += 1;
}, 15);
