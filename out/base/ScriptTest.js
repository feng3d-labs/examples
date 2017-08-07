var feng3d;
(function (feng3d) {
    var engine = feng3d.Engine.get();
    var scene3D = engine.scene;
    var path = "out/scripts/ScriptDemo.js";
    feng3d.GameObjectUtil.addScript(scene3D.gameObject, path);
    feng3d.input.on("keyup", function (e) {
        var inputEvent = e.data;
        if (inputEvent.keyCode == 82) {
            feng3d.GameObjectUtil.removeScript(scene3D.gameObject, path);
            feng3d.GameObjectUtil.addScript(scene3D.gameObject, path);
        }
        else if (inputEvent.keyCode == 84) {
            feng3d.GameObjectUtil.reloadJS(path);
        }
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ScriptTest.js.map