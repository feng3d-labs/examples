import * as feng3d from 'feng3d';

const scene = feng3d.serialization.setValue(new feng3d.Node3D(), { name: 'Untitled' }).addComponent(feng3d.Scene);
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

const camera = feng3d.serialization.setValue(new feng3d.Node3D(), { name: 'Main Camera' }).addComponent(feng3d.Camera);
camera.node3d.position = new feng3d.Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new feng3d.View(null, scene, camera);

//
camera.node3d.z = -5;
camera.node3d.y = 2;
camera.node3d.lookAt(new feng3d.Vector3());
camera.node3d.addComponent(feng3d.FPSController);

const root = '../../../terrain/';
//
const terrain = feng3d.serialization.setValue(new feng3d.Node3D(), { name: 'terrain' });
const model = terrain.addComponent(feng3d.MeshRenderer);
model.geometry = new feng3d.TerrainGeometry({ heightMap: { __class__: 'Texture2D', source: { url: `${root}terrain_heights.jpg` } } });
const material = new feng3d.StandardMaterial().init({
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
const light1 = new feng3d.Node3D();
const pointLight1 = light1.addComponent(feng3d.PointLight);
// pointLight1.range = 1000;
pointLight1.color = new feng3d.Color3(1, 1, 0);
light1.y = 3;
// scene.node3d.addChild(light1);

//
feng3d.ticker.onFrame(() =>
{
    const time = new Date().getTime();
    const angle = time / 1000;
    light1.x = Math.sin(angle) * 3;
    light1.z = Math.cos(angle) * 3;
});

