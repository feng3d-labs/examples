module feng3d
{
    export class ShaderCode extends EventDispatcher
    {
        public static createCodeByName(shaderName){
            var shaderCode = new ShaderCode(ShaderLib.getShaderCode(shaderName + ".vertex"),ShaderLib.getShaderCode(shaderName + ".fragment"));
            return shaderCode;
        }
        
        constructor(vertexCode:string,fragmentCode:string){
            super();
            this.vertexCode = vertexCode;
            this.fragmentCode = fragmentCode;
        }
        
        private _invalid = true;
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

        private invalidate()
        {
            this._invalid = true;
            this.dispatchEvent(new Event(Event.CHANGE));
        }
    }
}