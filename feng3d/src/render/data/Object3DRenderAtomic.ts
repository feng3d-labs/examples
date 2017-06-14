namespace feng3d
{
    export class Object3DRenderAtomic extends RenderAtomic
    {
        /**
         * 数据是否失效，需要重新收集数据
         */
        public static INVALIDATE = "invalidate";
        /**
         * 添加渲染元素
         */
        public static ADD_RENDERELEMENT = "addRenderElement";
        /**
         * 移除渲染元素
         */
        public static REMOVE_RENDERELEMENT = "removeRenderElement";
        /**
         * 添加渲染数据拥有者
         */
        public static ADD_RENDERHOLDER = "addRenderHolder";
        /**
         * 移除渲染数据拥有者
         */
        public static REMOVE_RENDERHOLDER = "removeRenderHolder";
        /**
         * shader失效，需要重新收集shader数据
         */
        public static INVALIDATE_SHADER = "invalidateShader";

        private _invalidateRenderDataHolderList: RenderDataHolder[] = [];
        public renderHolderInvalid = true;

        private onInvalidate(event: Event)
        {
            var renderDataHolder = <RenderDataHolder>event.target;
            this.addInvalidateHolders(renderDataHolder);
        }

        private onAddElement(event: Event)
        {
            this.addRenderElement(event.data);
        }

        private onRemoveElement(event: Event)
        {
            this.removeRenderElement(event.data);
        }

        private onInvalidateShader(event: Event)
        {
            var renderDataHolder = <RenderDataHolder>event.target;
            this.addInvalidateShader(renderDataHolder);
        }

        private onAddRenderHolder(event: Event)
        {
            this.renderHolderInvalid = true;
            this.addRenderDataHolder(event.data);
        }

        private onRemoveRenderHolder(event: Event)
        {
            this.renderHolderInvalid = true;
            this.removeRenderDataHolder(event.data);
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
            this.invalidateShader();
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
            this.addRenderElement(renderDataHolder.elements);
            this.addInvalidateHolders(renderDataHolder);
            this.addInvalidateShader(renderDataHolder);
            renderDataHolder.addEventListener(Object3DRenderAtomic.INVALIDATE, this.onInvalidate, this);
            renderDataHolder.addEventListener(Object3DRenderAtomic.ADD_RENDERELEMENT, this.onAddElement, this);
            renderDataHolder.addEventListener(Object3DRenderAtomic.REMOVE_RENDERELEMENT, this.onRemoveElement, this);
            renderDataHolder.addEventListener(Object3DRenderAtomic.INVALIDATE_SHADER, this.onInvalidateShader, this);
            renderDataHolder.addEventListener(Object3DRenderAtomic.ADD_RENDERHOLDER, this.onAddRenderHolder, this);
            renderDataHolder.addEventListener(Object3DRenderAtomic.REMOVE_RENDERHOLDER, this.onRemoveRenderHolder, this);
        }

        public removeRenderDataHolder(renderDataHolder: RenderDataHolder)
        {
            var index = this.renderDataHolders.indexOf(renderDataHolder);
            if (index != -1)
                this.renderDataHolders.splice(index, 1);
            if (renderDataHolder.updateEverytime)
            {
                let index = this.updateEverytimeList.indexOf(renderDataHolder);
                if (index != -1)
                    this.updateEverytimeList.splice(index, 1);
            }
            this.removeRenderElement(renderDataHolder.elements);
            this.addInvalidateShader(renderDataHolder);
            renderDataHolder.removeEventListener(Object3DRenderAtomic.INVALIDATE, this.onInvalidate, this);
            renderDataHolder.removeEventListener(Object3DRenderAtomic.ADD_RENDERELEMENT, this.onAddElement, this);
            renderDataHolder.removeEventListener(Object3DRenderAtomic.REMOVE_RENDERELEMENT, this.onRemoveElement, this);
            renderDataHolder.removeEventListener(Object3DRenderAtomic.INVALIDATE_SHADER, this.onInvalidateShader, this);
            renderDataHolder.removeEventListener(Object3DRenderAtomic.ADD_RENDERHOLDER, this.onAddRenderHolder, this);
            renderDataHolder.removeEventListener(Object3DRenderAtomic.REMOVE_RENDERHOLDER, this.onRemoveRenderHolder, this);
        }

        public update(renderContext: RenderContext)
        {
            renderContext.updateRenderData1(this);
            if (this.updateEverytimeList.length > 0)
            {
                this.updateEverytimeList.forEach(element =>
                {
                    element.updateRenderData(renderContext, this);
                    this.addRenderElement(element.elements);
                });
            }
            if (this._invalidateRenderDataHolderList.length > 0)
            {
                this._invalidateRenderDataHolderList.forEach(element =>
                {
                    element.updateRenderData(renderContext, this);
                    this.addRenderElement(element.elements);
                });
                this._invalidateRenderDataHolderList.length = 0;
            }
        }

        public clear()
        {
            this.renderDataHolders.forEach(element =>
            {
                this.removeRenderDataHolder(element);
            });
        }
    }
}