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
var Basic_Shading = /** @class */ (function (_super) {
    __extends(Basic_Shading, _super);
    function Basic_Shading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    Basic_Shading.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var planeMaterial;
        var sphereMaterial;
        var cubeMaterial;
        var torusMaterial;
        var light1;
        var light2;
        var plane;
        var sphere;
        var cube;
        var torus;
        initEngine();
        initLights();
        initMaterials();
        initObjects();
        initListeners();
        function initEngine() {
            camera.transform.y = 5;
            camera.transform.z = -10;
            camera.transform.lookAt(new feng3d.Vector3());
            camera.gameObject.addComponent(feng3d.FPSController);
        }
        function initMaterials() {
            planeMaterial = feng3d.serialization.setValue(new feng3d.Material(), {
                shaderName: "standard", uniforms: {
                    s_diffuse: { source: { url: "resources/floor_diffuse.jpg" } },
                    s_normal: { source: { url: "resources/floor_normal.jpg" } },
                    s_specular: { source: { url: "resources/floor_specular.jpg" } },
                }
            });
            sphereMaterial = feng3d.serialization.setValue(new feng3d.Material(), {
                shaderName: "standard", uniforms: {
                    s_diffuse: { source: { url: "resources/beachball_diffuse.jpg" } },
                    s_specular: { source: { url: "resources/beachball_specular.jpg" } },
                }
            });
            cubeMaterial = feng3d.serialization.setValue(new feng3d.Material(), {
                shaderName: "standard", uniforms: {
                    s_diffuse: { source: { url: "resources/trinket_diffuse.jpg" } },
                    s_normal: { source: { url: "resources/trinket_normal.jpg" } },
                    s_specular: { source: { url: "resources/trinket_specular.jpg" } },
                }
            });
            torusMaterial = feng3d.serialization.setValue(new feng3d.Material(), {
                shaderName: "standard", uniforms: {
                    s_diffuse: { source: { url: "resources/weave_diffuse.jpg" } },
                    s_normal: { source: { url: "resources/weave_normal.jpg" } },
                    s_specular: { source: { url: "resources/weave_diffuse.jpg" } },
                }
            });
        }
        function initLights() {
            scene.ambientColor.a = 0.2;
            light1 = new feng3d.GameObject();
            var directionalLight = light1.addComponent(feng3d.DirectionalLight);
            directionalLight.intensity = 0.7;
            light1.transform.rx = 90;
            scene.gameObject.addChild(light1);
            light2 = new feng3d.GameObject();
            var directionalLight = light2.addComponent(feng3d.DirectionalLight);
            directionalLight.color.fromUnit(0x00FFFF);
            directionalLight.intensity = 0.7;
            light2.transform.rx = 90;
            scene.gameObject.addChild(light2);
        }
        function initObjects() {
            plane = new feng3d.GameObject();
            var model = plane.addComponent(feng3d.Model);
            var geometry = model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 10, height: 10 });
            model.material = planeMaterial;
            geometry.scaleUV(2, 2);
            plane.transform.y = -0.20;
            scene.gameObject.addChild(plane);
            sphere = new feng3d.GameObject();
            var model = sphere.addComponent(feng3d.Model);
            model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 1.50, segmentsW: 40, segmentsH: 20 });
            model.material = sphereMaterial;
            sphere.transform.x = 3;
            sphere.transform.y = 1.60;
            sphere.transform.z = 3.00;
            scene.gameObject.addChild(sphere);
            cube = new feng3d.GameObject();
            var model = cube.addComponent(feng3d.Model);
            model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 2, height: 2, depth: 2, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
            model.material = cubeMaterial;
            cube.transform.x = 3.00;
            cube.transform.y = 1.60;
            cube.transform.z = -2.50;
            scene.gameObject.addChild(cube);
            torus = new feng3d.GameObject();
            var model = torus.addComponent(feng3d.Model);
            geometry = model.geometry = feng3d.serialization.setValue(new feng3d.TorusGeometry(), { radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
            model.material = torusMaterial;
            geometry.scaleUV(10, 5);
            torus.transform.x = -2.50;
            torus.transform.y = 1.60;
            torus.transform.z = -2.50;
            scene.gameObject.addChild(torus);
        }
        function initListeners() {
            feng3d.ticker.onframe(onEnterFrame, this);
        }
        function onEnterFrame() {
            light1.transform.rx = 30;
            light1.transform.ry++;
        }
    };
    /**
     * 更新
     */
    Basic_Shading.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    Basic_Shading.prototype.dispose = function () {
    };
    return Basic_Shading;
}(feng3d.Script));
//# sourceMappingURL=Basic_Shading.js.map