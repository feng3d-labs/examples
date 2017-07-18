declare namespace feng3d {
    class BillboardTest {
        view3D: View3D;
        controller: FPSController;
        constructor();
        animate(): void;
        init(): void;
    }
}
declare namespace feng3d {
    class ColorMaterialTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    /**
     * 测试3D容器
     */
    class Container3DTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    class FPSControllerTest {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;
        constructor();
        process(): void;
        init(): void;
    }
}
declare namespace feng3d {
    class GeometryTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class MD5LoaderTest {
        view3D: View3D;
        constructor();
        init(): void;
        private useMatrial(object3D, imageUrl);
    }
}
declare namespace feng3d {
    /**
     * 操作方式:鼠标按下后可以使用移动鼠标改变旋转，wasdqe平移
     */
    class MousePickTest {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;
        constructor();
        init(): void;
        onMouseClick(event: EventVO<any>): void;
    }
}
declare namespace feng3d {
    class OBJParserTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class ParticleAnimatorTest {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;
        constructor();
        init(): void;
    }
    var acceleration: Vector3D;
}
declare namespace feng3d {
    class PointLightTest {
        view3D: View3D;
        scene: Scene3D;
        controller: FPSController;
        camera: Camera;
        light0: GameObject;
        light1: GameObject;
        constructor();
        private onKeyUp(event);
        init(): void;
        private initObjects();
        private clearObjects();
        private initLights();
        setPointLightPosition(): void;
    }
}
declare namespace feng3d {
    class PointMaterialTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class PrimitiveTest {
        view3D: View3D;
        controller: LookAtController;
        camera: Camera;
        constructor();
        process(): void;
        init(): void;
    }
}
declare namespace feng3d {
    class SceneLoadTest {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class SegmentMaterialTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class SkyBoxTest {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class StandardMaterialTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class TerrainTest {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;
        constructor();
        private onEnterFrame();
        init(): void;
        private light1;
    }
}
declare namespace feng3d {
    class TerrainMergeTest {
        view3D: View3D;
        controller: FPSController;
        camera: Camera;
        constructor();
        private onEnterFrame();
        init(): void;
        private light1;
    }
}
declare namespace feng3d {
    class TextureMaterialTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class FogTest {
        view3D: View3D;
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    class ScriptTest {
        constructor();
        init(): void;
    }
}
declare namespace feng3d {
    /**
     * war3的mdl文件解析测试
     * @author warden_feng 2014-4-29
     */
    class MdlParserTest {
        private view;
        private controller;
        private modelId;
        private animatorId;
        private loading;
        private configUrl;
        private rooturl;
        private showWar3Model;
        /** 相机旋转角度 */
        private cameraAngle;
        /** 相机起始离物体的距离 */
        private len;
        constructor();
        private init(e?);
        private updateModel();
        private loadModel(model);
        private _onEnterFrame(e);
    }
}
declare namespace feng3d {
    class Basic_SkyBox {
        private _view;
        private _torus;
        private camera;
        constructor();
        private _onEnterFrame(e);
    }
}
declare namespace feng3d {
    class Basic_Shading {
        private scene;
        private camera;
        private view;
        private cameraController;
        private planeMaterial;
        private sphereMaterial;
        private cubeMaterial;
        private torusMaterial;
        private light1;
        private light2;
        private plane;
        private sphere;
        private cube;
        private torus;
        private move;
        private lastPanAngle;
        private lastTiltAngle;
        private lastMouseX;
        private lastMouseY;
        constructor();
        private init();
        private initEngine();
        private initMaterials();
        private initLights();
        private initObjects();
        private initListeners();
        private onEnterFrame(event);
        private onMouseDown(event);
        private onMouseUp(event);
    }
}
declare namespace feng3d {
    class Basic_Particles {
        private _view;
        private _cameraController;
        private _particleMesh;
        private _move;
        private _lastPanAngle;
        private _lastTiltAngle;
        private _lastMouseX;
        private _lastMouseY;
        constructor();
        private onEnterFrame(event);
        private onMouseDown(event);
        private onMouseUp(event);
    }
}
declare namespace feng3d {
    class Basic_Fire {
        static NUM_FIRES: number;
        private scene;
        private camera;
        private view;
        private cameraController;
        private planeMaterial;
        private particleMaterial;
        private directionalLight;
        private fireAnimationSet;
        private particleGeometry;
        private timer;
        private plane;
        private fireObjects;
        private move;
        private lastPanAngle;
        private lastTiltAngle;
        private lastMouseX;
        private lastMouseY;
        constructor();
        private init();
        private initEngine();
        private initLights();
        private initMaterials();
        private initParticles();
        private initObjects();
        private initListeners();
        private getAllLights();
        private onTimer(e);
        private onEnterFrame(event);
        private onMouseDown(event);
        private onMouseUp(event);
    }
}
declare namespace feng3d {
    class Basic_View {
        private _view;
        private _plane;
        constructor();
        private _onEnterFrame(e);
    }
}
