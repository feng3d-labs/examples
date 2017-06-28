var feng3d;
(function (feng3d) {
    var BillboardTest = (function () {
        function BillboardTest() {
            this.init();
            //
            this.controller = new feng3d.FPSController(this.view3D.camera.gameObject);
        }
        BillboardTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene = this.view3D.scene;
            scene.background.setTo(0.3, 0.3, 0.3);
            var cube = feng3d.GameObjectFactory.createCube();
            cube.transform.z = 300;
            scene.transform.addChild(cube.transform);
            var gameObject = feng3d.GameObjectFactory.createPlane();
            gameObject.transform.y = 150;
            gameObject.transform.isBillboard = true;
            gameObject.transform.holdSize = 1;
            cube.transform.addChild(gameObject.transform);
            //材质
            var model = gameObject.getComponent(feng3d.MeshRenderer);
            gameObject.getComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(100, 100, 1, 1, false);
            var textureMaterial = model.material = new feng3d.TextureMaterial();
            //
            // var texture = textureMaterial.texture = new Texture2D('resources/m.png');
            var texture = textureMaterial.texture = new feng3d.Texture2D();
            var canvas2D = document.createElement("canvas");
            canvas2D.width = 300;
            canvas2D.height = 150;
            var context2D = canvas2D.getContext("2d");
            // context2D.fillStyle = "red";
            // context2D.fillRect(0, 0, canvas2D.width, canvas2D.height);
            context2D.fillStyle = "green";
            context2D.font = '48px serif';
            // context2D.fillText('Hello world', 50, 100);
            context2D.fillText('Hello world', 0, 50);
            // context2D.strokeText('Hello world', 50, 100);
            var imageData = context2D.getImageData(0, 0, canvas2D.width, canvas2D.height);
            texture.pixels = imageData;
            // gameObject.holdSize = 1;
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
            this.view3D = new feng3d.View3D();
            var cube = feng3d.GameObjectFactory.createCube();
            cube.transform.z = 300;
            this.view3D.scene.transform.addChild(cube.transform);
            //初始化颜色材质
            var colorMaterial = cube.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
            //变化旋转与颜色
            setInterval(function () {
                cube.transform.rotationY += 1;
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
            this.view3D = new feng3d.View3D();
            //初始化颜色材质
            var cube = feng3d.GameObjectFactory.createCube();
            cube.transform.z = 500;
            this.view3D.scene.transform.addChild(cube.transform);
            var colorMaterial = cube.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
            var cylinder = feng3d.GameObjectFactory.createCylinder();
            cylinder.transform.x = 200;
            cube.transform.addChild(cylinder.transform);
            //变化旋转与颜色
            setInterval(function () {
                cube.transform.rotationY += 1;
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
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.camera.gameObject);
            //
            this.process();
            setInterval(this.process.bind(this), 17);
        }
        FPSControllerTest.prototype.process = function () {
            var screenPos = this.view3D.project(sphere.transform.scenePosition);
            console.log("球体视窗坐标" + screenPos.toString());
        };
        FPSControllerTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene3D = this.view3D.scene;
            var cube = feng3d.GameObjectFactory.createCube();
            scene3D.transform.addChild(cube.transform);
            var plane = feng3d.GameObjectFactory.createPlane();
            plane.transform.setPosition(150, 0, 0);
            plane.transform.rotationX = 90;
            scene3D.transform.addChild(plane.transform);
            sphere = feng3d.GameObjectFactory.createSphere();
            sphere.transform.setPosition(-150, 0, 0);
            scene3D.transform.addChild(sphere.transform);
            var capsule = feng3d.GameObjectFactory.createCapsule();
            capsule.transform.setPosition(300, 0, 0);
            scene3D.transform.addChild(capsule.transform);
            var cylinder = feng3d.GameObjectFactory.createCylinder();
            cylinder.transform.setPosition(-300, 0, 0);
            scene3D.transform.addChild(cylinder.transform);
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
            this.view3D = new feng3d.View3D();
            var object3d = feng3d.GameObject.create();
            var model = object3d.addComponent(feng3d.MeshRenderer);
            var geometry = object3d.addComponent(feng3d.MeshFilter).mesh = new feng3d.Geometry();
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
            object3d.transform.z = 300;
            object3d.transform.y = -100;
            this.view3D.scene.transform.addChild(object3d.transform);
            //初始化颜色材质
            var colorMaterial = model.material = new feng3d.ColorMaterial();
            //变化旋转与颜色
            setInterval(function () {
                object3d.transform.rotationY += 1;
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
            this.view3D = new feng3d.View3D();
            // //变化旋转
            setInterval(function () {
                if (object) {
                    object.transform.rotationY += 1;
                }
            }, 15);
            var md5meshUrl = "resources/hellknight/hellknight.md5mesh";
            var md5animUrl = "resources/hellknight/idle2.md5anim";
            var scene = this.view3D.scene;
            var skeletonAnimator;
            var useMatrial = this.useMatrial;
            var md5Loader = new feng3d.MD5Loader();
            md5Loader.load(md5meshUrl, function (object3D, animator) {
                object3D.transform.y = -100;
                object3D.transform.rotationX = -90;
                object = object3D;
                useMatrial(object3D, "resources/hellknight/hellknight_diffuse.jpg");
                object.transform.z = 300;
                scene.transform.addChild(object3D.transform);
                skeletonAnimator = animator;
                //
                md5Loader.loadAnim(md5animUrl, function (skeletonClipNode) {
                    skeletonClipNode.name = "idle2";
                    skeletonAnimator.animations.push(skeletonClipNode);
                    skeletonClipNode.looping = true;
                    skeletonAnimator.play();
                });
            });
            //初始化光源
            var light1 = feng3d.GameObject.create();
            var pointLight1 = light1.addComponent(feng3d.PointLight);
            pointLight1.color = new feng3d.Color(0, 1, 0, 1);
            scene.transform.addChild(light1.transform);
        };
        MD5LoaderTest.prototype.useMatrial = function (object3D, imageUrl) {
            var material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = imageUrl;
            for (var i = 0; i < object3D.transform.childCount; i++) {
                var child = object3D.transform.getChildAt(i);
                var model = child.getComponent(feng3d.MeshRenderer);
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
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.camera.gameObject);
        }
        MousePickTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene3D = this.view3D.scene;
            var cube = feng3d.GameObjectFactory.createCube();
            cube.transform.mouseEnabled = true;
            scene3D.transform.addChild(cube.transform);
            var plane = feng3d.GameObjectFactory.createPlane();
            plane.transform.setPosition(150, 0, 0);
            plane.transform.rotationX = 90;
            plane.transform.mouseEnabled = true;
            scene3D.transform.addChild(plane.transform);
            var sphere = feng3d.GameObjectFactory.createSphere();
            sphere.transform.setPosition(-150, 0, 0);
            sphere.transform.mouseEnabled = true;
            scene3D.transform.addChild(sphere.transform);
            var capsule = feng3d.GameObjectFactory.createCapsule();
            capsule.transform.setPosition(300, 0, 0);
            capsule.transform.mouseEnabled = true;
            scene3D.transform.addChild(capsule.transform);
            var cylinder = feng3d.GameObjectFactory.createCylinder();
            cylinder.transform.setPosition(-300, 0, 0);
            cylinder.transform.mouseEnabled = true;
            scene3D.transform.addChild(cylinder.transform);
            scene3D.transform.addEventListener(feng3d.Mouse3DEvent.CLICK, this.onMouseClick, this);
        };
        MousePickTest.prototype.onMouseClick = function (event) {
            var object3D = event.target;
            var material = object3D.getComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial();
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
            this.view3D = new feng3d.View3D();
            // //变化旋转
            setInterval(function () {
                if (object) {
                    object.transform.rotationY += 1;
                }
            }, 15);
            // var objUrl = "resources/cube.obj";
            var objUrl = "resources/head.obj";
            var scene = this.view3D.scene;
            var material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = "resources/head_diffuse.jpg";
            material.normalMethod.normalTexture.url = "resources/head_normals.jpg";
            material.specularMethod.specularTexture.url = "resources/head_specular.jpg";
            // var material = new ColorMaterial();
            var objLoader = new feng3d.ObjLoader();
            objLoader.load(objUrl, material, function (object3D) {
                object = object3D;
                object.transform.scaleX = 20;
                object.transform.scaleY = 20;
                object.transform.scaleZ = 20;
                object.transform.z = 300;
                scene.transform.addChild(object3D.transform);
            });
            //初始化光源
            var light1 = feng3d.GameObject.create();
            var pointLight1 = light1.addComponent(feng3d.PointLight);
            pointLight1.color = new feng3d.Color(0, 1, 0, 1);
            scene.transform.addChild(light1.transform);
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
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.view3D.camera.gameObject);
        }
        ParticleAnimatorTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene = this.view3D.scene;
            var particle = feng3d.GameObject.create("particle");
            particle.addComponent(feng3d.MeshFilter).mesh = new feng3d.PointGeometry();
            var material = particle.addComponent(feng3d.MeshRenderer).material = new feng3d.StandardMaterial();
            material.renderMode = feng3d.RenderMode.POINTS;
            particle.transform.y = -100;
            scene.transform.addChild(particle.transform);
            var particleAnimator = particle.addComponent(feng3d.ParticleAnimator);
            particleAnimator.cycle = 10;
            var particleAnimatorSet = particleAnimator.animatorSet = new feng3d.ParticleAnimationSet();
            particleAnimatorSet.numParticles = 1000;
            //发射组件
            var emission = new feng3d.ParticleEmission();
            //每秒发射数量
            emission.rate = 50;
            //批量发射
            emission.bursts.push({ time: 1, particles: 100 }, { time: 2, particles: 100 }, { time: 3, particles: 100 }, { time: 4, particles: 100 }, { time: 5, particles: 100 });
            //通过组件来创建粒子初始状态
            particleAnimatorSet.addAnimation(emission);
            particleAnimatorSet.addAnimation(new feng3d.ParticlePosition());
            particleAnimatorSet.addAnimation(new feng3d.ParticleVelocity());
            particleAnimatorSet.setGlobal("acceleration", function () { return feng3d.acceleration; });
            //通过函数来创建粒子初始状态
            particleAnimatorSet.generateFunctions.push({
                generate: function (particle) {
                    particle.color = new feng3d.Color(1, 0, 0, 1).mix(new feng3d.Color(0, 1, 0, 1), particle.index / particle.total);
                }, priority: 0
            });
            particleAnimator.play();
        };
        return ParticleAnimatorTest;
    }());
    feng3d.ParticleAnimatorTest = ParticleAnimatorTest;
    feng3d.acceleration = new feng3d.Vector3D(0, -9.8, 0);
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var PointLightTest = (function () {
        function PointLightTest() {
            this.light0 = feng3d.GameObject.create("pointLight");
            this.light1 = feng3d.GameObject.create("pointLight");
            this.init();
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.y = 200;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.view3D.camera.gameObject);
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
                    this.scene.transform.addChild(this.light0.transform);
                    this.scene.transform.addChild(this.light1.transform);
                    break;
            }
        };
        PointLightTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            this.scene = this.view3D.scene;
            this.initObjects();
            this.initLights();
            feng3d.ticker.addEventListener(feng3d.Event.ENTER_FRAME, this.setPointLightPosition, this);
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
            var plane = feng3d.GameObject.create();
            plane.transform.y = -100;
            var model = plane.addComponent(feng3d.MeshRenderer);
            var geometry = plane.addComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(1000, 1000);
            geometry.scaleUV(2, 2);
            model.material = material;
            this.scene.transform.addChild(plane.transform);
            var cube = feng3d.GameObject.create();
            var model = cube.addComponent(feng3d.MeshRenderer);
            model.material = material;
            cube.addComponent(feng3d.MeshFilter).mesh = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
            cube.getComponent(feng3d.MeshFilter).mesh.scaleUV(2, 2);
            this.scene.transform.addChild(cube.transform);
        };
        PointLightTest.prototype.clearObjects = function () {
            for (var i = this.scene.transform.childCount - 1; i >= 0; i--) {
                this.scene.transform.removeChildAt(i);
            }
        };
        PointLightTest.prototype.initLights = function () {
            //
            var lightColor0 = new feng3d.Color(1, 0, 0, 1);
            this.light0.addComponent(feng3d.MeshFilter).mesh = new feng3d.SphereGeometry(5);
            //初始化点光源
            var pointLight0 = this.light0.addComponent(feng3d.PointLight);
            pointLight0.color = lightColor0;
            this.light0.addComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial(lightColor0);
            this.scene.transform.addChild(this.light0.transform);
            //
            var lightColor1 = new feng3d.Color(0, 1, 0, 1);
            this.light1.addComponent(feng3d.MeshFilter).mesh = new feng3d.SphereGeometry(5);
            //初始化点光源
            var pointLight1 = this.light1.addComponent(feng3d.DirectionalLight);
            pointLight1.color = lightColor1;
            this.light1.addComponent(feng3d.MeshRenderer).material = new feng3d.ColorMaterial(lightColor1);
            this.scene.transform.addChild(this.light1.transform);
        };
        PointLightTest.prototype.setPointLightPosition = function () {
            var time = new Date().getTime();
            //
            var angle = time / 1000;
            this.light0.transform.x = Math.sin(angle) * 300;
            this.light0.transform.z = Math.cos(angle) * 300;
            //
            angle = angle + Math.PI / 2;
            this.light1.transform.x = Math.sin(angle) * 300;
            this.light1.transform.z = Math.cos(angle) * 300;
            this.light1.transform.lookAt(new feng3d.Vector3D());
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
            this.view3D = new feng3d.View3D();
            var pointGeometry = new feng3d.PointGeometry();
            var pointMaterial = new feng3d.PointMaterial();
            var object3D = feng3d.GameObject.create("plane");
            object3D.addComponent(feng3d.MeshFilter).mesh = pointGeometry;
            object3D.addComponent(feng3d.MeshRenderer).material = pointMaterial;
            object3D.transform.z = 300;
            this.view3D.scene.transform.addChild(object3D.transform);
            var length = 200;
            var height = 200 / Math.PI;
            for (var x = -length; x <= length; x = x + 4) {
                var angle = x / length * Math.PI;
                var vec = new feng3d.Vector3D(x, Math.sin(angle) * height, 0);
                pointGeometry.addPoint(new feng3d.PointInfo(vec));
            }
            //变化旋转
            setInterval(function () {
                object3D.transform.rotationY += 1;
                pointMaterial.pointSize = 1 + 5 * Math.sin(object3D.transform.rotationY / 30);
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
            this.camera = this.view3D.camera;
            this.controller = new feng3d.LookAtController(this.camera.gameObject);
            this.controller.lookAtPosition = new feng3d.Vector3D();
            //
            this.process();
            setInterval(this.process.bind(this), 17);
        }
        PrimitiveTest.prototype.process = function () {
            var time = new Date().getTime();
            var angle = (Math.round(time / 17) % 360);
            angle = angle * Math.DEG2RAD;
            this.camera.transform.setPosition(1000 * Math.sin(angle), 0, 1000 * Math.cos(angle));
            this.controller.update();
        };
        PrimitiveTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene3D = this.view3D.scene;
            var cube = feng3d.GameObjectFactory.createCube();
            scene3D.transform.addChild(cube.transform);
            var plane = feng3d.GameObjectFactory.createPlane();
            plane.transform.setPosition(150, 0, 0);
            plane.transform.rotationX = 90;
            scene3D.transform.addChild(plane.transform);
            var sphere = feng3d.GameObjectFactory.createSphere();
            sphere.transform.setPosition(-150, 0, 0);
            scene3D.transform.addChild(sphere.transform);
            var capsule = feng3d.GameObjectFactory.createCapsule();
            capsule.transform.setPosition(300, 0, 0);
            scene3D.transform.addChild(capsule.transform);
            var cylinder = feng3d.GameObjectFactory.createCylinder();
            cylinder.transform.setPosition(-300, 0, 0);
            scene3D.transform.addChild(cylinder.transform);
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
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.view3D.camera.gameObject);
        }
        SceneLoadTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene3D = this.view3D.scene;
            var loader = new feng3d.Loader();
            loader.addEventListener(feng3d.LoaderEvent.COMPLETE, function () {
                var json = JSON.parse(loader.content);
                var scene = feng3d.serialization.readObject(json);
                for (var i = 0; i < scene.transform.childCount; i++) {
                    scene3D.transform.addChild(scene.transform.getChildAt(i));
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
            this.view3D = new feng3d.View3D();
            var segment = feng3d.GameObject.create("segment");
            segment.transform.z = 300;
            this.view3D.scene.transform.addChild(segment.transform);
            //初始化材质
            segment.addComponent(feng3d.MeshRenderer).material = new feng3d.SegmentMaterial();
            var segmentGeometry = segment.addComponent(feng3d.MeshFilter).mesh = new feng3d.SegmentGeometry();
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
                segment.transform.rotationY += 1;
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
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.view3D.camera.gameObject);
        }
        SkyBoxTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene = this.view3D.scene;
            var skybox = feng3d.GameObject.create("skybox");
            var model = skybox.addComponent(feng3d.MeshRenderer);
            skybox.addComponent(feng3d.MeshFilter).mesh = new feng3d.SkyBoxGeometry();
            model.material = new feng3d.SkyBoxMaterial([
                'resources/skybox/px.jpg',
                'resources/skybox/py.jpg',
                'resources/skybox/pz.jpg',
                'resources/skybox/nx.jpg',
                'resources/skybox/ny.jpg',
                'resources/skybox/nz.jpg'
            ]);
            scene.transform.addChild(skybox.transform);
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
            this.view3D = new feng3d.View3D();
            var cube = feng3d.GameObject.create();
            cube.transform.z = 300;
            cube.transform.y = -100;
            this.view3D.scene.transform.addChild(cube.transform);
            //变化旋转与颜色
            setInterval(function () {
                cube.transform.rotationY += 1;
            }, 15);
            var model = cube.addComponent(feng3d.MeshRenderer);
            cube.addComponent(feng3d.MeshFilter).mesh = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
            // model.geometry = new PlaneGeometry();
            //材质
            var textureMaterial = model.material = new feng3d.StandardMaterial();
            textureMaterial.diffuseMethod.difuseTexture.url = 'resources/m.png';
            // textureMaterial.diffuseMethod.difuseTexture.url = 'resources/nonpowerof2.png';
            textureMaterial.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
            // textureMaterial.diffuseMethod.alphaThreshold = 0.1;
            textureMaterial.diffuseMethod.difuseTexture.anisotropy = 16;
            textureMaterial.enableBlend = true;
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
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.y = 200;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.camera.gameObject);
            feng3d.ticker.addEventListener(feng3d.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
        TerrainTest.prototype.onEnterFrame = function () {
            var time = new Date().getTime();
            var angle = time / 1000;
            this.light1.transform.x = Math.sin(angle) * 300;
            this.light1.transform.z = Math.cos(angle) * 300;
        };
        TerrainTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene = this.view3D.scene;
            var root = 'resources/terrain/';
            //
            var terrain = feng3d.GameObject.create("terrain");
            terrain.addComponent(feng3d.MeshFilter).mesh = new feng3d.TerrainGeometry(root + 'terrain_heights.jpg');
            var material = new feng3d.StandardMaterial(root + 'terrain_diffuse.jpg', root + "terrain_normals.jpg");
            var terrainMethod = new feng3d.TerrainMethod(root + 'terrain_splats.png', [root + 'beach.jpg', root + 'grass.jpg', root + 'rock.jpg'], new feng3d.Vector3D(1, 50, 50, 50));
            material.addMethod(terrainMethod);
            terrain.addComponent(feng3d.MeshRenderer).material = material;
            scene.transform.addChild(terrain.transform);
            //初始化光源
            var light1 = this.light1 = feng3d.GameObject.create();
            var pointLight1 = light1.addComponent(feng3d.PointLight);
            // pointLight1.range = 1000;
            pointLight1.color = new feng3d.Color(1, 1, 0, 1);
            light1.transform.y = 300;
            // scene.transform.addChild(light1);
        };
        return TerrainTest;
    }());
    feng3d.TerrainTest = TerrainTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var TerrainMergeTest = (function () {
        function TerrainMergeTest() {
            this.init();
            this.camera = this.view3D.camera;
            this.camera.transform.z = -500;
            this.camera.transform.y = 200;
            this.camera.transform.lookAt(new feng3d.Vector3D());
            //
            this.controller = new feng3d.FPSController(this.camera.gameObject);
            feng3d.ticker.addEventListener(feng3d.Event.ENTER_FRAME, this.onEnterFrame, this);
        }
        TerrainMergeTest.prototype.onEnterFrame = function () {
            var time = new Date().getTime();
            var angle = time / 1000;
            this.light1.transform.x = Math.sin(angle) * 300;
            this.light1.transform.z = Math.cos(angle) * 300;
        };
        TerrainMergeTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var scene = this.view3D.scene;
            var root = 'resources/terrain/';
            //
            var terrain = feng3d.GameObject.create("terrain");
            terrain.addComponent(feng3d.MeshFilter).mesh = new feng3d.TerrainGeometry(root + 'terrain_heights.jpg');
            var material = new feng3d.StandardMaterial(root + 'terrain_diffuse.jpg', root + "terrain_normals.jpg");
            // var terrainMethod = new TerrainMergeMethod(root + 'terrain_splats.png',root + 'test3.jpg',new Vector3D(50, 50, 50));
            var terrainMethod = new feng3d.TerrainMergeMethod(root + 'terrain_splats.png', root + 'test1.jpg', new feng3d.Vector3D(50, 50, 50));
            material.addMethod(terrainMethod);
            terrain.addComponent(feng3d.MeshRenderer).material = material;
            scene.transform.addChild(terrain.transform);
            //初始化光源
            var light1 = this.light1 = feng3d.GameObject.create();
            var pointLight1 = light1.addComponent(feng3d.PointLight);
            // pointLight1.range = 1000;
            pointLight1.color = new feng3d.Color(1, 1, 0, 1);
            light1.transform.y = 300;
            // scene.transform.addChild(light1);
        };
        return TerrainMergeTest;
    }());
    feng3d.TerrainMergeTest = TerrainMergeTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var TextureMaterialTest = (function () {
        function TextureMaterialTest() {
            this.init();
        }
        TextureMaterialTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var cube = feng3d.GameObject.create();
            cube.transform.z = 300;
            cube.transform.y = -100;
            this.view3D.scene.transform.addChild(cube.transform);
            //变化旋转与颜色
            setInterval(function () {
                cube.transform.rotationY += 1;
            }, 15);
            var model = cube.addComponent(feng3d.MeshRenderer);
            cube.addComponent(feng3d.MeshFilter).mesh = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
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
var feng3d;
(function (feng3d) {
    var FogTest = (function () {
        function FogTest() {
            this.init();
        }
        FogTest.prototype.init = function () {
            this.view3D = new feng3d.View3D();
            var cube = feng3d.GameObject.create();
            cube.transform.z = 300;
            cube.transform.y = -100;
            this.view3D.scene.transform.addChild(cube.transform);
            //变化旋转与颜色
            setInterval(function () {
                cube.transform.rotationY += 1;
            }, 15);
            var model = cube.addComponent(feng3d.MeshRenderer);
            cube.addComponent(feng3d.MeshFilter).mesh = new feng3d.CubeGeometry(100, 100, 100, 1, 1, 1, false);
            //材质
            var material = model.material = new feng3d.StandardMaterial();
            material.diffuseMethod.difuseTexture.url = 'resources/m.png';
            var fogMethod = new feng3d.FogMethod(new feng3d.Color(1, 1, 0), 200, 300);
            material.addMethod(fogMethod);
        };
        return FogTest;
    }());
    feng3d.FogTest = FogTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var Basic_SkyBox = (function () {
        function Basic_SkyBox() {
            var view3D = this._view = new feng3d.View3D();
            var scene = view3D.scene;
            var cubeTexture = new feng3d.TextureCube([
                // 'resources/skybox/px.jpg',
                // 'resources/skybox/py.jpg',
                // 'resources/skybox/pz.jpg',
                // 'resources/skybox/nx.jpg',
                // 'resources/skybox/ny.jpg',
                // 'resources/skybox/nz.jpg',
                'resources/skybox/snow_positive_x.jpg',
                'resources/skybox/snow_positive_y.jpg',
                'resources/skybox/snow_positive_z.jpg',
                'resources/skybox/snow_negative_x.jpg',
                'resources/skybox/snow_negative_y.jpg',
                'resources/skybox/snow_negative_z.jpg',
            ]);
            var skybox = feng3d.GameObject.create("skybox");
            var model = skybox.addComponent(feng3d.MeshRenderer);
            skybox.addComponent(feng3d.MeshFilter).mesh = new feng3d.SkyBoxGeometry();
            var material = model.material = new feng3d.SkyBoxMaterial();
            material.texture = cubeTexture;
            scene.transform.addChild(skybox.transform);
            var camera = this.camera = view3D.camera;
            camera.transform.z = -600;
            camera.transform.lookAt(new feng3d.Vector3D());
            camera.lens = new feng3d.PerspectiveLens(90);
            var torusMaterial = new feng3d.StandardMaterial();
            torusMaterial.specularMethod.specular = 0.5;
            torusMaterial.ambientMethod.color.fromUnit(0x111111);
            torusMaterial.ambientMethod.color.a = 0.25;
            torusMaterial.addMethod(new feng3d.EnvMapMethod(cubeTexture, 1));
            var torus = this._torus = feng3d.GameObject.create("torus");
            var model = torus.addComponent(feng3d.MeshRenderer);
            torus.addComponent(feng3d.MeshFilter).mesh = new feng3d.TorusGeometry(150, 60, 40, 20);
            model.material = torusMaterial;
            scene.transform.addChild(torus.transform);
            feng3d.ticker.addEventListener(feng3d.Event.ENTER_FRAME, this._onEnterFrame, this);
        }
        Basic_SkyBox.prototype._onEnterFrame = function (e) {
            this._torus.transform.rotationX += 2;
            this._torus.transform.rotationY += 1;
            this.camera.transform.setPosition(0, 0, 0);
            this.camera.transform.rotationY += 0.5 * (this._view.mousePos.x - this._view.width / 2) / 800;
            this.camera.transform.moveBackward(600);
        };
        return Basic_SkyBox;
    }());
    feng3d.Basic_SkyBox = Basic_SkyBox;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var Basic_Shading = (function () {
        function Basic_Shading() {
            this.move = false;
            this.lastPanAngle = 0;
            this.lastTiltAngle = 0;
            this.lastMouseX = 0;
            this.lastMouseY = 0;
            this.init();
        }
        Basic_Shading.prototype.init = function () {
            this.initEngine();
            this.initLights();
            this.initMaterials();
            this.initObjects();
            this.initListeners();
        };
        Basic_Shading.prototype.initEngine = function () {
            var view3D = this.view = new feng3d.View3D();
            this.scene = view3D.scene;
            this.camera = view3D.camera;
            this.cameraController = new feng3d.HoverController(this.camera.gameObject);
            this.cameraController.distance = 1000;
            this.cameraController.minTiltAngle = 0;
            this.cameraController.maxTiltAngle = 90;
            this.cameraController.panAngle = 45;
            this.cameraController.tiltAngle = 20;
        };
        Basic_Shading.prototype.initMaterials = function () {
            this.planeMaterial = new feng3d.StandardMaterial("resources/floor_diffuse.jpg", "resources/floor_normal.jpg", "resources/floor_specular.jpg");
            this.sphereMaterial = new feng3d.StandardMaterial("resources/beachball_diffuse.jpg", "", "resources/beachball_specular.jpg");
            this.cubeMaterial = new feng3d.StandardMaterial("resources/trinket_diffuse.jpg", "resources/trinket_normal.jpg", "resources/trinket_specular.jpg");
            this.torusMaterial = new feng3d.StandardMaterial("resources/weave_diffuse.jpg", "resources/weave_normal.jpg", "resources/weave_diffuse.jpg");
        };
        Basic_Shading.prototype.initLights = function () {
            this.scene.ambientColor.a = 0.2;
            this.light1 = feng3d.GameObject.create();
            var directionalLight = this.light1.addComponent(feng3d.DirectionalLight);
            directionalLight.intensity = 0.7;
            this.light1.transform.rotationX = 90;
            this.scene.transform.addChild(this.light1.transform);
            this.light2 = feng3d.GameObject.create();
            var directionalLight = this.light2.addComponent(feng3d.DirectionalLight);
            directionalLight.color.fromUnit(0x00FFFF);
            directionalLight.intensity = 0.7;
            this.light2.transform.rotationX = 90;
            this.scene.transform.addChild(this.light2.transform);
        };
        Basic_Shading.prototype.initObjects = function () {
            this.plane = feng3d.GameObject.create();
            var model = this.plane.addComponent(feng3d.MeshRenderer);
            var geometry = this.plane.addComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(1000, 1000);
            model.material = this.planeMaterial;
            geometry.scaleUV(2, 2);
            this.plane.transform.y = -20;
            this.scene.transform.addChild(this.plane.transform);
            this.sphere = feng3d.GameObject.create();
            var model = this.sphere.addComponent(feng3d.MeshRenderer);
            this.sphere.addComponent(feng3d.MeshFilter).mesh = new feng3d.SphereGeometry(150, 40, 20);
            model.material = this.sphereMaterial;
            this.sphere.transform.x = 300;
            this.sphere.transform.y = 160;
            this.sphere.transform.z = 300;
            this.scene.transform.addChild(this.sphere.transform);
            this.cube = feng3d.GameObject.create();
            var model = this.cube.addComponent(feng3d.MeshRenderer);
            this.cube.addComponent(feng3d.MeshFilter).mesh = new feng3d.CubeGeometry(200, 200, 200, 1, 1, 1, false);
            model.material = this.cubeMaterial;
            this.cube.transform.x = 300;
            this.cube.transform.y = 160;
            this.cube.transform.z = -250;
            this.scene.transform.addChild(this.cube.transform);
            this.torus = feng3d.GameObject.create();
            var model = this.torus.addComponent(feng3d.MeshRenderer);
            geometry = this.torus.addComponent(feng3d.MeshFilter).mesh = new feng3d.TorusGeometry(150, 60, 40, 20);
            model.material = this.torusMaterial;
            geometry.scaleUV(10, 5);
            this.torus.transform.x = -250;
            this.torus.transform.y = 160;
            this.torus.transform.z = -250;
            this.scene.transform.addChild(this.torus.transform);
        };
        Basic_Shading.prototype.initListeners = function () {
            feng3d.ticker.addEventListener(feng3d.Event.ENTER_FRAME, this.onEnterFrame, this);
            feng3d.input.addEventListener(feng3d.inputType.MOUSE_DOWN, this.onMouseDown, this);
            feng3d.input.addEventListener(feng3d.inputType.MOUSE_UP, this.onMouseUp, this);
        };
        Basic_Shading.prototype.onEnterFrame = function (event) {
            if (this.move) {
                this.cameraController.panAngle = 0.3 * (this.view.mousePos.x - this.lastMouseX) + this.lastPanAngle;
                this.cameraController.tiltAngle = 0.3 * (this.view.mousePos.y - this.lastMouseY) + this.lastTiltAngle;
            }
            this.light1.transform.rotationX = 30;
            this.light1.transform.rotationY++;
        };
        Basic_Shading.prototype.onMouseDown = function (event) {
            this.lastPanAngle = this.cameraController.panAngle;
            this.lastTiltAngle = this.cameraController.tiltAngle;
            this.lastMouseX = this.view.mousePos.x;
            this.lastMouseY = this.view.mousePos.y;
            this.move = true;
        };
        Basic_Shading.prototype.onMouseUp = function (event) {
            this.move = false;
        };
        return Basic_Shading;
    }());
    feng3d.Basic_Shading = Basic_Shading;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var Basic_Particles = (function () {
        function Basic_Particles() {
            this._move = false;
            this._lastPanAngle = NaN;
            this._lastTiltAngle = NaN;
            this._lastMouseX = NaN;
            this._lastMouseY = NaN;
            var view3D = this._view = new feng3d.View3D();
            this._cameraController = new feng3d.HoverController(this._view.camera.gameObject, null, 45, 20, 1000);
            // this._particleAnimationSet = new ParticleAnimationSet(true, true);
            // this._particleAnimationSet["addAnimation"](new ParticleBillboardNode());
            // this._particleAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
            // this._particleAnimationSet["initParticleFunc"] = flash.bind(this.initParticleFunc, this);
            this._particleMesh = feng3d.GameObject.create("particle");
            // this._particleMesh.geometry = new PointGeometry();
            this._particleMesh.addComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(10, 10, 1, 1, false);
            var material = this._particleMesh.addComponent(feng3d.MeshRenderer).material = new feng3d.StandardMaterial("resources/blue.png");
            material.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
            material.enableBlend = true;
            var particleAnimationSet = new feng3d.ParticleAnimationSet();
            particleAnimationSet.numParticles = 20000;
            //通过函数来创建粒子初始状态
            particleAnimationSet.generateFunctions.push({
                generate: function (particle) {
                    particle.birthTime = Math.random() * 5 - 5;
                    particle.lifetime = 5;
                    var degree1 = Math.random() * Math.PI;
                    var degree2 = Math.random() * Math.PI * 2;
                    var r = Math.random() * 50 + 400;
                    particle.velocity = new feng3d.Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
                }, priority: 0
            });
            particleAnimationSet.addAnimation(new feng3d.ParticleBillboard(this._view.camera.getComponent(feng3d.Camera)));
            var particleAnimator = this._particleMesh.addComponent(feng3d.ParticleAnimator);
            particleAnimator.animatorSet = particleAnimationSet;
            particleAnimator.cycle = 10;
            particleAnimator.play();
            this._view.scene.transform.addChild(this._particleMesh.transform);
            feng3d.ticker.addEventListener(feng3d.Event.ENTER_FRAME, this.onEnterFrame, this);
            feng3d.input.addEventListener(feng3d.inputType.MOUSE_DOWN, this.onMouseDown, this);
            feng3d.input.addEventListener(feng3d.inputType.MOUSE_UP, this.onMouseUp, this);
        }
        Basic_Particles.prototype.onEnterFrame = function (event) {
            if (this._move) {
                this._cameraController["panAngle"] = 0.3 * (this._view.mousePos.x - this._lastMouseX) + this._lastPanAngle;
                this._cameraController["tiltAngle"] = 0.3 * (this._view.mousePos.y - this._lastMouseY) + this._lastTiltAngle;
            }
        };
        Basic_Particles.prototype.onMouseDown = function (event) {
            this._lastPanAngle = this._cameraController["panAngle"];
            this._lastTiltAngle = this._cameraController["tiltAngle"];
            this._lastMouseX = this._view.mousePos.x;
            this._lastMouseY = this._view.mousePos.y;
            this._move = true;
        };
        Basic_Particles.prototype.onMouseUp = function (event) {
            this._move = false;
        };
        return Basic_Particles;
    }());
    feng3d.Basic_Particles = Basic_Particles;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var Basic_Fire = (function () {
        function Basic_Fire() {
            this.fireObjects = new Array();
            this.move = false;
            this.lastPanAngle = NaN;
            this.lastTiltAngle = NaN;
            this.lastMouseX = NaN;
            this.lastMouseY = NaN;
            this.init();
        }
        Basic_Fire.prototype.init = function () {
            this.initEngine();
            this.initLights();
            this.initMaterials();
            this.initParticles();
            this.initObjects();
            this.initListeners();
        };
        Basic_Fire.prototype.initEngine = function () {
            var view3D = this.view = new feng3d.View3D();
            this.camera = view3D.camera;
            this.scene = view3D.scene;
            this.cameraController = new feng3d.HoverController(this.camera.gameObject);
            this.cameraController.distance = 1000;
            this.cameraController.minTiltAngle = 0;
            this.cameraController.maxTiltAngle = 90;
            this.cameraController.panAngle = 45;
            this.cameraController.tiltAngle = 20;
        };
        Basic_Fire.prototype.initLights = function () {
            var gameObject = feng3d.GameObject.create();
            this.directionalLight = gameObject.addComponent(feng3d.DirectionalLight);
            this.directionalLight.direction = new feng3d.Vector3D(0, -1, 0);
            this.directionalLight.castsShadows = false;
            this.directionalLight.color.fromUnit(0xeedddd);
            this.directionalLight.intensity = .5;
            this.scene.transform.addChild(gameObject.transform);
        };
        Basic_Fire.prototype.initMaterials = function () {
            this.planeMaterial = new feng3d.StandardMaterial("resources/floor_diffuse.jpg", "resources/floor_normal.jpg", "resources/floor_specular.jpg");
            this.planeMaterial["specular"] = 10;
            this.particleMaterial = new feng3d.StandardMaterial("resources/blue.png");
            this.particleMaterial.diffuseMethod.difuseTexture.format = feng3d.GL.RGBA;
            this.particleMaterial.enableBlend = true;
        };
        Basic_Fire.prototype.initParticles = function () {
            this.fireAnimationSet = new feng3d.ParticleAnimationSet();
            this.fireAnimationSet.addAnimation(new feng3d.ParticleBillboard(this.camera.getComponent(feng3d.Camera)));
            // this.fireAnimationSet["addAnimation"](new ParticleScaleNode(ParticlePropertiesMode.GLOBAL, false, false, 2.5, 0.5));
            // this.fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.GLOBAL, new Vector3D(0, 80, 0)));
            // this.fireAnimationSet["addAnimation"](new ParticleColorNode(ParticlePropertiesMode.GLOBAL, true, true, false, false, new flash.ColorTransform(0, 0, 0, 1, 0xFF, 0x33, 0x01), new flash.ColorTransform(0, 0, 0, 1, 0x99)));
            // this.fireAnimationSet["addAnimation"](new ParticleVelocityNode(ParticlePropertiesMode.LOCAL_STATIC));
            //通过函数来创建粒子初始状态
            this.fireAnimationSet.numParticles = 500;
            this.fireAnimationSet.generateFunctions.push({
                generate: function (particle) {
                    particle.color = new feng3d.Color(1, 0, 0, 1).mix(new feng3d.Color(0, 1, 0, 1), particle.index / particle.total);
                    particle.birthTime = Math.random() * 5;
                    particle.lifetime = Math.random() * 4 + 0.1;
                    var degree1 = Math.random() * Math.PI * 2;
                    var degree2 = Math.random() * Math.PI * 2;
                    var r = 15;
                    particle.velocity = new feng3d.Vector3D(r * Math.sin(degree1) * Math.cos(degree2), r * Math.cos(degree1) * Math.cos(degree2), r * Math.sin(degree2));
                }, priority: 0
            });
            this.particleGeometry = new feng3d.PlaneGeometry(10, 10, 1, 1, false);
        };
        Basic_Fire.prototype.initObjects = function () {
            this.plane = feng3d.GameObject.create();
            var model = this.plane.addComponent(feng3d.MeshRenderer);
            this.plane.addComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(1000, 1000);
            this.plane.getComponent(feng3d.MeshFilter).mesh.scaleUV(2, 2);
            model.material = this.planeMaterial;
            this.plane.transform.y = -20;
            this.scene.transform.addChild(this.plane.transform);
            for (var i = 0; i < Basic_Fire.NUM_FIRES; i++) {
                var particleMesh = feng3d.GameObject.create();
                var model = particleMesh.addComponent(feng3d.MeshRenderer);
                particleMesh.addComponent(feng3d.MeshFilter).mesh = this.particleGeometry;
                model.material = this.particleMaterial;
                var particleAnimator = particleMesh.addComponent(feng3d.ParticleAnimator);
                particleAnimator.animatorSet = this.fireAnimationSet;
                var degree = i / Basic_Fire.NUM_FIRES * Math.PI * 2;
                particleMesh.transform.x = Math.sin(degree) * 400;
                particleMesh.transform.z = Math.cos(degree) * 400;
                particleMesh.transform.y = 5;
                this.fireObjects.push(new FireVO(particleMesh, particleAnimator));
                this.view.scene.transform.addChild(particleMesh.transform);
            }
            this.timer = new feng3d.Timer(1000, this.fireObjects.length);
            this.timer.addEventListener(feng3d.TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
        };
        Basic_Fire.prototype.initListeners = function () {
            feng3d.ticker.addEventListener(feng3d.Event.ENTER_FRAME, this.onEnterFrame, this);
            feng3d.input.addEventListener(feng3d.inputType.MOUSE_DOWN, this.onMouseDown, this);
            feng3d.input.addEventListener(feng3d.inputType.MOUSE_UP, this.onMouseUp, this);
        };
        Basic_Fire.prototype.getAllLights = function () {
            var lights = new Array();
            lights.push(this.directionalLight);
            for (var fireVO_key_a in this.fireObjects) {
                var fireVO = this.fireObjects[fireVO_key_a];
                if (fireVO.light)
                    lights.push(fireVO.light);
            }
            return lights;
        };
        Basic_Fire.prototype.onTimer = function (e) {
            var fireObject = this.fireObjects[this.timer.currentCount - 1];
            fireObject.animator.play();
            var lightObject = feng3d.GameObject.create();
            var light = lightObject.addComponent(feng3d.PointLight);
            light.color.fromUnit(0xFF3301);
            light.intensity = 0;
            lightObject.transform.position = fireObject.mesh.transform.position;
            fireObject.light = light;
        };
        Basic_Fire.prototype.onEnterFrame = function (event) {
            if (this.move) {
                this.cameraController.panAngle = 0.3 * (this.view.mousePos.x - this.lastMouseX) + this.lastPanAngle;
                this.cameraController.tiltAngle = 0.3 * (this.view.mousePos.y - this.lastMouseY) + this.lastTiltAngle;
            }
            var fireVO;
            var fireVO_key_a;
            for (fireVO_key_a in this.fireObjects) {
                fireVO = this.fireObjects[fireVO_key_a];
                var light = fireVO.light;
                if (!light)
                    continue;
                if (fireVO.strength < 1)
                    fireVO.strength += 0.1;
                light["fallOff"] = 380 + Math.random() * 20;
                light["radius"] = 200 + Math.random() * 30;
                light["diffuse"] = light["specular"] = fireVO.strength + Math.random() * .2;
            }
            // this.view["render"]();
        };
        Basic_Fire.prototype.onMouseDown = function (event) {
            this.lastPanAngle = this.cameraController.panAngle;
            this.lastTiltAngle = this.cameraController.tiltAngle;
            this.lastMouseX = this.view.mousePos.x;
            this.lastMouseY = this.view.mousePos.y;
            this.move = true;
        };
        Basic_Fire.prototype.onMouseUp = function (event) {
            this.move = false;
        };
        return Basic_Fire;
    }());
    Basic_Fire.NUM_FIRES = 10;
    feng3d.Basic_Fire = Basic_Fire;
    var FireVO = (function () {
        function FireVO(mesh, animator) {
            this.strength = 0;
            this.mesh = mesh;
            this.animator = animator;
        }
        return FireVO;
    }());
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var Basic_View = (function () {
        function Basic_View() {
            this._view = new feng3d.View3D(null, null, null, false);
            var scene = this._view.scene;
            this._view.camera.transform.z = -600;
            this._view.camera.transform.y = 500;
            this._view.camera.transform.lookAt(new feng3d.Vector3D());
            this._plane = feng3d.GameObject.create();
            this._plane.addComponent(feng3d.MeshFilter).mesh = new feng3d.PlaneGeometry(700, 700);
            var model = this._plane.addComponent(feng3d.MeshRenderer);
            var material = model.material = new feng3d.StandardMaterial("resources/floor_diffuse.jpg");
            scene.transform.addChild(this._plane.transform);
            feng3d.ticker.addEventListener(feng3d.Event.ENTER_FRAME, this._onEnterFrame, this);
        }
        Basic_View.prototype._onEnterFrame = function (e) {
            this._plane.transform.rotationY += 1;
            this._view.render();
        };
        return Basic_View;
    }());
    feng3d.Basic_View = Basic_View;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ArrayListTest = (function () {
        function ArrayListTest() {
            console.log("\u6267\u884CArrayList\u5355\u5143\u6D4B\u8BD5");
            this.testLength();
            this.testAddItem();
            this.testAddItemAt();
            this.testGetItemAt();
            this.testGetItemIndex();
            this.testRemoveAll();
            this.testRemoveItem();
            this.testRemoveItemAt();
            this.testSetItemAt();
            this.testToArray();
            this.testAddItemEventListener();
            this.testRemoveItemEventListener();
            console.log("\u901A\u8FC7ArrayList\u5355\u5143\u6D4B\u8BD5");
        }
        /**
         * 此集合中的项目数。
         */
        ArrayListTest.prototype.testLength = function () {
            var arr = [1, 2];
            var arrayList = new feng3d.ArrayList(arr);
            feng3d.assert(arr.length == arrayList.length);
        };
        /**
         * 向列表末尾添加指定项目。
         */
        ArrayListTest.prototype.testAddItem = function () {
            var arr = [1, 2];
            var arrayList = new feng3d.ArrayList();
            arrayList.addItem(1);
            arrayList.addItem(arr);
            feng3d.assert(arrayList.length == arr.length + 1);
        };
        /**
         * 在指定的索引处添加项目。
         */
        ArrayListTest.prototype.testAddItemAt = function () {
            var arrayList = new feng3d.ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++) {
                feng3d.assert(arrayList.getItemAt(i) == i);
            }
        };
        /**
         * 获取指定索引处的项目。
         */
        ArrayListTest.prototype.testGetItemAt = function () {
            var arrayList = new feng3d.ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++) {
                feng3d.assert(arrayList.getItemAt(i) == i);
            }
        };
        /**
         * 如果项目位于列表中（这样的话 getItemAt(index) == item），则返回该项目的索引。
         */
        ArrayListTest.prototype.testGetItemIndex = function () {
            var arrayList = new feng3d.ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++) {
                feng3d.assert(arrayList.getItemIndex(i) == i);
            }
        };
        /**
         * 删除列表中的所有项目。
         */
        ArrayListTest.prototype.testRemoveAll = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr);
            feng3d.assert(arr.length == arrayList.length);
            arrayList.removeAll();
            feng3d.assert(0 == arrayList.length);
        };
        /**
         * 删除指定项目。
         */
        ArrayListTest.prototype.testRemoveItem = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr.concat());
            for (var i = 0; i < arr.length; i++) {
                var element = arr[i];
                arrayList.removeItem(element);
            }
            feng3d.assert(0 == arrayList.length);
        };
        /**
         * 删除指定索引处的项目并返回该项目。
         */
        ArrayListTest.prototype.testRemoveItemAt = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr.concat());
            for (var i = arr.length - 1; i >= 0; i--) {
                arrayList.removeItemAt(i);
            }
            feng3d.assert(0 == arrayList.length);
        };
        /**
         * 在指定的索引处放置项目。
         */
        ArrayListTest.prototype.testSetItemAt = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr.concat());
            for (var i = arr.length - 1; i >= 0; i--) {
                arrayList.setItemAt(0, i);
            }
            for (var i = arr.length - 1; i >= 0; i--) {
                feng3d.assert(0 == arrayList.getItemAt(i));
            }
        };
        /**
         * 返回与 IList 实现的填充顺序相同的 Array。
         */
        ArrayListTest.prototype.testToArray = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr.concat());
            var arr1 = arrayList.toArray();
            for (var i = arr.length - 1; i >= 0; i--) {
                feng3d.assert(arr1[i] == arr[i]);
            }
        };
        /**
         * 添加项事件
         * @param type						事件的类型。
         * @param listener					处理事件的侦听器函数。
         * @param thisObject                listener函数作用域
         * @param priority					事件侦听器的优先级。数字越大，优先级越高。默认优先级为 0。
         */
        ArrayListTest.prototype.testAddItemEventListener = function () {
            var arrayList = new feng3d.ArrayList();
            var changeItem;
            arrayList.addItemEventListener("change", function (event) {
                changeItem = event.target;
            }, null);
            var eventDispatcher = new feng3d.EventDispatcher();
            arrayList.addItem(eventDispatcher);
            eventDispatcher.dispatchEvent(new feng3d.Event("change"));
            feng3d.assert(eventDispatcher == changeItem);
        };
        /**
         * 移除项事件
         * @param type						事件的类型。
         * @param listener					要删除的侦听器对象。
         * @param thisObject                listener函数作用域
         */
        ArrayListTest.prototype.testRemoveItemEventListener = function () {
            var arrayList = new feng3d.ArrayList();
            var changeItem;
            var onChange = function (event) {
                changeItem = event.target;
            };
            arrayList.addItemEventListener("change", onChange, null);
            var eventDispatcher = new feng3d.EventDispatcher();
            arrayList.addItem(eventDispatcher);
            eventDispatcher.dispatchEvent(new feng3d.Event("change"));
            feng3d.assert(eventDispatcher == changeItem);
            changeItem = null;
            arrayList.removeItemEventListener("change", onChange, null);
            eventDispatcher.dispatchEvent(new feng3d.Event("change"));
            feng3d.assert(null === changeItem);
        };
        return ArrayListTest;
    }());
    feng3d.ArrayListTest = ArrayListTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var UnitTest = (function () {
        function UnitTest() {
            console.log("\u6267\u884C\u5355\u5143\u6D4B\u8BD5");
            var start = Date.now();
            this.test();
            console.log("\u901A\u8FC7\u5355\u5143\u6D4B\u8BD5\uFF0C\u8017\u65F6" + (Date.now() - start) / 1000 + "s");
        }
        UnitTest.prototype.test = function () {
            new feng3d.ArrayListTest();
        };
        return UnitTest;
    }());
    feng3d.UnitTest = UnitTest;
    new UnitTest();
})(feng3d || (feng3d = {}));
//# sourceMappingURL=examples.js.map