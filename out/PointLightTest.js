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
            var scene = this.view3D.scene;
            // var imagePaths = ['floor_diffuse.jpg', 'floor_normal.jpg'];
            //初始化立方体
            var cube = new feng3d.CubeObject3D();
            cube.transform.position.y = -200;
            var material = cube.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/floor_diffuse.jpg';
            material.diffuseMethod.color.setTo(0.8, 1.0, 1.0);
            material.roughness = 0.7;
            scene.addChild(cube);
            //
            var lightColor0 = new feng3d.Color(1, 0, 0, 1);
            light0.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.SphereGeometry(5);
            light0.getOrCreateComponentByClass(feng3d.Model);
            //初始化点光源
            var pointLight0 = new feng3d.PointLight();
            pointLight0.color = lightColor0;
            light0.addComponent(pointLight0);
            light0.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial(lightColor0);
            scene.addChild(light0);
            //
            var lightColor1 = new feng3d.Color(0, 1, 0, 1);
            light1.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.SphereGeometry(5);
            light1.getOrCreateComponentByClass(feng3d.Model);
            //初始化点光源
            var pointLight1 = new feng3d.PointLight();
            pointLight1.color = lightColor1;
            light1.addComponent(pointLight1);
            light1.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial(lightColor1);
            scene.addChild(light1);
            setPointLightPosition();
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
}
//# sourceMappingURL=PointLightTest.js.map