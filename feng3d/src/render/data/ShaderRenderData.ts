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

    export enum MacroType
    {
        value,
        bool,
        add
    }

    export class Macro
    {
        public static getValueMacro(name: string, value: number)
        {
            return new Macro(MacroType.value, name, value);
        }

        public static getBoolMacro(name: string, value: boolean)
        {
            return new Macro(MacroType.bool, name, value);
        }

        public static getAddMacro(name: string, value: number)
        {
            return new Macro(MacroType.bool, name, value);
        }

        constructor(public type: MacroType, public name: string, public value: number | boolean)
        {

        }
    }

    export class ShaderRenderData
    {
        public uuid: string;
        public version: number;
        //
        private _invalid = true;
        private _resultVertexCode: string;
        private _resultFragmentCode: string;

        public setShaderCode(shaderCode: ShaderCode)
        {
            this.shaderCode = shaderCode;
        }
        private shaderCode: ShaderCode;

        /**
         * 渲染参数
         */
        public shaderParams: ShaderParams = <any>{};

        public setMacro(macro: Macro)
        {
            var index = this.macros.indexOf(macro);
            if (index != - 1)
            {
                this.macros.push(macro);
            }
        }

        public removeMacro(macro: Macro)
        {
            var index = this.macros.indexOf(macro);
            if (index != - 1)
            {
                this.macros.splice(index, 1);
            }
        }
        private macros: Macro[] = [];

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
            if (!this.shaderCode || !this.shaderCode.vertexCode || !this.shaderCode.fragmentCode)
                return null;

            if (this._invalid)
            {
                //应用宏
                var shaderMacroStr = ShaderLib.getMacroCode(this.shaderMacro);
                this._resultVertexCode = this.shaderCode.vertexCode.replace(/#define\s+macros/, shaderMacroStr);
                this._resultFragmentCode = this.shaderCode.fragmentCode.replace(/#define\s+macros/, shaderMacroStr);
                this.version++;
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

        public invalidate()
        {
            this._invalid = true;
        }
    }
}