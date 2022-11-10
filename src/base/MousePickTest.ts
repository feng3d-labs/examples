import * as feng3d from 'feng3d';

/**
 * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
 */
var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

camera.object3D.z = -5;
camera.object3D.lookAt(new feng3d.Vector3());
camera.object3D.addComponent(feng3d.FPSController);

var cube = feng3d.Object3D.createPrimitive("Cube");
cube.mouseEnabled = true;
cube.getComponent(feng3d.Renderable).material = new feng3d.Material();
scene.object3D.addChild(cube);

var sphere = feng3d.Object3D.createPrimitive("Sphere");
sphere.position = new feng3d.Vector3(-1.50, 0, 0);
sphere.mouseEnabled = true;
sphere.getComponent(feng3d.Renderable).material = new feng3d.Material();
scene.object3D.addChild(sphere);

var capsule = feng3d.Object3D.createPrimitive("Capsule");
capsule.position = new feng3d.Vector3(3, 0, 0);
capsule.mouseEnabled = true;
capsule.getComponent(feng3d.Renderable).material = new feng3d.Material();
scene.object3D.addChild(capsule);

var cylinder = feng3d.Object3D.createPrimitive("Cylinder");
cylinder.position = new feng3d.Vector3(-3, 0, 0);
cylinder.mouseEnabled = true;
cylinder.getComponent(feng3d.Renderable).material = new feng3d.Material();
scene.object3D.addChild(cylinder);

scene.on("click", (event) =>
{
    var object3D = <feng3d.Object3D>event.target;
    if (object3D.getComponent(feng3d.Renderable))
    {
        var uniforms = <feng3d.StandardUniforms>object3D.getComponent(feng3d.Renderable).material.uniforms;
        uniforms.u_diffuse.fromUnit(Math.random() * (1 << 24));
    }
});
