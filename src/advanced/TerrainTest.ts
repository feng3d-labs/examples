import * as feng3d from 'feng3d';

const scene = feng3d.serialization.setValue(new feng3d.Node3D(), { name: 'Untitled' }).addComponent(feng3d.Scene);
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

const camera = feng3d.serialization.setValue(new feng3d.Node3D(), { name: 'Main Camera' }).addComponent(feng3d.Camera);
camera.node3d.position = new feng3d.Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new feng3d.View(null, scene, camera);

camera.node3d.x = 0;
camera.node3d.y = 80;
camera.node3d.z = 0;
// camera.node3d.lookAt(new feng3d.Vector3());
camera.node3d.addComponent(feng3d.FPSController);

const root = '../../../terrain/';
//
const terrain = feng3d.serialization.setValue(new feng3d.Node3D(), { name: 'terrain' });
const model = terrain.addComponent(feng3d.MeshRenderer);
// model.geometry = new feng3d.TerrainGeometry();
model.geometry = new feng3d.TerrainGeometry({
    heightMap: { __class__: 'Texture2D', source: { url: `${root}terrain_heights.jpg` } },
    width: 500, height: 100, depth: 500,
    segmentsW: 100,
    segmentsH: 100,
});
const material = new feng3d.TerrainMaterial().init({
    uniforms: {
        s_diffuse: { __class__: 'Texture2D', source: { url: `${root}terrain_diffuse.jpg` } },
        s_normal: { __class__: 'Texture2D', source: { url: `${root}terrain_normals.jpg` } },
        //
        s_blendTexture: { __class__: 'Texture2D', source: { url: `${root}terrain_splats.png` }, minFilter: 'LINEAR_MIPMAP_LINEAR' },
        s_splatTexture1: { __class__: 'Texture2D', source: { url: `${root}beach.jpg` }, minFilter: 'LINEAR_MIPMAP_LINEAR' },
        s_splatTexture2: { __class__: 'Texture2D', source: { url: `${root}grass.jpg` }, minFilter: 'LINEAR_MIPMAP_LINEAR' },
        s_splatTexture3: { __class__: 'Texture2D', source: { url: `${root}rock.jpg` }, minFilter: 'LINEAR_MIPMAP_LINEAR' },
        u_splatRepeats: new feng3d.Vector4(1, 50, 50, 50),
    }
});

model.material = material;
scene.node3d.addChild(terrain);

scene.ambientColor.setTo(0.2, 0.2, 0.2, 1.0);

// 初始化光源
const light1 = new feng3d.Node3D();
const pointLight1 = light1.addComponent(feng3d.PointLight);
pointLight1.range = 5000;
pointLight1.color = new feng3d.Color3(1, 1, 1);
// pointLight1.shadowType = feng3d.ShadowType.PCF_Shadows;
light1.y = 1000;
scene.node3d.addChild(light1);

//
feng3d.ticker.onFrame(() =>
{
    const time = new Date().getTime();
    const angle = time / 1000 / 5;
    light1.y = Math.sin(angle) * 1000;
    light1.z = Math.cos(angle) * 1000;

    // console.log(light1.y, light1.z);
});
