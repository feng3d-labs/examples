declare namespace feng3d {
    class ScriptDemo extends ScriptComponent {
        cube: GameObject;
        init(gameObject: GameObject): void;
        update(): void;
        /**
         * 销毁
         */
        dispose(): void;
    }
}
