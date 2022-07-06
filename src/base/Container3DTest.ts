namespace examples
{
    /**
     * 测试3D容器
     */
    var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent("Scene")
    scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

    var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent("Camera");
    camera.transform.position = new feng3d.Vector3(0, 1, -10);
    scene.gameObject.addChild(camera.gameObject);

    var engine = new feng3d.View(null, scene, camera);

    //初始化颜色材质
    const cube = feng3d.GameObject.createPrimitive("Cube");
    scene.gameObject.addChild(cube);

    const colorMaterial = cube.getComponent("Renderable").material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color" });

    var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
    cylinder.transform.x = 2;
    cube.addChild(cylinder);

    let num = 0;
    feng3d.ticker.onframe(() =>
    {
        console.log("update")

        //变化旋转与颜色
        cube.transform.ry += 1;

        num++;

        if (num % 60 == 0)
        {
            (<feng3d.ColorUniforms>colorMaterial.uniforms).u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
        }
    });
}