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
    var MD5LoaderTest = /** @class */ (function (_super) {
        __extends(MD5LoaderTest, _super);
        function MD5LoaderTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 初始化时调用
         */
        MD5LoaderTest.prototype.init = function () {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");
            var object;
            var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
            var md5animUrl = "resources/hellknight/idle2.md5anim";
            camera.gameObject.transform.z = -300;
            feng3d.MD5Loader.load(md5meshUrl, function (gameObject) {
                object = gameObject;
                gameObject.transform.rx = -90;
                gameObject.transform.ry = -90;
                useMatrial(gameObject);
                scene.gameObject.addChild(gameObject);
                //
                feng3d.MD5Loader.loadAnim(md5animUrl, function (animationClip) {
                    animationClip.name = "idle2";
                    var animation = gameObject.addComponent(feng3d.Animation);
                    animation.animation = animationClip;
                    animation.isplaying = true;
                });
            });
            function useMatrial(gameObject) {
                for (var i = 0; i < gameObject.numChildren; i++) {
                    var child = gameObject.getChildAt(i);
                    var model = child.getComponent(feng3d.MeshRenderer);
                    if (model) {
                        var material = model.material;
                        material.uniforms.s_diffuse.url = "resources/hellknight/hellknight_diffuse.jpg";
                        material.uniforms.s_normal.url = "resources/hellknight/hellknight_normals.png";
                        material.uniforms.s_specular.url = "resources/hellknight/hellknight_specular.png";
                    }
                }
            }
        };
        /**
         * 更新
         */
        MD5LoaderTest.prototype.update = function () {
        };
        /**
        * 销毁时调用
        */
        MD5LoaderTest.prototype.dispose = function () {
        };
        return MD5LoaderTest;
    }(feng3d.Script));
    feng3d.MD5LoaderTest = MD5LoaderTest;
})(feng3d || (feng3d = {}));
//# sourceMappingURL=MD5LoaderTest.js.map