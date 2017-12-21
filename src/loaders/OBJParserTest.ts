namespace feng3d
{
    var object: GameObject;
    var view3D = new Engine();

    // //变化旋转
    setInterval(function ()
    {
        if (object)
        {
            object.transform.ry += 1;
        }
    }, 15);

    // var objUrl = "resources/cube.obj";
    var objUrl = "resources/head.obj";
    var scene = view3D.scene;

    var material = new StandardMaterial();
    material.diffuseMethod.difuseTexture.url = "resources/head_diffuse.jpg";
    material.normalMethod.normalTexture.url = "resources/head_normals.jpg";
    material.specularMethod.specularTexture.url = "resources/head_specular.jpg";
    // var material = new ColorMaterial();
    material.cullFace = CullFace.NONE;

    ObjLoader.load(objUrl, function (gameObject: GameObject)
    {
        object = gameObject;
        object.transform.sx = 20;
        object.transform.sy = 20;
        object.transform.sz = 20;
        object.transform.z = 300;
        scene.gameObject.addChild(gameObject);

        var meshRenderers = gameObject.getComponentsInChildren(MeshRenderer);
        meshRenderers.forEach(element =>
        {
            element.material = material;
        });
    });
}