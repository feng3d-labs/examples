namespace feng3d
{

    /**
     * 渲染器
     * @author feng 2016-05-01
     */
    export class Renderer extends Component
    {
        private static renderers: Renderer[] = [];

        /**
         * 材质
         * Returns the first instantiated Material assigned to the renderer.
         */
        public get material() { return this._material || defaultMaterial; }
        public set material(value) { this._material = value; this.invalidateRenderHolder(); }
        private _material: Material;

        /**
         * Makes the rendered 3D object visible if enabled.
         */
        public get enabled()
        {
            return this._enabled;
        }
        public set enable(value)
        {
            this._enabled = value;
        }
        private _enabled: boolean;

        /**
         * Is this renderer visible in any camera? (Read Only)
         */
        public get isVisible()
        {
            return this.gameObject.transform.visible;
        }

        constructor()
        {
            super();
            Renderer.renderers.push(this);
        }

        public drawRenderables(renderContext: RenderContext)
        {
            var object3D = this.gameObject;
            //更新数据
            object3D.updateRender(renderContext);
            var gl = renderContext.gl;
            try
            {
                //绘制
                var material = this.material;
                if (material.enableBlend)
                {
                    //
                    gl.enable(GL.BLEND);
                    gl.blendEquation(material.blendEquation);
                    gl.depthMask(false);
                    gl.blendFunc(material.sfactor, material.dfactor);
                } else
                {
                    gl.disable(GL.BLEND);
                    gl.depthMask(true);
                }
                this.drawObject3D(gl, object3D.renderData);            //
            } catch (error)
            {
                console.log(error);
            }
        }

        /**
         * 绘制3D对象
         */
        protected drawObject3D(gl: GL, renderAtomic: RenderAtomic, shader: ShaderRenderData = null)
        {
            shader = shader || renderAtomic.shader;
            var shaderProgram = shader.activeShaderProgram(gl);
            if (!shaderProgram)
                return;
            //
            renderAtomic.attributes.activeAttributes(gl, shaderProgram.attributes);
            renderAtomic.uniforms.activeUniforms(gl, shaderProgram.uniforms);
            dodraw(gl, renderAtomic.shader.shaderParams, renderAtomic.indexBuffer, renderAtomic.instanceCount);
        }

        /**
         * 收集渲染数据拥有者
         * @param renderAtomic 渲染原子
         */
        public collectRenderDataHolder(renderAtomic: Object3DRenderAtomic = null)
        {
            this.material.collectRenderDataHolder(renderAtomic);
            super.collectRenderDataHolder(renderAtomic);
        }
    }

    /**
     */
    function dodraw(gl: GL, shaderParams: ShaderParams, indexBuffer: IndexRenderData, instanceCount: number = 1)
    {
        instanceCount = ~~instanceCount;

        indexBuffer.active(gl);

        var renderMode = shaderParams.renderMode;
        if (instanceCount > 1)
        {
            gl.drawElementsInstanced(renderMode, indexBuffer.count, indexBuffer.type, indexBuffer.offset, instanceCount);
        }
        else
        {
            gl.drawElements(renderMode, indexBuffer.count, indexBuffer.type, indexBuffer.offset);
        }
    }
}