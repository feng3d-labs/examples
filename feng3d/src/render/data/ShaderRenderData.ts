module feng3d
{
    export class ShaderRenderData
    {
        /**
         * 顶点渲染程序代码
         */
        public vertexCode: string;

        /**
         * 片段渲染程序代码
         */
        public fragmentCode: string;

        /**
         * 渲染参数
         */
        public shaderParams: ShaderParams = <any>{};

        /**
         * 着色器宏定义
         */
        public shaderMacro = new ShaderMacro();

        /**
         * 激活渲染程序
         */
        public activeShaderProgram(gl: GL)
        {
            if (!this.vertexCode || !this.fragmentCode)
                return null;

            var vertexCode = this.vertexCode;
            var fragmentCode = this.fragmentCode;

            //应用宏
            var shaderMacroStr = ShaderLib.getMacroCode(this.shaderMacro);
            vertexCode = vertexCode.replace(/#define\s+macros/, shaderMacroStr);
            fragmentCode = fragmentCode.replace(/#define\s+macros/, shaderMacroStr);
            //渲染程序
            var shaderProgram = context3DPool.getWebGLProgram(gl, vertexCode, fragmentCode);
            gl.useProgram(shaderProgram);
            return shaderProgram;
        }
    }
}