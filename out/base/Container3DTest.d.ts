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
