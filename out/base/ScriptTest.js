var feng3d;
(function (feng3d) {
    var engine = new feng3d.Engine();
    var scene3D = engine.scene;
    var sc = scene3D.gameObject.addComponent(feng3d.ScriptComponent);
    sc.url = "out/scripts/ScriptDemo.js";
    // windowEventProxy.on("keyup", (e) =>
    // {
    //     if (e.keyCode == 82)
    //     {
    //         GameObjectUtil.removeScript(scene3D.gameObject, path);
    //         GameObjectUtil.addScript(scene3D.gameObject, path);
    //     } else if (e.keyCode == 84)
    //     {
    //         GameObjectUtil.reloadJS(path);
    //     }
    // })
})(feng3d || (feng3d = {}));
//# sourceMappingURL=ScriptTest.js.map