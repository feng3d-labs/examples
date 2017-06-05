namespace feng3d
{

    export class Basic_View
    {
        private _view: View3D;
        private _plane: GameObject;

        public constructor()
        {
            this._view = new View3D(null, null, null, false);
            var scene = this._view.scene;

            this._view.camera.z = -600;
            this._view.camera.y = 500;
            this._view.camera.lookAt(new Vector3D());

            this._plane = new GameObject();
            this._plane.geometry = new PlaneGeometry(700, 700);
            var model = this._plane.getOrCreateComponentByClass(Model);
            var material = model.material = new StandardMaterial("resources/floor_diffuse.jpg");
            scene.addChild(this._plane);

            ticker.addEventListener(Event.ENTER_FRAME, this._onEnterFrame, this);
        }

        private _onEnterFrame(e: Event)
        {
            this._plane.rotationY += 1;
            this._view.render();
        }
    }
}