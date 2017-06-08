namespace feng3d
{

    /**
     * 渲染环境
     * @author feng 2017-01-04
     */
    export class RenderContext extends RenderDataHolder
    {
        /**
         * 摄像机
         */
        public camera: Camera;

        /**
         * 场景
         */
        public scene3d: Scene3D;

        /**
         * 3D视窗
         */
        public view3D: View3D;

        /**
         * WebGL实例
         */
        public gl: GL;

        /**
		 * 更新渲染数据
		 */
        public updateRenderData1(renderAtomic: RenderAtomic)
        {
            var pointLights = PointLight.pointLights;
            var directionalLights = DirectionalLight.directionalLights;
            this.camera.updateRenderData(this, renderAtomic);

            renderAtomic.shader.addMacro(this.createValueMacro("NUM_LIGHT", Light.lights.length));
            //收集点光源数据
            var pointLightPositions: Vector3D[] = [];
            var pointLightColors: Vector3D[] = [];
            var pointLightIntensitys: number[] = [];
            var pointLightRanges: number[] = [];
            for (var i = 0; i < pointLights.length; i++)
            {
                var pointLight = pointLights[i];
                pointLightPositions.push(pointLight.position);
                pointLightColors.push(pointLight.color);
                pointLightIntensitys.push(pointLight.intensity);
                pointLightRanges.push(pointLight.range);
            }
            //设置点光源数据
            renderAtomic.shader.addMacro(this.createValueMacro("NUM_POINTLIGHT", pointLights.length));
            if (pointLights.length > 0)
            {
                renderAtomic.shader.addMacro(this.createAddMacro("A_NORMAL_NEED", 1));
                renderAtomic.shader.addMacro(this.createAddMacro("V_NORMAL_NEED", 1));
                renderAtomic.shader.addMacro(this.createAddMacro("V_GLOBAL_POSITION_NEED", 1));
                renderAtomic.shader.addMacro(this.createAddMacro("U_CAMERAMATRIX_NEED", 1));
                //
                renderAtomic.addUniform(this.createUniformData("u_pointLightPositions", pointLightPositions));
                renderAtomic.addUniform(this.createUniformData("u_pointLightColors",pointLightColors));
                renderAtomic.addUniform(this.createUniformData("u_pointLightIntensitys",pointLightIntensitys));
                renderAtomic.addUniform(this.createUniformData("u_pointLightRanges",pointLightRanges));
            }
            var directionalLightDirections: Vector3D[] = [];
            var directionalLightColors: Vector3D[] = [];
            var directionalLightIntensitys: number[] = [];
            for (var i = 0; i < directionalLights.length; i++)
            {
                var directionalLight = directionalLights[i];
                directionalLightDirections.push(directionalLight.sceneDirection);
                directionalLightColors.push(directionalLight.color);
                directionalLightIntensitys.push(directionalLight.intensity);
            }
            renderAtomic.shader.addMacro(this.createValueMacro("NUM_DIRECTIONALLIGHT", directionalLights.length));
            if (directionalLights.length > 0)
            {
                renderAtomic.shader.addMacro(this.createAddMacro("A_NORMAL_NEED", 1));
                renderAtomic.shader.addMacro(this.createAddMacro("V_NORMAL_NEED", 1));
                renderAtomic.shader.addMacro(this.createAddMacro("U_CAMERAMATRIX_NEED", 1));
                //
                renderAtomic.addUniform(this.createUniformData("u_directionalLightDirections",directionalLightDirections));
                renderAtomic.addUniform(this.createUniformData("u_directionalLightColors",directionalLightColors));
                renderAtomic.addUniform(this.createUniformData("u_directionalLightIntensitys",directionalLightIntensitys));
            }

            renderAtomic.addUniform(this.createUniformData("u_sceneAmbientColor",this.scene3d.ambientColor));
            renderAtomic.addUniform(this.createUniformData("u_scaleByDepth",this.view3D.getScaleByDepth(1)));
        }
    }
}