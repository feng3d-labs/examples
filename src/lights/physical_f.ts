import { Camera, Color3, Color4, ColorUniforms, Material, Object3D, PerspectiveLens, PlaneGeometry, PointLight, Renderable, Scene, serialization, SphereGeometry, View } from 'feng3d';
import Stats from 'stats.js';

let scene: Scene;

let camera: Camera;
let bulbLight: PointLight
let bulbMat: Material;

let stats: Stats;

init();
animate();

function init()
{
    const container = document.createElement('div');
    document.body.append(container);

    stats = new Stats();
    container.appendChild(stats.dom);

    scene = serialization.setValue(new Object3D(), { name: "Untitled" }).addComponent(Scene)
    scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

    camera = new Object3D().addComponent(Camera);
    camera.lens = new PerspectiveLens(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.object3D.x = -4;
    camera.object3D.z = 4;
    camera.object3D.y = 2;
    scene.object3D.addChild(camera.object3D);

    var engine = new View(null, scene, camera);

    bulbLight = new Object3D().addComponent(PointLight);
    bulbLight.color = Color3.fromUnit(0xffee88);
    bulbLight.intensity = 1;
    bulbLight.range = 100;
    // bulbLight.decay = 2;
    bulbLight.position.set(0, 2, 0);
    // bulbLight.castShadow = true; 
    scene.object3D.addChild(bulbLight.object3D);

    const bulbGeometry = new SphereGeometry({ radius: 0.02, segmentsW: 16, segmentsH: 8 });
    bulbMat = new Material().init('standard', { u_diffuse: new Color4().fromUnit24(0xffffff) });
    const bulbRenderable = new Object3D().addComponent(Renderable);
    bulbRenderable.material = bulbMat;
    bulbRenderable.geometry = bulbGeometry;
    bulbLight.object3D.addChild(bulbRenderable.object3D);

    const floorMesh = new Object3D().addComponent(Renderable);
    const floorGeometry = new PlaneGeometry({ width: 20, height: 20 });
    floorMesh.geometry = floorGeometry;
    floorMesh.receiveShadows = true;
    floorMesh.object3D.rx = - 180;
    scene.object3D.addChild(floorMesh.object3D);
}

function animate()
{
    requestAnimationFrame(animate);

    render();
}

function render()
{

    stats.update();
}
