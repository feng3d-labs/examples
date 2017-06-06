namespace feng3d
{
    export class UniformData<T>
    {
        public get data()
        {
            if (this._data instanceof Function)
                return this._data();
            return this._data;
        }

        private _data: T | (() => T);

        constructor(data: T | (() => T))
        {
            this._data = data;
        }

        public static getUniformData<T>(data: T | (() => T))
        {
            return new UniformData(data);
        }
    }
}