namespace examples
{
    var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent("Scene")
    scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

    var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent("Camera");
    camera.transform.position = new feng3d.Vector3(0, 1, -10);
    scene.gameObject.addChild(camera.gameObject);

    var engine = new feng3d.View(null, scene, camera);

    var cube = feng3d.GameObject.createPrimitive("Cube");
    scene.gameObject.addChild(cube);

    var plane = feng3d.GameObject.createPrimitive("Plane");
    plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
    plane.transform.rx = -90;
    plane.transform.scale.set(0.1, 0.1, 0.1);
    scene.gameObject.addChild(plane);

    var sphere = feng3d.GameObject.createPrimitive("Sphere");
    sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
    scene.gameObject.addChild(sphere);

    var capsule = feng3d.GameObject.createPrimitive("Capsule");
    capsule.transform.position = new feng3d.Vector3(3, 0, 0);
    scene.gameObject.addChild(capsule);

    var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
    cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
    scene.gameObject.addChild(cylinder);

    var controller = new feng3d.LookAtController(camera.gameObject);
    controller.lookAtPosition = new feng3d.Vector3();
    //
    setInterval(() =>
    {
        var time = new Date().getTime();
        var angle = (Math.round(time / 17) % 360);
        angle = angle * Math.DEG2RAD;
        camera.transform.position = new feng3d.Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));

        controller.update();
    }, 17);
}