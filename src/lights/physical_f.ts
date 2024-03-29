import { Color3, Color4, ColorMaterial, CubeGeometry, Node3D, PlaneGeometry, ShadowType, SphereGeometry, StandardMaterial, Texture2D, Vector3 } from 'feng3d';

const container = document.createElement('div');
document.body.append(container);

const root = new Node3D();
root.addComponent('Stats', { container });

root.addComponent('WebGLRenderer3D');

const scene = root.addComponent('Scene3D');
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);
scene.ambientColor.setTo(0.2, 0.2, 0.2, 1.0);

const camera = new Node3D().addComponent('PerspectiveCamera3D', {
    fov: 50,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 100,
});
camera.node3d.z = -5;
camera.node3d.y = 2;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent('FPSController3D');
scene.node3d.addChild(camera.node3d);

const bulbLight = new Node3D().addComponent('PointLight3D');
bulbLight.color = Color3.fromUnit(0xffee88);
bulbLight.intensity = 1;
bulbLight.range = 5;
// bulbLight.decay = 2;
bulbLight.shadowType = ShadowType.PCF_Soft_Shadows;
bulbLight.node3d.position.set(0, 1, 0);
scene.node3d.addChild(bulbLight.node3d);

const bulbGeometry = new SphereGeometry({ radius: 0.02, segmentsW: 16, segmentsH: 8 });
const bulbMat = new ColorMaterial().init({ uniforms: { u_diffuseInput: new Color4(1) } });
const bulbRenderable = bulbLight.node3d.addComponent('Mesh3D');
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

const floorMesh = new Node3D().addComponent('Mesh3D');
const floorGeometry = new PlaneGeometry({ width: 20, height: 20 });
floorMesh.geometry = floorGeometry;
floorMesh.material = floorMat;
floorMesh.receiveShadows = true;
floorMesh.castShadows = true;
scene.node3d.addChild(floorMesh.node3d);

const ballGeometry = new SphereGeometry({ radius: 0.25, segmentsW: 32, segmentsH: 32 });
const ballMesh = new Node3D().addComponent('Mesh3D');
ballMesh.geometry = ballGeometry;
ballMesh.material = ballMat;
// ballMesh.receiveShadows = true;
ballMesh.castShadows = true;
ballMesh.node3d.position.set(1, 0.25, 1);
scene.node3d.addChild(ballMesh.node3d);

const boxGeometry = new CubeGeometry({ width: 0.5, height: 0.5, depth: 0.5 });
const boxMesh = new Node3D().addComponent('Mesh3D');
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
