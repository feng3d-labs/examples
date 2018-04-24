namespace feng3d
{
    export class SceneLoadTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {

            var view3D = new feng3d.Engine();

            feng3d.Loader.loadText("resources/scene/Untitled.scene", (content) =>
            {
                var json = JSON.parse(content);
                var sceneobject = serialization.deserialize(json);
                var scene = sceneobject.getComponent(Scene3D);
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
}