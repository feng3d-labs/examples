namespace feng3d
{
    export class FogMethod extends RenderDataHolder
    {
        /**
		 * 出现雾效果的最近距离
		 */
        public get minDistance()
        {
            return this._minDistance;
        }
        public set minDistance(value)
        {
            this._minDistance = value;
            this.invalidateRenderData();
        }
        private _minDistance = 0;
		/**
		 * 最远距离
		 */
        public get maxDistance()
        {
            return this._maxDistance;
        }
        public set maxDistance(value)
        {
            this._maxDistance = value;
            this.invalidateRenderData();
        }
        private _maxDistance = 100;
        /**
		 * 雾的颜色
		 */
        public get fogColor()
        {
            return this._fogColor;
        }
        public set fogColor(value)
        {
            this._fogColor = value;
            this.invalidateRenderData();
        }
        private _fogColor: Color;
        public get density()
        {
            return this._density;
        }
        public set density(value)
        {
            this.density = value;
            this.invalidateRenderData();
        }
        private _density: number;
        /**
         * 雾模式
         */
        public get mode()
        {
            return this._mode;
        }
        public set mode(value)
        {
            this._mode = value;
            this.invalidateRenderData();
        }
        private _mode: FogMode;

        /**
         * @param fogColor      雾颜色
         * @param minDistance   雾近距离
         * @param maxDistance   雾远距离
         * @param density       雾浓度
         */
        constructor(fogColor: Color = new Color(), minDistance = 0, maxDistance = 100, density = 0.1, mode = FogMode.LINEAR)
        {
            super();
            this._fogColor = fogColor;
            this._minDistance = minDistance;
            this._maxDistance = maxDistance;
            this._density = density;
            this._mode = mode;
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {
            renderData.addUniform
            renderData.addUniform("u_fogColor", UniformData.getUniformData(this._fogColor));
            renderData.addUniform("u_fogMinDistance", UniformData.getUniformData(this._minDistance));
            renderData.addUniform("u_fogMaxDistance", UniformData.getUniformData(this._maxDistance));
            renderData.addUniform("u_fogDensity", UniformData.getUniformData(this._density));
            renderData.addUniform("u_fogMode", UniformData.getUniformData(this._mode));
            //
            super.updateRenderData(renderContext, renderData);
        }

		/**
		 * 更新渲染数据
		 */
        public updateRenderShader(renderContext: RenderContext, renderData: RenderAtomic)
        {
            //
            renderData.shader.shaderMacro.boolMacros.HAS_FOG_METHOD = true;
            renderData.shader.shaderMacro.addMacros.V_GLOBAL_POSITION_NEED++;
        }
    }

    /**
     * 雾模式
     */
    export enum FogMode
    {
        NONE = 0,
        EXP = 1,
        EXP2 = 2,
        LINEAR = 3
    }
}