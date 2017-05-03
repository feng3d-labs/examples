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
            this.controller = new FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);

            input.addEventListener("mousedown", this.onMousedown, this);
            input.addEventListener("mouseup", this.onMouseup, this);
        }

        private onMousedown()
        {
            this.controller.target = this.view3D.camera;
        }

        private onMouseup()
        {
            this.controller.target = null;
        }

        process()
        {
            this.controller.update();
        }
        init()
        {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var gameObject = new GameObject();
            gameObject.z = 300;
            gameObject.isBillboard = true;
            this.view3D.scene.addChild(gameObject);

            //材质
            var model = gameObject.getOrCreateComponentByClass(Model);
            model.geometry = new PlaneGeometry(100, 100, 1, 1, false);
            var textureMaterial = model.material = new TextureMaterial();
            //
            var texture = textureMaterial.texture = new Texture2D('resources/m.png');
        }
    }
}