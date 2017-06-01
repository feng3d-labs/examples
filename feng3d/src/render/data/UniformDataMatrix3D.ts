module feng3d
{
    export class UniformDataMatrix3D extends UniformData
    {
        public data:Matrix3D;

        constructor(data:Matrix3D)
        {
            super();
            this.data = data;
        }

        /**
         * 设置环境Uniform数据
         */
        public setContext3DUniform(gl: GL, activeInfo: { name: string; uniformLocation: WebGLUniformLocation, type: number; })
        {
            gl.uniformMatrix4fv(location, false, this.data.rawData);
        }
    }
}