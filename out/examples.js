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
var TerrainMergeTest = /** @class */ (function (_super) {
    __extends(TerrainMergeTest, _super);
    function TerrainMergeTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    TerrainMergeTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        //
        camera.transform.z = -5;
        camera.transform.y = 2;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);
        var root = 'resources/terrain/';
        //
        var terrain = new feng3d.GameObject().value({ name: "terrain" });
        var model = terrain.addComponent(feng3d.Model);
        model.geometry = new feng3d.TerrainGeometry({ heightMapUrl: root + 'terrain_heights.jpg' });
        var material = new feng3d.StandardMaterial();
        material.uniforms.s_diffuse.url = root + 'terrain_diffuse.jpg';
        material.uniforms.s_normal.url = root + "terrain_normals.jpg";
        // var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test3.jpg',new Vector3(50, 50, 50));
        // material.terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png', root + 'test1.jpg', new Vector3(50, 50, 50));
        model.material = material;
        scene.gameObject.addChild(terrain);
        //初始化光源
        var light1 = new feng3d.GameObject();
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
    TerrainMergeTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    TerrainMergeTest.prototype.dispose = function () {
    };
    return TerrainMergeTest;
}(feng3d.Script));
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
        var terrain = new feng3d.GameObject().value({ name: "terrain" });
        var model = terrain.addComponent(feng3d.Model);
        // model.geometry = new feng3d.TerrainGeometry();
        model.geometry = new feng3d.TerrainGeometry({ heightMapUrl: root + 'terrain_heights.jpg', width: 500, height: 100, depth: 500 });
        var material = new feng3d.TerrainMaterial();
        material.uniforms.s_diffuse.url = root + 'terrain_diffuse.jpg';
        material.uniforms.s_normal.url = root + "terrain_normals.jpg";
        //
        material.uniforms.s_blendTexture.url = root + 'terrain_splats.png';
        material.uniforms.s_splatTexture1.url = root + 'beach.jpg';
        material.uniforms.s_splatTexture2.url = root + 'grass.jpg';
        material.uniforms.s_splatTexture3.url = root + 'rock.jpg';
        material.uniforms.u_splatRepeats = new feng3d.Vector4(1, 50, 50, 50);
        model.material = material;
        scene.gameObject.addChild(terrain);
        //初始化光源
        var light1 = new feng3d.GameObject();
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
var SceneLoadTest = /** @class */ (function (_super) {
    __extends(SceneLoadTest, _super);
    function SceneLoadTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    SceneLoadTest.prototype.init = function () {
        var view3D = new feng3d.Engine();
        feng3d.Loader.loadText("resources/scene/Untitled.scene.json", function (content) {
            var json = JSON.parse(content);
            var sceneobject = feng3d.serialization.deserialize(json);
            var scene = sceneobject.getComponent(feng3d.Scene3D);
            scene.initCollectComponents();
            view3D.scene = scene;
        });
    };
    /**
     * 更新
     */
    SceneLoadTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    SceneLoadTest.prototype.dispose = function () {
    };
    return SceneLoadTest;
}(feng3d.Script));
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
            planeMaterial = new feng3d.StandardMaterial();
            planeMaterial.uniforms.s_diffuse.url = "resources/floor_diffuse.jpg";
            planeMaterial.uniforms.s_normal.url = "resources/floor_normal.jpg";
            planeMaterial.uniforms.s_specular.url = "resources/floor_specular.jpg";
            sphereMaterial = new feng3d.StandardMaterial();
            sphereMaterial.uniforms.s_diffuse.url = "resources/beachball_diffuse.jpg";
            sphereMaterial.uniforms.s_specular.url = "resources/beachball_specular.jpg";
            cubeMaterial = new feng3d.StandardMaterial();
            cubeMaterial.uniforms.s_diffuse.url = "resources/trinket_diffuse.jpg";
            cubeMaterial.uniforms.s_normal.url = "resources/trinket_normal.jpg";
            cubeMaterial.uniforms.s_specular.url = "resources/trinket_specular.jpg";
            torusMaterial = new feng3d.StandardMaterial();
            torusMaterial.uniforms.s_diffuse.url = "resources/weave_diffuse.jpg";
            torusMaterial.uniforms.s_normal.url = "resources/weave_normal.jpg";
            torusMaterial.uniforms.s_specular.url = "resources/weave_diffuse.jpg";
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
            var geometry = model.geometry = new feng3d.PlaneGeometry().value({ width: 10, height: 10 });
            model.material = planeMaterial;
            geometry.scaleUV(2, 2);
            plane.transform.y = -0.20;
            scene.gameObject.addChild(plane);
            sphere = new feng3d.GameObject();
            var model = sphere.addComponent(feng3d.Model);
            model.geometry = new feng3d.SphereGeometry().value({ radius: 1.50, segmentsW: 40, segmentsH: 20 });
            model.material = sphereMaterial;
            sphere.transform.x = 3;
            sphere.transform.y = 1.60;
            sphere.transform.z = 3.00;
            scene.gameObject.addChild(sphere);
            cube = new feng3d.GameObject();
            var model = cube.addComponent(feng3d.Model);
            model.geometry = new feng3d.CubeGeometry().value({ width: 2, height: 2, depth: 2, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
            model.material = cubeMaterial;
            cube.transform.x = 3.00;
            cube.transform.y = 1.60;
            cube.transform.z = -2.50;
            scene.gameObject.addChild(cube);
            torus = new feng3d.GameObject();
            var model = torus.addComponent(feng3d.Model);
            geometry = model.geometry = new feng3d.TorusGeometry().value({ radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
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
var Basic_SkyBox = /** @class */ (function (_super) {
    __extends(Basic_SkyBox, _super);
    function Basic_SkyBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    Basic_SkyBox.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var cubeTexture = new feng3d.TextureCube().value({
            positive_x_url: 'resources/skybox/snow_positive_x.jpg',
            positive_y_url: 'resources/skybox/snow_positive_y.jpg',
            positive_z_url: 'resources/skybox/snow_positive_z.jpg',
            negative_x_url: 'resources/skybox/snow_negative_x.jpg',
            negative_y_url: 'resources/skybox/snow_negative_y.jpg',
            negative_z_url: 'resources/skybox/snow_negative_z.jpg',
        });
        var skybox = new feng3d.GameObject().value({ name: "skybox" });
        var skyboxComponent = skybox.addComponent(feng3d.SkyBox);
        skyboxComponent.s_skyboxTexture = cubeTexture;
        scene.gameObject.addChild(skybox);
        camera.transform.z = -6;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.lens = new feng3d.PerspectiveLens(90);
        var torusMaterial = new feng3d.StandardMaterial();
        // torusMaterial.uniforms.u_specular.a = 0.5;
        // torusMaterial.uniforms.u_ambient.fromUnit(0x111111);
        // torusMaterial.uniforms.u_ambient.a = 0.25;
        torusMaterial.uniforms.s_envMap = cubeTexture;
        var torus = new feng3d.GameObject().value({ name: "torus" });
        var model = torus.addComponent(feng3d.Model);
        model.geometry = new feng3d.TorusGeometry().value({ radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
        model.material = torusMaterial;
        scene.gameObject.addChild(torus);
        feng3d.ticker.onframe(function () {
            torus.transform.rx += 2;
            torus.transform.ry += 1;
            camera.transform.position = new feng3d.Vector3(0, 0, 0);
            camera.transform.ry += 0.5 * (feng3d.windowEventProxy.clientX - canvas.clientLeft - canvas.clientWidth / 2) / 800;
            camera.transform.moveBackward(6);
        });
    };
    /**
     * 更新
     */
    Basic_SkyBox.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    Basic_SkyBox.prototype.dispose = function () {
    };
    return Basic_SkyBox;
}(feng3d.Script));
var Basic_View = /** @class */ (function (_super) {
    __extends(Basic_View, _super);
    function Basic_View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    Basic_View.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        camera.transform.z = -6;
        camera.transform.y = 5;
        camera.transform.lookAt(new feng3d.Vector3());
        var plane = new feng3d.GameObject();
        var model = plane.addComponent(feng3d.Model);
        model.geometry = new feng3d.PlaneGeometry().value({ width: 7, height: 7 });
        var material = model.material = new feng3d.StandardMaterial();
        material.uniforms.s_diffuse.url = "resources/floor_diffuse.jpg";
        scene.gameObject.addChild(plane);
        feng3d.ticker.onframe(function () {
            plane.transform.ry += 1;
        });
    };
    /**
     * 更新
     */
    Basic_View.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    Basic_View.prototype.dispose = function () {
    };
    return Basic_View;
}(feng3d.Script));
var BillboardTest = /** @class */ (function (_super) {
    __extends(BillboardTest, _super);
    function BillboardTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*
     * 初始化时调用
     */
    BillboardTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        camera.gameObject.addComponent(feng3d.FPSController);
        scene.background.setTo(0.3, 0.3, 0.3, 1);
        var cube = feng3d.gameObjectFactory.createCube();
        cube.transform.z = 3;
        scene.gameObject.addChild(cube);
        var gameObject = feng3d.gameObjectFactory.createPlane();
        gameObject.transform.y = 1.50;
        var holdSizeComponent = gameObject.addComponent(feng3d.HoldSizeComponent);
        holdSizeComponent.holdSize = 1;
        holdSizeComponent.camera = camera;
        var billboardComponent = gameObject.addComponent(feng3d.BillboardComponent);
        billboardComponent.camera = camera;
        cube.addChild(gameObject);
        //材质
        var model = gameObject.getComponent(feng3d.Model);
        model.geometry = new feng3d.PlaneGeometry().value({ width: 40, height: 40, segmentsW: 1, segmentsH: 1, yUp: false });
        var textureMaterial = model.material = new feng3d.StandardMaterial();
        // textureMaterial.cullFace = CullFace.NONE;
        //
        var texture = textureMaterial.uniforms.s_diffuse.url = 'resources/m.png';
        // var texture = textureMaterial.texture = new ImageDataTexture();
        // var canvas2D = document.createElement("canvas");
        // canvas2D.width = 256;
        // canvas2D.height = 256;
        // var context2D = canvas2D.getContext("2d");
        // // context2D.fillStyle = "red";
        // // context2D.fillRect(0, 0, canvas2D.width, canvas2D.height);
        // context2D.fillStyle = "green";
        // context2D.font = '48px serif';
        // // context2D.fillText('Hello world', 50, 100);
        // context2D.fillText('Hello world', 0, 50);
        // // context2D.strokeText('Hello world', 50, 100);
        // var imageData = context2D.getImageData(0, 0, canvas2D.width, canvas2D.height);
        // texture.pixels = imageData;
        // gameObject.holdSize = 1;
    };
    /**
     * 更新
     */
    BillboardTest.prototype.update = function () {
    };
    /**
     * 销毁时调用
     */
    BillboardTest.prototype.dispose = function () {
    };
    return BillboardTest;
}(feng3d.Script));
/**
 * 测试3D容器
 */
var Container3DTest = /** @class */ (function (_super) {
    __extends(Container3DTest, _super);
    function Container3DTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.num = 0;
        return _this;
    }
    /**
     * 初始化时调用
     */
    Container3DTest.prototype.init = function () {
        //初始化颜色材质
        this.cube = feng3d.gameObjectFactory.createCube();
        this.gameObject.addChild(this.cube);
        this.colorMaterial = this.cube.getComponent(feng3d.Model).material = new feng3d.ColorMaterial();
        var cylinder = feng3d.gameObjectFactory.createCylinder();
        cylinder.transform.x = 2;
        this.cube.addChild(cylinder);
    };
    /**
     * 更新
     */
    Container3DTest.prototype.update = function () {
        console.log("update");
        //变化旋转与颜色
        this.cube.transform.ry += 1;
        this.num++;
        if (this.num % 60 == 0)
            this.colorMaterial.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
    };
    /**
     * 销毁时调用
     */
    Container3DTest.prototype.dispose = function () {
    };
    return Container3DTest;
}(feng3d.Script));
var FPSControllerTest = /** @class */ (function (_super) {
    __extends(FPSControllerTest, _super);
    function FPSControllerTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    FPSControllerTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var cube = feng3d.gameObjectFactory.createCube();
        this.gameObject.addChild(cube);
        var plane = feng3d.gameObjectFactory.createPlane();
        plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
        plane.transform.rx = -90;
        this.gameObject.addChild(plane);
        var sphere = feng3d.gameObjectFactory.createSphere();
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        this.gameObject.addChild(sphere);
        var capsule = feng3d.gameObjectFactory.createCapsule();
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        this.gameObject.addChild(capsule);
        var cylinder = feng3d.gameObjectFactory.createCylinder();
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        this.gameObject.addChild(cylinder);
        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        //
        camera.gameObject.addComponent(feng3d.FPSController);
    };
    /**
     * 更新
     */
    FPSControllerTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    FPSControllerTest.prototype.dispose = function () {
    };
    return FPSControllerTest;
}(feng3d.Script));
var FogTest = /** @class */ (function (_super) {
    __extends(FogTest, _super);
    function FogTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    FogTest.prototype.init = function () {
        var cube = new feng3d.GameObject();
        cube.transform.z = -7;
        cube.transform.y = 0;
        this.gameObject.addChild(cube);
        var model = cube.addComponent(feng3d.Model);
        model.geometry = new feng3d.CubeGeometry().value({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        //材质
        var material = model.material = new feng3d.StandardMaterial();
        material.uniforms.s_diffuse.url = 'resources/m.png';
        material.uniforms.u_fogMode = feng3d.FogMode.LINEAR;
        material.uniforms.u_fogColor = new feng3d.Color3(1, 1, 0);
        material.uniforms.u_fogMinDistance = 2;
        material.uniforms.u_fogMaxDistance = 3;
        feng3d.ticker.onframe(function () {
            cube.transform.ry += 1;
        });
    };
    /**
     * 更新
     */
    FogTest.prototype.update = function () {
    };
    /**
     * 销毁时调用
     */
    FogTest.prototype.dispose = function () {
    };
    return FogTest;
}(feng3d.Script));
var MousePickTest = /** @class */ (function (_super) {
    __extends(MousePickTest, _super);
    function MousePickTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    MousePickTest.prototype.init = function () {
        /**
         * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
         */
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);
        var cube = feng3d.gameObjectFactory.createCube();
        cube.mouseEnabled = true;
        scene.gameObject.addChild(cube);
        var plane = feng3d.gameObjectFactory.createPlane();
        plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
        plane.transform.rx = -90;
        plane.mouseEnabled = true;
        scene.gameObject.addChild(plane);
        var sphere = feng3d.gameObjectFactory.createSphere();
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        sphere.mouseEnabled = true;
        scene.gameObject.addChild(sphere);
        var capsule = feng3d.gameObjectFactory.createCapsule();
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        capsule.mouseEnabled = true;
        scene.gameObject.addChild(capsule);
        var cylinder = feng3d.gameObjectFactory.createCylinder();
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        cylinder.mouseEnabled = true;
        scene.gameObject.addChild(cylinder);
        scene.on("click", function (event) {
            var transform = event.target;
            if (transform.getComponent(feng3d.Model)) {
                var material = transform.getComponent(feng3d.Model).material = new feng3d.ColorMaterial();
                material.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 24));
            }
        });
    };
    /**
     * 更新
     */
    MousePickTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    MousePickTest.prototype.dispose = function () {
    };
    return MousePickTest;
}(feng3d.Script));
var ScriptTest = /** @class */ (function (_super) {
    __extends(ScriptTest, _super);
    function ScriptTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    ScriptTest.prototype.init = function () {
        var sc = this.gameObject.addScript("ScriptDemo");
        // windowEventProxy.on("keyup", (e) =>
        // {
        //     if (e.keyCode == 82)
        //     {
        //         GameObjectUtil.removeScript(scene3D.gameObject, path);
        //         GameObjectUtil.addScript(scene3D.gameObject, path);
        //     } else if (e.keyCode == 84)
        //     {
        //         GameObjectUtil.reloadJS(path);
        //     }
        // })
    };
    /**
     * 更新
     */
    ScriptTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    ScriptTest.prototype.dispose = function () {
    };
    return ScriptTest;
}(feng3d.Script));
var SkyBoxTest = /** @class */ (function (_super) {
    __extends(SkyBoxTest, _super);
    function SkyBoxTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    SkyBoxTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent(feng3d.FPSController);
        //
        var skybox = new feng3d.GameObject().value({ name: "skybox" });
        var model = skybox.addComponent(feng3d.SkyBox);
        model.s_skyboxTexture = new feng3d.TextureCube().value({
            positive_x_url: 'resources/skybox/px.jpg',
            positive_y_url: 'resources/skybox/py.jpg',
            positive_z_url: 'resources/skybox/pz.jpg',
            negative_x_url: 'resources/skybox/nx.jpg',
            negative_y_url: 'resources/skybox/ny.jpg',
            negative_z_url: 'resources/skybox/nz.jpg'
        });
        scene.gameObject.addChild(skybox);
    };
    /**
     * 更新
     */
    SkyBoxTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    SkyBoxTest.prototype.dispose = function () {
    };
    return SkyBoxTest;
}(feng3d.Script));
var GeometryTest = /** @class */ (function (_super) {
    __extends(GeometryTest, _super);
    function GeometryTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    GeometryTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var gameobject = new feng3d.GameObject();
        var model = gameobject.addComponent(feng3d.Model);
        var geometry = model.geometry = new feng3d.CustomGeometry();
        geometry.addGeometry(new feng3d.PlaneGeometry());
        var matrix3D = new feng3d.Matrix4x4();
        matrix3D.appendTranslation(0, 0.50, 0);
        geometry.addGeometry(new feng3d.SphereGeometry().value({ radius: 50 }), matrix3D);
        matrix3D.appendTranslation(0, 0.50, 0);
        var addGeometry = new feng3d.CubeGeometry();
        geometry.addGeometry(addGeometry, matrix3D);
        addGeometry.width = 0.50;
        matrix3D.appendTranslation(0, 0.50, 0);
        matrix3D.appendRotation(feng3d.Vector3.Z_AXIS, 45);
        geometry.addGeometry(addGeometry, matrix3D);
        gameobject.transform.z = 3;
        gameobject.transform.y = -1;
        scene.gameObject.addChild(gameobject);
        //初始化颜色材质
        var colorMaterial = model.material = new feng3d.ColorMaterial();
        //变化旋转与颜色
        setInterval(function () {
            gameobject.transform.ry += 1;
        }, 15);
        setInterval(function () {
            colorMaterial.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
        }, 1000);
    };
    /**
     * 更新
     */
    GeometryTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    GeometryTest.prototype.dispose = function () {
    };
    return GeometryTest;
}(feng3d.Script));
var PrimitiveTest = /** @class */ (function (_super) {
    __extends(PrimitiveTest, _super);
    function PrimitiveTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    PrimitiveTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var cube = feng3d.gameObjectFactory.createCube();
        this.gameObject.addChild(cube);
        var plane = feng3d.gameObjectFactory.createPlane();
        plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
        plane.transform.rx = -90;
        this.gameObject.addChild(plane);
        var sphere = feng3d.gameObjectFactory.createSphere();
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        this.gameObject.addChild(sphere);
        var capsule = feng3d.gameObjectFactory.createCapsule();
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        this.gameObject.addChild(capsule);
        var cylinder = feng3d.gameObjectFactory.createCylinder();
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        this.gameObject.addChild(cylinder);
        var controller = new feng3d.LookAtController(camera.gameObject);
        controller.lookAtPosition = new feng3d.Vector3();
        //
        setInterval(function () {
            var time = new Date().getTime();
            var angle = (Math.round(time / 17) % 360);
            angle = angle * feng3d.FMath.DEG2RAD;
            camera.transform.position = new feng3d.Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));
            controller.update();
        }, 17);
    };
    /**
     * 更新
     */
    PrimitiveTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    PrimitiveTest.prototype.dispose = function () {
    };
    return PrimitiveTest;
}(feng3d.Script));
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
        var light0 = new feng3d.GameObject().value({ name: "pointLight" });
        var light1 = new feng3d.GameObject().value({ name: "pointLight" });
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
            var material = new feng3d.StandardMaterial();
            material.uniforms.s_diffuse.url = 'resources/head_diffuse.jpg';
            material.uniforms.s_normal.url = 'resources/head_normals.jpg';
            material.uniforms.s_specular.url = 'resources/head_specular.jpg';
            material.uniforms.s_diffuse.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_diffuse.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_normal.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_normal.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_specular.wrapS = feng3d.TextureWrap.MIRRORED_REPEAT;
            material.uniforms.s_specular.wrapT = feng3d.TextureWrap.MIRRORED_REPEAT;
            //初始化立方体
            var plane = new feng3d.GameObject();
            plane.transform.y = -1;
            var model = plane.addComponent(feng3d.Model);
            var geometry = model.geometry = new feng3d.PlaneGeometry().value({ width: 10, height: 10 });
            geometry.scaleUV(2, 2);
            model.material = material;
            scene.gameObject.addChild(plane);
            var cube = new feng3d.GameObject();
            var model = cube.addComponent(feng3d.Model);
            model.material = material;
            model.geometry = new feng3d.CubeGeometry().value({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
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
            model.geometry = new feng3d.SphereGeometry().value({ radius: 0.05 });
            //初始化点光源
            var pointLight0 = light0.addComponent(feng3d.PointLight);
            pointLight0.color = lightColor0.toColor3();
            model.material = new feng3d.ColorMaterial().value({ uniforms: { u_diffuseInput: lightColor0 } });
            scene.gameObject.addChild(light0);
            //
            var lightColor1 = new feng3d.Color4(0, 1, 0, 1);
            model = light1.addComponent(feng3d.Model);
            model.geometry = new feng3d.SphereGeometry().value({ radius: 0.05 });
            //初始化点光源
            var pointLight1 = light1.addComponent(feng3d.DirectionalLight);
            pointLight1.color = lightColor1.toColor3();
            model.material = new feng3d.ColorMaterial().value({ uniforms: { u_diffuseInput: lightColor1 } });
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
    md5LoaderTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    md5LoaderTest.prototype.dispose = function () {
    };
    return md5LoaderTest;
}(feng3d.Script));
var MdlLoaderTest = /** @class */ (function (_super) {
    __extends(MdlLoaderTest, _super);
    function MdlLoaderTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    MdlLoaderTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var modelConfig = [
            {
                "label": "WoWDryad",
                "url": "WoWDryad.mdl"
            },
            {
                "label": "Owl",
                "url": "Owl.mdl"
            },
            {
                "label": "Arthas",
                "url": "Arthas.mdl"
            },
            {
                "label": "DragonRed",
                "url": "DragonRed.mdl"
            },
            {
                "label": "Tauren_Range",
                "url": "Tauren_Range.mdl"
            },
            {
                "label": "archimonde",
                "url": "archimonde.mdl"
            },
            {
                "label": "Knight",
                "url": "Knight.mdl"
            },
            {
                "label": "kiljaeden",
                "url": "kiljaeden.mdl"
            }
        ];
        var modelId = 0;
        var animatorId = 0;
        var loading = false;
        /** 相机旋转角度 */
        var cameraAngle = 0;
        /** 相机起始离物体的距离 */
        var len = 200;
        var showWar3Model;
        var view = new feng3d.Engine();
        view.camera.transform.x = -200;
        view.camera.transform.y = 200;
        view.camera.transform.z = -300;
        view.camera.transform.lookAt(new feng3d.Vector3());
        view.camera.gameObject.addComponent(feng3d.FPSController);
        //
        var rooturl = "resources/war3/";
        updateModel();
        feng3d.windowEventProxy.on("keyup", function (e) {
            if (e.keyCode == 37 && !loading) {
                modelId--;
                updateModel();
            }
            if (e.keyCode == 39 && !loading) {
                modelId++;
                updateModel();
            }
            if (e.keyCode == 38) {
                animatorId--;
                updateAnimatorId();
            }
            if (e.keyCode == 40) {
                animatorId++;
                updateAnimatorId();
            }
            function updateAnimatorId() {
                var animation = showWar3Model.getComponentsInChildren(feng3d.Animation)[0];
                animatorId = (animation.animations.length + animatorId) % animation.animations.length;
                animation.animation = animation.animations[animatorId];
            }
        });
        function updateModel() {
            if (showWar3Model) {
                view.scene.gameObject.removeChild(showWar3Model);
                showWar3Model = null;
            }
            modelId = (modelId + modelConfig.length) % modelConfig.length;
            loadModel(modelConfig[modelId]);
        }
        function loadModel(model) {
            var mdlurl = rooturl + model.url;
            loading = true;
            feng3d.mdlLoader.load(mdlurl, function (gameObject) {
                view.scene.gameObject.addChild(gameObject);
                loading = false;
                showWar3Model = gameObject;
                var animation = showWar3Model.getComponentsInChildren(feng3d.Animation)[0];
                animation.isplaying = true;
            });
        }
    };
    /**
     * 更新
     */
    MdlLoaderTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    MdlLoaderTest.prototype.dispose = function () {
    };
    return MdlLoaderTest;
}(feng3d.Script));
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
        material.uniforms.s_diffuse.url = "resources/head_diffuse.jpg";
        material.uniforms.s_normal.url = "resources/head_normals.jpg";
        material.uniforms.s_specular.url = "resources/head_specular.jpg";
        // var material = materialFactory.create("color");
        material.renderParams.cullFace = feng3d.CullFace.NONE;
        feng3d.ObjLoader.load(objUrl, function (gameObject) {
            object = gameObject;
            object.transform.sx = 20;
            object.transform.sy = 20;
            object.transform.sz = 20;
            object.transform.z = 300;
            scene.gameObject.addChild(gameObject);
            var models = gameObject.getComponentsInChildren(feng3d.Model);
            models.forEach(function (element) {
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
var ColorMaterialTest = /** @class */ (function (_super) {
    __extends(ColorMaterialTest, _super);
    function ColorMaterialTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    ColorMaterialTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var cube = feng3d.gameObjectFactory.createCube();
        cube.transform.z = 3;
        scene.gameObject.addChild(cube);
        //初始化颜色材质
        var colorMaterial = cube.getComponent(feng3d.Model).material = new feng3d.ColorMaterial();
        //变化旋转与颜色
        setInterval(function () {
            cube.transform.ry += 1;
        }, 15);
        setInterval(function () {
            colorMaterial.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
        }, 1000);
    };
    /**
     * 更新
     */
    ColorMaterialTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    ColorMaterialTest.prototype.dispose = function () {
    };
    return ColorMaterialTest;
}(feng3d.Script));
var PointMaterialTest = /** @class */ (function (_super) {
    __extends(PointMaterialTest, _super);
    function PointMaterialTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    PointMaterialTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var pointGeometry = new feng3d.PointGeometry();
        var pointMaterial = new feng3d.PointMaterial().value({ renderParams: { renderMode: feng3d.RenderMode.POINTS } });
        var gameObject = new feng3d.GameObject().value({ name: "plane" });
        var model = gameObject.addComponent(feng3d.Model);
        model.geometry = pointGeometry;
        model.material = pointMaterial;
        gameObject.transform.z = 3;
        scene.gameObject.addChild(gameObject);
        var length = 200;
        var height = 2 / Math.PI;
        for (var x = -length; x <= length; x = x + 4) {
            var angle = x / length * Math.PI;
            var vec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
            pointGeometry.points.push({ position: vec });
        }
        //变化旋转
        setInterval(function () {
            gameObject.transform.ry += 1;
            pointMaterial.uniforms.u_PointSize = 1 + 5 * Math.sin(gameObject.transform.ry / 30);
        }, 15);
    };
    /**
     * 更新
     */
    PointMaterialTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    PointMaterialTest.prototype.dispose = function () {
    };
    return PointMaterialTest;
}(feng3d.Script));
var SegmentMaterialTest = /** @class */ (function (_super) {
    __extends(SegmentMaterialTest, _super);
    function SegmentMaterialTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    SegmentMaterialTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var segment = new feng3d.GameObject().value({ name: "segment" });
        segment.transform.z = 3;
        scene.gameObject.addChild(segment);
        //初始化材质
        var model = segment.addComponent(feng3d.Model);
        model.material = new feng3d.SegmentMaterial().value({ renderParams: { renderMode: feng3d.RenderMode.LINES } });
        var segmentGeometry = model.geometry = new feng3d.SegmentGeometry();
        var length = 200;
        var height = 2 / Math.PI;
        var preVec;
        for (var x = -length; x <= length; x++) {
            var angle = x / length * Math.PI;
            if (preVec == null) {
                preVec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
            }
            else {
                var vec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
                segmentGeometry.segments.push({ start: preVec, end: vec });
                preVec = vec;
            }
        }
        //变化旋转
        setInterval(function () {
            segment.transform.ry += 1;
        }, 15);
    };
    /**
     * 更新
     */
    SegmentMaterialTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    SegmentMaterialTest.prototype.dispose = function () {
    };
    return SegmentMaterialTest;
}(feng3d.Script));
var StandardMaterialTest = /** @class */ (function (_super) {
    __extends(StandardMaterialTest, _super);
    function StandardMaterialTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    StandardMaterialTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var cube = new feng3d.GameObject();
        cube.transform.z = 3;
        cube.transform.y = -1;
        scene.gameObject.addChild(cube);
        //变化旋转与颜色
        setInterval(function () {
            cube.transform.ry += 1;
        }, 15);
        var model = cube.addComponent(feng3d.Model);
        model.geometry = new feng3d.CubeGeometry().value({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        // model.geometry = new PlaneGeometry();
        //材质
        var textureMaterial = model.material = new feng3d.StandardMaterial();
        textureMaterial.uniforms.s_diffuse.url = 'resources/m.png';
        // textureMaterial.uniforms.s_diffuse.url = 'resources/nonpowerof2.png';
        textureMaterial.uniforms.s_diffuse.format = feng3d.TextureFormat.RGBA;
        // textureMaterial.diffuseMethod.alphaThreshold = 0.1;
        textureMaterial.uniforms.s_diffuse.anisotropy = 16;
        textureMaterial.renderParams.enableBlend = true;
        textureMaterial.uniforms.u_diffuse.a = 0.2;
    };
    /**
     * 更新
     */
    StandardMaterialTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    StandardMaterialTest.prototype.dispose = function () {
    };
    return StandardMaterialTest;
}(feng3d.Script));
var TextureMaterialTest = /** @class */ (function (_super) {
    __extends(TextureMaterialTest, _super);
    function TextureMaterialTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    TextureMaterialTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var cube = new feng3d.GameObject();
        cube.transform.z = 3;
        cube.transform.y = -1;
        scene.gameObject.addChild(cube);
        //变化旋转与颜色
        setInterval(function () {
            cube.transform.ry += 1;
        }, 15);
        var model = cube.addComponent(feng3d.Model);
        model.geometry = new feng3d.CubeGeometry().value({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        // model.geometry = new PlaneGeometry();
        //材质
        model.material = new feng3d.TextureMaterial().value({
            uniforms: { s_texture: { url: 'resources/m.png', flipY: false } }
        });
    };
    /**
     * 更新
     */
    TextureMaterialTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    TextureMaterialTest.prototype.dispose = function () {
    };
    return TextureMaterialTest;
}(feng3d.Script));
var ScriptDemo = /** @class */ (function (_super) {
    __extends(ScriptDemo, _super);
    function ScriptDemo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScriptDemo.prototype.init = function () {
        var cube = this.cube = new feng3d.GameObject();
        cube.transform.z = -7;
        this.gameObject.addChild(cube);
        var model = cube.addComponent(feng3d.Model);
        model.geometry = new feng3d.CubeGeometry().value({ width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        //材质
        var material = model.material = new feng3d.StandardMaterial();
        material.uniforms.s_diffuse.url = 'resources/m.png';
        material.uniforms.u_fogMode = feng3d.FogMode.LINEAR;
        material.uniforms.u_fogColor = new feng3d.Color3(1, 1, 0);
        material.uniforms.u_fogMinDistance = 2;
        material.uniforms.u_fogMaxDistance = 3;
    };
    ScriptDemo.prototype.update = function () {
        this.cube.transform.ry += 1;
        // log("this.cube.transform.ry: " + this.cube.transform.ry);
    };
    /**
     * 销毁
     */
    ScriptDemo.prototype.dispose = function () {
        this.cube.dispose();
        this.cube = null;
    };
    return ScriptDemo;
}(feng3d.Script));
/**
 * @author alteredq / http://alteredqualia.com/
 */
function Clock(autoStart) {
    this.autoStart = (autoStart !== undefined) ? autoStart : true;
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    this.running = false;
}
Object.assign(Clock.prototype, {
    start: function () {
        this.startTime = (typeof performance === 'undefined' ? Date : performance).now(); // see #10732
        this.oldTime = this.startTime;
        this.elapsedTime = 0;
        this.running = true;
    },
    stop: function () {
        this.getElapsedTime();
        this.running = false;
        this.autoStart = false;
    },
    getElapsedTime: function () {
        this.getDelta();
        return this.elapsedTime;
    },
    getDelta: function () {
        var diff = 0;
        if (this.autoStart && !this.running) {
            this.start();
            return 0;
        }
        if (this.running) {
            var newTime = (typeof performance === 'undefined' ? Date : performance).now();
            diff = (newTime - this.oldTime) / 1000;
            this.oldTime = newTime;
            this.elapsedTime += diff;
        }
        return diff;
    }
});
/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Based on @tojiro's vr-samples-utils.js
 */
var WEBVR = {
    createButton: function (renderer) {
        function showEnterVR(display) {
            button.style.display = '';
            button.style.cursor = 'pointer';
            button.style.left = 'calc(50% - 50px)';
            button.style.width = '100px';
            button.textContent = 'ENTER VR';
            button.onmouseenter = function () { button.style.opacity = '1.0'; };
            button.onmouseleave = function () { button.style.opacity = '0.5'; };
            button.onclick = function () {
                display.isPresenting ? display.exitPresent() : display.requestPresent([{ source: renderer.domElement }]);
            };
            renderer.vr.setDevice(display);
        }
        function showVRNotFound() {
            button.style.display = '';
            button.style.cursor = 'auto';
            button.style.left = 'calc(50% - 75px)';
            button.style.width = '150px';
            button.textContent = 'VR NOT FOUND';
            button.onmouseenter = null;
            button.onmouseleave = null;
            button.onclick = null;
            renderer.vr.setDevice(null);
        }
        function stylizeElement(element) {
            element.style.position = 'absolute';
            element.style.bottom = '20px';
            element.style.padding = '12px 6px';
            element.style.border = '1px solid #fff';
            element.style.borderRadius = '4px';
            element.style.background = 'transparent';
            element.style.color = '#fff';
            element.style.font = 'normal 13px sans-serif';
            element.style.textAlign = 'center';
            element.style.opacity = '0.5';
            element.style.outline = 'none';
            element.style.zIndex = '999';
        }
        if ('getVRDisplays' in navigator) {
            var button = document.createElement('button');
            button.style.display = 'none';
            stylizeElement(button);
            window.addEventListener('vrdisplayconnect', function (event) {
                showEnterVR(event.display);
            }, false);
            window.addEventListener('vrdisplaydisconnect', function (event) {
                showVRNotFound();
            }, false);
            window.addEventListener('vrdisplaypresentchange', function (event) {
                button.textContent = event.display.isPresenting ? 'EXIT VR' : 'ENTER VR';
            }, false);
            window.addEventListener('vrdisplayactivate', function (event) {
                event.display.requestPresent([{ source: renderer.domElement }]);
            }, false);
            navigator["getVRDisplays"]()
                .then(function (displays) {
                if (displays.length > 0) {
                    showEnterVR(displays[0]);
                }
                else {
                    showVRNotFound();
                }
            });
            return button;
        }
        else {
            var message = document.createElement('a');
            message.href = 'https://webvr.info';
            message.innerHTML = 'WEBVR NOT SUPPORTED';
            message.style.left = 'calc(50% - 90px)';
            message.style.width = '180px';
            message.style.textDecoration = 'none';
            stylizeElement(message);
            return message;
        }
    },
    // DEPRECATED
    checkAvailability: function () {
        console.warn('WEBVR.checkAvailability has been deprecated.');
        // return new Promise( function () {} );
    },
    getMessageContainer: function () {
        console.warn('WEBVR.getMessageContainer has been deprecated.');
        return document.createElement('div');
    },
    getButton: function () {
        console.warn('WEBVR.getButton has been deprecated.');
        return document.createElement('div');
    },
    getVRDisplay: function () {
        console.warn('WEBVR.getVRDisplay has been deprecated.');
    }
};
var webvr_cubes = /** @class */ (function (_super) {
    __extends(webvr_cubes, _super);
    function webvr_cubes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    webvr_cubes.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var clock = new Clock(true);
        var container;
        var room;
        var isMouseDown = false;
        var INTERSECTED;
        var crosshair;
        init();
        animate();
        function init() {
            container = document.createElement('div');
            document.body.appendChild(container);
            var info = document.createElement('div');
            info.style.position = 'absolute';
            info.style.top = '10px';
            info.style.width = '100%';
            info.style.textAlign = 'center';
            info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive cubes';
            container.appendChild(info);
            scene.background.fromUnit(0x505050);
            var lens = camera.lens = new feng3d.PerspectiveLens(70);
            lens.aspect = window.innerWidth / window.innerHeight;
            lens.near = 0.1;
            lens.far = 10;
            camera.gameObject.addComponent(feng3d.FPSController);
            scene.gameObject.addChild(camera.gameObject);
            crosshair = new feng3d.GameObject().value({ name: "crosshair" });
            var model = crosshair.addComponent(feng3d.Model);
            model.geometry = new feng3d.TorusGeometry().value({ radius: 0.02, tubeRadius: 0.004, segmentsR: 32, segmentsT: 8, yUp: false });
            var material = model.material = new feng3d.StandardMaterial();
            material.renderParams.enableBlend = true;
            material.uniforms.u_diffuse.a = 0.5;
            crosshair.transform.z = 2;
            camera.gameObject.addChild(crosshair);
            room = new feng3d.GameObject().value({
                name: "room",
                components: [
                    { __class__: "feng3d.Transform", y: 3 },
                    {
                        __class__: "feng3d.MeshModel",
                        geometry: {
                            __class__: "feng3d.CubeGeometry",
                            width: 6, height: 6, depth: 6,
                            segmentsW: 8, segmentsH: 8, segmentsD: 8,
                        },
                        material: {
                            __class__: "feng3d.StandardMaterial",
                            shaderName: "standard",
                            uniforms: { u_diffuse: { r: 0.25, g: 0.25, b: 0.25 } },
                            renderParams: { renderMode: feng3d.RenderMode.LINES },
                        }
                    }
                ]
            });
            scene.gameObject.addChild(room);
            // scene.add(new THREE.HemisphereLight(0x606060, 0x404040));
            var light = new feng3d.GameObject().value({
                name: "light",
                components: [
                    { __class__: "feng3d.Transform", rx: 0.577, ry: 0.577, rz: 0.577 },
                    { __class__: "feng3d.DirectionalLight" }
                ],
            });
            scene.gameObject.addChild(light);
            var geometry = new feng3d.CubeGeometry().value({ width: 0.15, height: 0.15, depth: 0.15 });
            for (var i = 0; i < 200; i++) {
                var object = new feng3d.GameObject().value({ name: "box" + i });
                object.addComponent(feng3d.Model, function (component) {
                    component.geometry = geometry;
                    var material = component.material = new feng3d.StandardMaterial();
                    material.uniforms.u_diffuse.fromUnit(Math.random() * 0xffffff);
                });
                object.transform.position = feng3d.Vector3.random().scale(4).subNumber(2);
                object.transform.rotation = feng3d.Vector3.random().scale(2 * Math.PI);
                object.transform.scale = feng3d.Vector3.random().addNumber(0.5);
                object.userData.velocity = feng3d.Vector3.random().scale(0.01).subNumber(0.005);
                room.addChild(object);
            }
            // renderer = new THREE.WebGLRenderer({ antialias: true });
            // renderer.setPixelRatio(window.devicePixelRatio);
            // renderer.setSize(window.innerWidth, window.innerHeight);
            // renderer.vr.enabled = true;
            // container.appendChild(renderer.domElement);
            canvas.addEventListener('mousedown', onMouseDown, false);
            canvas.addEventListener('mouseup', onMouseUp, false);
            canvas.addEventListener('touchstart', onMouseDown, false);
            canvas.addEventListener('touchend', onMouseUp, false);
            window.addEventListener('resize', onWindowResize, false);
            //
            window.addEventListener('vrdisplaypointerrestricted', onPointerRestricted, false);
            window.addEventListener('vrdisplaypointerunrestricted', onPointerUnrestricted, false);
            document.body.appendChild(WEBVR.createButton(canvas));
        }
        function onMouseDown() {
            isMouseDown = true;
        }
        function onMouseUp() {
            isMouseDown = false;
        }
        function onPointerRestricted() {
            var pointerLockElement = canvas;
            if (pointerLockElement && typeof (pointerLockElement.requestPointerLock) === 'function') {
                pointerLockElement.requestPointerLock();
            }
        }
        function onPointerUnrestricted() {
            var currentPointerLockElement = document.pointerLockElement;
            var expectedPointerLockElement = canvas;
            if (currentPointerLockElement && currentPointerLockElement === expectedPointerLockElement && typeof (document.exitPointerLock) === 'function') {
                document.exitPointerLock();
            }
        }
        function onWindowResize() {
            camera.lens.aspect = window.innerWidth / window.innerHeight;
            // engine.setSize(window.innerWidth, window.innerHeight);
        }
        //
        function animate() {
            // renderer.animate(render);
        }
        function render() {
            var delta = clock.getDelta() * 60;
            if (isMouseDown === true) {
                var cube = room.children[0];
                room.removeChild(cube);
                cube.transform.position = new feng3d.Vector3(0, 0, -0.75).applyQuaternion(camera.transform.orientation);
                cube.userData.velocity.x = (Math.random() - 0.5) * 0.02 * delta;
                cube.userData.velocity.y = (Math.random() - 0.5) * 0.02 * delta;
                cube.userData.velocity.z = (Math.random() * 0.01 - 0.05) * delta;
                cube.userData.velocity.applyQuaternion(camera.transform.orientation);
                room.addChild(cube);
            }
            // find intersections
            // raycaster.setFromCamera({ x: 0, y: 0 }, camera);
            // var intersects = raycaster.intersectObjects(room.children);
            // if (intersects.length > 0)
            // {
            //     if (INTERSECTED != intersects[0].object)
            //     {
            //         if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            //         INTERSECTED = intersects[0].object;
            //         INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            //         INTERSECTED.material.emissive.setHex(0xff0000);
            //     }
            // } else
            // {
            //     if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            //     INTERSECTED = undefined;
            // }
            // // Keep cubes inside room
            // for (var i = 0; i < room.children.length; i++)
            // {
            //     var cube = room.children[i];
            //     cube.userData.velocity.multiplyScalar(1 - (0.001 * delta));
            //     cube.position.add(cube.userData.velocity);
            //     if (cube.position.x < - 3 || cube.position.x > 3)
            //     {
            //         cube.position.x = THREE.Math.clamp(cube.position.x, - 3, 3);
            //         cube.userData.velocity.x = - cube.userData.velocity.x;
            //     }
            //     if (cube.position.y < - 3 || cube.position.y > 3)
            //     {
            //         cube.position.y = THREE.Math.clamp(cube.position.y, - 3, 3);
            //         cube.userData.velocity.y = - cube.userData.velocity.y;
            //     }
            //     if (cube.position.z < - 3 || cube.position.z > 3)
            //     {
            //         cube.position.z = THREE.Math.clamp(cube.position.z, - 3, 3);
            //         cube.userData.velocity.z = - cube.userData.velocity.z;
            //     }
            //     cube.rotation.x += cube.userData.velocity.x * 2 * delta;
            //     cube.rotation.y += cube.userData.velocity.y * 2 * delta;
            //     cube.rotation.z += cube.userData.velocity.z * 2 * delta;
            // }
            // renderer.render(scene, camera);
        }
    };
    /**
     * 更新
     */
    webvr_cubes.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    webvr_cubes.prototype.dispose = function () {
    };
    return webvr_cubes;
}(feng3d.Script));
//# sourceMappingURL=examples.js.map