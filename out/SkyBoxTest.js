var feng3d;
(function (feng3d) {
    class SkyBoxTest {
        constructor() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        onMousedown() {
            this.controller.target = this.cameraObj;
        }
        onMouseup() {
            this.controller.target = null;
        }
        process() {
            this.controller.update();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene = this.view3D.scene;
            var root = 'resources/skybox/';
            var imagePaths = ['px.jpg', 'py.jpg', 'pz.jpg', 'nx.jpg', 'ny.jpg', 'nz.jpg'];
            for (var i = 0; i < imagePaths.length; i++) {
                imagePaths[i] = root + imagePaths[i];
            }
            var skybox = new feng3d.GameObject("skybox");
            var model = skybox.getOrCreateComponentByClass(feng3d.Model);
            model.geometry = new feng3d.SkyBoxGeometry();
            model.material = new feng3d.SkyBoxMaterial(imagePaths);
            scene.addChild(skybox);
        }
    }
    feng3d.SkyBoxTest = SkyBoxTest;
})(feng3d || (feng3d = {}));
new feng3d.SkyBoxTest();
//# sourceMappingURL=SkyBoxTest.js.map