import { $set, Color4, Node3D, TextureCube, Vector3 } from 'feng3d';

const root = new Node3D();
root.addComponent('WebGLRenderer3D');

const scene = root.addComponent('Scene3D');
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = new Node3D().addComponent('Camera3D');
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent('FPSController3D');
//

const skybox = $set(new Node3D(), { name: 'skybox' });
const model = skybox.addComponent('SkyBox');
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
