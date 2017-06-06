namespace feng3d
{

    /**
     * 渲染环境
     * @author feng 2017-01-04
     */
    export class RenderContext
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
        public updateRenderData(renderAtomic: RenderAtomic)
        {
            var pointLights = PointLight.pointLights;
            var directionalLights = DirectionalLight.directionalLights;
            this.camera.updateRenderData(this, renderAtomic);

            renderAtomic.shader.shaderMacro.valueMacros.NUM_LIGHT = Light.lights.length;
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
            renderAtomic.shader.shaderMacro.valueMacros.NUM_POINTLIGHT = pointLights.length;
            if (pointLights.length > 0)
            {
                renderAtomic.shader.shaderMacro.addMacros.A_NORMAL_NEED = 1;
                renderAtomic.shader.shaderMacro.addMacros.V_NORMAL_NEED = 1;
                renderAtomic.shader.shaderMacro.addMacros.V_GLOBAL_POSITION_NEED = 1;
                renderAtomic.shader.shaderMacro.addMacros.U_CAMERAMATRIX_NEED = 1;
                //
                renderAtomic.addUniform("u_pointLightPositions", UniformData.getUniformData(pointLightPositions));
                renderAtomic.addUniform("u_pointLightColors", UniformData.getUniformData(pointLightColors));
                renderAtomic.addUniform("u_pointLightIntensitys", UniformData.getUniformData(pointLightIntensitys));
                renderAtomic.addUniform("u_pointLightRanges", UniformData.getUniformData(pointLightRanges));
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
            renderAtomic.shader.shaderMacro.valueMacros.NUM_DIRECTIONALLIGHT = directionalLights.length;
            if (directionalLights.length > 0)
            {
                renderAtomic.shader.shaderMacro.addMacros.A_NORMAL_NEED = 1;
                renderAtomic.shader.shaderMacro.addMacros.V_NORMAL_NEED = 1;
                renderAtomic.shader.shaderMacro.addMacros.U_CAMERAMATRIX_NEED = 1;
                //
                renderAtomic.addUniform("u_directionalLightDirections", UniformData.getUniformData(directionalLightDirections));
                renderAtomic.addUniform("u_directionalLightColors", UniformData.getUniformData(directionalLightColors));
                renderAtomic.addUniform("u_directionalLightIntensitys", UniformData.getUniformData(directionalLightIntensitys));
            }

            renderAtomic.addUniform("u_sceneAmbientColor", UniformData.getUniformData(this.scene3d.ambientColor));
            renderAtomic.addUniform("u_scaleByDepth", UniformData.getUniformData(this.view3D.getScaleByDepth(1)));
        }
    }
}