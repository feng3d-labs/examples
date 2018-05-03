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
    var OBJParserTest = /** @class */ (function (_super) {
        __extends(OBJParserTest, _super);
        function OBJParserTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        OBJParserTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var object;
            // //变化旋转
            setInterval(function () {
                if (object) {
                    object.transform.ry += 1;
                }
            }, 15);
            // var objUrl = "resources/cube.obj";
            var objUrl = "resources/head.obj";
            var material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = "resources/head_diffuse.jpg";
            material.normalMethod.normalTexture.url = "resources/head_normals.jpg";
            material.specularMethod.specularTexture.url = "resources/head_specular.jpg";
            // var material = new ColorMaterial();
            material.renderParams.cullFace = feng3d.CullFace.NONE;
            feng3d.ObjLoader.load(objUrl, function (gameObject) {
                object = gameObject;
                object.transform.sx = 20;
                object.transform.sy = 20;
                object.transform.sz = 20;
                object.transform.z = 300;
                scene.gameObject.addChild(gameObject);
                var meshRenderers = gameObject.getComponentsInChildren(feng3d.MeshRenderer);
                meshRenderers.forEach(function (element) {
                    element.material = material;
                });
            });
        };
        /**
         * 更新
         */
        OBJParserTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        OBJParserTest.prototype.dispose = function () {
        };
        return OBJParserTest;
    }(feng3d.Script));
    feng3d.OBJParserTest = OBJParserTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=OBJParserTest.js.map