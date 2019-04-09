var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var md5LoaderTest = /** @class */ (function (_super) {
    __extends(md5LoaderTest, _super);
    function md5LoaderTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    md5LoaderTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var object;
        var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
        var md5animUrl = "resources/hellknight/idle2.md5anim";
        camera.gameObject.transform.z = -300;
        feng3d.md5Loader.load(md5meshUrl, function (gameObject) {
            object = gameObject;
            gameObject.transform.rx = -90;
            gameObject.transform.ry = -90;
            useMatrial(gameObject);
            scene.gameObject.addChild(gameObject);
            //
            feng3d.md5Loader.loadAnim(md5animUrl, function (animationClip) {
                animationClip.name = "idle2";
                var animation = gameObject.addComponent(feng3d.Animation);
                animation.animation = animationClip;
                animation.isplaying = true;
            });
        });
        function useMatrial(gameObject) {
            for (var i = 0; i < gameObject.numChildren; i++) {
                var child = gameObject.getChildAt(i);
                var model = child.getComponent(feng3d.Model);
                if (model) {
                    feng3d.serialization.setValue(model.material, {
                        uniforms: {
                            s_diffuse: { source: { url: "resources/hellknight/hellknight_diffuse.jpg" } },
                            s_normal: { source: { url: "resources/hellknight/hellknight_normals.png" } },
                            s_specular: { source: { url: "resources/hellknight/hellknight_specular.png" } },
                        },
                    });
                }
            }
        }
    };
    /**
     * 更新
     */
    md5LoaderTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    md5LoaderTest.prototype.dispose = function () {
    };
    return md5LoaderTest;
}(feng3d.Script));
//# sourceMappingURL=MD5LoaderTest.js.map