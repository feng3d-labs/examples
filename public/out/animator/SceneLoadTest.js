var examples;
(function (examples) {
    var view3D = new feng3d.View();
    feng3d.loader.loadText("resources/scene/Untitled.scene.json", function (content) {
        var json = JSON.parse(content);
        var sceneobject = feng3d.serialization.deserialize(json);
        var scene = sceneobject.getComponent(feng3d.Scene);
        view3D.scene = scene;
    });
})(examples || (examples = {}));
//# sourceMappingURL=SceneLoadTest.js.map