module feng3d
{

    /**
     * 颜色材质
     * @author feng 2016-05-02
     */
    export class ColorMaterial extends Material
    {
        /** 
         * 颜色 
         */
        public color: Color;

        /**
         * 构建颜色材质
         * @param color 颜色
         * @param alpha 透明的
         */
        constructor(color: Color = null)
        {
            super();
            this.setShader("color");
            
            this.color = color || new Color();

            Watcher.watch(this, ["color"], this.invalidateRenderData, this);
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {
            renderData.uniforms.u_diffuseInput = this.color;
            super.updateRenderData(renderContext, renderData);
        }
    }
}