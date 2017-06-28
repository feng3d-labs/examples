namespace feng3d
{
    export class SkyBoxTest
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

            var scene = this.view3D.scene;

            var skybox = GameObject.create("skybox");
            var model = skybox.addComponent(MeshRenderer);
            skybox.addComponent(MeshFilter).mesh = new SkyBoxGeometry();
            model.material = new SkyBoxMaterial([
                'resources/skybox/px.jpg',
                'resources/skybox/py.jpg',
                'resources/skybox/pz.jpg',
                'resources/skybox/nx.jpg',
                'resources/skybox/ny.jpg',
                'resources/skybox/nz.jpg'
            ]);
            scene.transform.addChild(skybox.transform);
        }
    }
}