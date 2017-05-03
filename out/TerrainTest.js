var feng3d;
(function (feng3d) {
    class TerrainTest {
        constructor() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.y = 200;
            this.cameraObj.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        onMousedown() {
            this.controller.target = this.cameraObj;
        }
        onMouseup() {
            this.controller.target = null;
        }
        process() {
            this.controller.update();
        }
        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene = this.view3D.scene;
            var root = 'resources/terrain/';
            //
            terrain = new feng3d.GameObject("terrain");
            terrain.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.TerrainGeometry(root + 'terrain_heights.jpg');
            var terrainMaterial = new feng3d.TerrainMaterial();
            terrainMaterial.diffuseTexture = new feng3d.Texture2D(root + 'terrain_diffuse.jpg');
            terrainMaterial.blendTexture = new feng3d.Texture2D(root + 'terrain_splats.png');
            terrainMaterial.splatTexture1 = new feng3d.Texture2D(root + 'beach.jpg');
            // terrainMaterial.splatTexture1 = new Texture2D(root + '111.jpg');
            terrainMaterial.splatTexture1.generateMipmap = true;
            terrainMaterial.splatTexture1.minFilter = feng3d.GL.NEAREST_MIPMAP_LINEAR;
            terrainMaterial.splatTexture1.wrapS = feng3d.GL.REPEAT;
            terrainMaterial.splatTexture1.wrapT = feng3d.GL.REPEAT;
            terrainMaterial.splatTexture2 = new feng3d.Texture2D(root + 'grass.jpg');
            terrainMaterial.splatTexture2.generateMipmap = true;
            terrainMaterial.splatTexture2.minFilter = feng3d.GL.NEAREST_MIPMAP_LINEAR;
            terrainMaterial.splatTexture2.wrapS = feng3d.GL.REPEAT;
            terrainMaterial.splatTexture2.wrapT = feng3d.GL.REPEAT;
            terrainMaterial.splatTexture3 = new feng3d.Texture2D(root + 'rock.jpg');
            terrainMaterial.splatTexture3.generateMipmap = true;
            terrainMaterial.splatTexture3.minFilter = feng3d.GL.NEAREST_MIPMAP_LINEAR;
            terrainMaterial.splatTexture3.wrapS = feng3d.GL.REPEAT;
            terrainMaterial.splatTexture3.wrapT = feng3d.GL.REPEAT;
            terrainMaterial.splatRepeats = new feng3d.Vector3D(1, 50, 150, 100);
            terrain.getOrCreateComponentByClass(feng3d.Model).material = terrainMaterial;
            scene.addChild(terrain);
        }
    }
    feng3d.TerrainTest = TerrainTest;
})(feng3d || (feng3d = {}));
new feng3d.TerrainTest();
var terrain;
//# sourceMappingURL=TerrainTest.js.map