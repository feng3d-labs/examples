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
var PointLightTest = /** @class */ (function (_super) {
    __extends(PointLightTest, _super);
    function PointLightTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    PointLightTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var light0 = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "pointLight" });
        var light1 = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "pointLight" });
        initObjects();
        initLights();
        feng3d.ticker.onframe(setPointLightPosition);
        camera.transform.z = -5;
        camera.transform.y = 2;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);
        //
        feng3d.windowEventProxy.on("keyup", function (event) {
            var boardKey = String.fromCharCode(event.keyCode).toLocaleLowerCase();
            switch (boardKey) {
                case "c":
                    clearObjects();
                    break;
                case "b":
                    initObjects();
                    scene.gameObject.addChild(light0);
                    scene.gameObject.addChild(light1);
                    break;
            }
        });
        function initObjects() {
            var material = feng3d.serialization.setValue(new feng3d.Material(), {
                uniforms: {
                    s_diffuse: { url: 'resources/head_diffuse.jpg', wrapS: feng3d.TextureWrap.MIRRORED_REPEAT, wrapT: feng3d.TextureWrap.MIRRORED_REPEAT },
                    s_normal: { url: 'resources/head_normals.jpg', wrapS: feng3d.TextureWrap.MIRRORED_REPEAT, wrapT: feng3d.TextureWrap.MIRRORED_REPEAT },
                    s_specular: { url: 'resources/head_specular.jpg', wrapS: feng3d.TextureWrap.MIRRORED_REPEAT, wrapT: feng3d.TextureWrap.MIRRORED_REPEAT },
                }
            });
            //初始化立方体
            var plane = new feng3d.GameObject();
            plane.transform.y = -1;
            var model = plane.addComponent(feng3d.Model);
            var geometry = model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 10, height: 10 });
            geometry.scaleUV(2, 2);
            model.material = material;
            scene.gameObject.addChild(plane);
            var cube = new feng3d.GameObject();
            var model = cube.addComponent(feng3d.Model);
            model.material = material;
            model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
            model.geometry.scaleUV(2, 2);
            scene.gameObject.addChild(cube);
        }
        function clearObjects() {
            for (var i = scene.gameObject.numChildren - 1; i >= 0; i--) {
                scene.gameObject.removeChildAt(i);
            }
        }
        function initLights() {
            //
            var lightColor0 = new feng3d.Color4(1, 0, 0, 1);
            var model = light0.addComponent(feng3d.Model);
            model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 0.05 });
            //初始化点光源
            var pointLight0 = light0.addComponent(feng3d.PointLight);
            pointLight0.color = lightColor0.toColor3();
            model.material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color", uniforms: { u_diffuseInput: lightColor0 } });
            scene.gameObject.addChild(light0);
            //
            var lightColor1 = new feng3d.Color4(0, 1, 0, 1);
            model = light1.addComponent(feng3d.Model);
            model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 0.05 });
            //初始化点光源
            var pointLight1 = light1.addComponent(feng3d.DirectionalLight);
            pointLight1.color = lightColor1.toColor3();
            model.material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color", uniforms: { u_diffuseInput: lightColor1 } });
            scene.gameObject.addChild(light1);
        }
        function setPointLightPosition() {
            var time = new Date().getTime();
            //
            var angle = time / 1000;
            light0.transform.x = Math.sin(angle) * 3;
            light0.transform.z = Math.cos(angle) * 3;
            //
            angle = angle + Math.PI / 2;
            light1.transform.x = Math.sin(angle) * 3;
            light1.transform.z = Math.cos(angle) * 3;
            light1.transform.lookAt(new feng3d.Vector3());
        }
    };
    /**
     * 更新
     */
    PointLightTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    PointLightTest.prototype.dispose = function () {
    };
    return PointLightTest;
}(feng3d.Script));
//# sourceMappingURL=PointLightTest.js.map