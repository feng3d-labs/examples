var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var feng3d;
(function (feng3d) {
    var TerrainTest = /** @class */ (function (_super) {
        __extends(TerrainTest, _super);
        function TerrainTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        TerrainTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            camera.transform.z = -500;
            camera.transform.y = 200;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.gameObject.addComponent(feng3d.FPSController);
            var root = 'resources/terrain/';
            //
            var terrain = feng3d.GameObject.create("terrain");
            var meshRenderer = terrain.addComponent(feng3d.MeshRenderer);
            // meshRenderer.geometry = new feng3d.TerrainGeometry();
            meshRenderer.geometry = new feng3d.TerrainGeometry(root + 'terrain_heights.jpg', 500, 100, 500);
            var material = new feng3d.StandardMaterial();
            material.uniforms.s_diffuse.url = root + 'terrain_diffuse.jpg';
            material.uniforms.s_normal.url = root + "terrain_normals.jpg";
            //
            material.terrainMethod.blendTexture.url = root + 'terrain_splats.png';
            material.terrainMethod.splatTexture1.url = root + 'beach.jpg';
            material.terrainMethod.splatTexture2.url = root + 'grass.jpg';
            material.terrainMethod.splatTexture3.url = root + 'rock.jpg';
            material.terrainMethod.splatRepeats = new feng3d.Vector4(1, 50, 50, 50);
            meshRenderer.material = material;
            scene.gameObject.addChild(terrain);
            //初始化光源
            var light1 = feng3d.GameObject.create();
            var pointLight1 = light1.addComponent(feng3d.PointLight);
            // pointLight1.range = 1000;
            pointLight1.color = new feng3d.Color3(1, 1, 0);
            light1.transform.y = 3;
            // scene.transform.addChild(light1);
            //
            feng3d.ticker.onframe(function () {
                var time = new Date().getTime();
                var angle = time / 1000;
                light1.transform.x = Math.sin(angle) * 3;
                light1.transform.z = Math.cos(angle) * 3;
            });
        };
        /**
         * 更新
         */
        TerrainTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        TerrainTest.prototype.dispose = function () {
        };
        return TerrainTest;
    }(feng3d.Script));
    feng3d.TerrainTest = TerrainTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=TerrainTest.js.map