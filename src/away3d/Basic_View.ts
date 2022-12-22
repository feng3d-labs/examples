import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

camera.object3D.z = -6;
camera.object3D.y = 5;
camera.object3D.lookAt(new feng3d.Vector3());

var plane = new feng3d.Object3D();
var model = plane.addComponent(feng3d.Renderable);
model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 7, height: 7 });
var material = model.material = new feng3d.StandardMaterial().init({ uniforms: { s_diffuse: { __class__: "Texture2D", source: { url: "resources/floor_diffuse.jpg" } } } });
scene.object3D.addChild(plane);

feng3d.ticker.onFrame(() =>
{
    plane.ry += 1;
});
