var feng3d;
(function (feng3d) {
    class StandardMaterialTest {
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
            var textureMaterial = model.material = new feng3d.StandardMaterial();
            // textureMaterial.diffuseMethod.difuseTexture.url = 'resources/m.png';
            textureMaterial.diffuseMethod.difuseTexture.url = 'resources/nonpowerof2.png';
            textureMaterial.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
            // textureMaterial.diffuseMethod.alphaThreshold = 0.1;
            // textureMaterial.diffuseMethod.difuseTexture.anisotropy = 16;
            // textureMaterial.enableBlend = true;
            textureMaterial.diffuseMethod.color.a = 0.2;
        }
    }
    feng3d.StandardMaterialTest = StandardMaterialTest;
})(feng3d || (feng3d = {}));
new feng3d.StandardMaterialTest();
//# sourceMappingURL=StandardMaterialTest.js.map