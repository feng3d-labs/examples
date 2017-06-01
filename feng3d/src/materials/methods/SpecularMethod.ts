module feng3d
{
	/**
	 * 法线函数
	 * @author feng 2017-03-22
	 */
    export class SpecularMethod extends RenderDataHolder
    {
        /**
         * 镜面反射光泽图
         */
        public get specularTexture()
        {
            return this._specularTexture;
        }
        public set specularTexture(value)
        {
            if (this._specularTexture)
                this._specularTexture.removeEventListener(Event.LOADED, this.onLoaded, this);
            this._specularTexture = value;
            if (this._specularTexture)
                this._specularTexture.addEventListener(Event.LOADED, this.onLoaded, this);
            this.invalidateRenderData();
            this.invalidateShader();
        }
        private _specularTexture: Texture2D;
        /**
         * 镜面反射颜色
         */
        public specularColor = new Color();
        /**
		 * 镜面反射光反射强度
		 */
        public get specular()
        {
            return this.specularColor.a;
        }
        public set specular(value)
        {
            this.specularColor.a = value;
        }
        /**
         * 高光系数
         */
        public glossiness = 50;

        /**
         * 构建
         */
        constructor(specularUrl = "")
        {
            super();
            this.specularTexture = new Texture2D(specularUrl);
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
            renderData.uniforms.s_specular = this.specularTexture;
            renderData.uniforms.u_specular = this.specularColor;
            renderData.uniforms.u_glossiness = this.glossiness;
            //
            super.updateRenderData(renderContext, renderData);
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderShader(renderContext: RenderContext, renderData: RenderAtomic)
        {
            renderData.shader.shaderMacro.boolMacros.HAS_SPECULAR_SAMPLER = this.specularTexture.checkRenderData();
        }
    }
}