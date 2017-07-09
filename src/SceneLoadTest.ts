namespace feng3d
{

    export class SceneLoadTest
    {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;

        constructor()
        {
            this.init();

            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.view3D.camera.gameObject);
        }

        init()
        {
            this.view3D = new View3D();
            var scene3D = this.view3D.scene;

            var loader = new Loader();
            Event.on(loader, "complete", function ()
            {
                var json = JSON.parse(loader.content);
                var scene: Scene3D = Serialization.deserialize(json);
                for (var i = 0; i < scene.transform.childCount; i++)
                {
                    scene3D.transform.addChild(scene.transform.getChildAt(i));
                }
            }, this);
            loader.loadText("resources/scene/scene.json");
        }
    }
}