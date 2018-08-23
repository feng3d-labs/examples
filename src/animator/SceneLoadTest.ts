class SceneLoadTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {

        var view3D = new feng3d.Engine();

        feng3d.Loader.loadText("resources/scene/Untitled.scene.json", (content) =>
        {
            var json = JSON.parse(content);
            var sceneobject: feng3d.GameObject = feng3d.serialization.deserialize(json);
            var scene = sceneobject.getComponent(feng3d.Scene3D);
            scene.initCollectComponents();

            view3D.scene = scene;
        });
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