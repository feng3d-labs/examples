namespace feng3d
{

    export class SceneLoadTest
    {
        view3D: View3D;
        controller: FPSController;
        cameraObj: GameObject;

        constructor()
        {
            this.init();

            this.cameraObj = this.view3D.camera;
            this.cameraObj.transform.z = -500;
            this.cameraObj.transform.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.view3D.camera);
        }

        init()
        {
            
            this.view3D = new View3D();
            var scene3D = this.view3D.scene;

            var loader = new Loader();
            loader.addEventListener(LoaderEvent.COMPLETE, function ()
            {
                var json = JSON.parse(loader.content);
                var scene: Scene3D = serialization.readObject(json);
                for (var i = 0; i < scene.numChildren; i++)
                {
                    scene3D.addChild(scene.getChildAt(i));
                }
            }, this);
            loader.loadText("resources/scene/scene.json");
        }

    }
}