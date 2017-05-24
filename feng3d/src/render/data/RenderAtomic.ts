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
         * 渲染代码
         */
        public get shaderCode ()
        {
            return this._shaderCode;
        }
        public set shaderCode(value)
        {
            if(this._shaderCode == value)
                return;
            if(this._shaderCode)
            this._shaderCode.removeEventListener(Event.CHANGE,this.onShaderChange,this);
            this._shaderCode = value;
            if(this._shaderCode)
            this._shaderCode.addEventListener(Event.CHANGE,this.onShaderChange,this);
        }

        private _shaderCode : ShaderCode;

        /**
         * 渲染实例数量
         */
        public instanceCount: number;

        constructor(){}

        private _shaderInvalid = true;
        private onShaderChange()
        {
            this._shaderInvalid = true;
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

        private _invalidateRenderDataHolderList: RenderDataHolder[] = [];
        public renderHolderInvalid = true;

        private invalidate(event: Event)
        {
            var renderDataHolder = <RenderDataHolder>event.target;
            this.addInvalidateHolders(renderDataHolder);
        }

        private invalidateRenderHolder()
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
            renderDataHolder.addEventListener(Object3DRenderAtomic.INVALIDATE, this.invalidate, this)
            renderDataHolder.addEventListener(Object3DRenderAtomic.INVALIDATE_RENDERHOLDER, this.invalidateRenderHolder, this)
        }

        public update(renderContext: RenderContext)
        {
            renderContext.updateRenderData(this);
            this.updateEverytimeList.forEach(element =>
            {
                element.updateRenderData(renderContext, this);
            });
            this._invalidateRenderDataHolderList.forEach(element =>
            {
                element.updateRenderData(renderContext, this);
            });
            this._invalidateRenderDataHolderList.length = 0;
        }

        public clear()
        {
            this.renderDataHolders.forEach(element =>
            {
                element.removeEventListener(Object3DRenderAtomic.INVALIDATE, this.invalidate, this)
                element.removeEventListener(Object3DRenderAtomic.INVALIDATE_RENDERHOLDER, this.invalidateRenderHolder, this)
            });

            this.renderDataHolders.length = 0;
            this.updateEverytimeList.length = 0;
        }
    }
}