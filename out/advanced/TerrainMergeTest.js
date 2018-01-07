var view3D = new feng3d.Engine();
var scene = view3D.scene;
var camera = view3D.camera;
camera.transform.z = -5;
camera.transform.y = 2;
camera.transform.lookAt(new feng3d.Vector3D());
camera.gameObject.addComponent(feng3d.FPSController);
var root = 'resources/terrain/';
//
var terrain = feng3d.GameObject.create("terrain");
var meshRenderer = terrain.addComponent(feng3d.MeshRenderer);
meshRenderer.geometry = new feng3d.TerrainGeometry(root + 'terrain_heights.jpg');
var material = new feng3d.StandardMaterial(root + 'terrain_diffuse.jpg', root + "terrain_normals.jpg");
// var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test3.jpg',new Vector3D(50, 50, 50));
// material.terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png', root + 'test1.jpg', new Vector3D(50, 50, 50));
meshRenderer.material = material;
scene.gameObject.addChild(terrain);
//初始化光源
var light1 = feng3d.GameObject.create();
var pointLight1 = light1.addComponent(feng3d.PointLight);
// pointLight1.range = 1000;
pointLight1.color = new feng3d.Color(1, 1, 0, 1);
light1.transform.y = 3;
// scene.transform.addChild(light1);
//
feng3d.ticker.onframe(function () {
    var time = new Date().getTime();
    var angle = time / 1000;
    light1.transform.x = Math.sin(angle) * 3;
    light1.transform.z = Math.cos(angle) * 3;
});
//# sourceMappingURL=TerrainMergeTest.js.map