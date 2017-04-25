var feng3d;
(function (feng3d) {
    class TextureMaterialTest {
        constructor() {
            this.init();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var cube = new feng3d.GameObject();
            cube.z = 300;
            cube.y = -100;
            this.view3D.scene.addChild(cube);
            //变化旋转与颜色
            setInterval(function () {
                cube.rotationY += 1;
            }, 15);
            var model = cube.getOrCreateComponentByClass(feng3d.Model);
            model.geometry = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
            // model.geometry = new PlaneGeometry();
            //材质
            var textureMaterial = model.material = new feng3d.TextureMaterial();
            //
            // var texture = textureMaterial.texture = new Texture2D('resources/sky.jpg');
            var texture = textureMaterial.texture = new feng3d.Texture2D('resources/m.png');
            texture.flipY = false;
        }
    }
    feng3d.TextureMaterialTest = TextureMaterialTest;
})(feng3d || (feng3d = {}));
new feng3d.TextureMaterialTest();
//# sourceMappingURL=TextureMaterialTest.js.map