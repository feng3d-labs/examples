declare namespace feng3d {
    interface GameObjectUserData {
        velocity: Vector3;
    }
}
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
