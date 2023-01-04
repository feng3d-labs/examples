import * as feng3d from 'feng3d';

const { Camera, Color4, Node3D, Scene, View3D, ticker } = feng3d;

// 创建根结点
const root = new Node3D();

root.addComponent(View3D);

const scene = root.addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent(Camera);
scene.node3d.addChild(camera.node3d);

const cube = Node3D.createPrimitive('Cube');
cube.y = -1;
cube.z = 3;
scene.node3d.addChild(cube);

ticker.onFrame(() =>
{
    cube.ry++;
});
