import { Camera, Color4, ColorMaterial, ColorUniforms, MeshRenderer, Node3D, Scene, serialization, Vector3, View } from "feng3d";

var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

var cube = Node3D.createPrimitive("Cube");
cube.z = 3;
scene.node3d.addChild(cube);

//初始化颜色材质
var colorMaterial = cube.getComponent(MeshRenderer).material = new ColorMaterial();

//变化旋转与颜色
setInterval(function ()
{
    cube.ry += 1;
}, 15);
setInterval(function ()
{
    (<ColorUniforms>colorMaterial.uniforms).u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
}, 1000);
