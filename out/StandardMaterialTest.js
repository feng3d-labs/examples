var feng3d;
(function (feng3d) {
    class StandardMaterialTest {
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
            var material = cube.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.StandardMaterial();
            //
            material.diffuseMethod.difuseTexture.url = 'resources/sky.jpg';
            material.diffuseMethod.baseColor.setTo(1, 0, 0);
        }
    }
    feng3d.StandardMaterialTest = StandardMaterialTest;
})(feng3d || (feng3d = {}));
new feng3d.StandardMaterialTest();
//# sourceMappingURL=StandardMaterialTest.js.map