namespace feng3d
{

    export class Basic_Shading
    {
        private scene: Scene3D;
        private camera: Camera;
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

            var view3D = this.view = new View3D();

            this.scene = view3D.scene;
            this.camera = view3D.camera;

            this.cameraController = new HoverController(this.camera.gameObject);
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
            this.scene.ambientColor.a = 0.2;

            this.light1 = GameObject.create();
            var directionalLight = this.light1.addComponent(DirectionalLight);
            directionalLight.intensity = 0.7;
            this.light1.transform.rx = 90;
            this.scene.transform.addChild(this.light1.transform);

            this.light2 = GameObject.create();
            var directionalLight = this.light2.addComponent(DirectionalLight);
            directionalLight.color.fromUnit(0x00FFFF);
            directionalLight.intensity = 0.7;
            this.light2.transform.rx = 90;
            this.scene.transform.addChild(this.light2.transform);
        }

        private initObjects()
        {
            this.plane = GameObject.create();
            var model = this.plane.addComponent(MeshRenderer);
            var geometry: Geometry = this.plane.addComponent(MeshFilter).mesh = new PlaneGeometry(1000, 1000);
            model.material = this.planeMaterial;
            geometry.scaleUV(2, 2);
            this.plane.transform.y = -20;
            this.scene.transform.addChild(this.plane.transform);
            this.sphere = GameObject.create();
            var model = this.sphere.addComponent(MeshRenderer);
            this.sphere.addComponent(MeshFilter).mesh = new SphereGeometry(150, 40, 20)
            model.material = this.sphereMaterial;
            this.sphere.transform.x = 300;
            this.sphere.transform.y = 160;
            this.sphere.transform.z = 300;
            this.scene.transform.addChild(this.sphere.transform);
            this.cube = GameObject.create();
            var model = this.cube.addComponent(MeshRenderer);
            this.cube.addComponent(MeshFilter).mesh = new CubeGeometry(200, 200, 200, 1, 1, 1, false);
            model.material = this.cubeMaterial;
            this.cube.transform.x = 300;
            this.cube.transform.y = 160;
            this.cube.transform.z = -250;
            this.scene.transform.addChild(this.cube.transform);
            this.torus = GameObject.create();
            var model = this.torus.addComponent(MeshRenderer);
            geometry = this.torus.addComponent(MeshFilter).mesh = new TorusGeometry(150, 60, 40, 20);
            model.material = this.torusMaterial;
            geometry.scaleUV(10, 5);
            this.torus.transform.x = -250;
            this.torus.transform.y = 160;
            this.torus.transform.z = -250;
            this.scene.transform.addChild(this.torus.transform);
        }

        private initListeners()
        {
            Event.on(ticker, "enterFrame", this.onEnterFrame, this);
            Event.on(input, <any>inputType.MOUSE_DOWN, this.onMouseDown, this);
            Event.on(input, <any>inputType.MOUSE_UP, this.onMouseUp, this);
        }

        private onEnterFrame(event: Event)
        {
            if (this.move)
            {
                this.cameraController.panAngle = 0.3 * (this.view.mousePos.x - this.lastMouseX) + this.lastPanAngle;
                this.cameraController.tiltAngle = 0.3 * (this.view.mousePos.y - this.lastMouseY) + this.lastTiltAngle;
            }
            this.light1.transform.rx = 30;
            this.light1.transform.ry++;
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