declare namespace feng3d {
    /**
     * 测试3D容器
     */
    class Container3DTest extends Script {
        cube: GameObject;
        colorMaterial: ColorMaterial;
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
}
