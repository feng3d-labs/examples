namespace feng3d
{

    /**
     * 地形材质
     * @author feng 2016-04-28
     */
    export class TerrainMergeMethod extends RenderDataHolder
    {
        public get splatMergeTexture()
        {
            return this._splatMergeTexture;
        }
        public set splatMergeTexture(value)
        {
            if (this._splatMergeTexture)
                this._splatMergeTexture.removeEventListener(Event.LOADED, this.onSplatTextureLoaded, this);
            this._splatMergeTexture = value;
            if (this._splatMergeTexture)
                this._splatMergeTexture.addEventListener(Event.LOADED, this.onSplatTextureLoaded, this);
            this.invalidateRenderData();
        }
        private _splatMergeTexture: Texture2D;

        public get blendTexture()
        {
            return this._blendTexture;
        }
        public set blendTexture(value)
        {
            if (this._blendTexture)
                this._blendTexture.removeEventListener(Event.LOADED, this.onBlendTextureLoaded, this);
            this._blendTexture = value;
            if (this._blendTexture)
                this._blendTexture.addEventListener(Event.LOADED, this.onBlendTextureLoaded, this);
            this.invalidateRenderData();
        }
        private _blendTexture: Texture2D;

        public get splatRepeats()
        {
            return this._splatRepeats;
        }
        public set splatRepeats(value)
        {
            this._splatRepeats = value;
            this.invalidateRenderData();
        }
        private _splatRepeats: Vector3D;

        /**
         * 构建材质
         */
        constructor(blendUrl = "", splatMergeUrl = "", splatRepeats = new Vector3D(1, 1, 1, 1))
        {
            super();
            this.blendTexture = new Texture2D(blendUrl);

            this.splatMergeTexture = new Texture2D(splatMergeUrl || "");

            this.splatMergeTexture.minFilter = GL.NEAREST;
            this.splatMergeTexture.magFilter = GL.NEAREST;
            this.splatMergeTexture.wrapS = GL.REPEAT;
            this.splatMergeTexture.wrapT = GL.REPEAT;

            this.splatRepeats = splatRepeats;
        }

        private onSplatTextureLoaded()
        {
            this.invalidateRenderData();
        }

        private onBlendTextureLoaded()
        {
            this.invalidateRenderData();
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {
            renderData.addUniform("s_blendTexture", UniformData.getUniformData(this.blendTexture));
            renderData.addUniform("s_splatMergeTexture", UniformData.getUniformData(this.splatMergeTexture));
            renderData.addUniform("u_splatMergeTextureSize", UniformData.getUniformData(this.splatMergeTexture.size));
            renderData.addUniform("u_splatRepeats", UniformData.getUniformData(this.splatRepeats));
            //
            renderData.addUniform("u_imageSize", UniformData.getUniformData(new Point(2048.0, 1024.0)));
            renderData.addUniform("u_tileSize", UniformData.getUniformData(new Point(512.0, 512.0)));
            renderData.addUniform("u_maxLod", UniformData.getUniformData(7));
            renderData.addUniform("u_uvPositionScale", UniformData.getUniformData(0.001));
            renderData.addUniform("u_tileOffset", UniformData.getUniformData([
                new Vector3D(0.5, 0.5, 0.0, 0.0),
                new Vector3D(0.5, 0.5, 0.5, 0.0),
                new Vector3D(0.5, 0.5, 0.0, 0.5),
            ]));
            renderData.addUniform("u_lod0vec", UniformData.getUniformData(new Vector3D(0.5, 1, 0, 0)));

            super.updateRenderData(renderContext, renderData);
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderShader(renderContext: RenderContext, renderData: RenderAtomic)
        {
            renderData.shader.addMacro(Macro.getBoolMacro("HAS_TERRAIN_METHOD", true));
            renderData.shader.addMacro(Macro.getBoolMacro("USE_TERRAIN_MERGE", true));
        }
    }
}