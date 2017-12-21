var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var scene = view3D.scene;
    var cube = feng3d.GameObject.create();
    cube.transform.z = 300;
    cube.transform.y = -100;
    scene.gameObject.addChild(cube);
    var model = cube.addComponent(feng3d.MeshRenderer);
    model.geometry = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
    //材质
    var material = model.material = new feng3d.StandardMaterial();
    material.diffuseMethod.difuseTexture.url = 'resources/m.png';
    material.fogMethod.enable = true;
    material.fogMethod.fogColor = new feng3d.Color(1, 1, 0);
    material.fogMethod.minDistance = 200;
    material.fogMethod.maxDistance = 300;
    feng3d.ticker.onframe(function () {
        cube.transform.ry += 1;
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=FogTest.js.map