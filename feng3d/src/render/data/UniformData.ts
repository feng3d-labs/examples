module feng3d
{
    export abstract class UniformData
    {
        /**
         * 设置环境Uniform数据
         */
        public abstract setContext3DUniform(gl: GL, activeInfo: { name: string; uniformLocation: WebGLUniformLocation, type: number; });
    }
}