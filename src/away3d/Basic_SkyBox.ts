import { Camera, Color4, MeshRenderer, Node3D, PerspectiveLens, Scene, serialization, SkyBox, StandardMaterial, StandardUniforms, TextureCube, ticker, TorusGeometry, TransformUtils, Vector3, View, windowEventProxy } from 'feng3d';

const scene = serialization.setValue(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = serialization.setValue(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View(null, scene, camera);
const canvas = engine.canvas;

const cubeTexture = serialization.setValue(new TextureCube(), {
    rawData: {
        type: 'path', paths: [
            '../../../skybox/snow_positive_x.jpg',
            '../../../skybox/snow_positive_y.jpg',
            '../../../skybox/snow_positive_z.jpg',
            '../../../skybox/snow_negative_x.jpg',
            '../../../skybox/snow_negative_y.jpg',
            '../../../skybox/snow_negative_z.jpg',
        ]
    }
});

const skybox = serialization.setValue(new Node3D(), { name: 'skybox' });
const skyboxComponent = skybox.addComponent(SkyBox);
skyboxComponent.s_skyBoxTexture = cubeTexture;
scene.node3d.addChild(skybox);

camera.node3d.z = -6;
camera.node3d.lookAt(new Vector3());
camera.lens = new PerspectiveLens(90);

const torusMaterial = new StandardMaterial();
const uniforms = torusMaterial.uniforms as StandardUniforms;
uniforms.s_envMap = cubeTexture;
uniforms.u_ambient.fromUnit(0x111111);
uniforms.u_ambient.a = 0.25;

const torus = serialization.setValue(new Node3D(), { name: 'torus' });
const model = torus.addComponent(MeshRenderer);
model.geometry = serialization.setValue(new TorusGeometry(), { radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
model.material = torusMaterial;
scene.node3d.addChild(torus);

ticker.onFrame(() =>
{
    torus.rx += 2;
    torus.ry += 1;
    camera.node3d.position = new Vector3(0, 0, 0);
    camera.node3d.ry += 0.5 * (windowEventProxy.clientX - canvas.clientLeft - canvas.clientWidth / 2) / 800;
    TransformUtils.moveBackward(camera.node3d, 6);
});
