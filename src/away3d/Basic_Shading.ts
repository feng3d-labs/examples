class Basic_Shading extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");

        var planeMaterial: feng3d.StandardMaterial;
        var sphereMaterial: feng3d.StandardMaterial;
        var cubeMaterial: feng3d.StandardMaterial;
        var torusMaterial: feng3d.StandardMaterial;
        var light1: feng3d.GameObject;
        var light2: feng3d.GameObject;
        var plane: feng3d.GameObject;
        var sphere: feng3d.GameObject;
        var cube: feng3d.GameObject;
        var torus: feng3d.GameObject;

        initEngine();
        initLights();
        initMaterials();
        initObjects();
        initListeners();

        function initEngine()
        {

            camera.transform.y = 5;
            camera.transform.z = -10;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.gameObject.addComponent(feng3d.FPSController);
        }

        function initMaterials()
        {
            planeMaterial = feng3d.materialFactory.create("standard");
            planeMaterial.uniforms.s_diffuse.url = "resources/floor_diffuse.jpg";
            planeMaterial.uniforms.s_normal.url = "resources/floor_normal.jpg";
            planeMaterial.uniforms.s_specular.url = "resources/floor_specular.jpg";
            sphereMaterial = feng3d.materialFactory.create("standard");
            sphereMaterial.uniforms.s_diffuse.url = "resources/beachball_diffuse.jpg";
            sphereMaterial.uniforms.s_specular.url = "resources/beachball_specular.jpg";
            cubeMaterial = feng3d.materialFactory.create("standard");
            cubeMaterial.uniforms.s_diffuse.url = "resources/trinket_diffuse.jpg";
            cubeMaterial.uniforms.s_normal.url = "resources/trinket_normal.jpg";
            cubeMaterial.uniforms.s_specular.url = "resources/trinket_specular.jpg";
            torusMaterial = feng3d.materialFactory.create("standard");
            torusMaterial.uniforms.s_diffuse.url = "resources/weave_diffuse.jpg";
            torusMaterial.uniforms.s_normal.url = "resources/weave_normal.jpg";
            torusMaterial.uniforms.s_specular.url = "resources/weave_diffuse.jpg";
        }

        function initLights()
        {
            scene.ambientColor.a = 0.2;

            light1 = feng3d.GameObject.create();
            var directionalLight = light1.addComponent(feng3d.DirectionalLight);
            directionalLight.intensity = 0.7;
            light1.transform.rx = 90;
            scene.gameObject.addChild(light1);

            light2 = feng3d.GameObject.create();
            var directionalLight = light2.addComponent(feng3d.DirectionalLight);
            directionalLight.color.fromUnit(0x00FFFF);
            directionalLight.intensity = 0.7;
            light2.transform.rx = 90;
            scene.gameObject.addChild(light2);
        }

        function initObjects()
        {
            plane = feng3d.GameObject.create();
            var model = plane.addComponent(feng3d.Model);
            var geometry: feng3d.Geometry = model.geometry = new feng3d.PlaneGeometry({ width: 10, height: 10 });
            model.material = planeMaterial;
            geometry.scaleUV(2, 2);
            plane.transform.y = -0.20;
            scene.gameObject.addChild(plane);
            sphere = feng3d.GameObject.create();
            var model = sphere.addComponent(feng3d.Model);
            model.geometry = new feng3d.SphereGeometry({ radius: 1.50, segmentsW: 40, segmentsH: 20 })
            model.material = sphereMaterial;
            sphere.transform.x = 3;
            sphere.transform.y = 1.60;
            sphere.transform.z = 3.00;
            scene.gameObject.addChild(sphere);
            cube = feng3d.GameObject.create();
            var model = cube.addComponent(feng3d.Model);
            model.geometry = new feng3d.CubeGeometry({ width: 2, height: 2, depth: 2, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
            model.material = cubeMaterial;
            cube.transform.x = 3.00;
            cube.transform.y = 1.60;
            cube.transform.z = -2.50;
            scene.gameObject.addChild(cube);
            torus = feng3d.GameObject.create();
            var model = torus.addComponent(feng3d.Model);
            geometry = model.geometry = new feng3d.TorusGeometry({ radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
            model.material = torusMaterial;
            geometry.scaleUV(10, 5);
            torus.transform.x = -2.50;
            torus.transform.y = 1.60;
            torus.transform.z = -2.50;
            scene.gameObject.addChild(torus);
        }

        function initListeners()
        {
            feng3d.ticker.onframe(onEnterFrame, this);
        }

        function onEnterFrame()
        {
            light1.transform.rx = 30;
            light1.transform.ry++;
        }
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