var feng3d;
(function (feng3d) {
    var view3D = new feng3d.Engine();
    view3D.camera.gameObject.addComponent(feng3d.FPSController);
    var scene = view3D.scene;
    scene.background.setTo(0.3, 0.3, 0.3);
    var cube = feng3d.GameObjectFactory.createCube();
    cube.transform.z = 300;
    scene.transform.addChild(cube.transform);
    var gameObject = feng3d.GameObjectFactory.createPlane();
    gameObject.transform.y = 150;
    gameObject.transform.isBillboard = true;
    gameObject.transform.holdSize = 1;
    cube.transform.addChild(gameObject.transform);
    //材质
    var model = gameObject.getComponent(feng3d.MeshRenderer);
    gameObject.getComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(100, 100, 1, 1, false);
    var textureMaterial = model.material = new feng3d.TextureMaterial();
    //
    // var texture = textureMaterial.texture = new Texture2D('resources/m.png');
    var texture = textureMaterial.texture = new feng3d.Texture2D();
    var canvas2D = document.createElement("canvas");
    canvas2D.width = 300;
    canvas2D.height = 150;
    var context2D = canvas2D.getContext("2d");
    // context2D.fillStyle = "red";
    // context2D.fillRect(0, 0, canvas2D.width, canvas2D.height);
    context2D.fillStyle = "green";
    context2D.font = '48px serif';
    // context2D.fillText('Hello world', 50, 100);
    context2D.fillText('Hello world', 0, 50);
    // context2D.strokeText('Hello world', 50, 100);
    var imageData = context2D.getImageData(0, 0, canvas2D.width, canvas2D.height);
    texture.pixels = imageData;
    // gameObject.holdSize = 1;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=BillboardTest.js.map