import { Camera, Color4, FPSController, Node3D, Scene, serialization, SkyBox, TextureCube, Vector3, View } from 'feng3d';

var scene = serialization.setValue(new Node3D(), { name: "Untitled" }).addComponent(Scene)
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

var camera = serialization.setValue(new Node3D(), { name: "Main Camera" }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

var engine = new View(null, scene, camera);

camera.node3d.z = -5;
camera.node3d.lookAt(new Vector3());
camera.node3d.addComponent(FPSController);
//

var skybox = serialization.setValue(new Node3D(), { name: "skybox" });
const model = skybox.addComponent(SkyBox);
model.s_skyBoxTexture = serialization.setValue(new TextureCube(), {
    rawData: {
        type: "path", paths: [
            '../../../resources/skybox/px.jpg',
            '../../../resources/skybox/py.jpg',
            '../../../resources/skybox/pz.jpg',
            '../../../resources/skybox/nx.jpg',
            '../../../resources/skybox/ny.jpg',
            '../../../resources/skybox/nz.jpg'
        ]
    }
}
);
scene.node3d.addChild(skybox);
