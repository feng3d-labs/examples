namespace feng3d
{
    export class ComponentMap
    {
        private static _instance: ComponentMap;
        public static get instance()
        {
            return this._instance = this._instance || new ComponentMap();
        }

        "camera" = Camera;
        "meshFilter" = MeshFilter;
    }

	/**
	 * 组件容器（集合）
	 * @author feng 2015-5-6
	 */
    export class Component extends RenderDataHolder
    {
        // private m_cachedTransform
        // public get transform()
        // {
        //     if (this.m_cachedTransform == null)
        //     {
        //         this.m_cachedTransform = this.internalGetTransform();
        //     }
        //     return this.m_cachedTransform;
        // }

        /**
         * 游戏对象
         */
        public gameObject: GameObject;
        // public get gameObject()
        // {
        //     return this.internalGetGameObject();
        // }

		/**
		 * 组件列表
		 */
        protected components_: Component[] = [];

        /**
         * 是否唯一，同类型3D对象组件只允许一个
         */
        public get single() { return this._single; }
        protected _single = false;

        /**
         * 组件类型
         */
        public get type() { return this._type; }
        protected _type: new () => Component;

		/**
		 * 创建一个组件容器
		 */
        constructor()
        {
            super();
            this.initComponent();
            this._type = <any>this.constructor;
        }

        /**
         * 初始化组件
         */
        protected initComponent(): void
        {
            //以最高优先级监听组件被添加，设置父组件
            this.addEventListener(ComponentEvent.ADDED_COMPONENT, this._onAddedComponent, this, Number.MAX_VALUE);
            //以最低优先级监听组件被删除，清空父组件
            this.addEventListener(ComponentEvent.REMOVED_COMPONENT, this._onRemovedComponent, this, Number.MIN_VALUE);
        }

        /**
         * 获取组件在容器的索引位置
         * @param component			查询的组件
         * @return				    组件在容器的索引位置
         */
        public getComponentIndex(component: Component): number
        {
            debuger && assert(this.components_.indexOf(component) != -1, "组件不在容器中");

            var index: number = this.components_.indexOf(component);
            return index;
        }

        /**
         * Returns the component of Type type if the game object has one attached, null if it doesn't.
         * @param type				The type of Component to retrieve.
         * @return                  返回指定类型组件
         */
        public getComponent<T extends Component>(type: new () => T): T
        {
            return this.gameObject.getComponent(type);
        }

        /**
         * Returns all components of Type type in the GameObject.
         * @param type		类定义
         * @return			返回与给出类定义一致的组件
         */
        public getComponents<T extends Component>(type: new () => T): T[]
        {
            var filterResult: any = this.components_.filter(function (value: Component, index: number, array: Component[]): boolean
            {
                return value instanceof type;
            });

            return filterResult;
        }

        /**
         * 判断是否拥有组件
         * @param com	被检测的组件
         * @return		true：拥有该组件；false：不拥有该组件。
         */
        public hasComponent(com: Component): boolean
        {
            return this.components_.indexOf(com) != -1;
        }

        /**
         * 派发子组件事件
         * <p>事件广播给子组件</p>
         * @param event     事件
         * @param depth     广播深度
         */
        public dispatchChildrenEvent(event: Event, depth = 1): void
        {
            if (depth == 0)
                return;
            this.components_.forEach(function (value: Component, index: number, array: Component[]): void
            {
                value.dispatchEvent(event);
                value.dispatchChildrenEvent(event, depth - 1)
            });
        }

        /**
         * 收集渲染数据拥有者
         * @param renderAtomic 渲染原子
         */
        public collectRenderDataHolder(renderAtomic: Object3DRenderAtomic = null)
        {
            renderAtomic.addRenderDataHolder(this);
            this.components_.forEach(element =>
            {
                if (element instanceof RenderDataHolder)
                {
                    element.collectRenderDataHolder(renderAtomic);
                }
            });
        }

        /**
         * 派发事件，该事件将会强制冒泡到3D对象中
		 * @param event						调度到事件流中的 Event 对象。
         */
        public dispatchEvent(event: Event): boolean
        {
            var result = super.dispatchEvent(event);
            if (result)
            {
                this.gameObject && this.gameObject.dispatchEvent(event);
            }
            return result;
        }

        //------------------------------------------
        //@protected
        //------------------------------------------

        /**
         * 处理被添加组件事件
         */
        protected onBeAddedComponent(event: ComponentEvent): void
        {

        }

        /**
         * 处理被移除组件事件
         */
        protected onBeRemovedComponent(event: ComponentEvent): void
        {

        }

        /**
         * 获取冒泡对象
         */
        protected getBubbleTargets(event: Event = null): IEventDispatcher[]
        {
            var bubbleTargets = super.getBubbleTargets(event);
            bubbleTargets.push(this.gameObject);
            return bubbleTargets;
        }

        //------------------------------------------
        //@private
        //------------------------------------------

        /**
         * 处理添加组件事件，此处为被添加，设置父组件
         */
        private _onAddedComponent(event: ComponentEvent): void
        {
            var data: { container: GameObject, child: Component } = event.data;
            if (data.child == this)
            {
                this.gameObject = data.container;
                this.onBeAddedComponent(event);
            }
        }

        /**
         * 处理移除组件事件，此处为被移除，清空父组件
         */
        private _onRemovedComponent(event: ComponentEvent): void
        {
            var data: { container: GameObject, child: Component } = event.data;
            if (event.data.child == this)
            {
                this.onBeRemovedComponent(event);
                this.gameObject = null;
            }
        }
    }
}
