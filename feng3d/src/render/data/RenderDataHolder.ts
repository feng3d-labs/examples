namespace feng3d
{
    /**
	 * 渲染数据拥有者
	 * @author feng 2016-6-7
	 */
    export class RenderDataHolder extends EventDispatcher
    {
        public createIndexBuffer(indices: Uint16Array)
        {
            return new IndexRenderData(indices);
        }

        public createUniformData<K extends keyof UniformRenderData>(name: K, data: UniformRenderData[K])
        {
            return new UniformData(name, data);
        }

        public createAttributeRenderData<K extends keyof AttributeRenderDataStuct>(name: K, data: Float32Array = null, stride: number = 3, divisor: number = 0)
        {
            return new AttributeRenderData(name, data, stride);
        }

        public createShaderCode(vertexCode: string, fragmentCode: string)
        {
            return new ShaderCode(vertexCode, fragmentCode);
        }

        public createValueMacro<K extends keyof ValueMacros>(name: K, value: number): ValueMacro
        {
            return { type: MacroType.value, name: name, value: value };
        }

        public createBoolMacro<K extends keyof BoolMacros>(name: K, value: boolean): BoolMacro
        {
            return { type: MacroType.bool, name: name, value: value };
        }

        public createAddMacro<K extends keyof IAddMacros>(name: K, value: number): AddMacro
        {
            return { type: MacroType.add, name: name, value: value };
        }

        /**
         * 是否每次必须更新
         */
        public get updateEverytime() { return this._updateEverytime; }
        protected _updateEverytime = false;

        private childrenRenderDataHolder: RenderDataHolder[] = [];

		/**
		 * 创建GL数据缓冲
		 */
        constructor()
        {
            super();
        }

        /**
         * 收集渲染数据拥有者
         * @param renderAtomic 渲染原子
         */
        public collectRenderDataHolder(renderAtomic: Object3DRenderAtomic = null)
        {
            renderAtomic.addRenderDataHolder(this);
        }

        public addRenderDataHolder(renderDataHolder: RenderDataHolder)
        {
            if (this.childrenRenderDataHolder.indexOf(renderDataHolder) == -1)
                this.childrenRenderDataHolder.push(renderDataHolder);
        }

        public removeRenderDataHolder(renderDataHolder: RenderDataHolder)
        {
            var index = this.childrenRenderDataHolder.indexOf(renderDataHolder);
            if (index != -1)
                this.childrenRenderDataHolder.splice(index, 1);
        }

		/**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {

        }

		/**
		 * 更新渲染数据
		 */
        public updateRenderShader(renderContext: RenderContext, renderData: RenderAtomic)
        {

        }

        protected invalidateRenderData()
        {
            this.dispatchEvent(new Event(Object3DRenderAtomic.INVALIDATE));
        }

        protected invalidateShader()
        {
            this.dispatchEvent(new Event(Object3DRenderAtomic.INVALIDATE_SHADER));
        }

        protected invalidateRenderHolder()
        {
            this.dispatchEvent(new Event(Object3DRenderAtomic.INVALIDATE_RENDERHOLDER));
        }
    }
}