import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

//
camera.object3D.z = -5;
camera.object3D.y = 2;
camera.object3D.lookAt(new feng3d.Vector3());
camera.object3D.addComponent(feng3d.FPSController);

var root = 'resources/terrain/';
//
var terrain = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "terrain" });
var model = terrain.addComponent(feng3d.Renderable);
model.geometry = new feng3d.TerrainGeometry({ heightMap: { __class__: "Texture2D", source: { url: root + 'terrain_heights.jpg' } } });
var material = feng3d.serialization.setValue(new feng3d.Material(), {
    shaderName: "standard", uniforms: {
        s_diffuse: { __class__: "Texture2D", source: { url: root + 'terrain_diffuse.jpg' } },
        s_normal: { __class__: "Texture2D", source: { url: root + 'terrain_normals.jpg' } },
    }
});

// var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test3.jpg',new Vector3(50, 50, 50));
// material.terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png', root + 'test1.jpg', new Vector3(50, 50, 50));
model.material = material;
scene.object3D.addChild(terrain);

//初始化光源
var light1 = new feng3d.Object3D();
var pointLight1 = light1.addComponent(feng3d.PointLight);
// pointLight1.range = 1000;
pointLight1.color = new feng3d.Color3(1, 1, 0);
light1.y = 3;
// scene.object3D.addChild(light1);

//
feng3d.ticker.onFrame(() =>
{
    var time = new Date().getTime();
    var angle = time / 1000;
    light1.x = Math.sin(angle) * 3;
    light1.z = Math.cos(angle) * 3;
});

