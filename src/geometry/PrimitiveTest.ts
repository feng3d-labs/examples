import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

var cube = feng3d.Object3D.createPrimitive("Cube");
scene.object3D.addChild(cube);

var plane = feng3d.Object3D.createPrimitive("Plane");
plane.position = new feng3d.Vector3(1.50, 0, 0);
plane.rx = -90;
plane.scale.set(0.1, 0.1, 0.1);
scene.object3D.addChild(plane);

var sphere = feng3d.Object3D.createPrimitive("Sphere");
sphere.position = new feng3d.Vector3(-1.50, 0, 0);
scene.object3D.addChild(sphere);

var capsule = feng3d.Object3D.createPrimitive("Capsule");
capsule.position = new feng3d.Vector3(3, 0, 0);
scene.object3D.addChild(capsule);

var cylinder = feng3d.Object3D.createPrimitive("Cylinder");
cylinder.position = new feng3d.Vector3(-3, 0, 0);
scene.object3D.addChild(cylinder);

var controller = new feng3d.LookAtController(camera.object3D);
controller.lookAtPosition = new feng3d.Vector3();
//
setInterval(() =>
{
    var time = new Date().getTime();
    var angle = (Math.round(time / 17) % 360);
    angle = angle * feng3d.mathUtil.DEG2RAD;
    camera.object3D.position = new feng3d.Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));

    controller.update();
}, 17);
