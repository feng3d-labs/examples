namespace feng3d
{
    export class UniformData<T>
    {
        public data: T;

        constructor(data: T)
        {
            this.data = data;
        }

        public static getUniformData<T>(data: T)
        {
            return new UniformData(data);
        }

        /**
         * 设置环境Uniform数据
         */
        public setContext3DUniform(gl: GL, activeInfo: WebGLActiveInfo)
        {
            var location = activeInfo.uniformLocation;
            var data = <any>this.data;
            switch (activeInfo.type)
            {
                case GL.INT:
                    gl.uniform1i(location, data);
                    break;
                case GL.FLOAT_MAT4:
                    gl.uniformMatrix4fv(location, false, data.rawData);
                    break;
                case GL.FLOAT:
                    gl.uniform1f(location, data);
                    break;
                case GL.FLOAT_VEC2:
                    gl.uniform2f(location, data.x, data.y);
                    break;
                case GL.FLOAT_VEC3:
                    gl.uniform3f(location, data.x, data.y, data.z);
                    break;
                case GL.FLOAT_VEC4:
                    gl.uniform4f(location, data.x, data.y, data.z, data.w);
                    break;
                case GL.SAMPLER_2D:
                case GL.SAMPLER_CUBE:
                    var textureInfo = <TextureInfo>data;
                    //激活纹理编号
                    gl.activeTexture(GL["TEXTURE" + activeInfo.textureID]);
                    textureInfo.active(gl);
                    //设置纹理所在采样编号
                    gl.uniform1i(location, activeInfo.textureID);
                    break;
                default:
                    throw `无法识别的uniform类型 ${activeInfo.name} ${data}`;
            }
        }
    }
}