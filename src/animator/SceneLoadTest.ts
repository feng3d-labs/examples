module feng3d
{

    export class SceneLoadTest
    {
        view3D: Engine;
        controller: FPSController;
        camera: Camera;

        constructor()
        {
            this.init();

            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new Vector3D());
            //
            this.camera.gameObject.addComponent(FPSController);
        }

        init()
        {
            this.view3D = new Engine();
            var scene3D = this.view3D.scene;

            Loader.loadText("resources/scene/scene.json", (content) =>
            {
                var json = JSON.parse(content);
                var scene = serialization.deserialize(json);
                for (var i = 0; i < scene.numChildren; i++)
                {
                    scene3D.gameObject.addChild(scene.getChildAt(i));
                }
            });
        }
    }
}