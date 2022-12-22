import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

var cube = feng3d.Object3D.createPrimitive("Cube");
cube.z = 3;
scene.object3D.addChild(cube);

//初始化颜色材质
var colorMaterial = cube.getComponent(feng3d.Renderable).material = new feng3d.ColorMaterial();

//变化旋转与颜色
setInterval(function ()
{
    cube.ry += 1;
}, 15);
setInterval(function ()
{
    (<feng3d.ColorUniforms>colorMaterial.uniforms).u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
}, 1000);
