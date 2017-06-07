namespace feng3d
{
    export class UniformData<K extends keyof UniformRenderData>
    {
        public name: K;
        public data: UniformRenderData[K];

        constructor(name: K, data: UniformRenderData[K])
        {
            this.name = name;
            this.data = data;
        }
    }
}