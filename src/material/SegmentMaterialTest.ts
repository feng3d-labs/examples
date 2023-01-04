import { Camera, Color4, Material, MeshRenderer, Node3D, Scene, SegmentGeometry, $set, Vector3, View3D } from 'feng3d';

const scene = $set(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = $set(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View3D(null, scene, camera);

const segment = $set(new Node3D(), { name: 'segment' });
segment.z = 3;
scene.node3d.addChild(segment);

// 初始化材质
const model = segment.addComponent(MeshRenderer);
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
