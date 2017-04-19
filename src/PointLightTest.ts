module feng3d
{
    export class PointLightTest
    {
        view3D: View3D;
        scene: Scene3D;
        controller: FPSController;
        cameraObj: Object3D;

        constructor()
        {

            this.init();

            this.cameraObj = this.view3D.camera;
            this.cameraObj.transform.position.z = -500;
            this.cameraObj.transform.position.y = 200;
            this.cameraObj.transform.lookAt(new Vector3D());
            //
            this.controller = new FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);


            input.addEventListener("mousedown", this.onMousedown, this);
            input.addEventListener("mouseup", this.onMouseup, this);

            input.addEventListener(inputType.KEY_UP, this.onKeyUp, this);
        }

        private onKeyUp(event: InputEvent)
        {
            var boardKey = String.fromCharCode(event.keyCode).toLocaleLowerCase();
            switch (boardKey)
            {
                case "c":
                    this.clearObjects();
                    break;
                case "b":
                    this.initObjects();
                    this.scene.addChild(light0);
                    this.scene.addChild(light1);
                    break;
            }
        }

        private onMousedown()
        {

            this.controller.target = this.cameraObj.transform;
        }

        private onMouseup()
        {

            this.controller.target = null;
        }

        process()
        {

            this.controller.update();
            setPointLightPosition();
        }

        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            this.scene = this.view3D.scene;

            this.initObjects();
            this.initLights();

            setPointLightPosition();
        }

        private initObjects()
        {
            var material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/floor_diffuse.jpg';
            material.normalMethod.normalTexture.url = 'resources/floor_normal.jpg';
            material.specularMethod.specularTexture.url = 'resources/head_specular.jpg';

            //初始化立方体
            var plane = new Object3D();
            plane.transform.position.y = -100;
            var model = plane.getOrCreateComponentByClass(Model);
            var geometry = model.geometry = new PlaneGeometry(1000, 1000);
            // geometry.scaleUV(2, 2);
            model.material = material;
            this.scene.addChild(plane);

            var cube = new Object3D();
            var model = cube.getOrCreateComponentByClass(Model);
            model.material = material;
            model.geometry = new CubeGeometry();
            this.scene.addChild(cube);
        }

        private clearObjects()
        {
            for (var i = this.scene.numChildren - 1; i >= 0; i--)
            {
                this.scene.removeChildAt(i);
            }
        }

        private initLights()
        {

            //
            var lightColor0 = new Color(1, 0, 0, 1);
            light0.getOrCreateComponentByClass(Model).geometry = new SphereGeometry(5);
            light0.getOrCreateComponentByClass(Model);
            //初始化点光源
            var pointLight0 = new PointLight();
            pointLight0.color = lightColor0;
            light0.addComponent(pointLight0);
            light0.getOrCreateComponentByClass(Model).material = new ColorMaterial(lightColor0);
            this.scene.addChild(light0);

            //
            var lightColor1 = new Color(0, 1, 0, 1);
            light1.getOrCreateComponentByClass(Model).geometry = new SphereGeometry(5);
            light1.getOrCreateComponentByClass(Model);
            //初始化点光源
            var pointLight1 = new DirectionalLight();
            pointLight1.color = lightColor1;
            light1.addComponent(pointLight1);
            light1.getOrCreateComponentByClass(Model).material = new ColorMaterial(lightColor1);
            this.scene.addChild(light1);
        }
    }
}

var light0: feng3d.Object3D = new feng3d.Object3D("pointLight");
var light1: feng3d.Object3D = new feng3d.Object3D("pointLight");
new feng3d.PointLightTest();

function setPointLightPosition()
{

    var time = new Date().getTime();
    //
    var angle = time / 1000;
    light0.transform.position.x = Math.sin(angle) * 300;
    light0.transform.position.z = Math.cos(angle) * 300;
    //
    angle = angle + Math.PI / 2;
    light1.transform.position.x = Math.sin(angle) * 300;
    light1.transform.position.z = Math.cos(angle) * 300;
    light1.transform.lookAt(new feng3d.Vector3D());
}