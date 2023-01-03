import { $set, Camera, Color4, CubeGeometry, DirectionalLight, FPSController, Geometry, Material, MeshRenderer, Node3D, PlaneGeometry, Scene, SphereGeometry, StandardMaterial, ticker, TorusGeometry, Vector3, View } from 'feng3d';

const scene = $set(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = $set(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View(null, scene, camera);

let planeMaterial: Material;
let sphereMaterial: Material;
let cubeMaterial: Material;
let torusMaterial: Material;
let light1: Node3D;
let light2: Node3D;
let plane: Node3D;
let sphere: Node3D;
let cube: Node3D;
let torus: Node3D;

initEngine();
initLights();
initMaterials();
initObjects();
initListeners();

function initEngine()
{
    camera.node3d.y = 5;
    camera.node3d.z = -10;
    camera.node3d.lookAt(new Vector3());
    camera.node3d.addComponent(FPSController);
}

function initMaterials()
{
    planeMaterial = new StandardMaterial().init({
        uniforms: {
            s_diffuse: { __class__: 'Texture2D', source: { url: '../../../floor_diffuse.jpg' } },
            s_normal: { __class__: 'Texture2D', source: { url: '../../../floor_normal.jpg' } },
            s_specular: { __class__: 'Texture2D', source: { url: '../../../floor_specular.jpg' } },
        }
    });
    sphereMaterial = new StandardMaterial().init({
        uniforms: {
            s_diffuse: { __class__: 'Texture2D', source: { url: '../../../beachball_diffuse.jpg' } },
            s_specular: { __class__: 'Texture2D', source: { url: '../../../beachball_specular.jpg' } },
        }
    });
    cubeMaterial = new StandardMaterial().init({
        uniforms: {
            s_diffuse: { __class__: 'Texture2D', source: { url: '../../../trinket_diffuse.jpg' } },
            s_normal: { __class__: 'Texture2D', source: { url: '../../../trinket_normal.jpg' } },
            s_specular: { __class__: 'Texture2D', source: { url: '../../../trinket_specular.jpg' } },
        }
    });
    torusMaterial = new StandardMaterial().init({
        uniforms: {
            s_diffuse: { __class__: 'Texture2D', source: { url: '../../../weave_diffuse.jpg' } },
            s_normal: { __class__: 'Texture2D', source: { url: '../../../weave_normal.jpg' } },
            s_specular: { __class__: 'Texture2D', source: { url: '../../../weave_diffuse.jpg' } },
        }
    });
}

function initLights()
{
    scene.ambientColor.a = 0.2;

    light1 = new Node3D();
    let directionalLight = light1.addComponent(DirectionalLight);
    directionalLight.intensity = 0.7;
    light1.rx = 90;
    scene.node3d.addChild(light1);

    light2 = new Node3D();
    directionalLight = light2.addComponent(DirectionalLight);
    directionalLight.color.fromUnit(0x00FFFF);
    directionalLight.intensity = 0.7;
    light2.rx = 90;
    scene.node3d.addChild(light2);
}

function initObjects()
{
    plane = new Node3D();
    let model = plane.addComponent(MeshRenderer);
    let geometry: Geometry = model.geometry = $set(new PlaneGeometry(), { width: 10, height: 10 });
    model.material = planeMaterial;
    geometry.scaleU = 2;
    geometry.scaleV = 2;
    plane.y = -0.20;
    scene.node3d.addChild(plane);
    sphere = new Node3D();
    model = sphere.addComponent(MeshRenderer);
    model.geometry = $set(new SphereGeometry(), { radius: 1.50, segmentsW: 40, segmentsH: 20 });
    model.material = sphereMaterial;
    sphere.x = 3;
    sphere.y = 1.60;
    sphere.z = 3.00;
    scene.node3d.addChild(sphere);
    cube = new Node3D();
    model = cube.addComponent(MeshRenderer);
    model.geometry = $set(new CubeGeometry(), { width: 2, height: 2, depth: 2, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
    model.material = cubeMaterial;
    cube.x = 3.00;
    cube.y = 1.60;
    cube.z = -2.50;
    scene.node3d.addChild(cube);
    torus = new Node3D();
    model = torus.addComponent(MeshRenderer);
    geometry = model.geometry = $set(new TorusGeometry(), { radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
    model.material = torusMaterial;
    geometry.scaleU = 10;
    geometry.scaleV = 5;
    torus.x = -2.50;
    torus.y = 1.60;
    torus.z = -2.50;
    scene.node3d.addChild(torus);
}

function initListeners()
{
    ticker.onFrame(onEnterFrame, this);
}

function onEnterFrame()
{
    light1.rx = 30;
    light1.ry++;
}
