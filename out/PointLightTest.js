var feng3d;
(function (feng3d) {
    class PointLightTest {
        constructor() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.transform.position.z = -500;
            this.cameraObj.transform.position.y = 200;
            this.cameraObj.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
            feng3d.input.addEventListener(feng3d.inputType.KEY_UP, this.onKeyUp, this);
        }
        onKeyUp(event) {
            var boardKey = String.fromCharCode(event.keyCode).toLocaleLowerCase();
            switch (boardKey) {
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
        onMousedown() {
            this.controller.target = this.cameraObj.transform;
        }
        onMouseup() {
            this.controller.target = null;
        }
        process() {
            this.controller.update();
            setPointLightPosition();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            this.scene = this.view3D.scene;
            this.initObjects();
            this.initLights();
            setPointLightPosition();
        }
        initObjects() {
            var material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/floor_diffuse.jpg';
            material.normalMethod.normalTexture.url = 'resources/floor_normal.jpg';
            material.specularMethod.specularTexture.url = 'resources/head_specular.jpg';
            //初始化立方体
            var plane = new feng3d.Object3D();
            plane.transform.position.y = -100;
            var model = plane.getOrCreateComponentByClass(feng3d.Model);
            var geometry = model.geometry = new feng3d.PlaneGeometry(1000, 1000);
            // geometry.scaleUV(2, 2);
            model.material = material;
            this.scene.addChild(plane);
            var cube = new feng3d.Object3D();
            var model = cube.getOrCreateComponentByClass(feng3d.Model);
            model.material = material;
            model.geometry = new feng3d.CubeGeometry();
            this.scene.addChild(cube);
        }
        clearObjects() {
            for (var i = this.scene.numChildren - 1; i >= 0; i--) {
                this.scene.removeChildAt(i);
            }
        }
        initLights() {
            //
            var lightColor0 = new feng3d.Color(1, 0, 0, 1);
            light0.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.SphereGeometry(5);
            light0.getOrCreateComponentByClass(feng3d.Model);
            //初始化点光源
            var pointLight0 = new feng3d.PointLight();
            pointLight0.color = lightColor0;
            light0.addComponent(pointLight0);
            light0.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial(lightColor0);
            this.scene.addChild(light0);
            //
            var lightColor1 = new feng3d.Color(0, 1, 0, 1);
            light1.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.SphereGeometry(5);
            light1.getOrCreateComponentByClass(feng3d.Model);
            //初始化点光源
            var pointLight1 = new feng3d.DirectionalLight();
            pointLight1.color = lightColor1;
            light1.addComponent(pointLight1);
            light1.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial(lightColor1);
            this.scene.addChild(light1);
        }
    }
    feng3d.PointLightTest = PointLightTest;
})(feng3d || (feng3d = {}));
var light0 = new feng3d.Object3D("pointLight");
var light1 = new feng3d.Object3D("pointLight");
new feng3d.PointLightTest();
function setPointLightPosition() {
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
//# sourceMappingURL=PointLightTest.js.map