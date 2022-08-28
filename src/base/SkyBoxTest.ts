import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

camera.object3D.z = -5;
camera.object3D.lookAt(new feng3d.Vector3());
camera.object3D.addComponent(feng3d.FPSController);
//

var skybox = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "skybox" });
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
scene.object3D.addChild(skybox);
