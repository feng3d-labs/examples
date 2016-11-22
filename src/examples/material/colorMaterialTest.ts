var canvas = document.getElementById("glcanvas");
var view3D = new feng3d.View3D(canvas);

var cube = new feng3d.Object3D("cube", [
    feng3d.primitives.createCube(),
    new feng3d.Space3D(0, 0, 300)
]);
this.view3D.scene.addChild(cube);

//初始化颜色材质
var colorMaterial = cube.getComponentByClass(feng3d.Material).getOrCreateComponentByClass(feng3d.ColorMaterial);

//变化旋转与颜色
setInterval(function () {
    cube.space3D.ry += 1;
}, 15);
setInterval(function () {
    colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
}, 1000);