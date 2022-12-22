import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

var pointGeometry = new feng3d.PointGeometry();
var pointMaterial = new feng3d.PointMaterial();
var object3D = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "plane" });
var model = object3D.addComponent(feng3d.Renderable);
model.geometry = pointGeometry;
model.material = pointMaterial;
object3D.z = 3;
scene.object3D.addChild(object3D);

var length = 200;
var height = 2 / Math.PI;
for (var x = -length; x <= length; x = x + 4)
{
    var angle = x / length * Math.PI;
    var vec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
    pointGeometry.points.push({ position: vec });
}

//变化旋转
setInterval(function ()
{
    object3D.ry += 1;
    (<feng3d.PointUniforms>pointMaterial.uniforms).u_PointSize = 1 + 5 * Math.sin(object3D.ry / 30);
}, 15);
