import { $set, Color4, Material, Node3D, SegmentGeometry, Vector3 } from 'feng3d';

const root = new Node3D();
root.addComponent('View3D');

const scene = root.addComponent('Scene3D');
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent('Camera3D');
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const segment = $set(new Node3D(), { name: 'segment' });
segment.z = 3;
scene.node3d.addChild(segment);

// 初始化材质
const model = segment.addComponent('Mesh3D');
model.material = Material.getDefault('Segment-Material');
const segmentGeometry = model.geometry = new SegmentGeometry();

const length = 200;
const height = 2 / Math.PI;
let preVec: Vector3;
for (let x = -length; x <= length; x++)
{
    const angle = x / length * Math.PI;
    if (preVec === undefined)
    {
        preVec = new Vector3(x / 100, Math.sin(angle) * height, 0);
    }
    else
    {
        const vec = new Vector3(x / 100, Math.sin(angle) * height, 0);
        segmentGeometry.addSegment({ start: preVec, end: vec });
        preVec = vec;
    }
}

// 变化旋转
setInterval(function ()
{
    segment.ry += 1;
}, 15);
