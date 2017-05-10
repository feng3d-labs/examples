module feng3d
{

    export class Basic_View
    {
        private _view: View3D;
        private _plane: GameObject;

        public constructor()
        {
            var canvas = document.getElementById("glcanvas");
            this._view = new View3D(canvas);
            var scene = this._view.scene;

            this._view.camera.z = -600;
            this._view.camera.y = 500;
            this._view.camera.lookAt(new Vector3D());

            this._plane = new GameObject();
            var model = this._plane.getOrCreateComponentByClass(Model);
            model.geometry = new PlaneGeometry(700, 700);
            var material = model.material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = "resources/floor_diffuse.jpg";
            scene.addChild(this._plane);

            ticker.addEventListener(Event.ENTER_FRAME, this._onEnterFrame, this);
        }

        private _onEnterFrame(e: Event)
        {
            this._plane.rotationY += 1;
        }
    }
}