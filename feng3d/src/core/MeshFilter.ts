namespace feng3d
{
    /**
     * A class to access the Mesh of the mesh filter.
     * Use this with a procedural mesh interface. See Also: Mesh class.
     */
    export class MeshFilter extends Component
    {
        /**
         * Returns the instantiated Mesh assigned to the mesh filter.
         */
        public get mesh()
        {
            return this._mesh || defaultGeometry;
        }
        public set mesh(value)
        {
            if (this._mesh == value)
                return;
            this._mesh = value;
            this.invalidateRenderHolder();
        }
        private _mesh: Geometry;

        constructor()
        {
            super();
        }

        /**
         * 收集渲染数据拥有者
         * @param renderAtomic 渲染原子
         */
        public collectRenderDataHolder(renderAtomic: Object3DRenderAtomic = null)
        {
            this.mesh.collectRenderDataHolder(renderAtomic);
            super.collectRenderDataHolder(renderAtomic);
        }
    }
}