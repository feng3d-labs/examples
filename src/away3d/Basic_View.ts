import { Camera, Color4, MeshRenderer, Node3D, PlaneGeometry, Scene, serialization, StandardMaterial, ticker, Vector3, View } from "feng3d";

var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

camera.node3d.z = -6;
camera.node3d.y = 5;
camera.node3d.lookAt(new Vector3());

var plane = new Node3D();
var model = plane.addComponent(MeshRenderer);
model.geometry = serialization.setValue(new PlaneGeometry(), { width: 7, height: 7 });
var material = model.material = new StandardMaterial().init({ uniforms: { s_diffuse: { __class__: "Texture2D", source: { url: "resources/floor_diffuse.jpg" } } } });
scene.node3d.addChild(plane);

ticker.onFrame(() =>
{
    plane.ry += 1;
});
