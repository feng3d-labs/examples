import { Camera, Color4, ColorMaterial, ColorUniforms, CubeGeometry, CustomGeometry, Matrix4x4, MeshRenderer, Node3D, PlaneGeometry, Scene, $set, SphereGeometry, Vector3, View3D } from 'feng3d';

const root = new Node3D();
root.addComponent(View3D);

const scene = root.addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const node3d = new Node3D();
const model = node3d.addComponent(MeshRenderer);

const geometry = model.geometry = new CustomGeometry();
geometry.addGeometry(new PlaneGeometry());
const matrix = new Matrix4x4();
matrix.appendTranslation(0, 0.50, 0);
geometry.addGeometry($set(new SphereGeometry(), { radius: 50 }), matrix);

matrix.appendTranslation(0, 0.50, 0);
const addGeometry = new CubeGeometry();
geometry.addGeometry(addGeometry, matrix);

addGeometry.width = 0.50;
matrix.appendTranslation(0, 0.50, 0);
matrix.appendRotation(Vector3.Z_AXIS, 45);
geometry.addGeometry(addGeometry, matrix);

node3d.z = 3;
node3d.y = -1;
scene.node3d.addChild(node3d);

// 初始化颜色材质
model.material = new ColorMaterial();
const colorUniforms = <ColorUniforms>model.material.uniforms;

// 变化旋转与颜色
setInterval(function ()
{
    node3d.ry += 1;
}, 15);
setInterval(function ()
{
    colorUniforms.u_diffuseInput.random();
}, 1000);
