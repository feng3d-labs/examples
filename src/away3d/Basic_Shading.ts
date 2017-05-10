module feng3d
{

    export class Basic_Shading
    {
        private scene: Scene3D;
        private camera: CameraObject3D;
        private view: View3D;
        private cameraController: HoverController;
        private planeMaterial: StandardMaterial;
        private sphereMaterial: StandardMaterial;
        private cubeMaterial: StandardMaterial;
        private torusMaterial: StandardMaterial;
        private light1: GameObject;
        private light2: GameObject;
        private plane: GameObject;
        private sphere: GameObject;
        private cube: GameObject;
        private torus: GameObject;
        private move: boolean = false;
        private lastPanAngle: number = 0;
        private lastTiltAngle: number = 0;
        private lastMouseX: number = 0;
        private lastMouseY: number = 0;

        public constructor()
        {
            this.init();
        }

        private init()
        {
            this.initEngine();
            this.initLights();
            this.initMaterials();
            this.initObjects();
            this.initListeners();
        }

        private initEngine()
        {
            var canvas = document.getElementById("glcanvas");
            var view3D = this.view = new View3D(canvas);

            this.scene = view3D.scene;
            this.camera = view3D.camera;
            this.camera.z = -1000;
            this.camera.y = 1000;
            this.camera.lookAt(new Vector3D());

            this.cameraController = new HoverController(this.camera);
            this.cameraController.distance = 1000;
            this.cameraController.minTiltAngle = 0;
            this.cameraController.maxTiltAngle = 90;
            this.cameraController.panAngle = 45;
            this.cameraController.tiltAngle = 20;
        }

        private initMaterials()
        {
            this.planeMaterial = new StandardMaterial("resources/floor_diffuse.jpg", "resources/floor_normal.jpg", "resources/floor_specular.jpg");
            this.sphereMaterial = new StandardMaterial("resources/beachball_diffuse.jpg", "", "resources/beachball_specular.jpg");
            this.cubeMaterial = new StandardMaterial("resources/trinket_diffuse.jpg", "resources/trinket_normal.jpg", "resources/trinket_specular.jpg");
            this.torusMaterial = new StandardMaterial("resources/weave_diffuse.jpg", "resources/weave_normal.jpg", "resources/weave_diffuse.jpg");
        }

        private initLights()
        {
            this.light1 = new GameObject();
            var directionalLight = new DirectionalLight();
            // this.light1.ambient = 0.1;
            // this.light1.diffuse = 0.7;
            this.light1.addComponent(directionalLight);
            this.light1.rotationX = 90;
            this.scene.addChild(this.light1);

            this.light2 = new GameObject();
            var directionalLight = new DirectionalLight();
            directionalLight.color.fromUnit(0x00FFFF);
            // this.light2["ambient"] = 0.1;
            // this.light2["diffuse"] = 0.7;
            this.light2.addComponent(directionalLight);
            this.light2.rotationX = 90;
            this.scene.addChild(this.light2);
        }

        private initObjects()
        {
            this.plane = new GameObject();
            var model = this.plane.getOrCreateComponentByClass(Model);
            var geometry: Geometry = model.geometry = new PlaneGeometry(1000, 1000);
            model.material = this.planeMaterial;
            geometry.scaleUV(2, 2);
            this.plane.y = -20;
            this.scene.addChild(this.plane);
            this.sphere = new GameObject();
            var model = this.plane.getOrCreateComponentByClass(Model);
            model.geometry = new SphereGeometry(150, 40, 20)
            model.material = this.sphereMaterial;
            this.sphere.x = 300;
            this.sphere.y = 160;
            this.sphere.z = 300;
            this.scene.addChild(this.sphere);
            this.cube = new GameObject();
            var model = this.plane.getOrCreateComponentByClass(Model);
            model.geometry = new CubeGeometry(200, 200, 200, 1, 1, 1, false);
            model.material = this.cubeMaterial;
            this.cube.x = 300;
            this.cube.y = 160;
            this.cube.z = -250;
            this.scene.addChild(this.cube);
            this.torus = new GameObject();
            var model = this.plane.getOrCreateComponentByClass(Model);
            geometry = model.geometry = new TorusGeometry(150, 60, 40, 20);
            model.material = this.torusMaterial;
            geometry.scaleUV(10, 5);
            this.torus.x = -250;
            this.torus.y = 160;
            this.torus.z = -250;
            this.scene.addChild(this.torus);
        }

        private initListeners()
        {
            input.addEventListener(Event.ENTER_FRAME, this.onEnterFrame, this);
            input.addEventListener(inputType.MOUSE_DOWN, this.onMouseDown, this);
            input.addEventListener(inputType.MOUSE_UP, this.onMouseUp, this);
        }

        private onEnterFrame(event: Event)
        {
            if (this.move)
            {
                this.cameraController.panAngle = 0.3 * (this.view.mousePos.x - this.lastMouseX) + this.lastPanAngle;
                this.cameraController.tiltAngle = 0.3 * (this.view.mousePos.y - this.lastMouseY) + this.lastTiltAngle;
            }
            this.light1.rotationZ = getTimer() / 10000;
        }

        private onMouseDown(event: Event)
        {
            this.lastPanAngle = this.cameraController.panAngle;
            this.lastTiltAngle = this.cameraController.tiltAngle;
            this.lastMouseX = this.view.mousePos.x;
            this.lastMouseY = this.view.mousePos.y;
            this.move = true;
        }

        private onMouseUp(event: Event)
        {
            this.move = false;
        }
    }
}