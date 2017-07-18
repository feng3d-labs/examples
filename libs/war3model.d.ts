declare namespace feng3d.war3 {
    /**
     * war3关节pose
     * @author warden_feng 2014-6-28
     */
    class JointPoseWar3 extends JointPose {
        transformation: Matrix3D;
        constructor();
    }
}
declare namespace feng3d.war3 {
    /**
     *
     * @author warden_feng 2014-6-28
     */
    class SkeletonPoseWar3 extends SkeletonPose {
        constructor();
    }
}
declare namespace feng3d.war3 {
    /**
     *
     * @author warden_feng 2014-6-28
     */
    class SkeletonClipNodeWar3 extends SkeletonClipNode {
        constructor();
        protected updateStitch(): void;
    }
}
declare namespace feng3d.war3 {
    /**
     * 骨骼动画
     * @author warden_feng 2014-5-27
     */
    class SkeletonAnimatorWar3 extends SkeletonAnimator {
        /**
         * 创建一个骨骼动画类
         * @param animationSet 动画集合
         * @param skeleton 骨骼
         * @param forceCPU 是否强行使用cpu
         */
        constructor(gameObject: GameObject);
        /**
         * 本地转换到全局姿势
         * @param sourcePose 原姿势
         * @param targetPose 目标姿势
         * @param skeleton 骨骼
         */
        protected localToGlobalPose(sourcePose: SkeletonPose, targetPose: SkeletonPose, skeleton: Skeleton): void;
    }
}
declare namespace feng3d.war3 {
    /**
     * 透明度动画
     * @author warden_feng 2014-6-26
     */
    class AnimAlpha {
        constructor();
    }
}
declare namespace feng3d.war3 {
    /**
     * 全局动作信息
     * @author warden_feng 2014-6-26
     */
    class AnimInfo {
        /** 动作名称 */
        name: string;
        /** 动作间隔 */
        interval: Interval;
        /** 最小范围 */
        MinimumExtent: Vector3D;
        /** 最大范围 */
        MaximumExtent: Vector3D;
        /** 半径范围 */
        BoundsRadius: number;
        /** 发生频率 */
        Rarity: number;
        /** 是否循环 */
        loop: boolean;
        /** 移动速度 */
        MoveSpeed: number;
    }
}
declare namespace feng3d.war3 {
    /**
     * 几何体动作信息
     * @author warden_feng 2014-6-26
     */
    class AnimInfo1 {
        /** 最小范围 */
        MinimumExtent: Vector3D;
        /** 最大范围 */
        MaximumExtent: Vector3D;
        /** 半径范围 */
        BoundsRadius: number;
    }
}
declare namespace feng3d.war3 {
    /**
     * 骨骼信息(包含骨骼，helper等其他对象)
     * @author warden_feng 2014-6-26
     */
    class BoneObject {
        /** 骨骼类型 */
        type: string;
        /** 骨骼名称 */
        name: string;
        /** 对象编号 */
        ObjectId: number;
        /** 父对象 */
        Parent: number;
        /** 几何体编号 */
        GeosetId: string;
        /** 几何体动画 */
        GeosetAnimId: string;
        /** 是否为广告牌 */
        Billboarded: boolean;
        /** 骨骼位移动画 */
        Translation: BoneTranslation;
        /** 骨骼缩放动画 */
        Scaling: BoneScaling;
        /** 骨骼角度动画 */
        Rotation: BoneRotation;
        /** 中心位置 */
        pivotPoint: Vector3D;
        /** 当前对象变换矩阵 */
        c_transformation: Matrix3D;
        /** 当前全局变换矩阵 */
        c_globalTransformation: Matrix3D;
        calculateTransformation(keyFrameTime: number): void;
    }
}
declare namespace feng3d.war3 {
    /**
     * 骨骼的角度信息
     */
    class BoneRotation {
        /** 类型 */
        type: string;
        /** */
        GlobalSeqId: number;
        rotations: Rotation[];
        rotationDic: {};
        getRotation(keyFrameTime: number): Quaternion;
    }
}
declare namespace feng3d.war3 {
    /**
     * 骨骼的位移信息
     * @author warden_feng 2014-6-26
     */
    class BoneTranslation {
        /** 类型 */
        type: string;
        /**  */
        GlobalSeqId: number;
        translations: Translation[];
        translationDic: {};
        getTranslation(keyFrameTime: number): Vector3D;
    }
}
declare namespace feng3d.war3 {
    /**
     * 纹理
     * @author warden_feng 2014-6-26
     */
    class FBitmap {
        /** 图片地址 */
        image: string;
        /** 可替换纹理id */
        ReplaceableId: number;
    }
}
declare namespace feng3d.war3 {
    /**
     * 几何设置
     * @author warden_feng 2014-6-26
     */
    class Geoset {
        /** 顶点 */
        Vertices: number[];
        /** 法线 */
        Normals: number[];
        /** 纹理坐标 */
        TVertices: number[];
        /** 顶点分组 */
        VertexGroup: number[];
        /** 面（索引） */
        Faces: number[];
        /** 顶点分组 */
        Groups: number[][];
        /** 最小范围 */
        MinimumExtent: Vector3D;
        /** 最大范围 */
        MaximumExtent: Vector3D;
        /** 半径范围 */
        BoundsRadius: number;
        /** 动作信息 */
        Anims: AnimInfo1[];
        /** 材质编号 */
        MaterialID: number;
        /**  */
        SelectionGroup: number;
        /** 是否不可选 */
        Unselectable: boolean;
        /** 顶点对应的关节索引 */
        jointIndices: number[];
        /** 顶点对应的关节权重 */
        jointWeights: number[];
    }
}
declare namespace feng3d.war3 {
    /**
     * 几何体动画
     * @author warden_feng 2014-6-26
     */
    class GeosetAnim {
        constructor();
    }
}
declare namespace feng3d.war3 {
    /**
     * 全局序列
     * @author warden_feng 2014-6-26
     */
    class Globalsequences {
        /** 全局序列编号 */
        id: number;
        /** 持续时间 */
        durations: number[];
    }
}
declare namespace feng3d.war3 {
    /**
     * 动作间隔
     * @author warden_feng 2014-6-26
     */
    class Interval {
        /** 开始时间 */
        start: number;
        /** 结束时间 */
        end: number;
    }
}
declare namespace feng3d.war3 {
    /**
     * 材质层
     * @author warden_feng 2014-6-26
     */
    class Layer {
        /** 过滤模式 */
        FilterMode: string;
        /** 贴图ID */
        TextureID: number;
        /** 透明度 */
        Alpha: number;
        /** 是否有阴影 */
        Unshaded: boolean;
        /** 是否无雾化 */
        Unfogged: boolean;
        /** 是否双面 */
        TwoSided: boolean;
        /** 是否开启地图环境范围 */
        SphereEnvMap: boolean;
        /** 是否无深度测试 */
        NoDepthTest: boolean;
        /** 是否无深度设置 */
        NoDepthSet: boolean;
    }
}
declare namespace feng3d.war3 {
    /**
     * 材质
     * @author warden_feng 2014-6-26
     */
    class Material {
        /** 材质层列表 */
        layers: Layer[];
    }
}
declare namespace feng3d.war3 {
    /**
     * 模型信息
     * @author warden_feng 2014-6-26
     */
    class Model {
        /** 模型名称 */
        name: string;
        /** 混合时间 */
        BlendTime: number;
        /** 最小范围 */
        MinimumExtent: Vector3D;
        /** 最大范围 */
        MaximumExtent: Vector3D;
    }
}
declare namespace feng3d.war3 {
    /**
     *
     * @author warden_feng 2014-6-26
     */
    class Rotation {
        /** 时间 */
        time: number;
        /**  */
        value: Quaternion;
        InTan: Quaternion;
        OutTan: Quaternion;
    }
}
declare namespace feng3d.war3 {
    /**
     *
     * @author warden_feng 2014-6-26
     */
    class Scaling {
        /** 时间 */
        time: number;
        /**  */
        value: Vector3D;
        InTan: Vector3D;
        OutTan: Vector3D;
    }
}
declare namespace feng3d {
    /**
     *
     * @author warden_feng 2014-6-26
     */
    class Translation {
        /** 时间 */
        time: number;
        /**  */
        value: Vector3D;
        InTan: Vector3D;
        OutTan: Vector3D;
    }
}
declare namespace feng3d.war3 {
    /**
     * war3模型数据
     * @author warden_feng 2014-6-28
     */
    class War3Model {
        /** 版本号 */
        _version: number;
        /** 模型数据统计结果 */
        model: Model;
        /** 动作序列 */
        sequences: AnimInfo[];
        /** 全局序列 */
        globalsequences: Globalsequences;
        /** 纹理列表 */
        textures: FBitmap[];
        /** 材质列表 */
        materials: Material[];
        /** 几何设置列表 */
        geosets: Geoset[];
        /** 几何动画列表 */
        geosetAnims: GeosetAnim[];
        /** 骨骼动画列表 */
        bones: BoneObject[];
        /** 骨骼轴心坐标 */
        pivotPoints: Vector3D[];
        /** 顶点最大关节关联数 */
        _maxJointCount: number;
        root: string;
        constructor();
        private meshs;
        private container;
        getMesh(): GameObject;
        /**
         * 获取某时间的网格信息
         * @param time
         * @return
         */
        updateAnim(m_animTime: number): GameObject[];
        private getFBitmap(material);
        private BuildAnimatedMesh(m_animTime, geoset);
        private UpdateAllNodeMatrix(m_animTime);
        private BuildMatrix(bone, m_animTime);
    }
}
declare namespace feng3d.war3 {
    /**
     * war3的mdl文件解析
     * @author warden_feng 2014-6-14
     */
    class MdlParser {
        /** 字符串数据 */
        private _textData;
        private static VERSION_TOKEN;
        private static COMMENT_TOKEN;
        private static MODEL;
        private static SEQUENCES;
        private static GLOBALSEQUENCES;
        private static TEXTURES;
        private static MATERIALS;
        private static GEOSET;
        private static GEOSETANIM;
        private static BONE;
        private static HELPER;
        /** 当前解析位置 */
        private _parseIndex;
        /** 是否文件尾 */
        private _reachedEOF;
        /** 当前解析行号 */
        private _line;
        /** 当前行的字符位置 */
        private _charLineIndex;
        constructor();
        proceedParsing(_textData: string, onParseComplete?: (war3Model: War3Model) => void): void;
        /**
         * 获取骨骼深度
         * @param bone
         * @param bones
         * @return
         */
        private getBoneDepth(bone, bones);
        /**
         * 解析版本号
         */
        private parseVersion();
        /**
         * 解析模型数据统计结果
         */
        private parseModel();
        /**
         * 解析动作序列
         */
        private parseSequences();
        /**
         * 解析全局序列
         */
        private parseGlobalsequences();
        /**
         * 解析纹理列表
         */
        private parseTextures();
        /**
         * 解析材质
         */
        private parseMaterials();
        private parseGeoset();
        /**
         * 解析骨骼动画
         */
        private parseBone();
        /**
         * 解析骨骼动画
         */
        private parseHelper();
        /**
         * 解析骨骼角度
         */
        private parseBoneScaling(boneScaling);
        /**
         * 解析骨骼角度
         */
        private parseBoneTranslation(boneTranslation);
        /**
         * 解析骨骼角度
         */
        private parseBoneRotation(boneRotation);
        /**
         * 解析多边形动画
         */
        private parseGeosetanim();
        /**
         * 解析顶点
         */
        private parseVertices();
        /**
         * 解析法线
         */
        private parseNormals();
        /**
         * 解析纹理坐标
         */
        private parseTVertices();
        /**
         * 解析顶点分组
         */
        private parseVertexGroup();
        /**
         * 解析面
         */
        private parseFaces();
        /**
         * 解顶点分组
         */
        private parseGroups();
        /**
         * 解析纹理
         */
        private parseBitmap();
        /**
         * 解析材质
         */
        private parseMaterial();
        /**
         * 解析材质层
         */
        private parseLayer();
        /**
         * 解析动作信息
         */
        private parseAnim();
        /**
         * 解析几何体动作信息
         */
        private parseAnim1();
        /**
         * 解析骨骼轴心坐标
         */
        private parsePivotPoints();
        /**
         * 解析3d向量
         */
        private parseVector3D();
        /**
         * 解析四元素
         */
        private parseVector3D4();
        /**
         * 解析2d坐标
         */
        private parsePoint();
        /**
         * 解析间隔
         */
        private parseInterval();
        /**
         * 解析带双引号的字符串
         */
        private parseLiteralString();
        /**
         * 读取下个Number
         */
        private getNextNumber();
        /**
         * 读取下个字符
         */
        private getNextChar();
        /**
         * 读取下个int
         */
        private getNextInt();
        /**
         * 获取下个关键字
         */
        private getNextToken();
        /**
         * 跳过块
         * @return 跳过的内容
         */
        private jumpChunk();
        /**
         * 返回到上个字符位置
         */
        private putBack();
        /**
         * 跳过空白
         */
        private skipWhiteSpace();
        /**
         * 忽略该行
         */
        private ignoreLine();
        private check(key);
        /**
         * 抛出一个文件尾过早结束文件时遇到错误
         */
        private sendEOFError();
        /**
         * 遇到了一个意想不到的令牌时将抛出一个错误。
         * @param expected 发生错误的标记
         */
        private sendParseError(expected);
        /**
         * 发生未知关键字错误
         */
        private sendUnknownKeywordError(keyword);
    }
}
declare namespace feng3d.war3 {
    /**
     *
     * @author warden_feng 2014-6-28
     */
    class War3Utils {
        /**
         * 本函数用下面的公式计算变换矩阵：Mout = (Msc)-1 * (Msr)-1 * Ms * Msr * Msc * (Mrc)-1 * Mr * Mrc * Mt
         * 参考地址：http://blog.csdn.net/caimouse/article/details/132051;http://msdn.microsoft.com/en-us/library/windows/desktop/bb205365(v=vs.85).aspx
         * @param pScalingCenter	指向D3DXVECTOR3 结构的缩放中心点向量。如果为NULL，Msc 矩阵就是单位矩阵。
         * @param pScalingRotation	指向D3DXQUATERNION 结构的缩放和旋转的四元组。如果参数为NULL，Msr 矩阵就是单位矩阵。
         * @param pScaling			指向D3DXVECTOR3 结构的缩放向量。如果参数为NULL，Ms 矩阵就是单位矩阵。
         * @param pRotationCenter	指向D3DXVECTOR3 结构的旋转中心向量。如果参数为NULL，Mrc 矩阵是单位矩阵。
         * @param pRotation			指向D3DXQUATERNION 结构的旋转的四元组。如果参数为NULL，Mr 矩阵就是单位矩阵。
         * @param pTranslation		指向D3DXVECTOR3 结构的平移向量。如果参数是NULL，Mt 矩阵就是单位矩阵。
         * @return 指向D3DXMATRIX 结构的操作结果矩阵。
         */
        static D3DXMatrixTransformation(pScalingCenter: Vector3D, pScalingRotation: Quaternion, pScaling: Vector3D, pRotationCenter: Vector3D, pRotation: Quaternion, pTranslation: Vector3D): Matrix3D;
    }
}
declare namespace feng3d.war3 {
    /**
     * 骨骼的位移信息
     */
    class BoneScaling {
        /** 类型 */
        type: String;
        /**  */
        GlobalSeqId: number;
        scalings: Scaling[];
        scalingDic: {};
        getScaling(keyFrameTime: number): Vector3D;
    }
}
