var feng3d;
(function (feng3d) {
    var BillboardTest = (function () {
        function BillboardTest() {
            this.init();
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        BillboardTest.prototype.onMousedown = function () {
            this.controller.target = this.view3D.camera;
        };
        BillboardTest.prototype.onMouseup = function () {
            this.controller.target = null;
        };
        BillboardTest.prototype.process = function () {
            this.controller.update();
        };
        BillboardTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var gameObject = new feng3d.GameObject();
            gameObject.z = 300;
            gameObject.isBillboard = true;
            this.view3D.scene.addChild(gameObject);
            //材质
            var model = gameObject.getOrCreateComponentByClass(feng3d.Model);
            model.geometry = new feng3d.PlaneGeometry(100, 100, 1, 1, false);
            var textureMaterial = model.material = new feng3d.TextureMaterial();
            //
            var texture = textureMaterial.texture = new feng3d.Texture2D('resources/m.png');
        };
        return BillboardTest;
    }());
    feng3d.BillboardTest = BillboardTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ColorMaterialTest = (function () {
        function ColorMaterialTest() {
            this.init();
        }
        ColorMaterialTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var cube = new feng3d.CubeObject3D();
            cube.z = 300;
            this.view3D.scene.addChild(cube);
            //初始化颜色材质
            var colorMaterial = cube.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial();
            //变化旋转与颜色
            setInterval(function () {
                cube.rotationY += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        };
        return ColorMaterialTest;
    }());
    feng3d.ColorMaterialTest = ColorMaterialTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 测试3D容器
     */
    var Container3DTest = (function () {
        function Container3DTest() {
            this.init();
        }
        Container3DTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            //初始化颜色材质
            var cube = new feng3d.CubeObject3D();
            cube.z = 500;
            this.view3D.scene.addChild(cube);
            var colorMaterial = cube.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial();
            var cylinder = new feng3d.CylinderObject3D();
            cylinder.x = 200;
            cube.addChild(cylinder);
            //变化旋转与颜色
            setInterval(function () {
                cube.rotationY += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        };
        return Container3DTest;
    }());
    feng3d.Container3DTest = Container3DTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    var FPSControllerTest = (function () {
        function FPSControllerTest() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        FPSControllerTest.prototype.onMousedown = function () {
            this.controller.target = this.cameraObj;
        };
        FPSControllerTest.prototype.onMouseup = function () {
            this.controller.target = null;
        };
        FPSControllerTest.prototype.process = function () {
            this.controller.update();
            var screenPos = this.view3D.project(sphere.scenePosition);
            console.log("球体视窗坐标" + screenPos.toString());
        };
        FPSControllerTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene3D = this.view3D.scene;
            var cube = new feng3d.CubeObject3D();
            scene3D.addChild(cube);
            var plane = new feng3d.PlaneObject3D();
            plane.setPosition(150, 0, 0);
            plane.rotationX = 90;
            scene3D.addChild(plane);
            sphere = new feng3d.SphereObject3D();
            sphere.setPosition(-150, 0, 0);
            scene3D.addChild(sphere);
            var capsule = new feng3d.CapsuleObject3D();
            capsule.setPosition(300, 0, 0);
            scene3D.addChild(capsule);
            var cylinder = new feng3d.CylinderObject3D();
            cylinder.setPosition(-300, 0, 0);
            scene3D.addChild(cylinder);
        };
        return FPSControllerTest;
    }());
    feng3d.FPSControllerTest = FPSControllerTest;
    var sphere;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var GeometryTest = (function () {
        function GeometryTest() {
            this.init();
        }
        GeometryTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var object3d = new feng3d.GameObject();
            var model = object3d.getOrCreateComponentByClass(feng3d.Model);
            var geometry = model.geometry = new feng3d.Geometry();
            geometry.addGeometry(new feng3d.PlaneGeometry());
            var matrix3D = new feng3d.Matrix3D();
            matrix3D.appendTranslation(0, 50, 0);
            geometry.addGeometry(new feng3d.SphereGeometry(50), matrix3D);
            matrix3D.appendTranslation(0, 50, 0);
            var addGeometry = new feng3d.CubeGeometry();
            geometry.addGeometry(addGeometry, matrix3D);
            addGeometry.width = 50;
            matrix3D.appendTranslation(0, 50, 0);
            matrix3D.appendRotation(45, feng3d.Vector3D.Z_AXIS);
            geometry.addGeometry(addGeometry, matrix3D);
            object3d.z = 300;
            object3d.y = -100;
            this.view3D.scene.addChild(object3d);
            //初始化颜色材质
            var colorMaterial = model.material = new feng3d.ColorMaterial();
            //变化旋转与颜色
            setInterval(function () {
                object3d.rotationY += 1;
            }, 15);
            setInterval(function () {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        };
        return GeometryTest;
    }());
    feng3d.GeometryTest = GeometryTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var MD5LoaderTest = (function () {
        function MD5LoaderTest() {
            this.init();
        }
        MD5LoaderTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            // //变化旋转
            setInterval(function () {
                if (object) {
                    object.rotationY += 1;
                }
            }, 15);
            var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
            var md5animUrl = "resources/hellknight/idle2.md5anim";
            var scene = this.view3D.scene;
            var skeletonAnimator;
            var useMatrial = this.useMatrial;
            var md5Loader = new feng3d.MD5Loader();
            md5Loader.load(md5meshUrl, function (object3D, animator) {
                object3D.y = -100;
                object3D.rotationX = -90;
                object = object3D;
                useMatrial(object3D, "resources/hellknight/hellknight_diffuse.jpg");
                object.z = 300;
                scene.addChild(object3D);
                skeletonAnimator = animator;
                //
                md5Loader.loadAnim(md5animUrl, function (skeletonClipNode) {
                    skeletonClipNode.name = "idle2";
                    skeletonAnimator.animations.push(skeletonClipNode);
                    skeletonClipNode.looping = true;
                    skeletonAnimator.play();
                });
            });
        };
        MD5LoaderTest.prototype.useMatrial = function (object3D, imageUrl) {
            var material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = imageUrl;
            for (var i = 0; i < object3D.numChildren; i++) {
                var child = object3D.getChildAt(i);
                var model = child.getComponentByType(feng3d.Model);
                if (model) {
                    model.material = material;
                }
            }
        };
        return MD5LoaderTest;
    }());
    feng3d.MD5LoaderTest = MD5LoaderTest;
    var object;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    var MousePickTest = (function () {
        function MousePickTest() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        MousePickTest.prototype.onMousedown = function () {
            this.controller.target = this.cameraObj;
        };
        MousePickTest.prototype.onMouseup = function () {
            this.controller.target = null;
        };
        MousePickTest.prototype.process = function () {
            this.controller.update();
        };
        MousePickTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene3D = this.view3D.scene;
            var cube = new feng3d.CubeObject3D();
            cube.setPosition(0, 0, 0);
            cube.mouseEnabled = true;
            scene3D.addChild(cube);
            var plane = new feng3d.PlaneObject3D();
            plane.setPosition(150, 0, 0);
            plane.rotationX = 90;
            plane.mouseEnabled = true;
            scene3D.addChild(plane);
            var sphere = new feng3d.SphereObject3D();
            sphere.setPosition(-150, 0, 0);
            sphere.mouseEnabled = true;
            scene3D.addChild(sphere);
            var capsule = new feng3d.CapsuleObject3D();
            capsule.setPosition(300, 0, 0);
            capsule.mouseEnabled = true;
            scene3D.addChild(capsule);
            var cylinder = new feng3d.CylinderObject3D();
            cylinder.setPosition(-300, 0, 0);
            cylinder.mouseEnabled = true;
            scene3D.addChild(cylinder);
            scene3D.addEventListener(feng3d.Mouse3DEvent.CLICK, this.onMouseClick, this);
        };
        MousePickTest.prototype.onMouseClick = function (event) {
            var object3D = event.target;
            var material = object3D.getComponentByType(feng3d.Model).material = new feng3d.ColorMaterial();
            material.color.fromUnit(Math.random() * (1 << 24));
        };
        return MousePickTest;
    }());
    feng3d.MousePickTest = MousePickTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var OBJParserTest = (function () {
        function OBJParserTest() {
            this.init();
        }
        OBJParserTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            // //变化旋转
            setInterval(function () {
                if (object) {
                    object.rotationY += 1;
                }
            }, 15);
            // var objUrl = "resources/cube.obj";
            var objUrl = "resources/head.obj";
            var scene = this.view3D.scene;
            var objLoader = new feng3d.ObjLoader();
            objLoader.load(objUrl, function (object3D) {
                object = object3D;
                object.scaleX = 20;
                object.scaleY = 20;
                object.scaleZ = 20;
                object.z = 300;
                scene.addChild(object3D);
            });
        };
        return OBJParserTest;
    }());
    feng3d.OBJParserTest = OBJParserTest;
    var object;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ParticleAnimatorTest = (function () {
        function ParticleAnimatorTest() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        ParticleAnimatorTest.prototype.onMousedown = function () {
            this.controller.target = this.cameraObj;
        };
        ParticleAnimatorTest.prototype.onMouseup = function () {
            this.controller.target = null;
        };
        ParticleAnimatorTest.prototype.process = function () {
            this.controller.update();
        };
        ParticleAnimatorTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene = this.view3D.scene;
            var particle = new feng3d.GameObject("particle");
            particle.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.PointGeometry();
            particle.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ParticleMaterial();
            particle.y = -100;
            scene.addChild(particle);
            var particleAnimator = particle.getOrCreateComponentByClass(feng3d.ParticleAnimator);
            particleAnimator.cycle = 10;
            particleAnimator.numParticles = 1000;
            //发射组件
            var emission = new feng3d.ParticleEmission();
            //每秒发射数量
            emission.rate = 50;
            //批量发射
            emission.bursts.push({ time: 1, particles: 100 }, { time: 2, particles: 100 }, { time: 3, particles: 100 }, { time: 4, particles: 100 }, { time: 5, particles: 100 });
            //通过组件来创建粒子初始状态
            particleAnimator.addComponent(emission);
            particleAnimator.addComponent(new feng3d.ParticlePosition());
            particleAnimator.addComponent(new feng3d.ParticleVelocity());
            particleAnimator.particleGlobal.acceleration = new feng3d.Vector3D(0, -9.8, 0);
            //通过函数来创建粒子初始状态
            particleAnimator.generateFunctions.push({
                generate: function (particle) {
                    particle.color = new feng3d.Color(1, 0, 0, 1).mix(new feng3d.Color(0, 1, 0, 1), particle.index / particle.total);
                }, priority: 0
            });
        };
        return ParticleAnimatorTest;
    }());
    feng3d.ParticleAnimatorTest = ParticleAnimatorTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var PointLightTest = (function () {
        function PointLightTest() {
            this.light0 = new feng3d.GameObject("pointLight");
            this.light1 = new feng3d.GameObject("pointLight");
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
            feng3d.input.addEventListener(feng3d.inputType.KEY_UP, this.onKeyUp, this);
        }
        PointLightTest.prototype.onKeyUp = function (event) {
            var boardKey = String.fromCharCode(event.keyCode).toLocaleLowerCase();
            switch (boardKey) {
                case "c":
                    this.clearObjects();
                    break;
                case "b":
                    this.initObjects();
                    this.scene.addChild(this.light0);
                    this.scene.addChild(this.light1);
                    break;
            }
        };
        PointLightTest.prototype.onMousedown = function () {
            this.controller.target = this.cameraObj;
        };
        PointLightTest.prototype.onMouseup = function () {
            this.controller.target = null;
        };
        PointLightTest.prototype.process = function () {
            this.controller.update();
            this.setPointLightPosition();
        };
        PointLightTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            this.scene = this.view3D.scene;
            this.initObjects();
            this.initLights();
            this.setPointLightPosition();
        };
        PointLightTest.prototype.initObjects = function () {
            var material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/head_diffuse.jpg';
            material.normalMethod.normalTexture.url = 'resources/head_normals.jpg';
            material.specularMethod.specularTexture.url = 'resources/head_specular.jpg';
            material.diffuseMethod.difuseTexture.wrapS = feng3d.GL.MIRRORED_REPEAT;
            material.diffuseMethod.difuseTexture.wrapT = feng3d.GL.MIRRORED_REPEAT;
            material.normalMethod.normalTexture.wrapS = feng3d.GL.MIRRORED_REPEAT;
            material.normalMethod.normalTexture.wrapT = feng3d.GL.MIRRORED_REPEAT;
            material.specularMethod.specularTexture.wrapS = feng3d.GL.MIRRORED_REPEAT;
            material.specularMethod.specularTexture.wrapT = feng3d.GL.MIRRORED_REPEAT;
            //初始化立方体
            var plane = new feng3d.GameObject();
            plane.y = -100;
            var model = plane.getOrCreateComponentByClass(feng3d.Model);
            var geometry = model.geometry = new feng3d.PlaneGeometry(1000, 1000);
            geometry.scaleUV(2, 2);
            model.material = material;
            this.scene.addChild(plane);
            var cube = new feng3d.GameObject();
            var model = cube.getOrCreateComponentByClass(feng3d.Model);
            model.material = material;
            model.geometry = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
            model.geometry.scaleUV(2, 2);
            this.scene.addChild(cube);
        };
        PointLightTest.prototype.clearObjects = function () {
            for (var i = this.scene.numChildren - 1; i >= 0; i--) {
                this.scene.removeChildAt(i);
            }
        };
        PointLightTest.prototype.initLights = function () {
            //
            var lightColor0 = new feng3d.Color(1, 0, 0, 1);
            this.light0.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.SphereGeometry(5);
            this.light0.getOrCreateComponentByClass(feng3d.Model);
            //初始化点光源
            var pointLight0 = new feng3d.PointLight();
            pointLight0.color = lightColor0;
            this.light0.addComponent(pointLight0);
            this.light0.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial(lightColor0);
            this.scene.addChild(this.light0);
            //
            var lightColor1 = new feng3d.Color(0, 1, 0, 1);
            this.light1.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.SphereGeometry(5);
            this.light1.getOrCreateComponentByClass(feng3d.Model);
            //初始化点光源
            var pointLight1 = new feng3d.DirectionalLight();
            pointLight1.color = lightColor1;
            this.light1.addComponent(pointLight1);
            this.light1.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.ColorMaterial(lightColor1);
            this.scene.addChild(this.light1);
        };
        PointLightTest.prototype.setPointLightPosition = function () {
            var time = new Date().getTime();
            //
            var angle = time / 1000;
            this.light0.x = Math.sin(angle) * 300;
            this.light0.z = Math.cos(angle) * 300;
            //
            angle = angle + Math.PI / 2;
            this.light1.x = Math.sin(angle) * 300;
            this.light1.z = Math.cos(angle) * 300;
            this.light1.lookAt(new feng3d.Vector3D());
        };
        return PointLightTest;
    }());
    feng3d.PointLightTest = PointLightTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var PointMaterialTest = (function () {
        function PointMaterialTest() {
            this.init();
        }
        PointMaterialTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var pointGeometry = new feng3d.PointGeometry();
            var pointMaterial = new feng3d.PointMaterial();
            var object3D = new feng3d.GameObject("plane");
            object3D.getOrCreateComponentByClass(feng3d.Model).geometry = pointGeometry;
            object3D.getOrCreateComponentByClass(feng3d.Model).material = pointMaterial;
            object3D.z = 300;
            this.view3D.scene.addChild(object3D);
            var length = 200;
            var height = 200 / Math.PI;
            for (var x = -length; x <= length; x = x + 4) {
                var angle = x / length * Math.PI;
                var vec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
                pointGeometry.addPoint(new feng3d.PointInfo(vec));
            }
            //变化旋转
            setInterval(function () {
                object3D.rotationY += 1;
                pointMaterial.pointSize = 1 + 5 * Math.sin(object3D.rotationY / 30);
            }, 15);
        };
        return PointMaterialTest;
    }());
    feng3d.PointMaterialTest = PointMaterialTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var PrimitiveTest = (function () {
        function PrimitiveTest() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.controller = new feng3d.LookAtController(this.cameraObj);
            this.controller.lookAtPosition = new feng3d.Vector3D();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
        }
        PrimitiveTest.prototype.process = function () {
            var time = new Date().getTime();
            var angle = (Math.round(time / 17) % 360);
            angle = angle * feng3d.MathConsts.DEGREES_TO_RADIANS;
            this.cameraObj.setPosition(1000 * Math.sin(angle), 0, 1000 * Math.cos(angle));
            this.controller.update();
        };
        PrimitiveTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene3D = this.view3D.scene;
            var cube = new feng3d.CubeObject3D();
            cube.setPosition(0, 0, 0);
            scene3D.addChild(cube);
            var plane = new feng3d.PlaneObject3D();
            plane.setPosition(150, 0, 0);
            plane.rotationX = 90;
            scene3D.addChild(plane);
            var sphere = new feng3d.SphereObject3D();
            sphere.setPosition(-150, 0, 0);
            scene3D.addChild(sphere);
            var capsule = new feng3d.CapsuleObject3D();
            capsule.setPosition(300, 0, 0);
            scene3D.addChild(capsule);
            var cylinder = new feng3d.CylinderObject3D();
            cylinder.setPosition(-300, 0, 0);
            scene3D.addChild(cylinder);
        };
        return PrimitiveTest;
    }());
    feng3d.PrimitiveTest = PrimitiveTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var SceneLoadTest = (function () {
        function SceneLoadTest() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        SceneLoadTest.prototype.onMousedown = function () {
            this.controller.target = this.cameraObj;
        };
        SceneLoadTest.prototype.onMouseup = function () {
            this.controller.target = null;
        };
        SceneLoadTest.prototype.process = function () {
            this.controller.update();
        };
        SceneLoadTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene3D = this.view3D.scene;
            var loader = new feng3d.Loader();
            loader.addEventListener(feng3d.LoaderEvent.COMPLETE, function () {
                var json = JSON.parse(loader.content);
                var scene = feng3d.serialization.readObject(json);
                for (var i = 0; i < scene.numChildren; i++) {
                    scene3D.addChild(scene.getChildAt(i));
                }
            }, this);
            loader.loadText("resources/scene/scene.json");
        };
        return SceneLoadTest;
    }());
    feng3d.SceneLoadTest = SceneLoadTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var SegmentMaterialTest = (function () {
        function SegmentMaterialTest() {
            this.init();
        }
        SegmentMaterialTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var segment = new feng3d.GameObject("segment");
            segment.z = 300;
            this.view3D.scene.addChild(segment);
            //初始化材质
            segment.getOrCreateComponentByClass(feng3d.Model).material = new feng3d.SegmentMaterial();
            var segmentGeometry = segment.getOrCreateComponentByClass(feng3d.Model).geometry = new feng3d.SegmentGeometry();
            var length = 200;
            var height = 200 / Math.PI;
            var preVec;
            for (var x = -length; x <= length; x++) {
                var angle = x / length * Math.PI;
                if (preVec == null) {
                    preVec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
                }
                else {
                    var vec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
                    segmentGeometry.addSegment(new feng3d.Segment(preVec, vec));
                    preVec = vec;
                }
            }
            //变化旋转
            setInterval(function () {
                segment.rotationY += 1;
            }, 15);
        };
        return SegmentMaterialTest;
    }());
    feng3d.SegmentMaterialTest = SegmentMaterialTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var SkyBoxTest = (function () {
        function SkyBoxTest() {
            this.init();
            this.cameraObj = this.view3D.camera;
            this.cameraObj.z = -500;
            this.cameraObj.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
            feng3d.input.addEventListener("mousedown", this.onMousedown, this);
            feng3d.input.addEventListener("mouseup", this.onMouseup, this);
        }
        SkyBoxTest.prototype.onMousedown = function () {
            this.controller.target = this.cameraObj;
        };
        SkyBoxTest.prototype.onMouseup = function () {
            this.controller.target = null;
        };
        SkyBoxTest.prototype.process = function () {
            this.controller.update();
        };
        SkyBoxTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene = this.view3D.scene;
            var root = 'resources/skybox/';
            var imagePaths = ['px.jpg', 'py.jpg', 'pz.jpg', 'nx.jpg', 'ny.jpg', 'nz.jpg'];
            for (var i = 0; i < imagePaths.length; i++) {
                imagePaths[i] = root + imagePaths[i];
            }
            var skybox = new feng3d.GameObject("skybox");
            var model = skybox.getOrCreateComponentByClass(feng3d.Model);
            model.geometry = new feng3d.SkyBoxGeometry();
            model.material = new feng3d.SkyBoxMaterial(imagePaths);
            scene.addChild(skybox);
        };
        return SkyBoxTest;
    }());
    feng3d.SkyBoxTest = SkyBoxTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var StandardMaterialTest = (function () {
        function StandardMaterialTest() {
            this.init();
        }
        StandardMaterialTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var cube = new feng3d.GameObject();
            cube.z = 300;
            cube.y = -100;
            this.view3D.scene.addChild(cube);
            //变化旋转与颜色
            setInterval(function () {
                cube.rotationY += 1;
            }, 15);
            var model = cube.getOrCreateComponentByClass(feng3d.Model);
            model.geometry = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
            // model.geometry = new PlaneGeometry();
            //材质
            var textureMaterial = model.material = new feng3d.StandardMaterial();
            // textureMaterial.diffuseMethod.difuseTexture.url = 'resources/m.png';
            textureMaterial.diffuseMethod.difuseTexture.url = 'resources/nonpowerof2.png';
            textureMaterial.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
            // textureMaterial.diffuseMethod.alphaThreshold = 0.1;
            // textureMaterial.diffuseMethod.difuseTexture.anisotropy = 16;
            // textureMaterial.enableBlend = true;
            textureMaterial.diffuseMethod.color.a = 0.2;
        };
        return StandardMaterialTest;
    }());
    feng3d.StandardMaterialTest = StandardMaterialTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var TerrainTest = (function () {
        function TerrainTest() {
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
        TerrainTest.prototype.onMousedown = function () {
            this.controller.target = this.cameraObj;
        };
        TerrainTest.prototype.onMouseup = function () {
            this.controller.target = null;
        };
        TerrainTest.prototype.process = function () {
            this.controller.update();
        };
        TerrainTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var scene = this.view3D.scene;
            var root = 'resources/terrain/';
            //
            var terrain = new feng3d.GameObject("terrain");
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
        };
        return TerrainTest;
    }());
    feng3d.TerrainTest = TerrainTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var TextureMaterialTest = (function () {
        function TextureMaterialTest() {
            this.init();
        }
        TextureMaterialTest.prototype.init = function () {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new feng3d.View3D(canvas);
            var cube = new feng3d.GameObject();
            cube.z = 300;
            cube.y = -100;
            this.view3D.scene.addChild(cube);
            //变化旋转与颜色
            setInterval(function () {
                cube.rotationY += 1;
            }, 15);
            var model = cube.getOrCreateComponentByClass(feng3d.Model);
            model.geometry = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
            // model.geometry = new PlaneGeometry();
            //材质
            var textureMaterial = model.material = new feng3d.TextureMaterial();
            //
            // var texture = textureMaterial.texture = new Texture2D('resources/sky.jpg');
            var texture = textureMaterial.texture = new feng3d.Texture2D('resources/m.png');
            texture.flipY = false;
        };
        return TextureMaterialTest;
    }());
    feng3d.TextureMaterialTest = TextureMaterialTest;
})(feng3d || (feng3d = {}));
var editor;
var jsCtrl, select, type;
function init() {
    jsCtrl = document.getElementById("jsCtrl");
    select = document.getElementById("select");
    type = GetQueryString("type");
    type = type || "PrimitiveTest";
    select.value = type;
    new feng3d[type]();
    document.onkeyup = function (e) {
        var keycode = e.which;
        if (keycode == 37) {
            if (select.selectedIndex > 0)
                select.selectedIndex--;
            else
                select.selectedIndex = select.options.length - 1;
        }
        else if (keycode == 39) {
            if (select.selectedIndex < select.options.length - 1)
                select.selectedIndex++;
            else
                select.selectedIndex = 0;
        }
        selectChanged();
    };
}
function selectChanged() {
    if (type != select.value) {
        window.location.href = window.location.pathname + "?type=" + select.value;
    }
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    return null;
}
//# sourceMappingURL=examples.js.map