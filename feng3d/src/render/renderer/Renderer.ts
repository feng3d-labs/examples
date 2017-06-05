namespace feng3d
{

    /**
     * 渲染器
     * @author feng 2016-05-01
     */
    export class Renderer
    {
        /**
		 * 渲染
		 */
        public draw(renderContext: RenderContext)
        {
            var scene3D = renderContext.scene3d;
            var renderers = scene3D.renderers;
            for (var i = 0; i < renderers.length; i++)
            {
                var element = renderers[i];
                this.drawRenderables(renderContext, element);
            }
        }

        protected drawRenderables(renderContext: RenderContext, meshRenderer: Model)
        {
            var object3D = meshRenderer.gameObject;
            //更新数据
            object3D.updateRender(renderContext);
            var gl = renderContext.gl;
            try
            {
                //绘制
                var material = meshRenderer.material;
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