import { Camera, Color3, Color4, FPSController, MeshRenderer, Node3D, PointLight, Scene, serialization, StandardMaterial, TerrainGeometry, ticker, Vector3, View } from 'feng3d';

const scene = serialization.setValue(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = serialization.setValue(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View(null, scene, camera);

//
camera.node3d.z = -5;
camera.node3d.y = 2;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent(FPSController);

const root = '../../../terrain/';
//
const terrain = serialization.setValue(new Node3D(), { name: 'terrain' });
const model = terrain.addComponent(MeshRenderer);
model.geometry = new TerrainGeometry({ heightMap: { __class__: 'Texture2D', source: { url: `${root}terrain_heights.jpg` } } });
const material = new StandardMaterial().init({
    uniforms: {
        s_diffuse: { __class__: 'Texture2D', source: { url: `${root}terrain_diffuse.jpg` } },
        s_normal: { __class__: 'Texture2D', source: { url: `${root}terrain_normals.jpg` } },
    }
});

// var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test3.jpg',new Vector3(50, 50, 50));
// material.terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png', root + 'test1.jpg', new Vector3(50, 50, 50));
model.material = material;
scene.node3d.addChild(terrain);

// 初始化光源
const light1 = new Node3D();
const pointLight1 = light1.addComponent(PointLight);
// pointLight1.range = 1000;
pointLight1.color = new Color3(1, 1, 0);
light1.y = 3;
// scene.node3d.addChild(light1);

//
ticker.onFrame(() =>
{
    const time = new Date().getTime();
    const angle = time / 1000;
    light1.x = Math.sin(angle) * 3;
    light1.z = Math.cos(angle) * 3;
});

