import { Camera, CapsuleGeometry, Color4, ColorMaterial, CubeGeometry, CylinderGeometry, FPSController, MeshRenderer, Node3D, PlaneGeometry, Scene, SphereGeometry, Vector3, View3D } from 'feng3d';

/**
 * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
 */
const root = new Node3D();
root.addComponent(View3D);

const scene = root.addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent(FPSController);

const cube = new Node3D().addComponent(MeshRenderer, {
    material: new ColorMaterial(),
    geometry: new CubeGeometry(),
}).node3d;
cube.mouseEnabled = true;
scene.node3d.addChild(cube);

const sphere = new Node3D().addComponent(MeshRenderer, {
    material: new ColorMaterial(),
    geometry: new SphereGeometry(),
}).node3d;
sphere.position = new Vector3(-1.50, 0, 0);
sphere.mouseEnabled = true;
scene.node3d.addChild(sphere);

const plane = new Node3D().addComponent(MeshRenderer, {
    material: new ColorMaterial(),
    geometry: new PlaneGeometry(),
}).node3d;
plane.position = new Vector3(1.50, 0, 0);
plane.mouseEnabled = true;
scene.node3d.addChild(plane);

const capsule = new Node3D().addComponent(MeshRenderer, {
    material: new ColorMaterial(),
    geometry: new CapsuleGeometry(),
}).node3d;
capsule.position = new Vector3(3, 0, 0);
capsule.mouseEnabled = true;
scene.node3d.addChild(capsule);

const cylinder = new Node3D().addComponent(MeshRenderer, {
    material: new ColorMaterial(),
    geometry: new CylinderGeometry(),
}).node3d;
cylinder.position = new Vector3(-3, 0, 0);
cylinder.mouseEnabled = true;
scene.node3d.addChild(cylinder);

scene.on('click', (event) =>
{
    const node3d = <Node3D>event.target;
    if (node3d.getComponent(MeshRenderer))
    {
        const material = node3d.getComponent(MeshRenderer).material as ColorMaterial;
        material.uniforms.u_diffuseInput.random();
    }
});
