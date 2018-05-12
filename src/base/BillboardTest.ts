class BillboardTest extends feng3d.Script
{
    /*
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];

        camera.gameObject.addComponent(feng3d.FPSController);
        scene.background.setTo(0.3, 0.3, 0.3, 1);

        var cube = feng3d.gameObjectFactory.createCube();
        cube.transform.z = 3;
        scene.gameObject.addChild(cube);

        var gameObject = feng3d.gameObjectFactory.createPlane();
        gameObject.transform.y = 1.50;
        var holdSizeComponent = gameObject.addComponent(feng3d.HoldSizeComponent);
        holdSizeComponent.holdSize = 1;
        holdSizeComponent.camera = camera;
        var billboardComponent = gameObject.addComponent(feng3d.BillboardComponent);
        billboardComponent.camera = camera;
        cube.addChild(gameObject);

        //材质
        var model = gameObject.getComponent(feng3d.MeshRenderer);
        model.geometry = new feng3d.PlaneGeometry({ width: 40, height: 40, segmentsW: 1, segmentsH: 1, yUp: false });
        var textureMaterial = model.material = feng3d.materialFactory.create("standard");
        // textureMaterial.cullFace = CullFace.NONE;
        //
        var texture = textureMaterial.uniforms.s_diffuse.url = 'resources/m.png';

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

    /**
     * 更新
     */
    update()
    {
    }

    /**
     * 销毁时调用
     */
    dispose()
    {

    }
}