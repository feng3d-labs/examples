namespace feng3d
{
    export class PointLightTest
    {
        view3D: View3D;
        scene: Scene3D;
        controller: FPSController;
        cameraObj: GameObject;

        light0 = new feng3d.GameObject("pointLight");
        light1 = new feng3d.GameObject("pointLight");

        constructor()
        {
            this.init();

            this.cameraObj = this.view3D.camera;
            this.cameraObj.transform.z = -500;
            this.cameraObj.transform.y = 200;
            this.cameraObj.transform.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.view3D.camera);

            input.addEventListener(inputType.KEY_UP, this.onKeyUp, this);
        }

        private onKeyUp(event: InputEvent)
        {
            var boardKey = String.fromCharCode(event.keyCode).toLocaleLowerCase();
            switch (boardKey)
            {
                case "c":
                    this.clearObjects();
                    break;
                case "b":
                    this.initObjects();
                    this.scene.addChild(this.light0.transform);
                    this.scene.addChild(this.light1.transform);
                    break;
            }
        }

        init()
        {
            
            this.view3D = new View3D();

            this.scene = this.view3D.scene;

            this.initObjects();
            this.initLights();

            ticker.addEventListener(Event.ENTER_FRAME, this.setPointLightPosition, this);
        }

        private initObjects()
        {
            var material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/head_diffuse.jpg';
            material.normalMethod.normalTexture.url = 'resources/head_normals.jpg';
            material.specularMethod.specularTexture.url = 'resources/head_specular.jpg';
            material.diffuseMethod.difuseTexture.wrapS = GL.MIRRORED_REPEAT;
            material.diffuseMethod.difuseTexture.wrapT = GL.MIRRORED_REPEAT;
            material.normalMethod.normalTexture.wrapS = GL.MIRRORED_REPEAT;
            material.normalMethod.normalTexture.wrapT = GL.MIRRORED_REPEAT;
            material.specularMethod.specularTexture.wrapS = GL.MIRRORED_REPEAT;
            material.specularMethod.specularTexture.wrapT = GL.MIRRORED_REPEAT;

            //初始化立方体
            var plane = new GameObject();
            plane.transform.y = -100;
            var model = plane.addComponent(MeshRenderer);
            var geometry = plane.addComponent(MeshFilter).mesh = new PlaneGeometry(1000, 1000);
            geometry.scaleUV(2, 2);
            model.material = material;
            this.scene.addChild(plane.transform);

            var cube = new GameObject();
            var model = cube.addComponent(MeshRenderer);
            model.material = material;
            cube.addComponent(MeshFilter).mesh = new CubeGeometry(100, 100, 100, 1, 1, 1, false);
            cube.getComponent(MeshFilter).mesh.scaleUV(2, 2);
            this.scene.addChild(cube.transform);
        }

        private clearObjects()
        {
            for (var i = this.scene.childCount - 1; i >= 0; i--)
            {
                this.scene.removeChildAt(i);
            }
        }

        private initLights()
        {
            //
            var lightColor0 = new Color(1, 0, 0, 1);
            this.light0.addComponent(MeshFilter).mesh = new SphereGeometry(5);
            //初始化点光源
            var pointLight0 = this.light0.addComponent(PointLight);
            pointLight0.color = lightColor0;
            this.light0.addComponent(MeshRenderer).material = new ColorMaterial(lightColor0);
            this.scene.addChild(this.light0.transform);

            //
            var lightColor1 = new Color(0, 1, 0, 1);
            this.light1.addComponent(MeshFilter).mesh = new SphereGeometry(5);
            //初始化点光源
            var pointLight1 = this.light1.addComponent(DirectionalLight);
            pointLight1.color = lightColor1;
            this.light1.addComponent(MeshRenderer).material = new ColorMaterial(lightColor1);
            this.scene.addChild(this.light1.transform);
        }
        
        setPointLightPosition()
        {
            var time = new Date().getTime();
            //
            var angle = time / 1000;
            this.light0.transform.x = Math.sin(angle) * 300;
            this.light0.transform.z = Math.cos(angle) * 300;
            //
            angle = angle + Math.PI / 2;
            this.light1.transform.x = Math.sin(angle) * 300;
            this.light1.transform.z = Math.cos(angle) * 300;
            this.light1.transform.lookAt(new feng3d.Vector3D());
        }
    }
}

