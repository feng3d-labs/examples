module feng3d
{
    /**
     * 渲染数据工具
     * @author feng 2016-05-02
     */
    export class RenderDataUtil
    {
        /**
         * 激活渲染数据
         * @param renderAtomic  渲染原子
         * @param renderData    包含渲染数据的对象
         */
        public static active(renderAtomic: RenderAtomic, renderData: RenderAtomic)
        {
            renderData.shader.vertexCode && (renderAtomic.shader.vertexCode = renderData.shader.vertexCode);
            renderData.shader.fragmentCode && (renderAtomic.shader.fragmentCode = renderData.shader.fragmentCode);
            renderData.indexBuffer && (renderAtomic.indexBuffer = renderData.indexBuffer);
            renderData.instanceCount && (renderAtomic.instanceCount = renderData.instanceCount);

            for (var attributeName in renderData.attributes)
            {
                renderAtomic.attributes[attributeName] = renderData.attributes[attributeName];
            }
            for (var uniformName in renderData.uniforms)
            {
                renderAtomic.uniforms[uniformName] = renderData.uniforms[uniformName];
            }
            for (var shaderParamName in renderData.shader.shaderParams)
            {
                renderAtomic.shader.shaderParams[shaderParamName] = renderData.shader.shaderParams[shaderParamName];
            }
            //ShaderMacro
            for (var boolMacroName in renderData.shader.shaderMacro.boolMacros)
            {
                renderAtomic.shader.shaderMacro.boolMacros[boolMacroName] = renderAtomic.shader.shaderMacro.boolMacros[boolMacroName] || renderData.shader.shaderMacro.boolMacros[boolMacroName];
            }
            for (var valueMacroName in renderData.shader.shaderMacro.valueMacros)
            {
                renderAtomic.shader.shaderMacro.valueMacros[valueMacroName] = renderData.shader.shaderMacro.valueMacros[valueMacroName];
            }
            for (var addMacroName in renderData.shader.shaderMacro.addMacros)
            {
                renderAtomic.shader.shaderMacro.addMacros[addMacroName] = renderAtomic.shader.shaderMacro.addMacros[addMacroName] + renderData.shader.shaderMacro.addMacros[addMacroName];
            }
        }

        /**
         * 释放渲染数据
         * @param renderAtomic  渲染原子
         * @param renderData    包含渲染数据的对象
         */
        public static deactivate(renderAtomic: RenderAtomic, renderData: RenderAtomic)
        {
            renderData.shader.vertexCode && (renderAtomic.shader.vertexCode = null);
            renderData.shader.fragmentCode && (renderAtomic.shader.fragmentCode = null);
            renderData.indexBuffer && (renderAtomic.indexBuffer = null);
            renderData.instanceCount && (delete renderAtomic.instanceCount);

            for (var attributeName in renderData.attributes)
            {
                delete renderAtomic.attributes[attributeName];
            }
            for (var uniformName in renderData.uniforms)
            {
                delete renderAtomic.uniforms[uniformName];
            }
            for (var shaderParamName in renderData.shader.shaderParams)
            {
                delete renderAtomic.shader.shaderParams[shaderParamName];
            }
            //ShaderMacro
            for (var boolMacroName in renderData.shader.shaderMacro.boolMacros)
            {
                delete renderAtomic.shader.shaderMacro.boolMacros[boolMacroName];
            }
            for (var valueMacroName in renderData.shader.shaderMacro.valueMacros)
            {
                delete renderAtomic.shader.shaderMacro.valueMacros[valueMacroName];
            }
            for (var addMacroName in renderData.shader.shaderMacro.addMacros)
            {
                renderAtomic.shader.shaderMacro.addMacros[addMacroName] = renderAtomic.shader.shaderMacro.addMacros[addMacroName] - renderData.shader.shaderMacro.addMacros[addMacroName];
            }
        }
    }
}