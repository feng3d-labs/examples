import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

camera.object3D.x = 0;
camera.object3D.y = 80;
camera.object3D.z = 0;
// camera.object3D.lookAt(new feng3d.Vector3());
camera.object3D.addComponent(feng3d.FPSController);

var root = 'resources/terrain/';
//
var terrain = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "terrain" });
var model = terrain.addComponent(feng3d.Renderable);
// model.geometry = new feng3d.TerrainGeometry();
model.geometry = new feng3d.TerrainGeometry({
    heightMap: { __class__: "Texture2D", source: { url: root + 'terrain_heights.jpg' } },
    width: 500, height: 100, depth: 500,
    segmentsW: 100,
    segmentsH: 100,
});
var material = feng3d.Material.create('terrain', {
    s_diffuse: { __class__: "Texture2D", source: { url: root + 'terrain_diffuse.jpg' } },
    s_normal: { __class__: "Texture2D", source: { url: root + 'terrain_normals.jpg' } },
    //
    s_blendTexture: { __class__: "Texture2D", source: { url: root + 'terrain_splats.png' }, minFilter: feng3d.TextureMinFilter.LINEAR_MIPMAP_LINEAR },
    s_splatTexture1: { __class__: "Texture2D", source: { url: root + 'beach.jpg' }, minFilter: feng3d.TextureMinFilter.LINEAR_MIPMAP_LINEAR },
    s_splatTexture2: { __class__: "Texture2D", source: { url: root + 'grass.jpg' }, minFilter: feng3d.TextureMinFilter.LINEAR_MIPMAP_LINEAR },
    s_splatTexture3: { __class__: "Texture2D", source: { url: root + 'rock.jpg' }, minFilter: feng3d.TextureMinFilter.LINEAR_MIPMAP_LINEAR },
    u_splatRepeats: new feng3d.Vector4(1, 50, 50, 50),
})

model.material = material;
scene.object3D.addChild(terrain);

scene.ambientColor.setTo(0.2, 0.2, 0.2, 1.0);

//初始化光源
var light1 = new feng3d.Object3D();
var pointLight1 = light1.addComponent(feng3d.PointLight);
pointLight1.range = 5000;
pointLight1.color = new feng3d.Color3(1, 1, 1);
// pointLight1.shadowType = feng3d.ShadowType.PCF_Shadows;
light1.y = 1000;
scene.object3D.addChild(light1);

//
feng3d.ticker.onFrame(() =>
{
    var time = new Date().getTime();
    var angle = time / 1000 / 5;
    light1.y = Math.sin(angle) * 1000;
    light1.z = Math.cos(angle) * 1000;

    // console.log(light1.y, light1.z);
});
