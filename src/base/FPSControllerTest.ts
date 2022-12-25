import { Camera, Color4, FPSController, Node3D, Scene, serialization, Vector3, View } from 'feng3d';

const scene = serialization.setValue(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = serialization.setValue(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View(null, scene, camera);

const cube = Node3D.createPrimitive('Cube');
scene.node3d.addChild(cube);

const sphere = Node3D.createPrimitive('Sphere');
sphere.position = new Vector3(-1.50, 0, 0);
scene.node3d.addChild(sphere);

const capsule = Node3D.createPrimitive('Capsule');
capsule.position = new Vector3(3, 0, 0);
scene.node3d.addChild(capsule);

const cylinder = Node3D.createPrimitive('Cylinder');
cylinder.position = new Vector3(-3, 0, 0);
scene.node3d.addChild(cylinder);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
//
camera.node3d.addComponent(FPSController);
