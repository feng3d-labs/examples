namespace feng3d
{
    export class UniformData extends RenderElement
    {
        public name: string;
        public data: any;

        constructor(name: string, data: any)
        {
            super();
            this.name = name;
            this.data = data;
        }
    }
}