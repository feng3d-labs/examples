import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.gameObject.position = new feng3d.Vector3(0, 1, -10);
scene.gameObject.addChild(camera.gameObject);

var engine = new feng3d.View(null, scene, camera);

camera.gameObject.z = -5;
camera.gameObject.lookAt(new feng3d.Vector3());
camera.gameObject.addComponent(feng3d.FPSController);
//

var skybox = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "skybox" });
const model = skybox.addComponent(feng3d.SkyBox);
model.s_skyboxTexture = feng3d.serialization.setValue(new feng3d.TextureCube(), {
    rawData: {
        type: "path", paths: [
            'resources/skybox/px.jpg',
            'resources/skybox/py.jpg',
            'resources/skybox/pz.jpg',
            'resources/skybox/nx.jpg',
            'resources/skybox/ny.jpg',
            'resources/skybox/nz.jpg'
        ]
    }
}
);
scene.gameObject.addChild(skybox);
