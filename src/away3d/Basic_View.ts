import { $set, Camera, Color4, MeshRenderer, Node3D, PlaneGeometry, Scene, StandardMaterial, ticker, Vector3, View3D } from 'feng3d';

const scene = new Node3D().addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View3D(null, scene, camera);

camera.node3d.z = -6;
camera.node3d.y = 5;
camera.node3d.lookAt(new Vector3());

const plane = new Node3D();
const model = plane.addComponent(MeshRenderer);
model.geometry = $set(new PlaneGeometry(), { width: 7, height: 7 });
const material = model.material = new StandardMaterial().init({ uniforms: { s_diffuse: { __class__: 'Texture2D', source: { url: '../../../floor_diffuse.jpg' } } } });
scene.node3d.addChild(plane);

ticker.onFrame(() =>
{
    plane.ry += 1;
});
