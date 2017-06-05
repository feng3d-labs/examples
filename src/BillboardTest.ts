namespace feng3d
{
    export class BillboardTest
    {
        view3D: View3D;
        controller: FPSController;
        constructor()
        {
            this.init();
            //
            this.controller = new FPSController(this.view3D.camera);
        }

        init()
        {
            
            this.view3D = new View3D();
            var scene = this.view3D.scene;
            scene.background.setTo(0.3, 0.3, 0.3);

            var cube = GameObjectFactory.createCube();
            cube.z = 300;
            scene.addChild(cube);

           var gameObject =  GameObjectFactory.createPlane();
            gameObject.y = 150;
            gameObject.isBillboard = true;
            gameObject.holdSize = 1;
            cube.addChild(gameObject);

            //材质
            var model = gameObject.getOrCreateComponentByClass(Model);
            gameObject.getOrCreateComponentByClass(MeshFilter).mesh = new PlaneGeometry(100, 100, 1, 1, false);
            var textureMaterial = model.material = new TextureMaterial();
            //
            // var texture = textureMaterial.texture = new Texture2D('resources/m.png');

            var texture = textureMaterial.texture = new Texture2D();
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
        }
    }
}