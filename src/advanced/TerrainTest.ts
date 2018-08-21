class TerrainTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];

        camera.transform.z = -500;
        camera.transform.y = 200;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);

        var root = 'resources/terrain/';
        //
        var terrain = feng3d.GameObject.create("terrain");
        var model = terrain.addComponent(feng3d.Model);
        // model.geometry = new feng3d.TerrainGeometry();
        model.geometry = new feng3d.TerrainGeometry({ heightMapUrl: root + 'terrain_heights.jpg', width: 500, height: 100, depth: 500 });
        var material = new feng3d.TerrainMaterial();

        material.uniforms.s_diffuse.url = root + 'terrain_diffuse.jpg';
        material.uniforms.s_normal.url = root + "terrain_normals.jpg";
        //
        material.uniforms.s_blendTexture.url = root + 'terrain_splats.png';
        material.uniforms.s_splatTexture1.url = root + 'beach.jpg';
        material.uniforms.s_splatTexture2.url = root + 'grass.jpg';
        material.uniforms.s_splatTexture3.url = root + 'rock.jpg';
        material.uniforms.u_splatRepeats = new feng3d.Vector4(1, 50, 50, 50)

        model.material = material;
        scene.gameObject.addChild(terrain);

        //初始化光源
        var light1 = feng3d.GameObject.create();
        var pointLight1 = light1.addComponent(feng3d.PointLight);
        // pointLight1.range = 1000;
        pointLight1.color = new feng3d.Color3(1, 1, 0);
        light1.transform.y = 3;
        // scene.transform.addChild(light1);

        //
        feng3d.ticker.onframe(() =>
        {
            var time = new Date().getTime();
            var angle = time / 1000;
            light1.transform.x = Math.sin(angle) * 3;
            light1.transform.z = Math.cos(angle) * 3;
        });
    }
    /**
     * 更新
     */
    update()
    {
    }

    /**
    * 销毁时调用
    */
    dispose()
    {

    }
}