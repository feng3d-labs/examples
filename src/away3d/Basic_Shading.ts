namespace feng3d
{

    export class Basic_Shading extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");

            var planeMaterial: StandardMaterial;
            var sphereMaterial: StandardMaterial;
            var cubeMaterial: StandardMaterial;
            var torusMaterial: StandardMaterial;
            var light1: GameObject;
            var light2: GameObject;
            var plane: GameObject;
            var sphere: GameObject;
            var cube: GameObject;
            var torus: GameObject;

            initEngine();
            initLights();
            initMaterials();
            initObjects();
            initListeners();

            function initEngine()
            {

                camera.transform.y = 5;
                camera.transform.z = -10;
                camera.transform.lookAt(new Vector3());
                camera.gameObject.addComponent(FPSController);
            }

            function initMaterials()
            {
                planeMaterial = new StandardMaterial();
                planeMaterial.uniforms.s_diffuse.url = "resources/floor_diffuse.jpg";
                planeMaterial.uniforms.s_normal.url = "resources/floor_normal.jpg";
                planeMaterial.uniforms.s_specular.url = "resources/floor_specular.jpg";
                sphereMaterial = new StandardMaterial();
                sphereMaterial.uniforms.s_diffuse.url = "resources/beachball_diffuse.jpg";
                sphereMaterial.uniforms.s_specular.url = "resources/beachball_specular.jpg";
                cubeMaterial = new StandardMaterial();
                cubeMaterial.uniforms.s_diffuse.url = "resources/trinket_diffuse.jpg";
                cubeMaterial.uniforms.s_normal.url = "resources/trinket_normal.jpg";
                cubeMaterial.uniforms.s_specular.url = "resources/trinket_specular.jpg";
                torusMaterial = new StandardMaterial();
                torusMaterial.uniforms.s_diffuse.url = "resources/weave_diffuse.jpg";
                torusMaterial.uniforms.s_normal.url = "resources/weave_normal.jpg";
                torusMaterial.uniforms.s_specular.url = "resources/weave_diffuse.jpg";
            }

            function initLights()
            {
                scene.ambientColor.a = 0.2;

                light1 = GameObject.create();
                var directionalLight = light1.addComponent(DirectionalLight);
                directionalLight.intensity = 0.7;
                light1.transform.rx = 90;
                scene.gameObject.addChild(light1);

                light2 = GameObject.create();
                var directionalLight = light2.addComponent(DirectionalLight);
                directionalLight.color.fromUnit(0x00FFFF);
                directionalLight.intensity = 0.7;
                light2.transform.rx = 90;
                scene.gameObject.addChild(light2);
            }

            function initObjects()
            {
                plane = GameObject.create();
                var model = plane.addComponent(MeshRenderer);
                var geometry: Geometry = model.geometry = new PlaneGeometry(10, 10);
                model.material = planeMaterial;
                geometry.scaleUV(2, 2);
                plane.transform.y = -0.20;
                scene.gameObject.addChild(plane);
                sphere = GameObject.create();
                var model = sphere.addComponent(MeshRenderer);
                model.geometry = new SphereGeometry(1.50, 40, 20)
                model.material = sphereMaterial;
                sphere.transform.x = 3;
                sphere.transform.y = 1.60;
                sphere.transform.z = 3.00;
                scene.gameObject.addChild(sphere);
                cube = GameObject.create();
                var model = cube.addComponent(MeshRenderer);
                model.geometry = new CubeGeometry(2, 2, 2, 1, 1, 1, false);
                model.material = cubeMaterial;
                cube.transform.x = 3.00;
                cube.transform.y = 1.60;
                cube.transform.z = -2.50;
                scene.gameObject.addChild(cube);
                torus = GameObject.create();
                var model = torus.addComponent(MeshRenderer);
                geometry = model.geometry = new TorusGeometry(1.50, 0.60, 40, 20);
                model.material = torusMaterial;
                geometry.scaleUV(10, 5);
                torus.transform.x = -2.50;
                torus.transform.y = 1.60;
                torus.transform.z = -2.50;
                scene.gameObject.addChild(torus);
            }

            function initListeners()
            {
                ticker.onframe(onEnterFrame, this);
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
}