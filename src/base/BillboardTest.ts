import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

camera.object3D.addComponent(feng3d.FPSController);
scene.background.setTo(0.3, 0.3, 0.3, 1);

var cube = feng3d.Object3D.createPrimitive("Cube");
cube.z = 3;
scene.object3D.addChild(cube);

var object3D = feng3d.Object3D.createPrimitive("Plane");
object3D.y = 1.50;
var holdSizeComponent = object3D.addComponent(feng3d.HoldSizeComponent);
holdSizeComponent.holdSize = 1;
holdSizeComponent.camera = camera;
var billboardComponent = object3D.addComponent(feng3d.BillboardComponent);
billboardComponent.camera = camera;
cube.addChild(object3D);

//材质
var model = object3D.getComponent(feng3d.Renderable);
model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 0.1, height: 0.1, segmentsW: 1, segmentsH: 1, yUp: false });
var textureMaterial = model.material = feng3d.serialization.setValue(new feng3d.Material(), { uniforms: { s_diffuse: { __class__: "Texture2D", source: { url: 'resources/m.png' } } } });
// textureMaterial.cullFace = CullFace.NONE;
//

// var texture = textureMaterial.texture = new ImageDataTexture();
// var canvas2D = document.createElement("canvas");
// canvas2D.width = 256;
// canvas2D.height = 256;
// var context2D = canvas2D.getContext("2d");
// // context2D.fillStyle = "red";
// // context2D.fillRect(0, 0, canvas2D.width, canvas2D.height);
// context2D.fillStyle = "green";
// context2D.font = '48px serif';
// // context2D.fillText('Hello world', 50, 100);
// context2D.fillText('Hello world', 0, 50);
// // context2D.strokeText('Hello world', 50, 100);
// var imageData = context2D.getImageData(0, 0, canvas2D.width, canvas2D.height);
// texture.pixels = imageData;

// object3D.holdSize = 1;
