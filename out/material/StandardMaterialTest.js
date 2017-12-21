var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var cube = feng3d.GameObject.create();
    cube.transform.z = 300;
    cube.transform.y = -100;
    view3D.scene.gameObject.addChild(cube);
    //变化旋转与颜色
    setInterval(function () {
        cube.transform.ry += 1;
    }, 15);
    var model = cube.addComponent(feng3d.MeshRenderer);
    model.geometry = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
    // model.geometry = new PlaneGeometry();
    //材质
    var textureMaterial = model.material = new feng3d.StandardMaterial();
    textureMaterial.diffuseMethod.difuseTexture.url = 'resources/m.png';
    // textureMaterial.diffuseMethod.difuseTexture.url = 'resources/nonpowerof2.png';
    textureMaterial.diffuseMethod.difuseTexture.format = feng3d.TextureFormat.RGBA;
    // textureMaterial.diffuseMethod.alphaThreshold = 0.1;
    textureMaterial.diffuseMethod.difuseTexture.anisotropy = 16;
    textureMaterial.enableBlend = true;
    textureMaterial.diffuseMethod.color.a = 0.2;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=StandardMaterialTest.js.map