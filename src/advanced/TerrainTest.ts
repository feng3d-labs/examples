import { $set, Color3, Color4, Node3D, Terrain3DGeometry, Terrain3DMaterial, ticker, Vector3, Vector4 } from 'feng3d';

const root = new Node3D();
root.addComponent('WebGLRenderer3D');

const scene = root.addComponent('Scene3D');
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent('Camera3D');
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

camera.node3d.x = 0;
camera.node3d.y = 80;
camera.node3d.z = 0;
// camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent('FPSController3D');

const rootPath = '../../../terrain/';
//
const terrain = $set(new Node3D(), { name: 'terrain' });
const model = terrain.addComponent('Mesh3D');
// model.geometry = new TerrainGeometry();
model.geometry = new Terrain3DGeometry({
    heightMap: { __class__: 'Texture2D', source: { url: `${rootPath}terrain_heights.jpg` } },
    width: 500, height: 100, depth: 500,
    segmentsW: 100,
    segmentsH: 100,
});
const material = new Terrain3DMaterial().init({
    uniforms: {
        s_diffuse: { __class__: 'Texture2D', source: { url: `${rootPath}terrain_diffuse.jpg` } },
        s_normal: { __class__: 'Texture2D', source: { url: `${rootPath}terrain_normals.jpg` } },
        //
        s_blendTexture: { __class__: 'Texture2D', source: { url: `${rootPath}terrain_splats.png` }, minFilter: 'LINEAR_MIPMAP_LINEAR' },
        s_splatTexture1: { __class__: 'Texture2D', source: { url: `${rootPath}beach.jpg` }, minFilter: 'LINEAR_MIPMAP_LINEAR' },
        s_splatTexture2: { __class__: 'Texture2D', source: { url: `${rootPath}grass.jpg` }, minFilter: 'LINEAR_MIPMAP_LINEAR' },
        s_splatTexture3: { __class__: 'Texture2D', source: { url: `${rootPath}rock.jpg` }, minFilter: 'LINEAR_MIPMAP_LINEAR' },
        u_splatRepeats: new Vector4(1, 50, 50, 50),
    }
});

model.material = material;
scene.node3d.addChild(terrain);

scene.ambientColor.setTo(0.2, 0.2, 0.2, 1.0);

// 初始化光源
const light1 = new Node3D();
const pointLight1 = light1.addComponent('PointLight3D');
pointLight1.range = 5000;
pointLight1.color = new Color3(1, 1, 1);
// pointLight1.shadowType = ShadowType.PCF_Shadows;
light1.y = 1000;
scene.node3d.addChild(light1);

//
ticker.onFrame(() =>
{
    const time = new Date().getTime();
    const angle = time / 1000 / 5;
    light1.y = Math.sin(angle) * 1000;
    light1.z = Math.cos(angle) * 1000;
});
