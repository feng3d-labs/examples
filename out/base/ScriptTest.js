var feng3d;
(function (feng3d) {
    var engine = new feng3d.Engine();
    var scene3D = engine.scene;
    var path = "out/scripts/ScriptDemo.js";
    feng3d.GameObjectUtil.addScript(scene3D.gameObject, path);
    feng3d.windowEventProxy.on("keyup", function (e) {
        if (e.keyCode == 82) {
            feng3d.GameObjectUtil.removeScript(scene3D.gameObject, path);
            feng3d.GameObjectUtil.addScript(scene3D.gameObject, path);
        }
        else if (e.keyCode == 84) {
            feng3d.GameObjectUtil.reloadJS(path);
        }
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ScriptTest.js.map