var feng3d;
(function (feng3d) {
    /**
     * 测试3D容器
     */
    var view3D = new feng3d.Engine();
    var scene = view3D.scene;
    //初始化颜色材质
    var cube = feng3d.GameObjectFactory.createCube();
    cube.transform.z = 500;
    scene.transform.addChild(cube.transform);
    var colorMaterial = cube.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
    var cylinder = feng3d.GameObjectFactory.createCylinder();
    cylinder.transform.x = 200;
    cube.transform.addChild(cylinder.transform);
    //变化旋转与颜色
    setInterval(function () {
        cube.transform.ry += 1;
    }, 15);
    setInterval(function () {
        colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
    }, 1000);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Container3DTest.js.map