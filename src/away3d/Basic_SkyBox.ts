namespace feng3d
{
    export class Basic_SkyBox
    {
        private _view: View3D;
        private _torus: GameObject;
        private camera: GameObject;

        public constructor()
        {
            
            var view3D = this._view = new View3D();

            var scene = view3D.scene;

            var cubeTexture = new TextureCube([
                // 'resources/skybox/px.jpg',
                // 'resources/skybox/py.jpg',
                // 'resources/skybox/pz.jpg',
                // 'resources/skybox/nx.jpg',
                // 'resources/skybox/ny.jpg',
                // 'resources/skybox/nz.jpg',
                'resources/skybox/snow_positive_x.jpg',
                'resources/skybox/snow_positive_y.jpg',
                'resources/skybox/snow_positive_z.jpg',
                'resources/skybox/snow_negative_x.jpg',
                'resources/skybox/snow_negative_y.jpg',
                'resources/skybox/snow_negative_z.jpg',
            ]);

            var skybox = new GameObject("skybox");
            var model = skybox.getOrCreateComponentByClass(Model);
            skybox.geometry = new SkyBoxGeometry();
            var material = model.material = new SkyBoxMaterial();
            material.texture = cubeTexture;
            scene.addChild(skybox);

            var camera = this.camera = view3D.camera;
            camera.z = -600;
            camera.lookAt(new Vector3D());
            camera.camera.lens = new PerspectiveLens(90);

            var torusMaterial = new StandardMaterial();
            torusMaterial.specularMethod.specular = 0.5;
            torusMaterial.ambientMethod.color.fromUnit(0x111111);
            torusMaterial.ambientMethod.color.a = 0.25;
            torusMaterial.addMethod(new EnvMapMethod(cubeTexture, 1));

            var torus = this._torus = new GameObject("torus");
            var model = torus.getOrCreateComponentByClass(Model);
            torus.geometry = new TorusGeometry(150, 60, 40, 20);
            model.material = torusMaterial;
            scene.addChild(torus);

            ticker.addEventListener(Event.ENTER_FRAME, this._onEnterFrame, this);
        }

        private _onEnterFrame(e: Event)
        {
            this._torus.rotationX += 2;
            this._torus.rotationY += 1;
            this.camera.setPosition(0, 0, 0);
            this.camera.rotationY += 0.5 * (this._view.mousePos.x - this._view.width / 2) / 800;
            this.camera.moveBackward(600);
        }
    }
}