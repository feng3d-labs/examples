import { Camera, Color4, FPSController, MeshRenderer, Node3D, Scene, serialization, StandardMaterial, StandardUniforms, Vector3, View } from 'feng3d';

/**
 * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
 */
var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent(FPSController);

var cube = Node3D.createPrimitive("Cube");
cube.mouseEnabled = true;
cube.getComponent(MeshRenderer).material = new StandardMaterial();
scene.node3d.addChild(cube);

var sphere = Node3D.createPrimitive("Sphere");
sphere.position = new Vector3(-1.50, 0, 0);
sphere.mouseEnabled = true;
sphere.getComponent(MeshRenderer).material = new StandardMaterial();
scene.node3d.addChild(sphere);

var capsule = Node3D.createPrimitive("Capsule");
capsule.position = new Vector3(3, 0, 0);
capsule.mouseEnabled = true;
capsule.getComponent(MeshRenderer).material = new StandardMaterial();
scene.node3d.addChild(capsule);

var cylinder = Node3D.createPrimitive("Cylinder");
cylinder.position = new Vector3(-3, 0, 0);
cylinder.mouseEnabled = true;
cylinder.getComponent(MeshRenderer).material = new StandardMaterial();
scene.node3d.addChild(cylinder);

scene.on("click", (event) =>
{
    var node3d = <Node3D>event.target;
    if (node3d.getComponent(MeshRenderer))
    {
        var uniforms = <StandardUniforms>node3d.getComponent(MeshRenderer).material.uniforms;
        uniforms.u_diffuse.fromUnit(Math.random() * (1 << 24));
    }
});
