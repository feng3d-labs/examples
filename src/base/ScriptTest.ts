class ScriptTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {

        var sc = this.gameObject.addScript(ScriptDemo)

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
    }
    /**
     * 更新
     */
    update()
    {
    }

    /**
    * 销毁时调用
    */
    dispose()
    {

    }
}