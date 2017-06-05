namespace feng3d
{
    /**
     * 网格渲染器
     * @author feng 2016-12-12
     */
    export class Model extends Component
    {
        /**
         * 材质
         */
        public get material() { return this._material || defaultMaterial; }
        public set material(value) { this._material = value; this.invalidateRenderHolder(); }
        private _material: Material;

        /**
         * 构建
         */
        constructor()
        {
            super();
            this._single = true;
        }

        /**
         * 收集渲染数据拥有者
         * @param renderAtomic 渲染原子
         */
        public collectRenderDataHolder(renderAtomic: Object3DRenderAtomic = null)
        {
            this.material.collectRenderDataHolder(renderAtomic);
            super.collectRenderDataHolder(renderAtomic);
        }
    }
}