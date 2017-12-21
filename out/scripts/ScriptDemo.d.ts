declare namespace feng3d {
    class ScriptDemo extends Script {
        cube: GameObject;
        init(gameObject: GameObject): void;
        update(): void;
        /**
         * 销毁
         */
        dispose(): void;
    }
}
