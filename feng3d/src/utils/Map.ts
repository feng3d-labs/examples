namespace feng3d
{

    /**
     * 构建Map类代替Dictionary
     * @author feng 2017-01-03
     */
    export class Map<K extends { uuid: string }, V extends { uuid: string }>
    {
        private keyMap: { [kUid: string]: K } = {};
        private valueMap: { [kUid: string]: V } = {};

        /**
         * 删除
         */
        public delete(k: K)
        {
            delete this.keyMap[k.uuid];
            delete this.valueMap[k.uuid];
        }

        /**
         * 添加映射
         */
        public push(k: K, v: V)
        {
            this.keyMap[k.uuid] = k;
            this.valueMap[k.uuid] = v;
        }

        /**
         * 通过key获取value
         */
        public get(k: K): V
        {
            return this.valueMap[k.uuid];
        }

        /**
         * 获取键列表
         */
        public getKeys(): K[]
        {
            var keys: K[] = [];
            for (var key in this.keyMap)
            {
                keys.push(this.keyMap[key]);
            }
            return keys;
        }

        /**
         * 清理字典
         */
        public clear()
        {
            this.keyMap = {};
            this.valueMap = {};
        }
    }
}