import { $set, Camera, Color4, ColorMaterial, ColorUniforms, MeshRenderer, Node3D, Scene, ticker, Vector3, View3D } from 'feng3d';

/**
 * 测试3D容器
 */
const scene = $set(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = $set(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View3D(null, scene, camera);

// 初始化颜色材质
const cube = Node3D.createPrimitive('Cube');
scene.node3d.addChild(cube);

const colorMaterial = cube.getComponent(MeshRenderer).material = new ColorMaterial();

const cylinder = Node3D.createPrimitive('Cylinder');
cylinder.x = 2;
cube.addChild(cylinder);

let num = 0;
ticker.onFrame(() =>
{
    console.log('update');

    // 变化旋转与颜色
    cube.ry += 1;

    num++;

    if (num % 60 === 0)
    {
        (<ColorUniforms>colorMaterial.uniforms).u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
    }
});
