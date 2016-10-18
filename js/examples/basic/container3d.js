var canvas = document.getElementById("glcanvas");
var view3D = new feng3d.View3D(canvas);
//初始化颜色材质
var colorMaterial = new feng3d.ColorMaterial();
var cube = new feng3d.Object3D("cube", [
    feng3d.primitives.createCube(),
    new feng3d.Space3D(0, 0, 500),
    colorMaterial,
]);
view3D.scene.addChild(cube);
var cylinderColorMaterial = new feng3d.ColorMaterial();
var cylinder = new feng3d.Object3D("cylinder", [
    feng3d.primitives.createCylinder(),
    new feng3d.Space3D(200, 0, 0, 0, 0, 0),
    cylinderColorMaterial,
]);
cube.addChild(cylinder);
//变化旋转与颜色
setInterval(function () {
    cube.space3D.ry += 1;
}, 15);
setInterval(function () {
    colorMaterial.color.color = Math.random() * (1 << 32 - 1);
}, 1000);
//# sourceMappingURL=container3d.js.map