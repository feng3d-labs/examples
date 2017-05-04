module feng3d
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
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);
            var scene = this.view3D.scene;

            var cube = new GameObject();
            var model = cube.getOrCreateComponentByClass(Model);
            model.geometry = new CubeGeometry();
            model.material = new StandardMaterial();
            cube.z = 300;
            scene.addChild(cube);

            var gameObject = new GameObject();
            gameObject.y = 150;
            gameObject.isBillboard = true;
            cube.addChild(gameObject);

            //材质
            var model = gameObject.getOrCreateComponentByClass(Model);
            model.geometry = new PlaneGeometry(100, 100, 1, 1, false);
            var textureMaterial = model.material = new TextureMaterial();
            //
            var texture = textureMaterial.texture = new Texture2D('resources/m.png');

            gameObject.holdSize = 1;
        }
    }
}