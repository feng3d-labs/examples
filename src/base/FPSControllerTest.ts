import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

var cube = feng3d.Object3D.createPrimitive("Cube");
scene.object3D.addChild(cube);

var sphere = feng3d.Object3D.createPrimitive("Sphere");
sphere.position = new feng3d.Vector3(-1.50, 0, 0);
scene.object3D.addChild(sphere);

var capsule = feng3d.Object3D.createPrimitive("Capsule");
capsule.position = new feng3d.Vector3(3, 0, 0);
scene.object3D.addChild(capsule);

var cylinder = feng3d.Object3D.createPrimitive("Cylinder");
cylinder.position = new feng3d.Vector3(-3, 0, 0);
scene.object3D.addChild(cylinder);

camera.object3D.z = -5;
camera.object3D.lookAt(new feng3d.Vector3());
//
camera.object3D.addComponent(feng3d.FPSController);
