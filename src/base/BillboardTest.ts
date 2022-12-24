import { BillboardComponent, Camera, Color4, FPSController, HoldSizeComponent, MeshRenderer, Node3D, PlaneGeometry, Scene, serialization, StandardMaterial, Vector3, View } from 'feng3d';

var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

camera.node3d.addComponent(FPSController);
scene.background.setTo(0.3, 0.3, 0.3, 1);

var cube = Node3D.createPrimitive("Cube");
cube.z = 3;
scene.node3d.addChild(cube);

var object3D = Node3D.createPrimitive("Plane");
object3D.y = 1.50;
var holdSizeComponent = object3D.addComponent(HoldSizeComponent);
holdSizeComponent.holdSize = 1;
holdSizeComponent.camera = camera;
var billboardComponent = object3D.addComponent(BillboardComponent);
billboardComponent.camera = camera;
cube.addChild(object3D);

//材质
var model = object3D.getComponent(MeshRenderer);
model.geometry = serialization.setValue(new PlaneGeometry(), { width: 0.1, height: 0.1, segmentsW: 1, segmentsH: 1, yUp: false });
var textureMaterial = model.material = new StandardMaterial().init({ uniforms: { s_diffuse: { __class__: "Texture2D", source: { url: 'resources/m.png' } } } });
// textureMaterial.cullFace = 'NONE';
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
