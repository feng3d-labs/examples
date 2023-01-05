import { $set, Camera, Color4, FPSController, Node3D, Scene, Vector3, View3D } from 'feng3d';

const root = new Node3D();
root.addComponent(View3D);

const scene = root.addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
root.addChild(camera.node3d);

const cube = Node3D.createPrimitive('Cube');
root.addChild(cube);

const sphere = Node3D.createPrimitive('Sphere');
sphere.position = new Vector3(-1.50, 0, 0);
root.addChild(sphere);

const capsule = Node3D.createPrimitive('Capsule');
capsule.position = new Vector3(3, 0, 0);
root.addChild(capsule);

const cylinder = Node3D.createPrimitive('Cylinder');
cylinder.position = new Vector3(-3, 0, 0);
root.addChild(cylinder);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
//
camera.node3d.addComponent(FPSController);
