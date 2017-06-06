namespace feng3d
{

    /**
     * 纹理材质
     * @author feng 2016-12-23
     */
    export class TextureMaterial extends Material
    {
        /**
         * 纹理数据
         */
        public get texture()
        {
            return this._texture;
        }
        public set texture(value)
        {
            if (this._texture == value)
                return;
            this._texture = value;
            this.invalidateRenderData();
        }
        private _texture: Texture2D;

        constructor()
        {
            super();
            this.setShader("texture");
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {
            renderData.uniforms.s_texture = UniformData.getUniformData(this.texture);
            super.updateRenderData(renderContext, renderData);
        }
    }
}