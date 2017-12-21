namespace feng3d
{
    var view3D = new Engine();
    view3D.camera.gameObject.addComponent(FPSController);

    var scene = view3D.scene;
    scene.background.setTo(0.3, 0.3, 0.3);

    var cube = GameObjectFactory.createCube();
    cube.transform.z = 300;
    scene.gameObject.addChild(cube);

    var gameObject = GameObjectFactory.createPlane();
    gameObject.transform.y = 150;
    var holdSizeComponent = gameObject.addComponent(HoldSizeComponent);
    holdSizeComponent.holdSize = 1;
    holdSizeComponent.camera = view3D.camera;
    var billboardComponent = gameObject.addComponent(BillboardComponent);
    billboardComponent.camera = view3D.camera;
    cube.addChild(gameObject);

    //材质
    var model = gameObject.getComponent(MeshRenderer);
    model.geometry = new PlaneGeometry(100, 100, 1, 1, false);
    var textureMaterial = model.material = new StandardMaterial();
    // textureMaterial.cullFace = CullFace.NONE;
    //
    var texture = textureMaterial.diffuseMethod.difuseTexture.url = 'resources/m.png';

    // var texture = textureMaterial.texture = new ImageDataTexture();
    // var canvas2D = document.createElement("canvas");
    // canvas2D.width = 256;
    // canvas2D.height = 256;
    // var context2D = canvas2D.getContext("2d");
    // // context2D.fillStyle = "red";
    // // context2D.fillRect(0, 0, canvas2D.width, canvas2D.height);
    // context2D.fillStyle = "green";
    // context2D.font = '48px serif';
    // // context2D.fillText('Hello world', 50, 100);
    // context2D.fillText('Hello world', 0, 50);
    // // context2D.strokeText('Hello world', 50, 100);
    // var imageData = context2D.getImageData(0, 0, canvas2D.width, canvas2D.height);
    // texture.pixels = imageData;

    // gameObject.holdSize = 1;
}