namespace feng3d
{
    export class TerrainTest
    {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;

        constructor()
        {
            this.init();
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.y = 200;
            this.camera.transform.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.camera.gameObject);
            ticker.addEventListener(Event.ENTER_FRAME, this.onEnterFrame, this);
        }

        private onEnterFrame()
        {
            var time = new Date().getTime();
            var angle = time / 1000;
            this.light1.transform.x = Math.sin(angle) * 300;
            this.light1.transform.z = Math.cos(angle) * 300;
        }

        init()
        {
            this.view3D = new View3D();

            var scene = this.view3D.scene;
            var root = 'resources/terrain/';
            //
            var terrain = GameObject.create("terrain");
            terrain.addComponent(MeshFilter).mesh = new TerrainGeometry(root + 'terrain_heights.jpg');
            var material = new StandardMaterial(root + 'terrain_diffuse.jpg', root + "terrain_normals.jpg");
            var terrainMethod = new TerrainMethod(root + 'terrain_splats.png', [root + 'beach.jpg', root + 'grass.jpg', root + 'rock.jpg'], new Vector3D(1, 50, 50, 50));
            material.addMethod(terrainMethod);

            terrain.addComponent(MeshRenderer).material = material;
            scene.transform.addChild(terrain.transform);

            //初始化光源
            var light1 = this.light1 = GameObject.create();
            var pointLight1 =  light1.addComponent(PointLight);
            // pointLight1.range = 1000;
            pointLight1.color = new Color(1, 1, 0, 1);
            light1.transform.y = 300;
            // scene.transform.addChild(light1);
        }

        private light1: GameObject;
    }
}
