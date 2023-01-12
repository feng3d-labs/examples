import { Color4, ColorMaterial, Geometry, Node3D, Vector3 } from 'feng3d';

const root = new Node3D();
root.addComponent('View3D');

const scene = root.addComponent('Scene');
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent('Camera');
camera.node3d.position = new Vector3(0, 1, -10);
root.addChild(camera.node3d);

const cube = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: Geometry.create('CubeGeometry'),
}).node3d;
scene.node3d.addChild(cube);

const sphere = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: Geometry.create('SphereGeometry'),
}).node3d;
sphere.position = new Vector3(-1.50, 0, 0);
scene.node3d.addChild(sphere);

const plane = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: Geometry.create('PlaneGeometry'),
}).node3d;
plane.position = new Vector3(1.50, 0, 0);
scene.node3d.addChild(plane);

const capsule = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: Geometry.create('CapsuleGeometry'),
}).node3d;
capsule.position = new Vector3(3, 0, 0);
scene.node3d.addChild(capsule);

const cylinder = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: Geometry.create('CylinderGeometry'),
}).node3d;
cylinder.position = new Vector3(-3, 0, 0);
scene.node3d.addChild(cylinder);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
//
camera.node3d.addComponent('FPSController');
