var feng3d;
(function (feng3d) {
    class BillboardTest {
        constructor() {
            this.init();
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        onMousedown() {
            this.controller.target = this.view3D.camera.transform;
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
            var object3d = new feng3d.Object3D();
            object3d.transform.position.z = 300;
            object3d.isBillboard = true;
            this.view3D.scene.addChild(object3d);
            //材质
            var model = object3d.getOrCreateComponentByClass(feng3d.Model);
            model.geometry = new feng3d.PlaneGeometry(100, 100, 1, 1, false);
            var textureMaterial = model.material = new feng3d.TextureMaterial();
            //
            var texture = textureMaterial.texture = new feng3d.Texture2D('resources/m.png');
            texture.flipY = false;
            texture.premulAlpha = true;
        }
    }
    feng3d.BillboardTest = BillboardTest;
})(feng3d || (feng3d = {}));
new feng3d.BillboardTest();
//# sourceMappingURL=BillboardTest.js.map