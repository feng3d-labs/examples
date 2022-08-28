import * as feng3d from 'feng3d';

/**
 * 测试3D容器
 */
var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

//初始化颜色材质
const cube = feng3d.Object3D.createPrimitive("Cube");
scene.object3D.addChild(cube);

const colorMaterial = cube.getComponent(feng3d.Renderable).material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color" });

var cylinder = feng3d.Object3D.createPrimitive("Cylinder");
cylinder.x = 2;
cube.addChild(cylinder);

let num = 0;
feng3d.ticker.onframe(() =>
{
    console.log("update")

    //变化旋转与颜色
    cube.ry += 1;

    num++;

    if (num % 60 == 0)
    {
        (<feng3d.ColorUniforms>colorMaterial.uniforms).u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
    }
});
