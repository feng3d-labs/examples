import { Camera, Color4, LookAtController, mathUtil, Node3D, Scene, serialization, Vector3, View } from 'feng3d';

var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

var cube = Node3D.createPrimitive("Cube");
scene.node3d.addChild(cube);

var plane = Node3D.createPrimitive("Plane");
plane.position = new Vector3(1.50, 0, 0);
plane.rx = -90;
plane.scale.set(0.1, 0.1, 0.1);
scene.node3d.addChild(plane);

var sphere = Node3D.createPrimitive("Sphere");
sphere.position = new Vector3(-1.50, 0, 0);
scene.node3d.addChild(sphere);

var capsule = Node3D.createPrimitive("Capsule");
capsule.position = new Vector3(3, 0, 0);
scene.node3d.addChild(capsule);

var cylinder = Node3D.createPrimitive("Cylinder");
cylinder.position = new Vector3(-3, 0, 0);
scene.node3d.addChild(cylinder);

var controller = new LookAtController(camera.node3d);
controller.lookAtPosition = new Vector3();
//
setInterval(() =>
{
    var time = new Date().getTime();
    var angle = (Math.round(time / 17) % 360);
    angle = angle * mathUtil.DEG2RAD;
    camera.node3d.position = new Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));

    controller.update();
}, 17);
