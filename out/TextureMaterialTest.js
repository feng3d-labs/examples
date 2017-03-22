var feng3d;
(function (feng3d) {
    class TextureMaterialTest {
        constructor() {
            this.init();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var cube = new feng3d.CubeObject3D();
            cube.transform.position.z = 300;
            this.view3D.scene.addChild(cube);
            //变化旋转与颜色
            setInterval(function () {
                cube.transform.rotation.y += 1;
            }, 15);
            //材质
            var textureMaterial = cube.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.TextureMaterial();
            //
            textureMaterial.texture = new feng3d.Texture2D('resources/sky.jpg');
        }
    }
    feng3d.TextureMaterialTest = TextureMaterialTest;
})(feng3d || (feng3d = {}));
new feng3d.TextureMaterialTest();
//# sourceMappingURL=TextureMaterialTest.js.map