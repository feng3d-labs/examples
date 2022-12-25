import { Camera, Color4, FPSController, Node3D, Scene, $set, SkyBox, TextureCube, Vector3, View } from 'feng3d';

const scene = $set(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = $set(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View(null, scene, camera);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent(FPSController);
//

const skybox = $set(new Node3D(), { name: 'skybox' });
const model = skybox.addComponent(SkyBox);
model.s_skyBoxTexture = $set(new TextureCube(), {
    rawData: {
        type: 'path', paths: [
            '../../../skybox/px.jpg',
            '../../../skybox/py.jpg',
            '../../../skybox/pz.jpg',
            '../../../skybox/nx.jpg',
            '../../../skybox/ny.jpg',
            '../../../skybox/nz.jpg'
        ]
    }
}
);
scene.node3d.addChild(skybox);
