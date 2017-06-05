namespace feng3d
{

    /**
     * 前向渲染器
     * @author feng 2017-02-20
     */
    export class ForwardRenderer extends Renderer
    {
        public viewRect: Rectangle = new Rectangle(0, 0, 100, 100);

        constructor()
        {
            super();
        }

        /**
		 * 渲染
		 */
        public draw(renderContext: RenderContext)
        {
            var gl = renderContext.gl;
            var scene3D = renderContext.scene3d;
            // 默认渲染
            gl.clearColor(scene3D.background.r, scene3D.background.g, scene3D.background.b, scene3D.background.a);
            gl.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
            gl.viewport(0, 0, this.viewRect.width, this.viewRect.height);
            gl.enable(GL.DEPTH_TEST);
            // gl.cullFace()
            super.draw(renderContext);
        }

        protected drawRenderables(renderContext: RenderContext, meshRenderer: MeshRenderer)
        {
            if (meshRenderer.gameObject.isVisible)
            {
                var frustumPlanes = renderContext.camera.frustumPlanes;
                var gameObject = meshRenderer.gameObject;
                var isIn = gameObject.worldBounds.isInFrustum(frustumPlanes, 6);
                var model = gameObject.getComponentByType(MeshRenderer);
                if (gameObject.getOrCreateComponentByClass(MeshFilter).mesh instanceof SkyBoxGeometry)
                {
                    isIn = true;
                }
                if (isIn)
                {
                    super.drawRenderables(renderContext, meshRenderer);
                }
            }
        }
    }
}