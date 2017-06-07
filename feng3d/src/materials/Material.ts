namespace feng3d
{

    /**
     * 材质
     * @author feng 2016-05-02
     */
    export class Material extends RenderDataHolder
    {
        protected _pointSize = 1;
        protected _enableBlend = false;

        /**
        * 渲染模式，默认RenderMode.TRIANGLES
        */
        public get renderMode()
        {
            return this._renderMode;
        }
        public set renderMode(value)
        {
            this._renderMode = value;
            this.invalidateShader();
        }
        private _renderMode = RenderMode.TRIANGLES;

        /**
         * 顶点渲染程序代码
         */
        public get vertexCode()
        {
            return this._vertexCode;
        }
        public set vertexCode(value)
        {
            if (this._vertexCode == value)
                return;
            this._vertexCode = value;
            this.invalidateShader();
        }
        private _vertexCode: string;

        /**
         * 片段渲染程序代码
         */
        public get fragmentCode()
        {
            return this._fragmentCode;
        }
        public set fragmentCode(value)
        {
            if (this._fragmentCode == value)
                return;
            this._fragmentCode = value;
            this.invalidateShader();
        }
        private _fragmentCode: string;

        /**
         * 是否渲染双面
         */
        public bothSides = true;

        /**
         * 是否开启混合
         * <混合后的颜色> = <源颜色>*sfactor + <目标颜色>*dfactor
         */
        public get enableBlend()
        {
            return this._enableBlend;
        }

        public set enableBlend(value: boolean)
        {
            this._enableBlend = value;
        }

        /**
         * 点绘制时点的尺寸
         */
        public get pointSize()
        {
            return this._pointSize;
        }

        public set pointSize(value)
        {
            this._pointSize = value;
            this.invalidateRenderData();
        }

        /**
         * 混合方程，默认BlendEquation.FUNC_ADD
         */
        public blendEquation = BlendEquation.FUNC_ADD;

        /**
         * 源混合因子，默认BlendFactor.SRC_ALPHA
         */
        public sfactor = BlendFactor.SRC_ALPHA;

        /**
         * 目标混合因子，默认BlendFactor.ONE_MINUS_SRC_ALPHA
         */
        public dfactor = BlendFactor.ONE_MINUS_SRC_ALPHA;

        private _methods: RenderDataHolder[] = [];

        /**
         * 构建材质
         */
        constructor()
        {
            super();
        }

        /**
         * 设置渲染程序
         * @param shaderName 渲染程序名称
         */
        public setShader(shaderName: string)
        {
            this.vertexCode = ShaderLib.getShaderCode(shaderName + ".vertex");
            this.fragmentCode = ShaderLib.getShaderCode(shaderName + ".fragment")
        }

        /**
         * 添加方法
         */
        public addMethod(method: RenderDataHolder)
        {
            var index = this._methods.indexOf(method);
            if (index != -1)
                return;
            this._methods.push(method);
            this.addRenderDataHolder(method);
            this.invalidateRenderHolder();
        }

        /**
         * 删除方法
         */
        public removeMethod(method: RenderDataHolder)
        {
            var index = this._methods.indexOf(method);
            if (index != -1)
            {
                this._methods.splice(index, 1);
                this.removeRenderDataHolder(method);
                this.invalidateRenderData();
            }
        }

        /**
         * 收集渲染数据拥有者
         * @param renderAtomic 渲染原子
         */
        public collectRenderDataHolder(renderAtomic: Object3DRenderAtomic = null)
        {
            for (var i = 0; i < this._methods.length; i++)
            {
                this._methods[i].collectRenderDataHolder(renderAtomic);
            }
            super.collectRenderDataHolder(renderAtomic);
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderData(renderContext: RenderContext, renderData: RenderAtomic)
        {
            //
            renderData.addUniform(RenderData.getUniformData("u_PointSize",this.pointSize));
        }

        /**
		 * 更新渲染数据
		 */
        public updateRenderShader(renderContext: RenderContext, renderData: RenderAtomic)
        {
            //
            renderData.shader.shaderParams.renderMode = this.renderMode;

            renderData.shader.setShaderCode(new ShaderCode(this.vertexCode, this.fragmentCode));
            renderData.shader.addMacro(Macro.getBoolMacro("IS_POINTS_MODE", this.renderMode == RenderMode.POINTS));
        }
    }
}
