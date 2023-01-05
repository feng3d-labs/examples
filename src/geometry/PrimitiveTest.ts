import { Camera, Color4, LookAtController, mathUtil, Node3D, Scene, $set, Vector3, View3D } from 'feng3d';

const root = new Node3D();
root.addComponent(View3D);

const scene = root.addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const cube = Node3D.createPrimitive('Cube');
scene.node3d.addChild(cube);

const plane = Node3D.createPrimitive('Plane');
plane.position = new Vector3(1.50, 0, 0);
plane.rx = -90;
plane.scale.set(0.1, 0.1, 0.1);
scene.node3d.addChild(plane);

const sphere = Node3D.createPrimitive('Sphere');
sphere.position = new Vector3(-1.50, 0, 0);
scene.node3d.addChild(sphere);

const capsule = Node3D.createPrimitive('Capsule');
capsule.position = new Vector3(3, 0, 0);
scene.node3d.addChild(capsule);

const cylinder = Node3D.createPrimitive('Cylinder');
cylinder.position = new Vector3(-3, 0, 0);
scene.node3d.addChild(cylinder);

const controller = new LookAtController(camera.node3d);
controller.lookAtPosition = new Vector3();
//
setInterval(() =>
{
    const time = new Date().getTime();
    let angle = (Math.round(time / 17) % 360);
    angle = angle * mathUtil.DEG2RAD;
    camera.node3d.position = new Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));

    controller.update();
}, 17);
