import { CapsuleGeometry, Color4, ColorMaterial, CubeGeometry, CylinderGeometry, Node3D, PlaneGeometry, SphereGeometry, Vector3 } from 'feng3d';

/**
 * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
 */
const root = new Node3D();
root.addComponent('View3D');

root.addComponent('MouseEvent3D'); // 启动3D结点鼠标事件响应功能。

const scene = root.addComponent('Scene3D');
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent('Camera3D');
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent('FPSController3D');

const cube = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: new CubeGeometry(),
}).node3d;
cube.mouseEnabled = true;
scene.node3d.addChild(cube);

const sphere = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: new SphereGeometry(),
}).node3d;
sphere.position = new Vector3(-1.50, 0, 0);
sphere.mouseEnabled = true;
scene.node3d.addChild(sphere);

const plane = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: new PlaneGeometry(),
}).node3d;
plane.position = new Vector3(1.50, 0, 0);
plane.mouseEnabled = true;
scene.node3d.addChild(plane);

const capsule = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: new CapsuleGeometry(),
}).node3d;
capsule.position = new Vector3(3, 0, 0);
capsule.mouseEnabled = true;
scene.node3d.addChild(capsule);

const cylinder = new Node3D().addComponent('Mesh3D', {
    material: new ColorMaterial(),
    geometry: new CylinderGeometry(),
}).node3d;
cylinder.position = new Vector3(-3, 0, 0);
cylinder.mouseEnabled = true;
scene.node3d.addChild(cylinder);

scene.emitter.on('click', (event) =>
{
    const meshRenderer = event.data.meshRenderer;
    const material = meshRenderer.material as ColorMaterial;
    material.uniforms.u_diffuseInput.random();
});

window.addEventListener('dblclick', () =>
{
    if (root.getComponent('MouseEvent3D'))
    {
        alert(`双击，移除 MouseEvent3D 组件，关闭鼠标响应功能！`);

        root.removeComponentsByType('MouseEvent3D');
    }
    else
    {
        alert(`双击，新增 MouseEvent3D 组件，开启鼠标响应功能！`);

        root.addComponent('MouseEvent3D');
    }
});
