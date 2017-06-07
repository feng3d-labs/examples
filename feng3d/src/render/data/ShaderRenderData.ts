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

        constructor(vertexCode: string, fragmentCode: string)
        {
            super();
            this._vertexCode = vertexCode;
            this._fragmentCode = fragmentCode;
        }
    }

    export enum MacroType
    {
        value,
        bool,
        add
    }

    export class Macro
    {
        type: MacroType;
        name: string;
        value: number | boolean;
    }

    export class ValueMacro extends Macro
    {
        type: MacroType.value;
        name: string;
        value: number;
    }

    export class BoolMacro extends Macro
    {
        type: MacroType.bool;
        name: string;
        value: boolean;
    }

    export class AddMacro extends Macro
    {
        type: MacroType.add;
        name: string;
        value: number;
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

        public addMacro(macro: Macro)
        {
            var index = this.macros.indexOf(macro);
            if (index == - 1)
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

        constructor()
        {
            Object.defineProperty(this, "uuid", { value: Math.generateUUID() });
            Object.defineProperty(this, "version", { value: 0, writable: true });
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
                var shaderMacroStr = this.getMacroCode(this.macros);
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

        private getMacroCode(macros: Macro[])
        {
            var macro = { valueMacros: {}, boolMacros: {}, addMacros: {} };

            for (var i = 0; i < macros.length; i++)
            {
                var element = macros[i];
                switch (element.type)
                {
                    case MacroType.value:
                        macro.valueMacros[element.name] = element.value;
                        break;
                    case MacroType.bool:
                        macro.boolMacros[element.name] = macro.boolMacros[element.name] || element.value;
                        break;
                    case MacroType.add:
                        macro.boolMacros[element.name] = ~~macro.boolMacros[element.name] + <number>element.value;
                        break;
                }
            }

            var macroHeader = "";
            var macroNames = Object.keys(macro.valueMacros);
            macroNames = macroNames.sort();
            macroNames.forEach(macroName =>
            {
                var value = macro.valueMacros[macroName];
                macroHeader += `#define ${macroName} ${value}\n`;
            });
            macroNames = Object.keys(macro.boolMacros);
            macroNames = macroNames.sort();
            macroNames.forEach(macroName =>
            {
                var value = macro.boolMacros[macroName];
                value && (macroHeader += `#define ${macroName}\n`);
            });

            macroNames = Object.keys(macro.addMacros);
            macroNames = macroNames.sort();
            macroNames.forEach(macroName =>
            {
                var value = macro.addMacros[macroName];
                macroHeader += `#define ${macroName} ${value}\n`;
            });
            return macroHeader;
        }
    }
}