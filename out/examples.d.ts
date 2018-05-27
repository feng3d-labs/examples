declare class TerrainMergeTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class TerrainTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class SceneLoadTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class Basic_Shading extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class Basic_SkyBox extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class Basic_View extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class BillboardTest extends feng3d.Script {
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
     * 销毁时调用
     */
    dispose(): void;
}
/**
 * 测试3D容器
 */
declare class Container3DTest extends feng3d.Script {
    cube: feng3d.GameObject;
    colorMaterial: feng3d.ColorMaterial;
    num: number;
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
     * 销毁时调用
     */
    dispose(): void;
}
declare class FogTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
     * 销毁时调用
     */
    dispose(): void;
}
declare class FPSControllerTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class MousePickTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class ScriptTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class SkyBoxTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class GeometryTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class PrimitiveTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class PointLightTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class MD5LoaderTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class MdlLoaderTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class OBJParserTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class ColorMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class PointMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class SegmentMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class StandardMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class TextureMaterialTest extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
declare class ScriptDemo extends feng3d.Script {
    cube: feng3d.GameObject;
    init(): void;
    update(): void;
    /**
     * 销毁
     */
    dispose(): void;
}
/**
 * @author alteredq / http://alteredqualia.com/
 */
declare function Clock(autoStart: any): void;
declare class webvr_cubes extends feng3d.Script {
    /**
     * 初始化时调用
     */
    init(): void;
    /**
     * 更新
     */
    update(): void;
    /**
    * 销毁时调用
    */
    dispose(): void;
}
/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Based on @tojiro's vr-samples-utils.js
 */
declare var WEBVR: {
    createButton: (renderer: any) => HTMLAnchorElement | HTMLButtonElement;
    checkAvailability: () => void;
    getMessageContainer: () => HTMLDivElement;
    getButton: () => HTMLDivElement;
    getVRDisplay: () => void;
};
