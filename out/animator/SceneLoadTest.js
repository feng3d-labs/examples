var feng3d;
(function (feng3d) {
    var SceneLoadTest = (function () {
        function SceneLoadTest() {
            this.init();
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.view3D.camera.gameObject);
        }
        SceneLoadTest.prototype.init = function () {
            this.view3D = new feng3d.Engine();
            var scene3D = this.view3D.scene;
            feng3d.Loader.loadText("resources/scene/scene.json", function (content) {
                var json = JSON.parse(content);
                var scene = feng3d.GameObject.create();
                scene.deserialize(json);
                for (var i = 0; i < scene.numChildren; i++) {
                    scene3D.gameObject.addChild(scene.getChildAt(i));
                }
            });
        };
        return SceneLoadTest;
    }());
    feng3d.SceneLoadTest = SceneLoadTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=SceneLoadTest.js.map