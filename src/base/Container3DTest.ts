import * as feng3d from 'feng3d';

/**
 * 测试3D容器
 */
const scene = feng3d.serialization.setValue(new feng3d.Node3D(), { name: 'Untitled' }).addComponent(feng3d.Scene);
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

const camera = feng3d.serialization.setValue(new feng3d.Node3D(), { name: 'Main Camera' }).addComponent(feng3d.Camera);
camera.node3d.position = new feng3d.Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new feng3d.View(null, scene, camera);

// 初始化颜色材质
const cube = feng3d.Node3D.createPrimitive('Cube');
scene.node3d.addChild(cube);

const colorMaterial = cube.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();

const cylinder = feng3d.Node3D.createPrimitive('Cylinder');
cylinder.x = 2;
cube.addChild(cylinder);

let num = 0;
feng3d.ticker.onFrame(() =>
{
    console.log('update');

    // 变化旋转与颜色
    cube.ry += 1;

    num++;

    if (num % 60 === 0)
    {
        (<feng3d.ColorUniforms>colorMaterial.uniforms).u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
    }
});
