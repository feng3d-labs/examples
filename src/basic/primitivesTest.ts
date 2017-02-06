var canvas = document.getElementById("glcanvas");
var view3D = new feng3d.View3D(canvas);
var scene3D = view3D.scene;

var cube = feng3d.$object3DFactory.createCube();
scene3D.addChild(cube);

var plane = feng3d.$object3DFactory.createPlane();
plane.transform.position = new feng3d.Vector3D(150, 0, 0);
plane.transform.rotation = new feng3d.Vector3D(90, 0, 0);
scene3D.addChild(plane);

var sphere = feng3d.$object3DFactory.createSphere();
sphere.transform.position = new feng3d.Vector3D(-150, 0, 0);
scene3D.addChild(sphere);

var capsule = feng3d.$object3DFactory.createCapsule();
capsule.transform.position = new feng3d.Vector3D(300, 0, 0);
scene3D.addChild(capsule);

var cylinder = feng3d.$object3DFactory.createCylinder();
cylinder.transform.position = new feng3d.Vector3D(-300, 0, 0);
scene3D.addChild(cylinder);

var cameraObj = new feng3d.Object3D("camera");
cameraObj.addComponent(this.view3D.camera);
var controller = new feng3d.LookAtController(cameraObj.transform);
controller.lookAtPosition = new feng3d.Vector3D();
//
process();
setInterval(this.process, 17);

function process() {

    var time = new Date().getTime();
    var angle = (Math.round(time / 17) % 360);
    angle = angle * feng3d.MathConsts.DEGREES_TO_RADIANS;
    this.cameraObj.transform.position = new feng3d.Vector3D(1000 * Math.sin(angle), 0, 1000 * Math.cos(angle));

    this.controller.update();
}