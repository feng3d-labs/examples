var feng3d;
(function (feng3d) {
    var object;
    var view3D = new feng3d.Engine();
    // //变化旋转
    setInterval(function () {
        if (object) {
            object.transform.ry += 1;
        }
    }, 15);
    // var objUrl = "resources/cube.obj";
    var objUrl = "resources/head.obj";
    var scene = view3D.scene;
    var material = new feng3d.StandardMaterial();
    material.diffuseMethod.difuseTexture.url = "resources/head_diffuse.jpg";
    material.normalMethod.normalTexture.url = "resources/head_normals.jpg";
    material.specularMethod.specularTexture.url = "resources/head_specular.jpg";
    // var material = new ColorMaterial();
    feng3d.ObjLoader.load(objUrl, material, function (object3D) {
        object = object3D;
        object.transform.sx = 20;
        object.transform.sy = 20;
        object.transform.sz = 20;
        object.transform.z = 300;
        scene.gameObject.addChild(object3D);
    });
    //初始化光源
    var light1 = feng3d.GameObject.create();
    var pointLight1 = light1.addComponent(feng3d.PointLight);
    pointLight1.color = new feng3d.Color(0, 1, 0, 1);
    scene.gameObject.addChild(light1);
})(feng3d || (feng3d = {}));
//# sourceMappingURL=OBJParserTest.js.map