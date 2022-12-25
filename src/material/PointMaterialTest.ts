import { Camera, Color4, MeshRenderer, Node3D, PointGeometry, PointMaterial, PointUniforms, Scene, $set, Vector3, View } from 'feng3d';

const scene = $set(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = $set(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View(null, scene, camera);

const pointGeometry = new PointGeometry();
const pointMaterial = new PointMaterial();
const node3d = $set(new Node3D(), { name: 'plane' });
const model = node3d.addComponent(MeshRenderer);
model.geometry = pointGeometry;
model.material = pointMaterial;
node3d.z = 3;
scene.node3d.addChild(node3d);

const length = 200;
const height = 2 / Math.PI;
for (let x = -length; x <= length; x = x + 4)
{
    const angle = x / length * Math.PI;
    const vec = new Vector3(x / 100, Math.sin(angle) * height, 0);
    pointGeometry.points.push({ position: vec });
}

// 变化旋转
setInterval(function ()
{
    node3d.ry += 1;
    (<PointUniforms>pointMaterial.uniforms).u_PointSize = 1 + 5 * Math.sin(node3d.ry / 30);
}, 15);
