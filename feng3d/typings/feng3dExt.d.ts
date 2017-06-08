declare module feng3d
{
    interface UniformRenderData
    {
        /**
         * 模型矩阵
         */
        u_modelMatrix: Matrix3D | (() => Matrix3D);
        /**
         * 世界投影矩阵
         */
        u_viewProjection: Matrix3D | (() => Matrix3D);
        /**
         * 摄像机矩阵
         */
        u_cameraMatrix: Matrix3D | (() => Matrix3D);

        u_diffuseInput: Vector3D | (() => Vector3D);
        /**
         * 透明阈值，用于透明检测
         */
        u_alphaThreshold: number | (() => number);
        /**
         * 漫反射贴图
         */
        s_texture: Texture2D | (() => Texture2D);
        /**
         * 漫反射贴图
         */
        s_diffuse: Texture2D | (() => Texture2D);
        /**
         * 环境贴图
         */
        s_ambient: Texture2D | (() => Texture2D);
        /**
         * 法线贴图
         */
        s_normal: Texture2D | (() => Texture2D);
        /**
         * 镜面反射光泽图
         */
        s_specular: Texture2D | (() => Texture2D);
        /**
         * 天空盒纹理
         */
        s_skyboxTexture: TextureCube | (() => TextureCube);
        /**
         * 天空盒尺寸
         */
        u_skyBoxSize: number | (() => number);

        /**
         * 地形混合贴图
         */
        s_blendTexture: Texture2D | (() => Texture2D);

        /**
         * 地形块贴图1
         */
        s_splatTexture1: Texture2D | (() => Texture2D);
        /**
         * 地形块贴图2
         */
        s_splatTexture2: Texture2D | (() => Texture2D);
        /**
         * 地形块贴图3
         */
        s_splatTexture3: Texture2D | (() => Texture2D);
        /**
         * 地形块混合贴图
         */
        s_splatMergeTexture: Texture2D | (() => Texture2D);
        /**
         * 地形块重复次数
         */
        u_splatRepeats: Vector3D | (() => Vector3D);
        /**
         * 地形混合贴图尺寸
         */
        u_splatMergeTextureSize: Point | (() => Point);
        /**
         * 图片尺寸
         */
        u_imageSize: Point | (() => Point);
        /**
         * 地形块尺寸
         */
        u_tileSize: Point | (() => Point);
        /**
         * 地形块偏移
         */
        u_tileOffset: Vector3D[] | (() => Vector3D[]);
        /**
         * 最大lod
         */
        u_maxLod: number | (() => number);
        /**
         * uv与坐标比
         */
        u_uvPositionScale: number | (() => number);
        /**
         * lod0时在贴图中的uv缩放偏移向量
         */
        u_lod0vec: Vector3D | (() => Vector3D);
        /******************************************************/
        //                  点光源
        /******************************************************/
        /**
         * 点光源位置数组
         */
        u_pointLightPositions: Vector3D[] | (() => Vector3D[]);
        /**
         * 点光源颜色数组
         */
        u_pointLightColors: Vector3D[] | (() => Vector3D[]);
        /**
         * 点光源光照强度数组
         */
        u_pointLightIntensitys: number[] | (() => number[]);
        /**
         * 点光源光照范围数组
         */
        u_pointLightRanges: number[] | (() => number[]);
        /******************************************************/
        //                  方向光源
        /******************************************************/
        /**
         * 方向光源方向数组
         */
        u_directionalLightDirections: Vector3D[] | (() => Vector3D[]);
        /**
         * 方向光源颜色数组
         */
        u_directionalLightColors: Vector3D[] | (() => Vector3D[]);
        /**
         * 方向光源光照强度数组
         */
        u_directionalLightIntensitys: number[] | (() => number[]);

        /**
         * 场景环境光
         */
        u_sceneAmbientColor: Color | (() => Color);
        /**
         * 基本颜色
         */
        u_diffuse: Color | (() => Color);
        /**
         * 镜面反射颜色
         */
        u_specular: Color | (() => Color);
        /**
         * 环境颜色
         */
        u_ambient: Color | (() => Color);
        /**
         * 高光系数
         */
        u_glossiness: number | (() => number);

        /**
         * 反射率
         */
        u_reflectance: number | (() => number);

        /**
         * 粗糙度
         */
        u_roughness: number | (() => number);

        /**
         * 金属度
         */
        u_metalic: number | (() => number);

        /**
         * 粒子时间
         */
        u_particleTime: number | (() => number);

        /**
         * 点大小
         */
        u_PointSize: number | (() => number);

        /**
         * 骨骼全局矩阵
         */
        u_skeletonGlobalMatriices: Matrix3D[] | (() => Matrix3D[]);

        /**
         * 3D对象编号
         */
        u_objectID: number | (() => number);

        /**
         * 雾颜色
         */
        u_fogColor: Color | (() => Color);
        /**
         * 雾最近距离
         */
        u_fogMinDistance: number | (() => number);
        /**
         * 雾最远距离
         */
        u_fogMaxDistance: number | (() => number);
        /**
         * 雾浓度
         */
        u_fogDensity: number | (() => number);
        /**
         * 雾模式
         */
        u_fogMode: number | (() => number);

        /**
         * 环境反射纹理
         */
        s_envMap: TextureCube | (() => TextureCube);
		/**
		 * 反射率
		 */
        u_reflectivity: number | (() => number);
        /**
         * 单位深度映射到屏幕像素值
         */
        u_scaleByDepth: number | (() => number);
    }
    interface AttributeRenderDataStuct
    {
        /**
         * 坐标
         */
        a_position: AttributeRenderData;

        /**
         * 颜色
         */
        a_color: AttributeRenderData;

        /**
         * 法线
         */
        a_normal: AttributeRenderData;

        /**
         * 切线
         */
        a_tangent: AttributeRenderData;

        /**
         * uv（纹理坐标）
         */
        a_uv: AttributeRenderData;

        /**
         * 关节索引
         */
        a_jointindex0: AttributeRenderData;

        /**
         * 关节权重
         */
        a_jointweight0: AttributeRenderData;

        /**
         * 关节索引
         */
        a_jointindex1: AttributeRenderData;

        /**
         * 关节权重
         */
        a_jointweight1: AttributeRenderData;
    }

    /**
     * 着色器宏定义
     * @author feng 2016-12-17
     */
    export interface ShaderMacro extends ValueMacros, BoolMacros, IAddMacros
    {

    }

    /**
     * 值类型宏
     * 没有默认值
     */
    export interface ValueMacros
    {
        /**
         * 光源数量
         */
        NUM_LIGHT: ValueMacro;

        /** 
         * 点光源数量
         */
        NUM_POINTLIGHT: ValueMacro;

        /** 
         * 方向光源数量
         */
        NUM_DIRECTIONALLIGHT: ValueMacro;

        /**
         * 骨骼关节数量
         */
        NUM_SKELETONJOINT: ValueMacro;
    }

    /**
     * Boolean类型宏
     * 没有默认值
     */
    export interface BoolMacros
    {
        /**
         * 是否有漫反射贴图
         */
        HAS_DIFFUSE_SAMPLER: BoolMacro;
        /**
         * 是否有法线贴图
         */
        HAS_NORMAL_SAMPLER: BoolMacro;
        /**
         * 是否有镜面反射光泽图
         */
        HAS_SPECULAR_SAMPLER: BoolMacro;
        /**
         * 是否有环境贴图
         */
        HAS_AMBIENT_SAMPLER: BoolMacro;
        /**
         * 是否有骨骼动画
         */
        HAS_SKELETON_ANIMATION: BoolMacro;
        /**
         * 是否有粒子动画
         */
        HAS_PARTICLE_ANIMATOR: BoolMacro;
        /**
         * 是否为点渲染模式
         */
        IS_POINTS_MODE: BoolMacro;
        /**
         * 是否有地形方法
         */
        HAS_TERRAIN_METHOD: BoolMacro;
        /**
         * 使用合并地形贴图
         */
        USE_TERRAIN_MERGE: BoolMacro;
        /**
         * 雾函数
         */
        HAS_FOG_METHOD: BoolMacro;
        /**
         * 环境映射函数
         */
        HAS_ENV_METHOD: BoolMacro;
    }

    /**
     * 递增类型宏
     * 所有默认值为0
     */
    export interface IAddMacros
    {
        /** 
         * 是否需要属性uv
         */
        A_UV_NEED: number;
        /** 
         * 是否需要变量uv
         */
        V_UV_NEED: number;
        /** 
         * 是否需要变量全局坐标
         */
        V_GLOBAL_POSITION_NEED: number;
        /**
         * 是否需要属性法线
         */
        A_NORMAL_NEED: number;
        /**
         * 是否需要变量法线
         */
        V_NORMAL_NEED: number;
        /**
         * 是否需要摄像机矩阵
         */
        U_CAMERAMATRIX_NEED: number;
    }

    interface Geometry
    {
        setVAData<K extends keyof AttributeRenderDataStuct>(vaId: K, data: Float32Array, stride: number);
    }

    interface RenderDataHolder
    {
        createUniformData<K extends keyof UniformRenderData>(name: K, data: UniformRenderData[K]);

        createAttributeRenderData<K extends keyof AttributeRenderDataStuct>(name: K, data: Float32Array, stride?: number, divisor?: number);

        createShaderCode(vertexCode: string, fragmentCode: string);

        createValueMacro<K extends keyof ValueMacros>(name: K, value: number): ValueMacro;

        createBoolMacro<K extends keyof BoolMacros>(name: K, value: boolean): BoolMacro;

        createAddMacro<K extends keyof IAddMacros>(name: K, value: IAddMacros[K]): AddMacro;
    }
}