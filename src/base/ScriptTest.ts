namespace feng3d
{
    var engine = new Engine();
    var scene3D = engine.scene;

    var path = "out/scripts/ScriptDemo.js";

    GameObjectUtil.addScript(scene3D.gameObject, path);

    windowEventProxy.on("keyup", (e) =>
    {
        if (e.keyCode == 82)
        {
            GameObjectUtil.removeScript(scene3D.gameObject, path);
            GameObjectUtil.addScript(scene3D.gameObject, path);
        } else if (e.keyCode == 84)
        {
            GameObjectUtil.reloadJS(path);
        }
    })
}