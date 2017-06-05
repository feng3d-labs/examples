namespace feng3d
{
    /**
     * Renders meshes inserted by the MeshFilter or TextMesh.
     */
    export class MeshRenderer extends Renderer
    {
        /**
         * 构建
         */
        constructor()
        {
            super();
            this._single = true;
        }
    }
}