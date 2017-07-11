namespace feng3d
{

    export class Basic_View
    {
        private _view: View3D;
        private _plane: GameObject;

        constructor()
        {
            this._view = new View3D(null, null, null, false);
            var scene = this._view.scene;

            this._view.camera.transform.z = -600;
            this._view.camera.transform.y = 500;
            this._view.camera.transform.lookAt(new Vector3D());

            this._plane = GameObject.create();
            this._plane.addComponent(MeshFilter).mesh = new PlaneGeometry(700, 700);
            var model = this._plane.addComponent(MeshRenderer);
            var material = model.material = new StandardMaterial("resources/floor_diffuse.jpg");
            scene.transform.addChild(this._plane.transform);

            Event.on(ticker, "enterFrame", this._onEnterFrame, this);
        }

        private _onEnterFrame(e: EventVO<any>)
        {
            this._plane.transform.ry += 1;
            this._view.render();
        }
    }
}