namespace feng3d
{
    /**
	 * 渲染数据拥有者
	 * @author feng 2016-6-7
	 */
    export class RenderDataHolder extends EventDispatcher
    {
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

    export interface IRenderDataHolder
    {
        /**
         * 收集渲染数据拥有者
         */
        collectRenderDataHolder(renderAtomic: RenderAtomic);

		/**
		 * 更新渲染数据
		 */
        updateRenderData(renderContext: RenderContext, renderData: RenderAtomic);
    }
}