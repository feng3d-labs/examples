class TerrainMergeTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        //
        camera.transform.z = -5;
        camera.transform.y = 2;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent("FPSController");
        var root = 'resources/terrain/';
        //
        var terrain = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "terrain" });
        var model = terrain.addComponent("Renderable");
        model.geometry = new feng3d.TerrainGeometry({ heightMap: { __class__: "feng3d.Texture2D", source: { url: root + 'terrain_heights.jpg' } } });
        var material = feng3d.serialization.setValue(new feng3d.Material(), {
            shaderName: "standard", uniforms: {
                s_diffuse: { __class__: "feng3d.Texture2D", source: { url: root + 'terrain_diffuse.jpg' } },
                s_normal: { __class__: "feng3d.Texture2D", source: { url: root + 'terrain_normals.jpg' } },
            }
        });
        // var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test3.jpg',new Vector3(50, 50, 50));
        // material.terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png', root + 'test1.jpg', new Vector3(50, 50, 50));
        model.material = material;
        scene.gameObject.addChild(terrain);
        //初始化光源
        var light1 = new feng3d.GameObject();
        var pointLight1 = light1.addComponent("PointLight");
        // pointLight1.range = 1000;
        pointLight1.color = new feng3d.Color3(1, 1, 0);
        light1.transform.y = 3;
        // scene.transform.addChild(light1);
        //
        feng3d.ticker.onframe(() => {
            var time = new Date().getTime();
            var angle = time / 1000;
            light1.transform.x = Math.sin(angle) * 3;
            light1.transform.z = Math.cos(angle) * 3;
        });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class TerrainTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        camera.transform.z = -500;
        camera.transform.y = 200;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent("FPSController");
        var root = 'resources/terrain/';
        //
        var terrain = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "terrain" });
        var model = terrain.addComponent("Renderable");
        // model.geometry = new feng3d.TerrainGeometry();
        model.geometry = new feng3d.TerrainGeometry({ heightMap: { __class__: "feng3d.Texture2D", source: { url: root + 'terrain_heights.jpg' } }, width: 500, height: 100, depth: 500 });
        var material = feng3d.serialization.setValue(new feng3d.Material(), {
            shaderName: "terrain", uniforms: {
                s_diffuse: { __class__: "feng3d.Texture2D", source: { url: root + 'terrain_diffuse.jpg' } },
                s_normal: { __class__: "feng3d.Texture2D", source: { url: root + 'terrain_normals.jpg' } },
                //
                s_blendTexture: { __class__: "feng3d.Texture2D", source: { url: root + 'terrain_splats.png' } },
                s_splatTexture1: { __class__: "feng3d.Texture2D", source: { url: root + 'beach.jpg' } },
                s_splatTexture2: { __class__: "feng3d.Texture2D", source: { url: root + 'grass.jpg' } },
                s_splatTexture3: { __class__: "feng3d.Texture2D", source: { url: root + 'rock.jpg' } },
                u_splatRepeats: new feng3d.Vector4(1, 50, 50, 50),
            }
        });
        model.material = material;
        scene.gameObject.addChild(terrain);
        //初始化光源
        var light1 = new feng3d.GameObject();
        var pointLight1 = light1.addComponent("PointLight");
        // pointLight1.range = 1000;
        pointLight1.color = new feng3d.Color3(1, 1, 0);
        light1.transform.y = 3;
        // scene.transform.addChild(light1);
        //
        feng3d.ticker.onframe(() => {
            var time = new Date().getTime();
            var angle = time / 1000;
            light1.transform.x = Math.sin(angle) * 3;
            light1.transform.z = Math.cos(angle) * 3;
        });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class SceneLoadTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var view3D = new feng3d.View();
        feng3d.loader.loadText("resources/scene/Untitled.scene.json", (content) => {
            var json = JSON.parse(content);
            var sceneobject = feng3d.serialization.deserialize(json);
            var scene = sceneobject.getComponent("Scene");
            view3D.scene = scene;
        });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class Basic_Shading extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
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
            camera.gameObject.addComponent("FPSController");
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
            var directionalLight = light1.addComponent("DirectionalLight");
            directionalLight.intensity = 0.7;
            light1.transform.rx = 90;
            scene.gameObject.addChild(light1);
            light2 = new feng3d.GameObject();
            var directionalLight = light2.addComponent("DirectionalLight");
            directionalLight.color.fromUnit(0x00FFFF);
            directionalLight.intensity = 0.7;
            light2.transform.rx = 90;
            scene.gameObject.addChild(light2);
        }
        function initObjects() {
            plane = new feng3d.GameObject();
            var model = plane.addComponent("Renderable");
            var geometry = model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 10, height: 10 });
            model.material = planeMaterial;
            geometry.scaleU = 2;
            geometry.scaleV = 2;
            plane.transform.y = -0.20;
            scene.gameObject.addChild(plane);
            sphere = new feng3d.GameObject();
            var model = sphere.addComponent("Renderable");
            model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 1.50, segmentsW: 40, segmentsH: 20 });
            model.material = sphereMaterial;
            sphere.transform.x = 3;
            sphere.transform.y = 1.60;
            sphere.transform.z = 3.00;
            scene.gameObject.addChild(sphere);
            cube = new feng3d.GameObject();
            var model = cube.addComponent("Renderable");
            model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 2, height: 2, depth: 2, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
            model.material = cubeMaterial;
            cube.transform.x = 3.00;
            cube.transform.y = 1.60;
            cube.transform.z = -2.50;
            scene.gameObject.addChild(cube);
            torus = new feng3d.GameObject();
            var model = torus.addComponent("Renderable");
            geometry = model.geometry = feng3d.serialization.setValue(new feng3d.TorusGeometry(), { radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
            model.material = torusMaterial;
            geometry.scaleU = 10;
            geometry.scaleV = 5;
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
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class Basic_SkyBox extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var cubeTexture = feng3d.serialization.setValue(new feng3d.TextureCube(), {
            rawData: {
                type: "path", paths: [
                    'resources/skybox/snow_positive_x.jpg',
                    'resources/skybox/snow_positive_y.jpg',
                    'resources/skybox/snow_positive_z.jpg',
                    'resources/skybox/snow_negative_x.jpg',
                    'resources/skybox/snow_negative_y.jpg',
                    'resources/skybox/snow_negative_z.jpg',
                ]
            }
        });
        var skybox = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "skybox" });
        var skyboxComponent = skybox.addComponent("SkyBox");
        skyboxComponent.s_skyboxTexture = cubeTexture;
        scene.gameObject.addChild(skybox);
        camera.transform.z = -6;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.lens = new feng3d.PerspectiveLens(90);
        var torusMaterial = feng3d.serialization.setValue(new feng3d.Material(), { uniforms: { s_envMap: cubeTexture } });
        // torusMaterial.uniforms.u_specular.a = 0.5;
        // torusMaterial.uniforms.u_ambient.fromUnit(0x111111);
        // torusMaterial.uniforms.u_ambient.a = 0.25;
        var torus = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "torus" });
        var model = torus.addComponent("Renderable");
        model.geometry = feng3d.serialization.setValue(new feng3d.TorusGeometry(), { radius: 1.50, tubeRadius: 0.60, segmentsR: 40, segmentsT: 20 });
        model.material = torusMaterial;
        scene.gameObject.addChild(torus);
        feng3d.ticker.onframe(() => {
            torus.transform.rx += 2;
            torus.transform.ry += 1;
            camera.transform.position = new feng3d.Vector3(0, 0, 0);
            camera.transform.ry += 0.5 * (feng3d.windowEventProxy.clientX - canvas.clientLeft - canvas.clientWidth / 2) / 800;
            camera.transform.moveBackward(6);
        });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class Basic_View extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        camera.transform.z = -6;
        camera.transform.y = 5;
        camera.transform.lookAt(new feng3d.Vector3());
        var plane = new feng3d.GameObject();
        var model = plane.addComponent("Renderable");
        model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 7, height: 7 });
        var material = model.material = feng3d.serialization.setValue(new feng3d.Material(), { uniforms: { s_diffuse: { source: { url: "resources/floor_diffuse.jpg" } } } });
        scene.gameObject.addChild(plane);
        feng3d.ticker.onframe(() => {
            plane.transform.ry += 1;
        });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class BillboardTest extends feng3d.Script {
    /*
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        camera.gameObject.addComponent("FPSController");
        scene.background.setTo(0.3, 0.3, 0.3, 1);
        var cube = feng3d.GameObject.createPrimitive("Cube");
        cube.transform.z = 3;
        scene.gameObject.addChild(cube);
        var gameObject = feng3d.GameObject.createPrimitive("Plane");
        gameObject.transform.y = 1.50;
        var holdSizeComponent = gameObject.addComponent("HoldSizeComponent");
        holdSizeComponent.holdSize = 1;
        holdSizeComponent.camera = camera;
        var billboardComponent = gameObject.addComponent("BillboardComponent");
        billboardComponent.camera = camera;
        cube.addChild(gameObject);
        //材质
        var model = gameObject.getComponent("Renderable");
        model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 0.1, height: 0.1, segmentsW: 1, segmentsH: 1, yUp: false });
        var textureMaterial = model.material = feng3d.serialization.setValue(new feng3d.Material(), { uniforms: { s_diffuse: { source: { url: 'resources/m.png' } } } });
        // textureMaterial.cullFace = CullFace.NONE;
        //
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
    }
    /**
     * 更新
     */
    update() {
    }
    /**
     * 销毁时调用
     */
    dispose() {
    }
}
/**
 * 测试3D容器
 */
class Container3DTest extends feng3d.Script {
    constructor() {
        super(...arguments);
        this.num = 0;
    }
    /**
     * 初始化时调用
     */
    init() {
        //初始化颜色材质
        this.cube = feng3d.GameObject.createPrimitive("Cube");
        this.gameObject.addChild(this.cube);
        this.colorMaterial = this.cube.getComponent("Renderable").material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color" });
        var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
        cylinder.transform.x = 2;
        this.cube.addChild(cylinder);
    }
    /**
     * 更新
     */
    update() {
        console.log("update");
        //变化旋转与颜色
        this.cube.transform.ry += 1;
        this.num++;
        if (this.num % 60 == 0) {
            this.colorMaterial.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
        }
    }
    /**
     * 销毁时调用
     */
    dispose() {
    }
}
class FogTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var cube = new feng3d.GameObject();
        cube.transform.z = -7;
        cube.transform.y = 0;
        this.gameObject.addChild(cube);
        var model = cube.addComponent("Renderable");
        model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        //材质
        var material = model.material = feng3d.serialization.setValue(new feng3d.Material(), {
            uniforms: {
                s_diffuse: { source: { url: 'resources/m.png' } },
                u_fogMode: feng3d.FogMode.LINEAR,
                u_fogColor: new feng3d.Color3(1, 1, 0),
                u_fogMinDistance: 2,
                u_fogMaxDistance: 3,
            }
        });
        feng3d.ticker.onframe(() => {
            cube.transform.ry += 1;
        });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
     * 销毁时调用
     */
    dispose() {
    }
}
class FPSControllerTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var cube = feng3d.GameObject.createPrimitive("Cube");
        this.gameObject.addChild(cube);
        var sphere = feng3d.GameObject.createPrimitive("Sphere");
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        this.gameObject.addChild(sphere);
        var capsule = feng3d.GameObject.createPrimitive("Capsule");
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        this.gameObject.addChild(capsule);
        var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        this.gameObject.addChild(cylinder);
        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        //
        camera.gameObject.addComponent("FPSController");
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class MousePickTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        /**
         * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
         */
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent("FPSController");
        var cube = feng3d.GameObject.createPrimitive("Cube");
        cube.mouseEnabled = true;
        cube.getComponent("Renderable").material = new feng3d.Material();
        scene.gameObject.addChild(cube);
        var sphere = feng3d.GameObject.createPrimitive("Sphere");
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        sphere.mouseEnabled = true;
        sphere.getComponent("Renderable").material = new feng3d.Material();
        scene.gameObject.addChild(sphere);
        var capsule = feng3d.GameObject.createPrimitive("Capsule");
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        capsule.mouseEnabled = true;
        capsule.getComponent("Renderable").material = new feng3d.Material();
        scene.gameObject.addChild(capsule);
        var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        cylinder.mouseEnabled = true;
        cylinder.getComponent("Renderable").material = new feng3d.Material();
        scene.gameObject.addChild(cylinder);
        scene.on("click", (event) => {
            var gameObject = event.target;
            if (gameObject.getComponent("Renderable")) {
                var uniforms = gameObject.getComponent("Renderable").material.uniforms;
                uniforms.u_diffuse.fromUnit(Math.random() * (1 << 24));
            }
        });
        // var engines = feng3d.Feng3dObject.getObjects(feng3d.Engine);
        // engines[0].mouse3DManager.mouseInput.catchMouseMove = true;
        // scene.on("mouseover", (event) =>
        // {
        //     var gameObject = <feng3d.GameObject>event.target;
        //     if (gameObject.getComponent("Renderable"))
        //     {
        //         var uniforms = <feng3d.StandardUniforms>gameObject.getComponent("Renderable").material.uniforms;
        //         uniforms.u_diffuse.setTo(0, 1, 0);
        //     }
        // });
        // scene.on("mouseout", (event) =>
        // {
        //     var gameObject = <feng3d.GameObject>event.target;
        //     if (gameObject.getComponent("Renderable"))
        //     {
        //         var uniforms = <feng3d.StandardUniforms>gameObject.getComponent("Renderable").material.uniforms;
        //         uniforms.u_diffuse.setTo(1, 1, 1);
        //     }
        // });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class ScriptTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var sc = this.gameObject.addScript("ScriptDemo");
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class SkyBoxTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        camera.transform.z = -5;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent("FPSController");
        //
        var skybox = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "skybox" });
        var model = skybox.addComponent("SkyBox");
        model.s_skyboxTexture = feng3d.serialization.setValue(new feng3d.TextureCube(), {
            rawData: {
                type: "path", paths: [
                    'resources/skybox/px.jpg',
                    'resources/skybox/py.jpg',
                    'resources/skybox/pz.jpg',
                    'resources/skybox/nx.jpg',
                    'resources/skybox/ny.jpg',
                    'resources/skybox/nz.jpg'
                ]
            }
        });
        scene.gameObject.addChild(skybox);
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class GeometryTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var gameobject = new feng3d.GameObject();
        var model = gameobject.addComponent("Renderable");
        var geometry = model.geometry = new feng3d.CustomGeometry();
        geometry.addGeometry(new feng3d.PlaneGeometry());
        var matrix = new feng3d.Matrix4x4();
        matrix.appendTranslation(0, 0.50, 0);
        geometry.addGeometry(feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 50 }), matrix);
        matrix.appendTranslation(0, 0.50, 0);
        var addGeometry = new feng3d.CubeGeometry();
        geometry.addGeometry(addGeometry, matrix);
        addGeometry.width = 0.50;
        matrix.appendTranslation(0, 0.50, 0);
        matrix.appendRotation(feng3d.Vector3.Z_AXIS, 45);
        geometry.addGeometry(addGeometry, matrix);
        gameobject.transform.z = 3;
        gameobject.transform.y = -1;
        scene.gameObject.addChild(gameobject);
        //初始化颜色材质
        model.material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color" });
        var colorUniforms = model.material.uniforms;
        //变化旋转与颜色
        setInterval(function () {
            gameobject.transform.ry += 1;
        }, 15);
        setInterval(function () {
            colorUniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
        }, 1000);
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class PrimitiveTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var cube = feng3d.GameObject.createPrimitive("Cube");
        this.gameObject.addChild(cube);
        var plane = feng3d.GameObject.createPrimitive("Plane");
        plane.transform.position = new feng3d.Vector3(1.50, 0, 0);
        plane.transform.rx = -90;
        this.gameObject.addChild(plane);
        var sphere = feng3d.GameObject.createPrimitive("Sphere");
        sphere.transform.position = new feng3d.Vector3(-1.50, 0, 0);
        this.gameObject.addChild(sphere);
        var capsule = feng3d.GameObject.createPrimitive("Capsule");
        capsule.transform.position = new feng3d.Vector3(3, 0, 0);
        this.gameObject.addChild(capsule);
        var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
        cylinder.transform.position = new feng3d.Vector3(-3, 0, 0);
        this.gameObject.addChild(cylinder);
        var controller = new feng3d.LookAtController(camera.gameObject);
        controller.lookAtPosition = new feng3d.Vector3();
        //
        setInterval(() => {
            var time = new Date().getTime();
            var angle = (Math.round(time / 17) % 360);
            angle = angle * Math.DEG2RAD;
            camera.transform.position = new feng3d.Vector3(10 * Math.sin(angle), 0, 10 * Math.cos(angle));
            controller.update();
        }, 17);
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class PointLightTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var light0 = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "pointLight" });
        var light1 = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "pointLight" });
        initObjects();
        initLights();
        feng3d.ticker.onframe(setPointLightPosition);
        camera.transform.z = -5;
        camera.transform.y = 2;
        camera.transform.lookAt(new feng3d.Vector3());
        camera.gameObject.addComponent("FPSController");
        //
        feng3d.windowEventProxy.on("keyup", (event) => {
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
                    s_diffuse: { source: { url: 'resources/head_diffuse.jpg' }, wrapS: feng3d.TextureWrap.MIRRORED_REPEAT, wrapT: feng3d.TextureWrap.MIRRORED_REPEAT },
                    s_normal: { source: { url: 'resources/head_normals.jpg' }, wrapS: feng3d.TextureWrap.MIRRORED_REPEAT, wrapT: feng3d.TextureWrap.MIRRORED_REPEAT },
                    s_specular: { source: { url: 'resources/head_specular.jpg' }, wrapS: feng3d.TextureWrap.MIRRORED_REPEAT, wrapT: feng3d.TextureWrap.MIRRORED_REPEAT },
                }
            });
            //初始化立方体
            var plane = new feng3d.GameObject();
            plane.transform.y = -1;
            var model = plane.addComponent("Renderable");
            var geometry = model.geometry = feng3d.serialization.setValue(new feng3d.PlaneGeometry(), { width: 10, height: 10 });
            geometry.scaleU = 2;
            geometry.scaleV = 2;
            model.material = material;
            scene.gameObject.addChild(plane);
            var cube = new feng3d.GameObject();
            var model = cube.addComponent("Renderable");
            model.material = material;
            model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
            model.geometry.scaleU = 2;
            model.geometry.scaleV = 2;
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
            var model = light0.addComponent("Renderable");
            model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 0.05 });
            //初始化点光源
            var pointLight0 = light0.addComponent("PointLight");
            pointLight0.color = lightColor0.toColor3();
            model.material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color", uniforms: { u_diffuseInput: lightColor0 } });
            scene.gameObject.addChild(light0);
            //
            var lightColor1 = new feng3d.Color4(0, 1, 0, 1);
            model = light1.addComponent("Renderable");
            model.geometry = feng3d.serialization.setValue(new feng3d.SphereGeometry(), { radius: 0.05 });
            //初始化点光源
            var pointLight1 = light1.addComponent("DirectionalLight");
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
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class md5LoaderTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var object;
        var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
        var md5animUrl = "resources/hellknight/idle2.md5anim";
        camera.gameObject.transform.z = -300;
        feng3d.md5Loader.load(md5meshUrl, (gameObject) => {
            object = gameObject;
            gameObject.transform.rx = -90;
            gameObject.transform.ry = -90;
            useMatrial(gameObject);
            scene.gameObject.addChild(gameObject);
            //
            feng3d.md5Loader.loadAnim(md5animUrl, (animationClip) => {
                animationClip.name = "idle2";
                var animation = gameObject.addComponent("Animation");
                animation.animation = animationClip;
                animation.isplaying = true;
            });
        });
        function useMatrial(gameObject) {
            for (var i = 0; i < gameObject.numChildren; i++) {
                var child = gameObject.getChildAt(i);
                var model = child.getComponent("Renderable");
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
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class MdlLoaderTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
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
        var view = new feng3d.View();
        view.camera.transform.x = -200;
        view.camera.transform.y = 200;
        view.camera.transform.z = -300;
        view.camera.transform.lookAt(new feng3d.Vector3());
        view.camera.gameObject.addComponent("FPSController");
        //
        var rooturl = "resources/war3/";
        updateModel();
        feng3d.windowEventProxy.on("keyup", (e) => {
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
                var animation = showWar3Model.getComponentsInChildren("Animation")[0];
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
            feng3d.mdlLoader.load(mdlurl, (gameObject) => {
                view.scene.gameObject.addChild(gameObject);
                loading = false;
                showWar3Model = gameObject;
                var animation = showWar3Model.getComponentsInChildren("Animation")[0];
                animation.isplaying = true;
            });
        }
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class OBJParserTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
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
        var material = feng3d.serialization.setValue(new feng3d.Material(), {
            uniforms: {
                s_diffuse: { source: { url: "resources/head_diffuse.jpg" } },
                s_normal: { source: { url: "resources/head_normals.jpg" } },
                s_specular: { source: { url: "resources/head_specular.jpg" } },
            }
        });
        // var material = materialFactory.create("color");
        material.renderParams.cullFace = feng3d.CullFace.NONE;
        feng3d.objLoader.load(objUrl, function (gameObject) {
            object = gameObject;
            object.transform.sx = 20;
            object.transform.sy = 20;
            object.transform.sz = 20;
            object.transform.z = 300;
            scene.gameObject.addChild(gameObject);
            var models = gameObject.getComponentsInChildren("Renderable");
            models.forEach(element => {
                element.material = material;
            });
        });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class ColorMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var cube = feng3d.GameObject.createPrimitive("Cube");
        cube.transform.z = 3;
        scene.gameObject.addChild(cube);
        //初始化颜色材质
        var colorMaterial = cube.getComponent("Renderable").material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color" });
        //变化旋转与颜色
        setInterval(function () {
            cube.transform.ry += 1;
        }, 15);
        setInterval(function () {
            colorMaterial.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
        }, 1000);
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class PointMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var pointGeometry = new feng3d.PointGeometry();
        var pointMaterial = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "point", renderParams: { renderMode: feng3d.RenderMode.POINTS } });
        var gameObject = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "plane" });
        var model = gameObject.addComponent("Renderable");
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
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class SegmentMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var segment = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "segment" });
        segment.transform.z = 3;
        scene.gameObject.addChild(segment);
        //初始化材质
        var model = segment.addComponent("Renderable");
        model.material = feng3d.Material.getDefault("Segment-Material");
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
                segmentGeometry.addSegment({ start: preVec, end: vec });
                preVec = vec;
            }
        }
        //变化旋转
        setInterval(function () {
            segment.transform.ry += 1;
        }, 15);
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class StandardMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var cube = new feng3d.GameObject();
        cube.transform.z = 3;
        cube.transform.y = -1;
        scene.gameObject.addChild(cube);
        //变化旋转与颜色
        setInterval(function () {
            cube.transform.ry += 1;
        }, 15);
        var model = cube.addComponent("Renderable");
        model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        // model.geometry = new PlaneGeometry();
        //材质
        var textureMaterial = model.material = new feng3d.Material();
        var uniforms = textureMaterial.uniforms;
        uniforms.s_diffuse.source = { url: 'resources/m.png' };
        // textureMaterial.uniforms.s_diffuse.url = 'resources/nonpowerof2.png';
        uniforms.s_diffuse.format = feng3d.TextureFormat.RGBA;
        // textureMaterial.diffuseMethod.alphaThreshold = 0.1;
        uniforms.s_diffuse.anisotropy = 16;
        uniforms.u_diffuse.a = 0.2;
        textureMaterial.renderParams.enableBlend = true;
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class TextureMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init() {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren("Camera")[0];
        var canvas = document.getElementById("glcanvas");
        var cube = new feng3d.GameObject();
        cube.transform.z = 3;
        cube.transform.y = -1;
        scene.gameObject.addChild(cube);
        //变化旋转与颜色
        setInterval(function () {
            cube.transform.ry += 1;
        }, 15);
        var model = cube.addComponent("Renderable");
        model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        // model.geometry = new PlaneGeometry();
        //材质
        model.material = feng3d.serialization.setValue(new feng3d.Material(), {
            shaderName: "texture",
            uniforms: { s_texture: { source: { url: 'resources/m.png' }, flipY: false } }
        });
    }
    /**
     * 更新
     */
    update() {
    }
    /**
    * 销毁时调用
    */
    dispose() {
    }
}
class ScriptDemo extends feng3d.Script {
    init() {
        var cube = this.cube = new feng3d.GameObject();
        cube.transform.z = -7;
        this.gameObject.addChild(cube);
        var model = cube.addComponent("Renderable");
        model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        //材质
        var material = model.material = new feng3d.Material();
        var uniforms = material.uniforms;
        uniforms.s_diffuse.source = { url: 'resources/m.png' };
        uniforms.u_fogMode = feng3d.FogMode.LINEAR;
        uniforms.u_fogColor = new feng3d.Color3(1, 1, 0);
        uniforms.u_fogMinDistance = 2;
        uniforms.u_fogMaxDistance = 3;
    }
    update() {
        this.cube.transform.ry += 1;
        // log("this.cube.transform.ry: " + this.cube.transform.ry);
    }
    /**
     * 销毁
     */
    dispose() {
        this.cube.dispose();
        this.cube = null;
    }
}
//# sourceMappingURL=examples.js.map