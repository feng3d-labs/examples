namespace feng3d
{
    var engine = Engine.get();
    var scene3D = engine.scene;

    var path = "out/scripts/ScriptDemo.js";

    GameObjectUtil.addScript(scene3D.gameObject, path);

    input.on("keyup", (e) =>
    {
        var inputEvent: InputEvent = e;
        if (inputEvent.keyCode == 82)
        {
            GameObjectUtil.removeScript(scene3D.gameObject, path);
            GameObjectUtil.addScript(scene3D.gameObject, path);
        } else if (inputEvent.keyCode == 84)
        {
            GameObjectUtil.reloadJS(path);
        }
    })
}