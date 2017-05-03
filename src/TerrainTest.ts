module feng3d
{
    export class TerrainTest
    {
        view3D: View3D;
        controller: FPSController;
        cameraObj: Object3D;

        constructor()
        {
            this.init();

            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.y = 200;
            this.cameraObj.lookAt(new Vector3D());
            //
            this.controller = new FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);

            input.addEventListener("mousedown", this.onMousedown, this);
            input.addEventListener("mouseup", this.onMouseup, this);
        }

        private onMousedown()
        {
            this.controller.target = this.cameraObj;
        }

        private onMouseup()
        {
            this.controller.target = null;
        }

        process()
        {
            this.controller.update();
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
            var terrainMaterial = new TerrainMaterial();
            terrainMaterial.diffuseTexture = new Texture2D(root + 'terrain_diffuse.jpg');
            terrainMaterial.blendTexture = new Texture2D(root + 'terrain_splats.png');
            terrainMaterial.splatTexture1 = new Texture2D(root + 'beach.jpg');
            // terrainMaterial.splatTexture1 = new Texture2D(root + '111.jpg');
            terrainMaterial.splatTexture1.generateMipmap = true;
            terrainMaterial.splatTexture1.minFilter = GL.NEAREST_MIPMAP_LINEAR;
            terrainMaterial.splatTexture1.wrapS = GL.REPEAT;
            terrainMaterial.splatTexture1.wrapT = GL.REPEAT;
            terrainMaterial.splatTexture2 = new Texture2D(root + 'grass.jpg');
            terrainMaterial.splatTexture2.generateMipmap = true;
            terrainMaterial.splatTexture2.minFilter = GL.NEAREST_MIPMAP_LINEAR;
            terrainMaterial.splatTexture2.wrapS = GL.REPEAT;
            terrainMaterial.splatTexture2.wrapT = GL.REPEAT;
            terrainMaterial.splatTexture3 = new Texture2D(root + 'rock.jpg');
            terrainMaterial.splatTexture3.generateMipmap = true;
            terrainMaterial.splatTexture3.minFilter = GL.NEAREST_MIPMAP_LINEAR;
            terrainMaterial.splatTexture3.wrapS = GL.REPEAT;
            terrainMaterial.splatTexture3.wrapT = GL.REPEAT;
            terrainMaterial.splatRepeats = new Vector3D(1, 50, 150, 100);

            terrain.getOrCreateComponentByClass(Model).material = terrainMaterial;
            scene.addChild(terrain);
        }
    }
}
