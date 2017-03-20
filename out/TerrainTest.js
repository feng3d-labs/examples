var feng3d;
(function (feng3d) {
    class TerrainTest {
        constructor() {
            this.init();
            this.cameraObj = new feng3d.Object3D("camera");
            this.cameraObj.transform.position.z = -500;
            this.cameraObj.transform.position.y = 200;
            this.cameraObj.transform.lookAt(new feng3d.Vector3D());
            this.cameraObj.addComponent(this.view3D.camera);
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        onMousedown() {
            this.controller.target = this.cameraObj.transform;
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
            var canvasImg = document.createElement("canvas");
            canvasImg.width = 2048;
            canvasImg.height = 2048;
            var ctxt = canvasImg.getContext('2d');
            var loadedNum = 0;
            var imagePaths = ['terrain_heights.jpg', 'terrain_diffuse.jpg', 'terrain_splats.png', 'beach.jpg', 'grass.jpg', 'rock.jpg'];
            var images = [];
            for (var i = 0; i < imagePaths.length; i++) {
                var image = images[i] = new Image();
                image.onload = function () {
                    loadedNum++;
                    if (loadedNum == imagePaths.length) {
                        //获取高度图
                        var heightImage = images[0];
                        ctxt.drawImage(heightImage, 0, 0);
                        var terrainHeightData = ctxt.getImageData(0, 0, heightImage.width, heightImage.height); //读取整张图片的像素。
                        ctxt.putImageData(terrainHeightData, terrainHeightData.width, terrainHeightData.height);
                        //
                        terrain = new feng3d.Object3D("terrain");
                        terrain.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.TerrainGeometry(terrainHeightData);
                        var terrainMaterial = new feng3d.TerrainMaterial();
                        terrainMaterial.diffuseTexture = new feng3d.Texture2D(images[1]);
                        terrainMaterial.blendTexture = new feng3d.Texture2D(images[2]);
                        terrainMaterial.splatTexture1 = new feng3d.Texture2D(images[3]);
                        terrainMaterial.splatTexture2 = new feng3d.Texture2D(images[4]);
                        terrainMaterial.splatTexture3 = new feng3d.Texture2D(images[5]);
                        terrainMaterial.splatRepeats = new feng3d.Vector3D(1, 50, 150, 100);
                        terrain.getOrCreateComponentByClass(feng3d.Model).material = terrainMaterial;
                        scene.addChild(terrain);
                    }
                };
                image.src = 'resources/terrain/' + imagePaths[i];
            }
        }
    }
    feng3d.TerrainTest = TerrainTest;
})(feng3d || (feng3d = {}));
new feng3d.TerrainTest();
var terrain;
//# sourceMappingURL=TerrainTest.js.map