module feng3d {
	/**
	 * 环境映射函数
	 */
    export class EnvMapMethod extends RenderDataHolder
    {
        private _cubeTexture: TextureCube;
        private _alpha: number;
        
        /**
		 * 创建EnvMapMethod实例
		 * @param envMap		环境映射贴图
		 * @param alpha			反射率
		 */
        constructor(envMap: TextureCube, alpha: number = 1){
            super();
            this._cubeTexture = envMap;
            this.alpha = alpha;
        }

        /**
		 * 环境映射贴图
		 */
        public get envMap(){
            return this._cubeTexture;
        }

        public set envMap(value) {
            this._cubeTexture = value;
            this.invalidateRenderData();
        }

        /**
		 * 反射率
		 */
        public get alpha(): number {
            return this._alpha;
        }

        public set alpha(value: number) {
            this._alpha = value;
            // this._envMapData[0] = this._alpha;
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {
            // renderData.uniforms[RenderDataID.u_diffuse] = this.color;

            // if (this.difuseTexture.checkRenderData())
            // {
            //     renderData.uniforms[RenderDataID.s_diffuse] = this.difuseTexture;
            //     renderData.shaderMacro.boolMacros.HAS_DIFFUSE_SAMPLER = true;
            // } else
            // {
            //     renderData.uniforms[RenderDataID.s_diffuse] = null;
            //     renderData.shaderMacro.boolMacros.HAS_DIFFUSE_SAMPLER = false;
            // }
            // renderData.uniforms[RenderDataID.u_alphaThreshold] = this.alphaThreshold;

            //
            super.updateRenderData(renderContext, renderData);
        }
    }
}