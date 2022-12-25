import { $set, Camera, Color3, Color4, CubeGeometry, FogMode, MeshRenderer, Node3D, Scene, StandardMaterial, ticker, Vector3, View } from 'feng3d';

const scene = $set(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = $set(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node.addChild(camera.node3d);

const engine = new View(null, scene, camera);

const cube = new Node3D();
cube.z = -7;
cube.y = 0;
scene.node.addChild(cube);

const model = cube.addComponent(MeshRenderer);
model.geometry = $set(new CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
// 材质
const material = model.material = new StandardMaterial().init({
    uniforms: {
        s_diffuse: {
            __class__: 'Texture2D',
            source: { url: '../../../m.png' }
        },
        u_fogMode: FogMode.LINEAR,
        u_fogColor: new Color3(1, 1, 0),
        u_fogMinDistance: 2,
        u_fogMaxDistance: 3,
    }
});

ticker.onFrame(() =>
{
    cube.ry += 1;
});
