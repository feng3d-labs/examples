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
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var scene = this.view3D.scene;
            var root = 'resources/terrain/';
            //
            var terrain = new GameObject("terrain");
            terrain.getOrCreateComponentByClass(Model).geometry = new TerrainGeometry(root + 'terrain_heights.jpg');
            var material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = root + 'terrain_diffuse.jpg';
            material.normalMethod.normalTexture.url = root + "terrain_normals.jpg";

            var terrainMethod = new TerrainMergeMethod();
            terrainMethod.blendTexture = new Texture2D(root + 'terrain_splats.png');
            terrainMethod.splatMergeTexture = new Texture2D(root + '111.jpg');
            terrainMethod.splatMergeTexture.generateMipmap = true;
            // terrainMethod.splatMergeTexture.minFilter = GL.NEAREST_MIPMAP_LINEAR;
            terrainMethod.splatMergeTexture.wrapS = GL.REPEAT;
            terrainMethod.splatMergeTexture.wrapT = GL.REPEAT;
            terrainMethod.splatRepeats = new Vector3D(1, 50, 150, 100);
            material.terrainMethod = terrainMethod;

            terrain.getOrCreateComponentByClass(Model).material = material;
            scene.addChild(terrain);

            //初始化光源
            var light1 = this.light1 = new GameObject();
            var pointLight1 = new PointLight();
            // pointLight1.range = 1000;
            pointLight1.color = new Color(1, 1, 0, 1);
            light1.addComponent(pointLight1);
            light1.y = 300;
            scene.addChild(light1);
        }

        private light1:GameObject;
    }
}
