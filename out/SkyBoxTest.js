var feng3d;
(function (feng3d) {
    class SkyBoxTest {
        constructor() {
            this.init();
            this.cameraObj = new feng3d.Object3D("camera");
            this.cameraObj.transform.position.z = -500;
            this.cameraObj.transform.lookAt(new feng3d.Vector3D());
            this.cameraObj.addComponent(this.view3D.camera);
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
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene = this.view3D.scene;
            var loadedNum = 0;
            var imagePaths = ['px.jpg', 'py.jpg', 'pz.jpg', 'nx.jpg', 'ny.jpg', 'nz.jpg'];
            var images = [];
            for (var i = 0; i < imagePaths.length; i++) {
                var image = images[i] = new Image();
                image.onload = function () {
                    loadedNum++;
                    if (loadedNum == imagePaths.length) {
                        var skybox = new feng3d.SkyBoxObject3D(images);
                        scene.addChild(skybox);
                    }
                };
                image.src = 'resources/skybox/' + imagePaths[i];
            }
        }
    }
    feng3d.SkyBoxTest = SkyBoxTest;
})(feng3d || (feng3d = {}));
new feng3d.SkyBoxTest();
//# sourceMappingURL=SkyBoxTest.js.map