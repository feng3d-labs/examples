namespace feng3d
{

    export class ShaderCode extends EventDispatcher
    {
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
            this.dispatchEvent(new Event(Event.CHANGE));
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
            this.dispatchEvent(new Event(Event.CHANGE));
        }
        private _fragmentCode: string;
    }

    export class ShaderRenderData
    {
        public uuid: string;
        public version: number;
        //
        private _invalid = true;
        private _resultVertexCode: string;
        private _resultFragmentCode: string;

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
            this.invalidate();
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
            this.invalidate();
        }
        private _fragmentCode: string;

        /**
         * 渲染参数
         */
        public shaderParams: ShaderParams = <any>{};

        /**
         * 着色器宏定义
         */
        public shaderMacro: ShaderMacro;

        constructor()
        {
            Object.defineProperty(this, "uuid", { value: Math.generateUUID() });
            Object.defineProperty(this, "version", { value: 0, writable: true });
            this.shaderMacro = new ShaderMacro();
        }

        /**
         * 激活渲染程序
         */
        public activeShaderProgram(gl: GL)
        {
            if (!this.vertexCode || !this.fragmentCode)
                return null;

            if (this._invalid)
            {
                this.update();
            }

            //渲染程序
            var shaderProgram = gl.programs[this.uuid];
            if (shaderProgram)
            {
                if (shaderProgram.vertexCode != this._resultVertexCode || shaderProgram.fragmentCode != this._resultFragmentCode)
                // if (shaderProgram.version != this.version)
                {
                    shaderProgram.destroy();
                    shaderProgram = null;
                    delete gl.programs[this.uuid];
                }
            }
            if (!shaderProgram)
            {
                shaderProgram = gl.programs[this.uuid] = gl.createProgram(this._resultVertexCode, this._resultFragmentCode);
                shaderProgram.version = this.version;
                shaderProgram.vertexCode = this._resultVertexCode;
                shaderProgram.fragmentCode = this._resultFragmentCode;
            }
            gl.useProgram(shaderProgram);
            return shaderProgram;
        }

        private update()
        {
            //应用宏
            var shaderMacroStr = ShaderLib.getMacroCode(this.shaderMacro);
            this._resultVertexCode = this.vertexCode.replace(/#define\s+macros/, shaderMacroStr);
            this._resultFragmentCode = this.fragmentCode.replace(/#define\s+macros/, shaderMacroStr);
            this.version++;
        }

        public invalidate()
        {
            this._invalid = true;
        }
    }
}