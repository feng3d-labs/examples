import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.gameObject.position = new feng3d.Vector3(0, 1, -10);
scene.gameObject.addChild(camera.gameObject);

var engine = new feng3d.View(null, scene, camera);

var planeMaterial: feng3d.Material;
var sphereMaterial: feng3d.Material;
var cubeMaterial: feng3d.Material;
var torusMaterial: feng3d.Material;
var light1: feng3d.GameObject;
var light2: feng3d.GameObject;
var plane: feng3d.GameObject;
var sphere: feng3d.GameObject;
var cube: feng3d.GameObject;
var torus: feng3d.GameObject;

initEngine();
initLights();
initMaterials();
initObjects();
initListeners();

function initEngine()
{
    camera.gameObject.y = 5;
    camera.gameObject.z = -10;
    camera.gameObject.lookAt(new feng3d.Vector3());
    camera.gameObject.addComponent(feng3d.FPSController);
}

function initMaterials()
{
    planeMaterial = feng3d.serialization.setValue(new feng3d.Material(), {
        shaderName: "standard", uniforms: {
            s_diffuse: { __class__: "Texture2D", source: { url: "resources/floor_diffuse.jpg" } },
            s_normal: { __class__: "Texture2D", source: { url: "resources/floor_normal.jpg" } },
            s_specular: { __class__: "Texture2D", source: { url: "resources/floor_specular.jpg" } },
        }
    });
    sphereMaterial = feng3d.serialization.setValue(new feng3d.Material(), {
        shaderName: "standard", uniforms: {
            s_diffuse: { __class__: "Texture2D", source: { url: "resources/beachball_diffuse.jpg" } },
            s_specular: { __class__: "Texture2D", source: { url: "resources/beachball_specular.jpg" } },
        }
    });
    cubeMaterial = feng3d.serialization.setValue(new feng3d.Material(), {
        shaderName: "standard", uniforms: {
            s_diffuse: { __class__: "Texture2D", source: { url: "resources/trinket_diffuse.jpg" } },
            s_normal: { __class__: "Texture2D", source: { url: "resources/trinket_normal.jpg" } },
            s_specular: { __class__: "Texture2D", source: { url: "resources/trinket_specular.jpg" } },
        }
    });
    torusMaterial = feng3d.serialization.setValue(new feng3d.Material(), {
        shaderName: "standard", uniforms: {
            s_diffuse: { __class__: "Texture2D", source: { url: "resources/weave_diffuse.jpg" } },
            s_normal: { __class__: "Texture2D", source: { url: "resources/weave_normal.jpg" } },
            s_specular: { __class__: "Texture2D", source: { url: "resources/weave_diffuse.jpg" } },
        }
    });
}

function initLights()
{
    scene.ambientColor.a = 0.2;

    light1 = new feng3d.GameObject();
    var directionalLight = light1.addComponent(feng3d.DirectionalLight);
    directionalLight.intensity = 0.7;
    light1.rx = 90;
    scene.gameObject.addChild(light1);

    light2 = new feng3d.GameObject();
    var directionalLight = light2.addComponent(feng3d.DirectionalLight);
    directionalLight.color.fromUnit(0x00FFFF);
    directionalLight.intensity = 0.7;
    light2.rx = 90;
    scene.gameObject.addChild(light2);
}

function initObjects()
{
    plane = new feng3d.GameObject();
    var model = plane.addComponent(feng3d.Renderable);
    var geometry: feng3d.Geometry = model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 10, height: 10 });
    model.material = planeMaterial;
    geometry.scaleU = 2;
    geometry.scaleV = 2;
    plane.y = -0.20;
    scene.gameObject.addChild(plane);
    sphere = new feng3d.GameObject();
    var model = sphere.addComponent(feng3d.Renderable);
    model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 1.50, segmentsW: 40, segmentsH: 20 })
    model.material = sphereMaterial;
    sphere.x = 3;
    sphere.y = 1.60;
    sphere.z = 3.00;
    scene.gameObject.addChild(sphere);
    cube = new feng3d.GameObject();
    var model = cube.addComponent(feng3d.Renderable);
    model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 2, height: 2, depth: 2, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
    model.material = cubeMaterial;
    cube.x = 3.00;
    cube.y = 1.60;
    cube.z = -2.50;
    scene.gameObject.addChild(cube);
    torus = new feng3d.GameObject();
    var model = torus.addComponent(feng3d.Renderable);
    geometry = model.geometry = feng3d.serialization.setValue(new feng3d.TorusGeometry(), { radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
    model.material = torusMaterial;
    geometry.scaleU = 10;
    geometry.scaleV = 5;
    torus.x = -2.50;
    torus.y = 1.60;
    torus.z = -2.50;
    scene.gameObject.addChild(torus);
}

function initListeners()
{
    feng3d.ticker.onframe(onEnterFrame, this);
}

function onEnterFrame()
{
    light1.rx = 30;
    light1.ry++;
}
