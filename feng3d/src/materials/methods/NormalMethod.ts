namespace feng3d
{
	/**
	 * 法线函数
	 * @author feng 2017-03-22
	 */
    export class NormalMethod extends RenderDataHolder
    {
        /**
         * 漫反射纹理
         */
        public get normalTexture()
        {
            return this._normalTexture;
        }
        public set normalTexture(value)
        {
            if (this._normalTexture)
                this._normalTexture.removeEventListener(Event.LOADED, this.onLoaded, this);
            this._normalTexture = value;
            if (this._normalTexture)
                this._normalTexture.addEventListener(Event.LOADED, this.onLoaded, this);
            this.invalidateShader();
        }
        private _normalTexture: Texture2D;

        /**
         * 构建
         */
        constructor(normalUrl: string = "")
        {
            super();
            this.normalTexture = new Texture2D(normalUrl);
            //
            this.createUniformData("s_normal", () => this.normalTexture);
            this.createBoolMacro("HAS_NORMAL_SAMPLER", () => this.normalTexture.checkRenderData());
        }

        /**
         * 加载完成
         */
        private onLoaded()
        {
            this.invalidateShader();
        }
    }
}