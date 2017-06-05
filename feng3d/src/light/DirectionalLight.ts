namespace feng3d
{
    /**
     * 方向光源
     * @author feng 2016-12-13
     */
    export class DirectionalLight extends Light
    {
        private _direction: Vector3D;
        private _sceneDirection: Vector3D;

        /**
         * 构建
         */
        constructor(xDir: number = 0, yDir: number = -1, zDir: number = 1)
        {
            super();
            this.lightType = LightType.Directional;
            this.direction = new Vector3D(xDir, yDir, zDir);
            this._sceneDirection = new Vector3D(xDir, yDir, zDir);
            this._sceneDirection.normalize();
        }

        public get sceneDirection(): Vector3D
        {            
            return this._sceneDirection;
        }

        /**
         * 光照方向
         */
        public get direction(): Vector3D
        {
            return this._direction;
        }

        public set direction(value: Vector3D)
        {
            this._direction = value;
            if(this.gameObject)
            {
                var tmpLookAt = this.gameObject.getPosition();
                tmpLookAt.incrementBy(this._direction);
                this.gameObject.lookAt(tmpLookAt);
                this.gameObject.sceneTransform.copyColumnTo(2, this._sceneDirection);
                this._sceneDirection.normalize();
            }
        }

        /**
         * 处理被添加组件事件
         */
        protected onBeAddedComponent(event: ComponentEvent): void
        {
            this.gameObject.addEventListener(Object3DEvent.SCENETRANSFORM_CHANGED,this.onScenetransformChanged,this);
            var tmpLookAt = this.gameObject.getPosition();
            tmpLookAt.incrementBy(this._direction);
            this.gameObject.lookAt(tmpLookAt);
        }

        /**
         * 处理被移除组件事件
         */
        protected onBeRemovedComponent(event: ComponentEvent): void
        {
            this.gameObject.removeEventListener(Object3DEvent.SCENETRANSFORM_CHANGED,this.onScenetransformChanged,this);
        }

        protected onScenetransformChanged()
        {
            this.gameObject.sceneTransform.copyColumnTo(2, this._sceneDirection);
            this._sceneDirection.normalize();
        }
    }
}