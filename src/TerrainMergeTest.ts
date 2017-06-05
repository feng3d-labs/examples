module feng3d
{
    export class TerrainMergeTest
    {
        view3D: View3D;
        controller: FPSController;
        cameraObj: GameObject;

        constructor()
        {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.y = 200;
            this.cameraObj.lookAt(new Vector3D());
            //
            this.controller = new FPSController(this.cameraObj);
            ticker.addEventListener(Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onEnterFrame(){

            var time = new Date().getTime();
            var angle = time / 1000;
            this.light1.x = Math.sin(angle) * 300;
            this.light1.z = Math.cos(angle) * 300;
        }

        init()
        {
            
            this.view3D = new View3D();

            var scene = this.view3D.scene;
            var root = 'resources/terrain/';
            //
            var terrain = new GameObject("terrain");
            terrain.getOrCreateComponentByClass(Model).geometry = new TerrainGeometry(root + 'terrain_heights.jpg');
            var material = new StandardMaterial(root + 'terrain_diffuse.jpg',root + "terrain_normals.jpg");

            // var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test3.jpg',new Vector3D(50, 50, 50));
            var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test1.jpg',new Vector3D(50, 50, 50));
            material.addMethod(terrainMethod);
            terrain.getOrCreateComponentByClass(Model).material = material;
            scene.addChild(terrain);

            //初始化光源
            var light1 = this.light1 = new GameObject();
            var pointLight1 = new PointLight();
            // pointLight1.range = 1000;
            pointLight1.color = new Color(1, 1, 0, 1);
            light1.addComponent(pointLight1);
            light1.y = 300;
            // scene.addChild(light1);
        }

        private light1:GameObject;
    }
}
