module feng3d
{

    /**
     * 渲染原子（该对象会收集一切渲染所需数据以及参数）
     * @author feng 2016-06-20
     */
    export class RenderAtomic
    {
        /**
         * 顶点索引缓冲
         */
        public indexBuffer: IndexRenderData;

        /**
         * 渲染程序
         */
        public shader = new ShaderRenderData();

        /**
         * 属性数据列表
         */
        public attributes = new AttributeRenderDataStuct();

        /**
         * Uniform渲染数据
         */
        public uniforms = new UniformRenderData();

        /**
         * 渲染实例数量
         */
        public instanceCount: number;

        constructor(){}

        public invalidateShader()
        {
            this.shader.invalidate();
        }
    }

    export class Object3DRenderAtomic extends RenderAtomic
    {
        /**
         * 数据是否失效，需要重新收集数据
         */
        public static INVALIDATE = "invalidate";
        /**
         * 渲染拥有者失效，需要重新收集渲染数据拥有者
         */
        public static INVALIDATE_RENDERHOLDER = "invalidateRenderHolder";
        /**
         * shader失效，需要重新收集shader数据
         */
        public static INVALIDATE_SHADER = "invalidateShader";

        private _invalidateRenderDataHolderList: RenderDataHolder[] = [];
        private _invalidateShaderList: RenderDataHolder[] = [];
        public renderHolderInvalid = true;

        private onInvalidate(event: Event)
        {
            var renderDataHolder = <RenderDataHolder>event.target;
            this.addInvalidateHolders(renderDataHolder);
        }

        private onInvalidateShader(event: Event)
        {
            var renderDataHolder = <RenderDataHolder>event.target;
            this.addInvalidateShader(renderDataHolder);
        }

        private onInvalidateRenderHolder()
        {
            this.renderHolderInvalid = true;
        }

        private addInvalidateHolders(renderDataHolder: RenderDataHolder)
        {
            if (this._invalidateRenderDataHolderList.indexOf(renderDataHolder) == -1)
            {
                this._invalidateRenderDataHolderList.push(renderDataHolder)
            }
        }

        private addInvalidateShader(renderDataHolder: RenderDataHolder)
        {
            if (this._invalidateShaderList.indexOf(renderDataHolder) == -1)
            {
                this._invalidateShaderList.push(renderDataHolder)
            }
        }

        private renderDataHolders: RenderDataHolder[] = [];
        private updateEverytimeList: RenderDataHolder[] = [];

        public addRenderDataHolder(renderDataHolder: RenderDataHolder)
        {
            this.renderDataHolders.push(renderDataHolder);
            if (renderDataHolder.updateEverytime)
            {
                this.updateEverytimeList.push(renderDataHolder);
            }
            this.addInvalidateHolders(renderDataHolder);
            this.addInvalidateShader(renderDataHolder);
            renderDataHolder.addEventListener(Object3DRenderAtomic.INVALIDATE, this.onInvalidate, this)
            renderDataHolder.addEventListener(Object3DRenderAtomic.INVALIDATE_SHADER, this.onInvalidateShader, this)
            renderDataHolder.addEventListener(Object3DRenderAtomic.INVALIDATE_RENDERHOLDER, this.onInvalidateRenderHolder, this)
        }

        public update(renderContext: RenderContext)
        {
            renderContext.updateRenderData(this);
            if(this.updateEverytimeList.length > 0)
            {
                this.updateEverytimeList.forEach(element =>
                {
                    element.updateRenderData(renderContext, this);
                });
            }
            if(this._invalidateRenderDataHolderList.length > 0)
            {
                this._invalidateRenderDataHolderList.forEach(element =>
                {
                    element.updateRenderData(renderContext, this);
                });
                this._invalidateRenderDataHolderList.length = 0;
            }
            //
            if(this._invalidateShaderList.length > 0)
            {
                this._invalidateShaderList.forEach(element =>
                {
                    element.updateRenderShader(renderContext, this);
                });
                this.invalidateShader();
                this._invalidateShaderList.length = 0;
            }
        }

        public clear()
        {
            this.renderDataHolders.forEach(element =>
            {
                element.removeEventListener(Object3DRenderAtomic.INVALIDATE, this.onInvalidate, this)
                element.removeEventListener(Object3DRenderAtomic.INVALIDATE_SHADER, this.onInvalidateShader, this)
                element.removeEventListener(Object3DRenderAtomic.INVALIDATE_RENDERHOLDER, this.onInvalidateRenderHolder, this)
            });

            this.renderDataHolders.length = 0;
            this.updateEverytimeList.length = 0;
        }
    }
}