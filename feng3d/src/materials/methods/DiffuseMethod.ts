namespace feng3d
{
	/**
	 * 漫反射函数
	 * @author feng 2017-03-22
	 */
    export class DiffuseMethod extends RenderDataHolder
    {
        /**
         * 漫反射纹理
         */
        public get difuseTexture()
        {
            return this._difuseTexture;
        }
        public set difuseTexture(value)
        {
            if (this._difuseTexture)
                this.difuseTexture.removeEventListener(Event.LOADED, this.onLoaded, this);
            this._difuseTexture = value;
            if (this._difuseTexture)
                this.difuseTexture.addEventListener(Event.LOADED, this.onLoaded, this);
            this.invalidateRenderData();
            this.invalidateShader();
        }
        private _difuseTexture: Texture2D;

        /**
         * 基本颜色
         */
        public get color()
        {
            return this._color;
        }
        public set color(value)
        {
            this._color = value;
            this.invalidateRenderData();
        }
        private _color = new Color(1, 1, 1, 1);

        /**
         * 透明阈值，透明度小于该值的像素被片段着色器丢弃
         */
        public get alphaThreshold()
        {
            return this._alphaThreshold;
        }
        public set alphaThreshold(value)
        {
            this._alphaThreshold = value;
            this.invalidateRenderData();
        }
        private _alphaThreshold = 0;

        /**
         * 构建
         */
        constructor(diffuseUrl: string = "")
        {
            super();
            this.difuseTexture = new Texture2D(diffuseUrl);
            this.color = new Color(1, 1, 1, 1);
        }

        private onLoaded()
        {
            this.invalidateRenderData();
            this.invalidateShader();
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {
            renderData.addUniform(RenderData.createUniformData("u_diffuse",this.color));
            renderData.addUniform(RenderData.createUniformData("s_diffuse",this.difuseTexture));
            renderData.addUniform(RenderData.createUniformData("u_alphaThreshold",this.alphaThreshold));
            //
            super.updateRenderData(renderContext, renderData);
        }

		/**
		 * 更新渲染数据
		 */
        public updateRenderShader(renderContext: RenderContext, renderData: RenderAtomic)
        {
            renderData.shader.addMacro(RenderData.createBoolMacro("HAS_DIFFUSE_SAMPLER", this.difuseTexture.checkRenderData()));
        }
    }
}