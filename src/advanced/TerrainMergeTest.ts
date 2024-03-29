import { $set, Color3, Color4, Node3D, StandardMaterial, Terrain3DGeometry, ticker, Vector3 } from 'feng3d';

const root = new Node3D();
root.addComponent('WebGLRenderer3D');

const scene = root.addComponent('Scene3D');
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent('Camera3D');
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

//
camera.node3d.z = -5;
camera.node3d.y = 2;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent('FPSController3D');

const rootPath = '../../../terrain/';
//
const terrain = $set(new Node3D(), { name: 'terrain' });
const model = terrain.addComponent('Mesh3D');
model.geometry = new Terrain3DGeometry({ heightMap: { __class__: 'Texture2D', source: { url: `${rootPath}terrain_heights.jpg` } } });
const material = new StandardMaterial().init({
    uniforms: {
        s_diffuse: { __class__: 'Texture2D', source: { url: `${rootPath}terrain_diffuse.jpg` } },
        s_normal: { __class__: 'Texture2D', source: { url: `${rootPath}terrain_normals.jpg` } },
    }
});

// var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test3.jpg',new Vector3(50, 50, 50));
// material.terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png', root + 'test1.jpg', new Vector3(50, 50, 50));
model.material = material;
scene.node3d.addChild(terrain);

// 初始化光源
const light1 = new Node3D();
const pointLight1 = light1.addComponent('PointLight3D');
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

