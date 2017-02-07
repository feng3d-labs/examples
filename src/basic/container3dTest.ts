var canvas = document.getElementById("glcanvas");
var view3D = new feng3d.View3D(canvas);
//初始化颜色材质
var cube = new feng3d.CubeObject3D();
cube.transform.z = 500;
view3D.scene.addChild(cube);
var cylinder = new feng3d.CylinderObject3D();
cylinder.transform.x = 200;
cube.addChild(cylinder);

//初始化颜色材质
var colorMaterial = cube.getOrCreateComponentByClass(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();

//变化旋转与颜色
setInterval(function () {
    cube.transform.ry += 1;
}, 15);
setInterval(function () {
    colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
}, 1000);