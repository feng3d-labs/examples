var feng3d;
(function (feng3d) {
    var view = new feng3d.Engine();
    var scene = view.scene;
    view.camera.transform.z = -6;
    view.camera.transform.y = 5;
    view.camera.transform.lookAt(new feng3d.Vector3());
    var plane = feng3d.GameObject.create();
    var model = plane.addComponent(feng3d.MeshRenderer);
    model.geometry = new feng3d.PlaneGeometry(7, 7);
    var material = model.material = new feng3d.StandardMaterial("resources/floor_diffuse.jpg");
    scene.gameObject.addChild(plane);
    feng3d.ticker.onframe(function () {
        plane.transform.ry += 1;
    });
})(feng3d || (feng3d = {}));
//# sourceMappingURL=Basic_View.js.map