namespace feng3d
{
    export interface UniformRenderData
    {
        /**
         * 模型矩阵
         */
        u_modelMatrix: UniformData<Matrix3D>;
        /**
         * 世界投影矩阵
         */
        u_viewProjection: UniformData<Matrix3D>;
        /**
         * 摄像机矩阵
         */
        u_cameraMatrix: UniformData<Matrix3D>;

        u_diffuseInput: UniformData<Vector3D>;
        /**
         * 透明阈值，用于透明检测
         */
        u_alphaThreshold: UniformData<number>;
        /**
         * 漫反射贴图
         */
        s_texture: UniformData<Texture2D>;
        /**
         * 漫反射贴图
         */
        s_diffuse: UniformData<Texture2D>;
        /**
         * 环境贴图
         */
        s_ambient: UniformData<Texture2D>;
        /**
         * 法线贴图
         */
        s_normal: UniformData<Texture2D>;
        /**
         * 镜面反射光泽图
         */
        s_specular: UniformData<Texture2D>;
        /**
         * 天空盒纹理
         */
        s_skyboxTexture: UniformData<TextureCube>;
        /**
         * 天空盒尺寸
         */
        u_skyBoxSize: UniformData<number>;

        /**
         * 地形混合贴图
         */
        s_blendTexture: UniformData<Texture2D>;

        /**
         * 地形块贴图1
         */
        s_splatTexture1: UniformData<Texture2D>;
        /**
         * 地形块贴图2
         */
        s_splatTexture2: UniformData<Texture2D>;
        /**
         * 地形块贴图3
         */
        s_splatTexture3: UniformData<Texture2D>;
        /**
         * 地形块混合贴图
         */
        s_splatMergeTexture: UniformData<Texture2D>;
        /**
         * 地形块重复次数
         */
        u_splatRepeats: UniformData<Vector3D>;
        /**
         * 地形混合贴图尺寸
         */
        u_splatMergeTextureSize: UniformData<Point>;
        /**
         * 图片尺寸
         */
        u_imageSize: UniformData<Point>;
        /**
         * 地形块尺寸
         */
        u_tileSize: UniformData<Point>;
        /**
         * 地形块偏移
         */
        u_tileOffset: UniformData<Vector3D[]>;
        /**
         * 最大lod
         */
        u_maxLod: UniformData<number>;
        /**
         * uv与坐标比
         */
        u_uvPositionScale: UniformData<number>;
        /**
         * lod0时在贴图中的uv缩放偏移向量
         */
        u_lod0vec: UniformData<Vector3D>;
        /******************************************************/
        //                  点光源
        /******************************************************/
        /**
         * 点光源位置数组
         */
        u_pointLightPositions: UniformData<Vector3D[]>;
        /**
         * 点光源颜色数组
         */
        u_pointLightColors: UniformData<Vector3D[]>;
        /**
         * 点光源光照强度数组
         */
        u_pointLightIntensitys: UniformData<number[]>;
        /**
         * 点光源光照范围数组
         */
        u_pointLightRanges: UniformData<number[]>;
        /******************************************************/
        //                  方向光源
        /******************************************************/
        /**
         * 方向光源方向数组
         */
        u_directionalLightDirections: UniformData<Vector3D[]>;
        /**
         * 方向光源颜色数组
         */
        u_directionalLightColors: UniformData<Vector3D[]>;
        /**
         * 方向光源光照强度数组
         */
        u_directionalLightIntensitys: UniformData<number[]>;

        /**
         * 场景环境光
         */
        u_sceneAmbientColor: UniformData<Color>;
        /**
         * 基本颜色
         */
        u_diffuse: UniformData<Color>;
        /**
         * 镜面反射颜色
         */
        u_specular: UniformData<Color>;
        /**
         * 环境颜色
         */
        u_ambient: UniformData<Color>;
        /**
         * 高光系数
         */
        u_glossiness: UniformData<number>;

        /**
         * 反射率
         */
        u_reflectance: UniformData<number>;

        /**
         * 粗糙度
         */
        u_roughness: UniformData<number>;

        /**
         * 金属度
         */
        u_metalic: UniformData<number>;

        /**
         * 粒子时间
         */
        u_particleTime: UniformData<number>;

        /**
         * 点大小
         */
        u_PointSize: UniformData<number>;

        /**
         * 骨骼全局矩阵
         */
        u_skeletonGlobalMatriices: UniformData<Matrix3D[]>;

        /**
         * 3D对象编号
         */
        u_objectID: UniformData<number>;

        /**
         * 雾颜色
         */
        u_fogColor: UniformData<Color>;
        /**
         * 雾最近距离
         */
        u_fogMinDistance: UniformData<number>;
        /**
         * 雾最远距离
         */
        u_fogMaxDistance: UniformData<number>;
        /**
         * 雾浓度
         */
        u_fogDensity: UniformData<number>;
        /**
         * 雾模式
         */
        u_fogMode: UniformData<number>;

        /**
         * 环境反射纹理
         */
        s_envMap: UniformData<TextureCube>;
		/**
		 * 反射率
		 */
        u_reflectivity: UniformData<number>;
        /**
         * 单位深度映射到屏幕像素值
         */
        u_scaleByDepth: UniformData<number>;
    }
}