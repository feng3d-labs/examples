var examples;
(function (examples) {
    var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent(feng3d.Scene);
    scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);
    var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent(feng3d.Camera);
    camera.transform.position = new feng3d.Vector3(0, 1, -10);
    scene.gameObject.addChild(camera.gameObject);
    var engine = new feng3d.View(null, scene, camera);
    var object;
    // //变化旋转
    setInterval(function () {
        if (object) {
            object.transform.ry += 1;
        }
    }, 15);
    // var objUrl = "resources/cube.obj";
    var objUrl = "resources/head.obj";
    var material = feng3d.serialization.setValue(new feng3d.Material(), {
        uniforms: {
            s_diffuse: { __class__: "feng3d.Texture2D", source: { url: "resources/head_diffuse.jpg" } },
            s_normal: { __class__: "feng3d.Texture2D", source: { url: "resources/head_normals.jpg" } },
            s_specular: { __class__: "feng3d.Texture2D", source: { url: "resources/head_specular.jpg" } },
        }
    });
    // var material = materialFactory.create("color");
    material.renderParams.cullFace = feng3d.CullFace.NONE;
    feng3d.objLoader.load(objUrl, function (gameObject) {
        object = gameObject;
        object.transform.sx = 20;
        object.transform.sy = 20;
        object.transform.sz = 20;
        object.transform.z = 300;
        scene.gameObject.addChild(gameObject);
        var models = gameObject.getComponentsInChildren(feng3d.Renderable);
        models.forEach(function (element) {
            element.material = material;
        });
    });
})(examples || (examples = {}));
//# sourceMappingURL=OBJParserTest.js.map