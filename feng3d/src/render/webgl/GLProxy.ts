module feng3d
{
    export class GLProxy
    {
        public canvas: HTMLCanvasElement;
        public gl: GL;
        public webgl2: boolean;

        constructor(canvas: HTMLCanvasElement, options = null)
        {
            var gl = this.getWebGLContext(canvas, options);
            this.initWebGLExtension(gl);
            //
            Object.defineProperty(this, "canvas", { value: canvas });
            Object.defineProperty(this, "gl", { value: gl });
            Object.defineProperty(gl, "proxy", { value: this });
            Object.defineProperty(gl, "uuid", { value: Math.generateUUID() });
            //
            this.supportIphone(gl);
            this.extensionWebGL(gl);
        }

        /** 
         * Initialize and get the rendering for WebGL
         * @param canvas <cavnas> element
         * @param opt_debug flag to initialize the context for debugging
         * @return the rendering context for WebGL
         */
        private getWebGLContext(canvas: HTMLCanvasElement, options = null)
        {
            var preferWebGl2 = (options && options.preferWebGl2 !== undefined) ? options.preferWebGl2 : true;
            preferWebGl2 = false;
            var names = preferWebGl2 ? ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"] : ["webgl", "experimental-webgl"];
            var gl = null;
            for (var i = 0; i < names.length; ++i)
            {
                try
                {
                    gl = canvas.getContext(names[i], options);
                } catch (e) { }
                if (gl)
                {
                    Object.defineProperty(this, "webgl2", { value: preferWebGl2 && i < 2 });
                    break;
                }
            }
            if (!gl)
            {
                throw "无法初始化WEBGL";
            }
            return gl;
        }

        /**
         * 在iphone中WebGLRenderingContext中静态变量值值未定义，因此此处初始化来支持iphone
         * @param gl WebGL对象
         */
        private supportIphone(gl: GL)
        {
            for (var key in gl)
            {
                var element = gl[key];
                if (typeof element == "number")
                {
                    GL[key] = element;
                }
            }
        }

        private extensionWebGL(gl: GL)
        {
            if (!this.webgl2)
            {
                var ext = gl.getExtension('OES_standard_derivatives');
                var ext1 = gl.getExtension('EXT_shader_texture_lod');
                gl.vertexAttribDivisor = function (index: number, divisor: number)
                {
                    var _ext = gl.getExtension('ANGLE_instanced_arrays');
                    _ext.vertexAttribDivisorANGLE(index, divisor);
                };

                gl.drawElementsInstanced = function (mode: number, count: number, type: number, offset: number, instanceCount: number)
                {
                    var _ext = gl.getExtension('ANGLE_instanced_arrays');
                    _ext.drawElementsInstancedANGLE(mode, count, type, offset, instanceCount);
                };
            }
        }

        /**
         * 初始化WebGL扩展
         * @param gl WebGL
         */
        private initWebGLExtension(gl: GL)
        {
            //
            var anisotropicExt: EXTTextureFilterAnisotropic;
            gl.ext = {
                getAnisotropicExt: function ()
                {
                    if (anisotropicExt !== undefined) return anisotropicExt;
                    anisotropicExt =
                        (
                            gl.getExtension('EXT_texture_filter_anisotropic') ||
                            gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
                            gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
                        );
                    this.initAnisotropicExt(gl, anisotropicExt);
                    return anisotropicExt;
                }
            };
        }

        /**
         * 初始化纹理各向异性过滤扩展
         * @param gl WebGL
         * @param anisotropicExt 纹理各向异性过滤扩展
         */
        private initAnisotropicExt(gl: GL, anisotropicExt: EXTTextureFilterAnisotropic)
        {
            var maxAnisotropy: number;
            anisotropicExt.getMaxAnisotropy = () =>
            {
                if (maxAnisotropy !== undefined) return maxAnisotropy;
                maxAnisotropy = gl.getParameter(anisotropicExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                return maxAnisotropy;
            }
        }
    }
}