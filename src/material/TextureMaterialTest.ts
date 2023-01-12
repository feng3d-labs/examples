import { $set, Color4, CubeGeometry, Node3D, TextureMaterial, Vector3 } from 'feng3d';

const root = new Node3D();
root.addComponent('View3D');

const scene = root.addComponent('Scene');
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent('Camera');
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const cube = new Node3D();
cube.z = 3;
cube.y = -1;
scene.node3d.addChild(cube);

// 变化旋转与颜色
setInterval(function ()
{
    cube.ry += 1;
}, 15);

const model = cube.addComponent('Mesh3D');
model.geometry = $set(new CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
// model.geometry = new PlaneGeometry();
// 材质
model.material = new TextureMaterial().init({
    uniforms: {
        s_texture: {
            __class__: 'Texture2D', source: { url: '../../../m.png' }, flipY: false
        }
    },
    renderParams: { enableBlend: true }
});
