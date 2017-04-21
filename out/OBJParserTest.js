var feng3d;
(function (feng3d) {
    class OBJParserTest {
        constructor() {
            this.init();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            // //变化旋转
            setInterval(function () {
                if (object) {
                    object.rotationY += 1;
                }
            }, 15);
            // var objUrl = "resources/cube.obj";
            var objUrl = "resources/head.obj";
            var scene = this.view3D.scene;
            var objLoader = new feng3d.ObjLoader();
            objLoader.load(objUrl, function (object3D) {
                object = object3D;
                object.scaleX = 20;
                object.scaleY = 20;
                object.scaleZ = 20;
                object.z = 300;
                scene.addChild(object3D);
            });
        }
    }
    feng3d.OBJParserTest = OBJParserTest;
    var object;
})(feng3d || (feng3d = {}));
new feng3d.OBJParserTest();
//# sourceMappingURL=OBJParserTest.js.map