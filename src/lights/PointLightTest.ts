import { Camera, Color4, ColorMaterial, CubeGeometry, DirectionalLight, FPSController, MeshRenderer, Node3D, PlaneGeometry, PointLight, Scene, $set, ShadowType, SphereGeometry, StandardMaterial, ticker, Vector3, View3D, windowEventProxy } from 'feng3d';

const scene = $set(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = $set(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View3D(null, scene, camera);

const light0 = $set(new Node3D(), { name: 'pointLight' });
const light1 = $set(new Node3D(), { name: 'pointLight' });

initObjects();
initLights();

ticker.onFrame(setPointLightPosition);

camera.node3d.z = -5;
camera.node3d.y = 2;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent(FPSController);
//
windowEventProxy.on('keyup', (event) =>
{
    const boardKey = String.fromCharCode(event.data.keyCode).toLocaleLowerCase();
    switch (boardKey)
    {
        case 'c':
            clearObjects();
            break;
        case 'b':
            initObjects();
            scene.node3d.addChild(light0);
            scene.node3d.addChild(light1);
            break;
    }
});

function initObjects()
{
    const material = new StandardMaterial().init({
        uniforms: {
            s_diffuse: { __class__: 'Texture2D', source: { url: '../../../head_diffuse.jpg' }, wrapS: 'MIRRORED_REPEAT', wrapT: 'MIRRORED_REPEAT' },
            s_normal: { __class__: 'Texture2D', source: { url: '../../../head_normals.jpg' }, wrapS: 'MIRRORED_REPEAT', wrapT: 'MIRRORED_REPEAT' },
            s_specular: { __class__: 'Texture2D', source: { url: '../../../head_specular.jpg' }, wrapS: 'MIRRORED_REPEAT', wrapT: 'MIRRORED_REPEAT' },
        }
    });

    // 初始化立方体
    const plane = new Node3D();
    plane.y = -1;
    let model = plane.addComponent(MeshRenderer);
    const geometry = model.geometry = $set(new PlaneGeometry(), { width: 10, height: 10 });
    geometry.scaleU = 2;
    geometry.scaleV = 2;
    model.material = material;
    scene.node3d.addChild(plane);

    const cube = new Node3D();
    model = cube.addComponent(MeshRenderer);
    model.material = material;
    model.geometry = $set(new CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
    model.geometry.scaleU = 2;
    model.geometry.scaleV = 2;
    scene.node3d.addChild(cube);
}

function clearObjects()
{
    for (let i = scene.node3d.numChildren - 1; i >= 0; i--)
    {
        scene.node3d.removeChildAt(i);
    }
}

function initLights()
{
    scene.ambientColor.setTo(0.2, 0.2, 0.2, 1.0);

    //
    const lightColor0 = new Color4(1, 0, 0, 1);
    let model = light0.addComponent(MeshRenderer);
    model.geometry = $set(new SphereGeometry(), { radius: 0.05 });
    // 初始化点光源
    const pointLight0 = light0.addComponent(PointLight);
    pointLight0.shadowType = ShadowType.PCF_Shadows;
    pointLight0.color = lightColor0.toColor3();
    model.material = new ColorMaterial().init({ uniforms: { u_diffuseInput: lightColor0 } });
    scene.node3d.addChild(light0);

    //
    const lightColor1 = new Color4(0, 1, 0, 1);
    model = light1.addComponent(MeshRenderer);
    model.geometry = $set(new SphereGeometry(), { radius: 0.05 });
    // 初始化点光源
    const pointLight1 = light1.addComponent(DirectionalLight);
    pointLight1.shadowType = ShadowType.PCF_Shadows;
    pointLight1.color = lightColor1.toColor3();
    model.material = new ColorMaterial().init({ uniforms: { u_diffuseInput: lightColor1 } });
    scene.node3d.addChild(light1);
}

function setPointLightPosition()
{
    const time = new Date().getTime();
    //
    let angle = time / 1000;
    light0.y = 3;
    light0.x = Math.sin(angle) * 3;
    light0.z = Math.cos(angle) * 3;
    //
    angle = angle + Math.PI / 2;
    light1.y = 3;
    light1.x = Math.sin(angle) * 3;
    light1.z = Math.cos(angle) * 3;
    light1.lookAt(new Vector3());
}
