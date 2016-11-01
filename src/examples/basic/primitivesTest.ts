var canvas = document.getElementById("glcanvas");
var view3D = new feng3d.View3D(canvas);
var scene3D = view3D.scene;

var cube = new feng3d.Object3D("cube", [
    feng3d.primitives.createCube(),
    new feng3d.Space3D(-100, 100, 300, 45, 45.0),
]);
scene3D.addChild(cube);

var plane = new feng3d.Object3D("plane", [
    feng3d.primitives.createPlane(),
    new feng3d.Space3D(100, 100, 300, 90, 0, 45),
]);
scene3D.addChild(plane);

var sphere = new feng3d.Object3D("sphere", [
    feng3d.primitives.createSphere(),
    new feng3d.Space3D(0, -100, 300, 90, 0, 45),
]);
scene3D.addChild(sphere);

var capsule = new feng3d.Object3D("capsule", [
    feng3d.primitives.createCapsule(),
    new feng3d.Space3D(200, -50, 500, 0, 0, 0),
]);
scene3D.addChild(capsule);

var cylinder = new feng3d.Object3D("cylinder", [
    feng3d.primitives.createCylinder(),
    new feng3d.Space3D(200, -200, 500, -90, 0, 0),
]);
scene3D.addChild(cylinder);