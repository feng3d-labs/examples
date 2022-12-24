import { Camera, Color4, MeshRenderer, Node3D, PointGeometry, PointMaterial, PointUniforms, Scene, serialization, Vector3, View } from "feng3d";

var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

var pointGeometry = new PointGeometry();
var pointMaterial = new PointMaterial();
var node3d = serialization.setValue(new Node3D(), { name: "plane" });
var model = node3d.addComponent(MeshRenderer);
model.geometry = pointGeometry;
model.material = pointMaterial;
node3d.z = 3;
scene.node3d.addChild(node3d);

var length = 200;
var height = 2 / Math.PI;
for (var x = -length; x <= length; x = x + 4)
{
    var angle = x / length * Math.PI;
    var vec = new Vector3(x / 100, Math.sin(angle) * height, 0);
    pointGeometry.points.push({ position: vec });
}

//变化旋转
setInterval(function ()
{
    node3d.ry += 1;
    (<PointUniforms>pointMaterial.uniforms).u_PointSize = 1 + 5 * Math.sin(node3d.ry / 30);
}, 15);
