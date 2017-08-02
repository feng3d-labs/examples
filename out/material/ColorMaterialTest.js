var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    var cube = feng3d.GameObjectFactory.createCube();
    cube.transform.z = 300;
    view3D.scene.transform.addChild(cube.transform);
    //初始化颜色材质
    var colorMaterial = cube.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
    //变化旋转与颜色
    setInterval(function () {
        cube.transform.ry += 1;
    }, 15);
    setInterval(function () {
        colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
    }, 1000);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ColorMaterialTest.js.map