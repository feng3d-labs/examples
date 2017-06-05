module feng3d
{
    export class SkyBoxTest
    {
        view3D: View3D;
        controller: FPSController;
        cameraObj: GameObject;

        constructor()
        {
            this.init();

            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.view3D.camera);
        }

        init()
        {
            
            this.view3D = new View3D();

            var scene = this.view3D.scene;

            var skybox = new GameObject("skybox");
            var model = skybox.getOrCreateComponentByClass(Model);
            skybox.geometry = new SkyBoxGeometry();
            model.material = new SkyBoxMaterial([
                'resources/skybox/px.jpg',
                'resources/skybox/py.jpg',
                'resources/skybox/pz.jpg',
                'resources/skybox/nx.jpg',
                'resources/skybox/ny.jpg',
                'resources/skybox/nz.jpg'
            ]);
            scene.addChild(skybox);
        }
    }
}