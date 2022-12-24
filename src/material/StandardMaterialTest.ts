import { Camera, Color4, CubeGeometry, MeshRenderer, Node3D, Scene, serialization, StandardMaterial, StandardUniforms, Texture2D, Vector3, View } from 'feng3d';

var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

var cube = new Node3D();
cube.z = 3;
cube.y = -1;
scene.node3d.addChild(cube);

//变化旋转与颜色
setInterval(function ()
{
    cube.ry += 1;
}, 15);

var model = cube.addComponent(MeshRenderer);
model.geometry = serialization.setValue(new CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
// model.geometry = new PlaneGeometry();
//材质
var textureMaterial = model.material = new StandardMaterial();
var uniforms = <StandardUniforms>textureMaterial.uniforms;
uniforms.s_diffuse = new Texture2D();
uniforms.s_diffuse.source = { url: 'resources/m.png' };
// textureMaterial.uniforms.s_diffuse.url = 'resources/nonpowerof2.png';
uniforms.s_diffuse.format = 'RGBA';
// textureMaterial.diffuseMethod.alphaThreshold = 0.1;

uniforms.s_diffuse.anisotropy = 16;
uniforms.u_diffuse.a = 0.2;

textureMaterial.renderParams.enableBlend = true;
