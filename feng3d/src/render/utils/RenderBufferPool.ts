module feng3d
{

    /**
     * 对象池
     * @author feng 2016-04-26
     */
    export class RenderBufferPool
    {

        /**
         * @param gl     3D环境
         */
        private getContext3DBufferPool(gl: GL)
        {
            return this.context3DBufferPools[gl.uuid] = this.context3DBufferPools[gl.uuid] || new Context3DBufferPool(gl);
        }

        /**
         * 获取渲染程序
         * @param gl     3D环境
         * @param vertexCode    顶点着色器代码
         * @param fragmentCode  片段着色器代码
         * @return  渲染程序
         */
        public getWebGLProgram(gl: GL, vertexCode: string, fragmentCode: string): WebGLProgram
        {
            return this.getContext3DBufferPool(gl).getWebGLProgram(vertexCode, fragmentCode);
        }

        /**
         * 3D环境缓冲池
         */
        private context3DBufferPools: { [context3DUID: string]: Context3DBufferPool } = {};
    }

    /**
     * 3D环境缓冲池
     */
    class Context3DBufferPool
    {

        /**
         * 3D环境
         */
        private gl: GL;

        /**
         * 构建3D环境缓冲池
         * @param gl         3D环境
         */
        constructor(gl: GL)
        {
            this.gl = gl;
        }

	    /**
         * 获取渲染程序
         * @param vertexCode    顶点着色器代码
         * @param fragmentCode  片段着色器代码
         * @return  渲染程序
         */
        public getWebGLProgram(vertexCode: string, fragmentCode: string): WebGLProgram
        {
            //获取3D环境唯一标识符
            var shaderCode = [vertexCode, fragmentCode].join("\n--- shaderCode ---\n");
            //获取3D环境中的渲染程序对象池
            return this._webGLProgramPool[shaderCode] = this._webGLProgramPool[shaderCode] || this.gl.createProgram(vertexCode, fragmentCode);
        }

        /** 渲染程序对象池 */
        private _webGLProgramPool: { [shaderCode: string]: WebGLProgram } = {};
    }
}