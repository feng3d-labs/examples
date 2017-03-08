var canvas = document.getElementById("glcanvas");
var view3D = new feng3d.View3D(canvas);
var scene3D = view3D.scene;

var cube = new feng3d.CubeObject3D();
scene3D.addChild(cube);

var plane = new feng3d.PlaneObject3D();
plane.transform.position = new feng3d.Vector3D(150, 0, 0);
plane.transform.rotation = new feng3d.Vector3D(90, 0, 0);
scene3D.addChild(plane);

var sphere = new feng3d.SphereObject3D();
sphere.transform.position = new feng3d.Vector3D(-150, 0, 0);
scene3D.addChild(sphere);

var capsule = new feng3d.CapsuleObject3D();
capsule.transform.position = new feng3d.Vector3D(300, 0, 0);
scene3D.addChild(capsule);

var cylinder = new feng3d.CylinderObject3D();
cylinder.transform.position = new feng3d.Vector3D(-300, 0, 0);
scene3D.addChild(cylinder);

var cameraObj = view3D.camera;
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