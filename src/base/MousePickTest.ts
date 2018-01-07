namespace feng3d
{

    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    var view3D = new Engine();
    var scene3D = view3D.scene;

    var camera = view3D.camera;
    camera.transform.z = -5;
    camera.transform.lookAt(new Vector3D());
    camera.gameObject.addComponent(FPSController);

    var cube = GameObjectFactory.createCube();
    cube.mouseEnabled = true;
    scene3D.gameObject.addChild(cube);

    var plane = GameObjectFactory.createPlane();
    plane.transform.position = new Vector3D(1.50, 0, 0);
    plane.transform.rx = -90;
    plane.mouseEnabled = true;
    scene3D.gameObject.addChild(plane);

    var sphere = GameObjectFactory.createSphere();
    sphere.transform.position = new Vector3D(-1.50, 0, 0);
    sphere.mouseEnabled = true;
    scene3D.gameObject.addChild(sphere);

    var capsule = GameObjectFactory.createCapsule();
    capsule.transform.position = new Vector3D(3, 0, 0);
    capsule.mouseEnabled = true;
    scene3D.gameObject.addChild(capsule);

    var cylinder = GameObjectFactory.createCylinder();
    cylinder.transform.position = new Vector3D(-3, 0, 0);
    cylinder.mouseEnabled = true;
    scene3D.gameObject.addChild(cylinder);

    scene3D.gameObject.on("click", (event) =>
    {
        var transform = <Transform>event.target;
        if (transform.getComponent(MeshRenderer))
        {
            var material = transform.getComponent(MeshRenderer).material = new ColorMaterial();
            material.color.fromUnit(Math.random() * (1 << 24));
        }

    });
}