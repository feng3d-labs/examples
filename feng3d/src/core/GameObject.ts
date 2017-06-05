module feng3d
{

    /**
     * 3D对象
     * @author feng 2016-04-26
     */
    export class GameObject extends Entity
    {
        public uniformData = new UniformRenderData();

        public get renderData() { return this._renderData; }
        private _renderData = new Object3DRenderAtomic();
        /**
		 * 组件列表
		 */
        protected components_: Component[] = [];

        /**
         * 是否为公告牌（默认永远朝向摄像机），默认false。
         */
        public isBillboard = false;
        /**
         * 保持缩放尺寸
         */
        public holdSize = NaN;

        /**
         * 几何体
         */
        public get geometry() { return this._geometry || defaultGeometry; }
        public set geometry(value) 
        { 
            this._geometry = value;
            this.addComponent(this._geometry);
            this.invalidateRenderHolder(); 
        }
        private _geometry: Geometry;

        public updateRender(renderContext: RenderContext)
        {
            if (this.isBillboard)
            {
                var parentInverseSceneTransform = (this.parent && this.parent.inverseSceneTransform) || new Matrix3D();
                var cameraPos = parentInverseSceneTransform.transformVector(renderContext.camera.sceneTransform.position);
                var yAxis = parentInverseSceneTransform.deltaTransformVector(Vector3D.Y_AXIS);
                this.lookAt(cameraPos, yAxis);
            }
            if (this.holdSize)
            {
                var depthScale = this.getDepthScale(renderContext);
                var vec = this.sceneTransform.decompose();
                vec[2].setTo(depthScale, depthScale, depthScale);
                this.sceneTransform.recompose(vec);
            }
            if (this.renderData.renderHolderInvalid)
            {
                this.renderData.clear();
                this.collectRenderDataHolder(this.renderData);
                this.renderData.renderHolderInvalid = false;
            }
            if (!this.renderData.uniforms.u_modelMatrix)
                this.renderData.uniforms.u_modelMatrix = this.uniformData.u_modelMatrix;
            this.renderData.update(renderContext);
        }

        private getDepthScale(renderContext: RenderContext)
        {
            var cameraTranform = renderContext.camera.sceneTransform;
            var distance = this.scenePosition.subtract(cameraTranform.position);
            var depth = distance.dotProduct(cameraTranform.forward);
            var scale = renderContext.view3D.getScaleByDepth(depth);
            return scale;
        }

        /**
         * 收集渲染数据拥有者
         * @param renderAtomic 渲染原子
         */
        public collectRenderDataHolder(renderAtomic: Object3DRenderAtomic = null)
        {
            this.components_.forEach(element =>
            {
                if (element instanceof RenderDataHolder)
                {
                    element.collectRenderDataHolder(renderAtomic);
                }
            });
        }

        /**
         * 构建3D对象
         */
        constructor(name = "object")
        {
            super();
            this.name = name;

            this.uniformData.u_modelMatrix = UniformData.getUniformData(this.sceneTransform);
        }

        /**
		 * @inheritDoc
		 */
        protected updateBounds()
        {
            this._bounds.geometry = this.geometry;
            this._bounds.fromGeometry(this.geometry);
            this._boundsInvalid = false;
        }

		/**
		 * @inheritDoc
		 */
        public collidesBefore(pickingCollider: AS3PickingCollider, shortestCollisionDistance: number, findClosest: boolean): boolean
        {
            pickingCollider.setLocalRay(this._pickingCollisionVO.localRay);
            this._pickingCollisionVO.renderable = null;

            var model = this.geometry;

            if (pickingCollider.testSubMeshCollision(model, this._pickingCollisionVO, shortestCollisionDistance))
            {
                shortestCollisionDistance = this._pickingCollisionVO.rayEntryDistance;
                this._pickingCollisionVO.renderable = model;
                if (!findClosest)
                    return true;
            }

            return this._pickingCollisionVO.renderable != null;
        }
        
		/**
		 * 添加组件
		 * @param component 被添加组件
		 */
        public addComponent(component: Component): void
        {
            if (this.hasComponent(component))
            {
                this.setComponentIndex(component, this.components_.length - 1);
                return;
            }

            this.addComponentAt(component, this.components_.length);
        }

		/**
		 * 添加组件到指定位置
		 * @param component		被添加的组件
		 * @param index			插入的位置
		 */
        public addComponentAt(component: Component, index: number): void
        {
            debuger && assert(component != this, "子项与父项不能相同");
            debuger && assert(index >= 0 && index <= this.numComponents, "给出索引超出范围");

            if (this.hasComponent(component))
            {
                index = Math.min(index, this.components_.length - 1);
                this.setComponentIndex(component, index)
                return;
            }
            //组件唯一时移除同类型的组件
            if (component.single)
                this.removeComponentsByType(component.type);

            this.components_.splice(index, 0, component);
            //派发添加组件事件
            component.dispatchEvent(new ComponentEvent(ComponentEvent.ADDED_COMPONENT, { container: this, child: component }));
            this.dispatchEvent(new ComponentEvent(ComponentEvent.ADDED_COMPONENT, { container: this, child: component }));
            this.invalidateRenderHolder();
        }

        /**
         * 设置子组件的位置
         * @param component				子组件
         * @param index				位置索引
         */
        public setComponentIndex(component: Component, index: number): void
        {
            debuger && assert(index >= 0 && index < this.numComponents, "给出索引超出范围");

            var oldIndex: number = this.components_.indexOf(component);
            debuger && assert(oldIndex >= 0 && oldIndex < this.numComponents, "子组件不在容器内");

            this.components_.splice(oldIndex, 1);
            this.components_.splice(index, 0, component);
        }

		/**
		 * 设置组件到指定位置
		 * @param component		被设置的组件
		 * @param index			索引
		 */
        public setComponentAt(component: Component, index: number)
        {
            if (this.components_[index])
            {
                this.removeComponentAt(index);
            }
            this.addComponentAt(component, index);
        }

		/**
		 * 移除组件
		 * @param component 被移除组件
		 */
        public removeComponent(component: Component): void
        {
            debuger && assert(this.hasComponent(component), "只能移除在容器中的组件");

            var index: number = this.getComponentIndex(component);
            this.removeComponentAt(index);
        }

        /**
         * 移除组件
         * @param index		要删除的 Component 的子索引。
         */
        public removeComponentAt(index: number): Component
        {
            debuger && assert(index >= 0 && index < this.numComponents, "给出索引超出范围");

            var component: Component = this.components_.splice(index, 1)[0];
            //派发移除组件事件
            component.dispatchEvent(new ComponentEvent(ComponentEvent.REMOVED_COMPONENT, { container: this, child: component }));
            this.dispatchEvent(new ComponentEvent(ComponentEvent.REMOVED_COMPONENT, { container: this, child: component }));
            this.invalidateRenderHolder();
            return component;
        }

        /**
         * 根据类定义获取或创建组件
         * <p>当不存在该类型对象时创建一个该组件并且添加到容器中</p>
         * @param cls       类定义
         * @return          返回与给出类定义一致的组件
         */
        public getOrCreateComponentByClass<T extends Component>(cls: new () => T): T
        {
            var component = this.getComponentByType(cls);
            if (component == null)
            {
                component = new cls();
                this.addComponent(component);
            }
            return component;
        }
        
        /**
         * 交换子组件位置
         * @param index1		第一个子组件的索引位置
         * @param index2		第二个子组件的索引位置
         */
        public swapComponentsAt(index1: number, index2: number): void
        {
            debuger && assert(index1 >= 0 && index1 < this.numComponents, "第一个子组件的索引位置超出范围");
            debuger && assert(index2 >= 0 && index2 < this.numComponents, "第二个子组件的索引位置超出范围");

            var temp: Component = this.components_[index1];
            this.components_[index1] = this.components_[index2];
            this.components_[index2] = temp;
        }

        /**
         * 交换子组件位置
         * @param a		第一个子组件
         * @param b		第二个子组件
         */
        public swapComponents(a: Component, b: Component): void
        {
            debuger && assert(this.hasComponent(a), "第一个子组件不在容器中");
            debuger && assert(this.hasComponent(b), "第二个子组件不在容器中");

            this.swapComponentsAt(this.getComponentIndex(a), this.getComponentIndex(b));
        }
        
        /**
         * 移除指定类型组件
         * @param type 组件类型
         */
        public removeComponentsByType<T extends Component>(type: new () => T): T[]
        {
            var removeComponents = [];
            for (var i = this.components_.length - 1; i >= 0; i--)
            {
                if (this.components_[i].type == type)
                    removeComponents.push(this.removeComponentAt(i));
            }
            return removeComponents;
        }

    }
}