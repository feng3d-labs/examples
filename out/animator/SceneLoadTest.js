var view3D = new feng3d.Engine();
var camera = view3D.camera;
camera.transform.z = -500;
camera.transform.lookAt(new feng3d.Vector3D());
//
camera.gameObject.addComponent(feng3d.FPSController);
feng3d.Loader.loadText("resources/scene/Untitled.scene", function (content) {
    var json = JSON.parse(content);
    var scene = feng3d.serialization.deserialize(json);
    if (scene.getComponent(feng3d.Scene3D))
        view3D.scene = scene.getComponent(feng3d.Scene3D);
});
//# sourceMappingURL=SceneLoadTest.js.map