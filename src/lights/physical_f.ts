import { Camera, Color3, Color4, ColorMaterial, CubeGeometry, FPSController, Material, MeshRenderer, Node3D, PerspectiveLens, PlaneGeometry, PointLight, Scene, serialization, ShadowType, SphereGeometry, StandardMaterial, Texture2D, Vector3, View } from 'feng3d';
import Stats from 'stats.js';

let scene: Scene;

let camera: Camera;
let bulbLight: PointLight;
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

    scene = serialization.setValue(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
    scene.background = new Color4(0.408, 0.38, 0.357, 1.0);
    scene.ambientColor.setTo(0.2, 0.2, 0.2, 1.0);

    camera = new Node3D().addComponent(Camera);
    camera.lens = new PerspectiveLens(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.node3d.z = -5;
    camera.node3d.y = 2;
    camera.node3d.lookAt(new Vector3());
    camera.node3d.addComponent(FPSController);
    scene.node3d.addChild(camera.node3d);

    const engine = new View(null, scene, camera);

    bulbLight = new Node3D().addComponent(PointLight);
    bulbLight.color = Color3.fromUnit(0xffee88);
    bulbLight.intensity = 1;
    bulbLight.range = 5;
    // bulbLight.decay = 2;
    bulbLight.shadowType = ShadowType.PCF_Soft_Shadows;
    bulbLight.node3d.position.set(0, 1, 0);
    scene.node3d.addChild(bulbLight.node3d);

    const bulbGeometry = new SphereGeometry({ radius: 0.02, segmentsW: 16, segmentsH: 8 });
    bulbMat = new ColorMaterial().init({ uniforms: { u_diffuseInput: new Color4(1) } });
    const bulbRenderable = bulbLight.node3d.addComponent(MeshRenderer);
    bulbRenderable.material = bulbMat;
    bulbRenderable.geometry = bulbGeometry;
    bulbRenderable.castShadows = false;
    bulbRenderable.receiveShadows = false;

    const floorMat = new StandardMaterial().init({
        uniforms: {
            u_diffuse: new Color4().fromUnit24(0xffffff),
            u_specular: 0.2,
            u_glossiness: 0.8,
            s_diffuse: new Texture2D({
                source: { url: '../../../textures/hardwood2_diffuse.jpg' },
                wrapS: 'REPEAT',
                wrapT: 'REPEAT',
                anisotropy: 4,
                // repeat: { x: 10, y: 24 },
            }) as any,
            s_normal: new Texture2D({
                source: { url: '../../../textures/hardwood2_bump.jpg' },
                wrapS: 'REPEAT',
                wrapT: 'REPEAT',
                anisotropy: 4,
                // repeat: { x: 10, y: 24 },
            }) as any,
            s_specular: new Texture2D({
                source: { url: '../../../textures/hardwood2_roughness.jpg' },
                wrapS: 'REPEAT',
                wrapT: 'REPEAT',
                anisotropy: 4,
                // repeat: { x: 10, y: 24 },
            }) as any,
        }
    });

    const ballMat = new StandardMaterial().init({
        uniforms: {
            u_diffuse: new Color4().fromUnit24(0xffffff),
            u_specular: 0.2,
            u_glossiness: 0.8,
            s_diffuse: new Texture2D({
                source: { url: '../../../textures/planets/earth_atmos_2048.jpg' },
                wrapS: 'REPEAT',
                wrapT: 'REPEAT',
                anisotropy: 4,
                // repeat: { x: 10, y: 24 },
            }) as any,
            s_specular: new Texture2D({
                source: { url: '../../../textures/planets/earth_specular_2048.jpg' },
                wrapS: 'REPEAT',
                wrapT: 'REPEAT',
                anisotropy: 4,
                // repeat: { x: 10, y: 24 },
            }) as any,
        }
    });

    const cubeMat = new StandardMaterial().init({
        uniforms: {
            u_diffuse: new Color4(0.7, 0.7, 0.7),
            u_specular: new Color3(0.2, 0.2, 0.2),
            u_glossiness: 0.8,
            s_diffuse: new Texture2D({
                source: { url: '../../../textures/brick_diffuse.jpg' },
                wrapS: 'REPEAT',
                wrapT: 'REPEAT',
                anisotropy: 4,
                // repeat: { x: 10, y: 24 },
            }) as any,
            // s_normal: new Texture2D({
            //     source: { url: '../../../textures/brick_bump.jpg' },
            //     wrapS: 'REPEAT',
            //     wrapT: 'REPEAT',
            //     anisotropy: 4,
            //     // repeat: { x: 10, y: 24 },
            // }) as any,
        }
    });

    const floorMesh = new Node3D().addComponent(MeshRenderer);
    const floorGeometry = new PlaneGeometry({ width: 20, height: 20 });
    floorMesh.geometry = floorGeometry;
    floorMesh.material = floorMat;
    floorMesh.receiveShadows = true;
    floorMesh.castShadows = true;
    scene.node3d.addChild(floorMesh.node3d);

    const ballGeometry = new SphereGeometry({ radius: 0.25, segmentsW: 32, segmentsH: 32 });
    const ballMesh = new Node3D().addComponent(MeshRenderer);
    ballMesh.geometry = ballGeometry;
    ballMesh.material = ballMat;
    // ballMesh.receiveShadows = true;
    ballMesh.castShadows = true;
    ballMesh.node3d.position.set(1, 0.25, 1);
    scene.node3d.addChild(ballMesh.node3d);

    const boxGeometry = new CubeGeometry({ width: 0.5, height: 0.5, depth: 0.5 });
    const boxMesh = new Node3D().addComponent(MeshRenderer);
    boxMesh.geometry = boxGeometry;
    boxMesh.material = cubeMat;
    boxMesh.node3d.position.set(-0.5, 0.25, -1);
    boxMesh.receiveShadows = true;
    boxMesh.castShadows = true;
    scene.node3d.addChild(boxMesh.node3d);

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
