var feng3d;
(function (feng3d) {
    class SceneLoadTest {
        constructor() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.transform.position.z = -500;
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
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene3D = this.view3D.scene;
            var loader = new feng3d.Loader();
            loader.addEventListener(feng3d.LoaderEvent.COMPLETE, function () {
                var json = JSON.parse(loader.content);
                var scene = feng3d.serialization.readObject(json);
                for (var i = 0; i < scene.numChildren; i++) {
                    scene3D.addChild(scene.getChildAt(i));
                }
            }, this);
            loader.loadText("resources/scene/scene.json");
        }
    }
    feng3d.SceneLoadTest = SceneLoadTest;
})(feng3d || (feng3d = {}));
new feng3d.SceneLoadTest();
//# sourceMappingURL=SceneLoadTest.js.map