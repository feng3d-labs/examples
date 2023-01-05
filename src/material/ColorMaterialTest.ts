import { Camera, Color4, ColorMaterial, ColorUniforms, MeshRenderer, Node3D, Scene, $set, Vector3, View3D } from 'feng3d';

const scene = new Node3D().addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View3D(null, scene, camera);

const cube = Node3D.createPrimitive('Cube');
cube.z = 3;
scene.node3d.addChild(cube);

// 初始化颜色材质
const colorMaterial = cube.getComponent(MeshRenderer).material = new ColorMaterial();

// 变化旋转与颜色
setInterval(function ()
{
    cube.ry += 1;
}, 15);
setInterval(function ()
{
    (<ColorUniforms>colorMaterial.uniforms).u_diffuseInput.random();
}, 1000);
