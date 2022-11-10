import { Camera, Color3, Color4, CubeGeometry, FPSController, Material, Object3D, PerspectiveLens, PlaneGeometry, PointLight, Renderable, Scene, serialization, ShadowType, SphereGeometry, Texture2D, Vector3, View } from 'feng3d';
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
    scene.ambientColor.setTo(0.2, 0.2, 0.2, 1.0);

    camera = new Object3D().addComponent(Camera);
    camera.lens = new PerspectiveLens(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.object3D.z = -5;
    camera.object3D.y = 2;
    camera.object3D.lookAt(new Vector3());
    camera.object3D.addComponent(FPSController);
    scene.object3D.addChild(camera.object3D);

    var engine = new View(null, scene, camera);

    bulbLight = new Object3D().addComponent(PointLight);
    bulbLight.color = Color3.fromUnit(0xffee88);
    bulbLight.intensity = 1;
    bulbLight.range = 5;
    // bulbLight.decay = 2;
    bulbLight.shadowType = ShadowType.PCF_Soft_Shadows;
    bulbLight.object3D.position.set(0, 1, 0);
    scene.object3D.addChild(bulbLight.object3D);

    const bulbGeometry = new SphereGeometry({ radius: 0.02, segmentsW: 16, segmentsH: 8 });
    bulbMat = new Material().init('color', { u_diffuseInput: new Color4(1) });
    const bulbRenderable = bulbLight.object3D.addComponent(Renderable);
    bulbRenderable.material = bulbMat;
    bulbRenderable.geometry = bulbGeometry;
    bulbRenderable.castShadows = false;
    bulbRenderable.receiveShadows = false;

    const floorMat = new Material().init('standard', {
        u_diffuse: new Color4().fromUnit24(0xffffff),
        u_specular: 0.2,
        u_glossiness: 0.8,
        s_diffuse: new Texture2D({
            source: { url: 'resources/textures/hardwood2_diffuse.jpg' },
            wrapS: 'REPEAT',
            wrapT: 'REPEAT',
            anisotropy: 4,
            // repeat: { x: 10, y: 24 },
        }) as any,
        s_normal: new Texture2D({
            source: { url: 'resources/textures/hardwood2_bump.jpg' },
            wrapS: 'REPEAT',
            wrapT: 'REPEAT',
            anisotropy: 4,
            // repeat: { x: 10, y: 24 },
        }) as any,
        s_specular: new Texture2D({
            source: { url: 'resources/textures/hardwood2_roughness.jpg' },
            wrapS: 'REPEAT',
            wrapT: 'REPEAT',
            anisotropy: 4,
            // repeat: { x: 10, y: 24 },
        }) as any,
    });

    const ballMat = new Material().init('standard', {
        u_diffuse: new Color4().fromUnit24(0xffffff),
        u_specular: 0.2,
        u_glossiness: 0.8,
        s_diffuse: new Texture2D({
            source: { url: 'resources/textures/planets/earth_atmos_2048.jpg' },
            wrapS: 'REPEAT',
            wrapT: 'REPEAT',
            anisotropy: 4,
            // repeat: { x: 10, y: 24 },
        }) as any,
        s_specular: new Texture2D({
            source: { url: 'resources/textures/planets/earth_specular_2048.jpg' },
            wrapS: 'REPEAT',
            wrapT: 'REPEAT',
            anisotropy: 4,
            // repeat: { x: 10, y: 24 },
        }) as any,
    });

    const cubeMat = new Material().init('standard', {
        u_diffuse: new Color4(0.7, 0.7, 0.7),
        u_specular: new Color3(0.2, 0.2, 0.2),
        u_glossiness: 0.8,
        s_diffuse: new Texture2D({
            source: { url: 'resources/textures/brick_diffuse.jpg' },
            wrapS: 'REPEAT',
            wrapT: 'REPEAT',
            anisotropy: 4,
            // repeat: { x: 10, y: 24 },
        }) as any,
        // s_normal: new Texture2D({
        //     source: { url: 'resources/textures/brick_bump.jpg' },
        //     wrapS: 'REPEAT',
        //     wrapT: 'REPEAT',
        //     anisotropy: 4,
        //     // repeat: { x: 10, y: 24 },
        // }) as any,
    });

    const floorMesh = new Object3D().addComponent(Renderable);
    const floorGeometry = new PlaneGeometry({ width: 20, height: 20 });
    floorMesh.geometry = floorGeometry;
    floorMesh.material = floorMat;
    floorMesh.receiveShadows = true;
    floorMesh.castShadows = true;
    scene.object3D.addChild(floorMesh.object3D);

    const ballGeometry = new SphereGeometry({ radius: 0.25, segmentsW: 32, segmentsH: 32 });
    const ballMesh = new Object3D().addComponent(Renderable);
    ballMesh.geometry = ballGeometry;
    ballMesh.material = ballMat;
    // ballMesh.receiveShadows = true;
    ballMesh.castShadows = true;
    ballMesh.object3D.position.set(1, 0.25, 1);
    scene.object3D.addChild(ballMesh.object3D);

    const boxGeometry = new CubeGeometry({ width: 0.5, height: 0.5, depth: 0.5 });
    const boxMesh = new Object3D().addComponent(Renderable);
    boxMesh.geometry = boxGeometry;
    boxMesh.material = cubeMat;
    boxMesh.object3D.position.set(- 0.5, 0.25, - 1);
    boxMesh.receiveShadows = true;
    boxMesh.castShadows = true;
    scene.object3D.addChild(boxMesh.object3D);

    // const boxMesh2 = new THREE.Mesh(boxGeometry, cubeMat);
    // boxMesh2.position.set(0, 0.25, - 5);
    // boxMesh2.castShadow = true;
    // scene.add(boxMesh2);

    // const boxMesh3 = new THREE.Mesh(boxGeometry, cubeMat);
    // boxMesh3.position.set(7, 0.25, 0);
    // boxMesh3.castShadow = true;
    // scene.add(boxMesh3);

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
