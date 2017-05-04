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
            this.controller = new FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);


            input.addEventListener("mousedown", this.onMousedown, this);
            input.addEventListener("mouseup", this.onMouseup, this);
        }

        private onMousedown()
        {

            this.controller.target = this.cameraObj;
        }

        private onMouseup()
        {

            this.controller.target = null;
        }

        process()
        {

            this.controller.update();
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var scene = this.view3D.scene;

            var root = 'resources/skybox/';
            var imagePaths = ['px.jpg', 'py.jpg', 'pz.jpg', 'nx.jpg', 'ny.jpg', 'nz.jpg'];
            for (var i = 0; i < imagePaths.length; i++)
            {
                imagePaths[i] = root + imagePaths[i];
            }

            var skybox = new GameObject("skybox");
            var model = skybox.getOrCreateComponentByClass(Model);
            model.geometry = new SkyBoxGeometry();
            model.material = new SkyBoxMaterial(imagePaths);
            scene.addChild(skybox);
        }
    }
}