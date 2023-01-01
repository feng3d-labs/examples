import * as feng3d from 'feng3d';

const { Camera, Color4, Node3D, Scene, Vector3, View, ticker } = feng3d;

const scene = new Node3D().addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent(Camera);
scene.node3d.addChild(camera.node3d);

const app = new View(null, scene, camera);

const cube = Node3D.createPrimitive('Cube');
cube.y = -1;
cube.z = 3;
scene.node3d.addChild(cube);

ticker.onFrame(() =>
{
    cube.ry++;
});
