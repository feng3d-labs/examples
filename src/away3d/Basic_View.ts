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

            this._view.camera.transform.z = -600;
            this._view.camera.transform.y = 500;
            this._view.camera.transform.lookAt(new Vector3D());

            this._plane = new GameObject();
            this._plane.getOrCreateComponentByClass(MeshFilter).mesh = new PlaneGeometry(700, 700);
            var model = this._plane.getOrCreateComponentByClass(MeshRenderer);
            var material = model.material = new StandardMaterial("resources/floor_diffuse.jpg");
            scene.addChild(this._plane.transform);

            ticker.addEventListener(Event.ENTER_FRAME, this._onEnterFrame, this);
        }

        private _onEnterFrame(e: Event)
        {
            this._plane.transform.rotationY += 1;
            this._view.render();
        }
    }
}