import * as feng3d from 'feng3d';
import { StandardMaterial } from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

var light0 = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "pointLight" });
var light1 = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "pointLight" });

initObjects();
initLights();

feng3d.ticker.onFrame(setPointLightPosition);

camera.object3D.z = -5;
camera.object3D.y = 2;
camera.object3D.lookAt(new feng3d.Vector3());
camera.object3D.addComponent(feng3d.FPSController);
//
feng3d.windowEventProxy.on("keyup", (event) =>
{
    var boardKey = String.fromCharCode(event.data.keyCode).toLocaleLowerCase();
    switch (boardKey)
    {
        case "c":
            clearObjects();
            break;
        case "b":
            initObjects();
            scene.object3D.addChild(light0);
            scene.object3D.addChild(light1);
            break;
    }
});

function initObjects()
{
    var material = new feng3d.StandardMaterial().init({
        uniforms: {
            s_diffuse: { __class__: "Texture2D", source: { url: 'resources/head_diffuse.jpg' }, wrapS: 'MIRRORED_REPEAT', wrapT: 'MIRRORED_REPEAT' },
            s_normal: { __class__: "Texture2D", source: { url: 'resources/head_normals.jpg' }, wrapS: 'MIRRORED_REPEAT', wrapT: 'MIRRORED_REPEAT' },
            s_specular: { __class__: "Texture2D", source: { url: 'resources/head_specular.jpg' }, wrapS: 'MIRRORED_REPEAT', wrapT: 'MIRRORED_REPEAT' },
        }
    });

    //初始化立方体
    var plane = new feng3d.Object3D();
    plane.y = -1;
    var model = plane.addComponent(feng3d.Renderable);
    var geometry = model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 10, height: 10 });
    geometry.scaleU = 2;
    geometry.scaleV = 2;
    model.material = material;
    scene.object3D.addChild(plane);

    var cube = new feng3d.Object3D();
    var model = cube.addComponent(feng3d.Renderable);
    model.material = material;
    model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
    model.geometry.scaleU = 2;
    model.geometry.scaleV = 2;
    scene.object3D.addChild(cube);
}

function clearObjects()
{
    for (var i = scene.object3D.numChildren - 1; i >= 0; i--)
    {
        scene.object3D.removeChildAt(i);
    }
}

function initLights()
{
    scene.ambientColor.setTo(0.2, 0.2, 0.2, 1.0);

    //
    var lightColor0 = new feng3d.Color4(1, 0, 0, 1);
    var model = light0.addComponent(feng3d.Renderable);
    model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 0.05 });
    //初始化点光源
    var pointLight0 = light0.addComponent(feng3d.PointLight);
    pointLight0.shadowType = feng3d.ShadowType.PCF_Shadows;
    pointLight0.color = lightColor0.toColor3();
    model.material = new feng3d.ColorMaterial().init({ uniforms: { u_diffuseInput: lightColor0 } });
    scene.object3D.addChild(light0);

    //
    var lightColor1 = new feng3d.Color4(0, 1, 0, 1);
    model = light1.addComponent(feng3d.Renderable);
    model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 0.05 });
    //初始化点光源
    var pointLight1 = light1.addComponent(feng3d.DirectionalLight);
    pointLight1.shadowType = feng3d.ShadowType.PCF_Shadows;
    pointLight1.color = lightColor1.toColor3();
    model.material = new feng3d.ColorMaterial().init({ uniforms: { u_diffuseInput: lightColor1 } });
    scene.object3D.addChild(light1);
}

function setPointLightPosition()
{
    var time = new Date().getTime();
    //
    var angle = time / 1000;
    light0.y = 3;
    light0.x = Math.sin(angle) * 3;
    light0.z = Math.cos(angle) * 3;
    //
    angle = angle + Math.PI / 2;
    light1.y = 3;
    light1.x = Math.sin(angle) * 3;
    light1.z = Math.cos(angle) * 3;
    light1.lookAt(new feng3d.Vector3());
}
