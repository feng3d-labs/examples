var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * war3关节pose
         * @author warden_feng 2014-6-28
         */
        var JointPoseWar3 = (function (_super) {
            __extends(JointPoseWar3, _super);
            function JointPoseWar3() {
                return _super.call(this) || this;
            }
            return JointPoseWar3;
        }(feng3d.JointPose));
        war3.JointPoseWar3 = JointPoseWar3;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         *
         * @author warden_feng 2014-6-28
         */
        var SkeletonPoseWar3 = (function (_super) {
            __extends(SkeletonPoseWar3, _super);
            function SkeletonPoseWar3() {
                return _super.call(this) || this;
            }
            return SkeletonPoseWar3;
        }(feng3d.SkeletonPose));
        war3.SkeletonPoseWar3 = SkeletonPoseWar3;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         *
         * @author warden_feng 2014-6-28
         */
        var SkeletonClipNodeWar3 = (function (_super) {
            __extends(SkeletonClipNodeWar3, _super);
            function SkeletonClipNodeWar3() {
                return _super.call(this) || this;
            }
            SkeletonClipNodeWar3.prototype.updateStitch = function () {
                this._stitchDirty = false;
                //_lastFrame = (_looping && _stitchFinalFrame) ? _numFrames : _numFrames - 1;
                this._totalDuration = 500;
                this._totalDelta.x = 0;
                this._totalDelta.y = 0;
                this._totalDelta.z = 0;
            };
            return SkeletonClipNodeWar3;
        }(feng3d.SkeletonClipNode));
        war3.SkeletonClipNodeWar3 = SkeletonClipNodeWar3;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 骨骼动画
         * @author warden_feng 2014-5-27
         */
        var SkeletonAnimatorWar3 = (function (_super) {
            __extends(SkeletonAnimatorWar3, _super);
            /**
             * 创建一个骨骼动画类
             * @param animationSet 动画集合
             * @param skeleton 骨骼
             * @param forceCPU 是否强行使用cpu
             */
            function SkeletonAnimatorWar3(gameObject) {
                return _super.call(this, gameObject) || this;
            }
            /**
             * 本地转换到全局姿势
             * @param sourcePose 原姿势
             * @param targetPose 目标姿势
             * @param skeleton 骨骼
             */
            SkeletonAnimatorWar3.prototype.localToGlobalPose = function (sourcePose, targetPose, skeleton) {
                var globalPoses = targetPose.jointPoses;
                var globalJointPose;
                var joints = skeleton.joints;
                var len = sourcePose.numJointPoses;
                var jointPoses = sourcePose.jointPoses;
                var parentIndex = 0;
                var joint;
                var parentPose;
                var pose;
                var or;
                var tr;
                var gTra;
                var gOri;
                var x1 = 0, y1 = 0, z1 = 0, w1 = 0;
                var x2 = 0, y2 = 0, z2 = 0, w2 = 0;
                var x3 = 0, y3 = 0, z3 = 0;
                //初始化全局骨骼姿势长度
                if (globalPoses.length != len)
                    globalPoses.length = len;
                for (var i = 0; i < len; ++i) {
                    //初始化单个全局骨骼姿势
                    globalJointPose = globalPoses[i] || (globalPoses[i] = new feng3d.JointPose());
                    joint = joints[i];
                    parentIndex = joint.parentIndex;
                    pose = jointPoses[i];
                    //全局方向偏移
                    gOri = globalJointPose.orientation;
                    //全局位置偏移
                    gTra = globalJointPose.translation;
                    //计算全局骨骼的 方向偏移与位置偏移
                    //处理跟骨骼(直接赋值)
                    tr = pose.translation;
                    or = pose.orientation;
                    gOri.x = or.x;
                    gOri.y = or.y;
                    gOri.z = or.z;
                    gOri.w = or.w;
                    gTra.x = tr.x;
                    gTra.y = tr.y;
                    gTra.z = tr.z;
                }
            };
            return SkeletonAnimatorWar3;
        }(feng3d.SkeletonAnimator));
        war3.SkeletonAnimatorWar3 = SkeletonAnimatorWar3;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 透明度动画
         * @author warden_feng 2014-6-26
         */
        var AnimAlpha = (function () {
            function AnimAlpha() {
            }
            return AnimAlpha;
        }());
        war3.AnimAlpha = AnimAlpha;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 全局动作信息
         * @author warden_feng 2014-6-26
         */
        var AnimInfo = (function () {
            function AnimInfo() {
                /** 是否循环 */
                this.loop = true;
            }
            return AnimInfo;
        }());
        war3.AnimInfo = AnimInfo;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 几何体动作信息
         * @author warden_feng 2014-6-26
         */
        var AnimInfo1 = (function () {
            function AnimInfo1() {
            }
            return AnimInfo1;
        }());
        war3.AnimInfo1 = AnimInfo1;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 骨骼信息(包含骨骼，helper等其他对象)
         * @author warden_feng 2014-6-26
         */
        var BoneObject = (function () {
            function BoneObject() {
                /** 父对象 */
                this.Parent = -1;
                /** 骨骼位移动画 */
                this.Translation = new war3.BoneTranslation();
                /** 骨骼缩放动画 */
                this.Scaling = new war3.BoneScaling();
                /** 骨骼角度动画 */
                this.Rotation = new war3.BoneRotation();
            }
            BoneObject.prototype.calculateTransformation = function (keyFrameTime) {
                var pScalingCenter = this.pivotPoint;
                var pScalingRotation = null;
                var pScaling = this.Scaling.getScaling(keyFrameTime);
                var pRotationCenter = this.pivotPoint;
                var pRotation = this.Rotation.getRotation(keyFrameTime);
                var pTranslation = this.Translation.getTranslation(keyFrameTime);
                this.c_transformation = war3.War3Utils.D3DXMatrixTransformation(pScalingCenter, pScalingRotation, pScaling, pRotationCenter, pRotation, pTranslation);
            };
            return BoneObject;
        }());
        war3.BoneObject = BoneObject;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 骨骼的角度信息
         */
        var BoneRotation = (function () {
            function BoneRotation() {
                this.rotations = [];
                this.rotationDic = {};
            }
            BoneRotation.prototype.getRotation = function (keyFrameTime) {
                var RotationQuaternion;
                if (this.rotations.length == 0 || keyFrameTime < this.rotations[0].time || keyFrameTime > this.rotations[this.rotations.length - 1].time)
                    return new feng3d.Quaternion();
                var key1 = this.rotations[0];
                var key2;
                for (var i = 0; i < this.rotations.length; i++) {
                    key2 = this.rotations[i];
                    if (key2.time > keyFrameTime) {
                        break;
                    }
                    key1 = key2;
                }
                if (key1 == key2) {
                    RotationQuaternion = key1.value.clone();
                    return RotationQuaternion;
                }
                var Factor = (keyFrameTime - key1.time) / (key2.time - key1.time);
                var InverseFactor = 1.0 - Factor;
                var tempVec;
                var Factor1;
                var Factor2;
                var Factor3;
                var Factor4;
                var FactorTimesTwo;
                var InverseFactorTimesTwo;
                var q;
                var q1;
                var q2;
                switch (this.type) {
                    case "DontInterp":
                        RotationQuaternion = key1.value.clone();
                        RotationQuaternion.fromEulerAngles(key1.value.x, key1.value.y, key1.value.z);
                        break;
                    case "Linear":
                        RotationQuaternion = new feng3d.Quaternion();
                        q1 = key1.value.clone();
                        q2 = key2.value.clone();
                        RotationQuaternion.slerp(q1, q2, Factor);
                        break;
                    case "Hermite":
                    case "Bezier":
                        RotationQuaternion = new feng3d.Quaternion();
                        q1 = key1.value.clone();
                        q2 = key2.value.clone();
                        RotationQuaternion.slerp(q1, q2, Factor);
                        break;
                }
                return RotationQuaternion;
            };
            return BoneRotation;
        }());
        war3.BoneRotation = BoneRotation;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 骨骼的位移信息
         * @author warden_feng 2014-6-26
         */
        var BoneTranslation = (function () {
            function BoneTranslation() {
                this.translations = [];
                this.translationDic = {};
            }
            BoneTranslation.prototype.getTranslation = function (keyFrameTime) {
                var TranslationVector;
                if (this.translations.length == 0)
                    return new feng3d.Vector3D();
                var key1 = this.translations[0];
                var key2;
                for (var i = 0; i < this.translations.length; i++) {
                    key2 = this.translations[i];
                    if (key2.time > keyFrameTime) {
                        break;
                    }
                    key1 = key2;
                }
                if (key1 == key2) {
                    TranslationVector = key1.value.clone();
                    return TranslationVector;
                }
                var Factor = (keyFrameTime - key1.time) / (key2.time - key1.time);
                var InverseFactor = 1.0 - Factor;
                var tempVec;
                var Factor1;
                var Factor2;
                var Factor3;
                var Factor4;
                var FactorTimesTwo;
                var InverseFactorTimesTwo;
                switch (this.type) {
                    case "DontInterp":
                        TranslationVector = key1.value.clone();
                        break;
                    case "Linear":
                        TranslationVector = new feng3d.Vector3D();
                        tempVec = key1.value.clone();
                        tempVec.scaleBy(InverseFactor);
                        TranslationVector = TranslationVector.add(tempVec);
                        tempVec = key2.value.clone();
                        tempVec.scaleBy(Factor);
                        TranslationVector = TranslationVector.add(tempVec);
                        break;
                    case "Hermite":
                        FactorTimesTwo = Factor * Factor;
                        Factor1 = FactorTimesTwo * (2.0 * Factor - 3.0) + 1;
                        Factor2 = FactorTimesTwo * (Factor - 2.0) + Factor;
                        Factor3 = FactorTimesTwo * (Factor - 1.0);
                        Factor4 = FactorTimesTwo * (3.0 - 2.0 * Factor);
                        TranslationVector = new feng3d.Vector3D();
                        tempVec = key1.value.clone();
                        tempVec.scaleBy(Factor1);
                        TranslationVector = TranslationVector.add(tempVec);
                        tempVec = key1.OutTan.clone();
                        tempVec.scaleBy(Factor2);
                        TranslationVector = TranslationVector.add(tempVec);
                        tempVec = key2.InTan.clone();
                        tempVec.scaleBy(Factor3);
                        TranslationVector = TranslationVector.add(tempVec);
                        tempVec = key2.value.clone();
                        tempVec.scaleBy(Factor4);
                        TranslationVector = TranslationVector.add(tempVec);
                        break;
                    case "Bezier":
                        FactorTimesTwo = Factor * Factor;
                        InverseFactorTimesTwo = InverseFactor * InverseFactor;
                        Factor1 = InverseFactorTimesTwo * InverseFactor;
                        Factor2 = 3.0 * Factor * InverseFactorTimesTwo;
                        Factor3 = 3.0 * FactorTimesTwo * InverseFactor;
                        Factor4 = FactorTimesTwo * Factor;
                        TranslationVector = new feng3d.Vector3D();
                        tempVec = key1.value.clone();
                        tempVec.scaleBy(Factor1);
                        TranslationVector = TranslationVector.add(tempVec);
                        tempVec = key1.OutTan.clone();
                        tempVec.scaleBy(Factor2);
                        TranslationVector = TranslationVector.add(tempVec);
                        tempVec = key2.InTan.clone();
                        tempVec.scaleBy(Factor3);
                        TranslationVector = TranslationVector.add(tempVec);
                        tempVec = key2.value.clone();
                        tempVec.scaleBy(Factor4);
                        TranslationVector = TranslationVector.add(tempVec);
                        break;
                }
                return TranslationVector;
            };
            return BoneTranslation;
        }());
        war3.BoneTranslation = BoneTranslation;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 纹理
         * @author warden_feng 2014-6-26
         */
        var FBitmap = (function () {
            function FBitmap() {
            }
            return FBitmap;
        }());
        war3.FBitmap = FBitmap;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 几何设置
         * @author warden_feng 2014-6-26
         */
        var Geoset = (function () {
            function Geoset() {
                /** 动作信息 */
                this.Anims = [];
            }
            return Geoset;
        }());
        war3.Geoset = Geoset;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 几何体动画
         * @author warden_feng 2014-6-26
         */
        var GeosetAnim = (function () {
            function GeosetAnim() {
            }
            return GeosetAnim;
        }());
        war3.GeosetAnim = GeosetAnim;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 全局序列
         * @author warden_feng 2014-6-26
         */
        var Globalsequences = (function () {
            function Globalsequences() {
                /** 持续时间 */
                this.durations = [];
            }
            return Globalsequences;
        }());
        war3.Globalsequences = Globalsequences;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 动作间隔
         * @author warden_feng 2014-6-26
         */
        var Interval = (function () {
            function Interval() {
            }
            return Interval;
        }());
        war3.Interval = Interval;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 材质层
         * @author warden_feng 2014-6-26
         */
        var Layer = (function () {
            function Layer() {
            }
            return Layer;
        }());
        war3.Layer = Layer;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 材质
         * @author warden_feng 2014-6-26
         */
        var Material = (function () {
            function Material() {
                /** 材质层列表 */
                this.layers = [];
            }
            return Material;
        }());
        war3.Material = Material;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 模型信息
         * @author warden_feng 2014-6-26
         */
        var Model = (function () {
            function Model() {
            }
            return Model;
        }());
        war3.Model = Model;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         *
         * @author warden_feng 2014-6-26
         */
        var Rotation = (function () {
            function Rotation() {
            }
            return Rotation;
        }());
        war3.Rotation = Rotation;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         *
         * @author warden_feng 2014-6-26
         */
        var Scaling = (function () {
            function Scaling() {
            }
            return Scaling;
        }());
        war3.Scaling = Scaling;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    /**
     *
     * @author warden_feng 2014-6-26
     */
    var Translation = (function () {
        function Translation() {
        }
        return Translation;
    }());
    feng3d.Translation = Translation;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * war3模型数据
         * @author warden_feng 2014-6-28
         */
        var War3Model = (function () {
            function War3Model() {
                /** 几何设置列表 */
                this.geosets = [];
                /** 骨骼动画列表 */
                this.bones = [];
                this.root = "";
            }
            War3Model.prototype.getMesh = function () {
                if (this.container)
                    return this.container;
                this.meshs = [];
                this.meshs.length = this.geosets.length;
                this.container = feng3d.GameObject.create();
                for (var i = 0; i < this.geosets.length; i++) {
                    var geoset = this.geosets[i];
                    var geometry = new feng3d.Geometry();
                    var subg = new feng3d.Geometry();
                    subg.positions = new Float32Array(geoset.Vertices);
                    subg.uvs = new Float32Array(geoset.TVertices);
                    subg.setIndices(new Uint16Array(geoset.Faces));
                    var normals = feng3d.GeometryUtils.createVertexNormals(subg.indices, subg.positions, true);
                    subg.normals = new Float32Array(normals);
                    geometry.addGeometry(subg);
                    var material = this.materials[geoset.MaterialID];
                    var fBitmap = this.getFBitmap(material);
                    var material1;
                    var image = fBitmap.image;
                    if (image && image.length > 0) {
                        image = image.substring(0, image.indexOf("."));
                        image += ".JPG";
                        image = this.root + image;
                        material1 = new feng3d.StandardMaterial(image);
                        material1.bothSides = true;
                    }
                    var mesh = this.meshs[i] = feng3d.GameObject.create();
                    mesh.addComponent(feng3d.MeshFilter).mesh = geometry;
                    mesh.addComponent(feng3d.MeshRenderer).material = material1;
                    this.container.transform.addChild(mesh.transform);
                }
                return this.container;
            };
            /**
             * 获取某时间的网格信息
             * @param time
             * @return
             */
            War3Model.prototype.updateAnim = function (m_animTime) {
                var mesh;
                for (var i = 0; i < this.geosets.length; i++) {
                    var geoset = this.geosets[i];
                    var positions = geoset.Vertices;
                    this.UpdateAllNodeMatrix(m_animTime);
                    positions = this.BuildAnimatedMesh(m_animTime, geoset);
                    //				trace(positions);
                    mesh = this.meshs[i];
                    var subg = mesh.getComponent(feng3d.MeshFilter).mesh;
                    subg.positions = new Float32Array(positions);
                    var normals = feng3d.GeometryUtils.createVertexNormals(subg.indices, subg.positions, true);
                    subg.normals = new Float32Array(normals);
                }
                return this.meshs;
            };
            War3Model.prototype.getFBitmap = function (material) {
                var TextureID;
                for (var i = 0; i < material.layers.length; i++) {
                    var layer = material.layers[i];
                    TextureID = layer.TextureID;
                    break;
                }
                var fBitmap = this.textures[TextureID];
                return fBitmap;
            };
            War3Model.prototype.BuildAnimatedMesh = function (m_animTime, geoset) {
                var positions = geoset.Vertices.concat();
                var numVertexs = geoset.Vertices.length / 3;
                for (var i = 0; i < numVertexs; i++) {
                    var animatedPos = new feng3d.Vector3D();
                    //原顶点数据
                    var vPosOri = new feng3d.Vector3D(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                    //顶点所在组索引
                    var iGroupIndex = geoset.VertexGroup[i];
                    //顶点所在组索引
                    var group = geoset.Groups[iGroupIndex];
                    //顶点关联骨骼数量
                    var numBones = group.length;
                    for (var j = 0; j < numBones; j++) {
                        var boneIndex = group[j];
                        var bone = this.bones[boneIndex];
                        var transformation = bone.c_globalTransformation;
                        var tempPos = transformation.transformVector(vPosOri);
                        animatedPos = animatedPos.add(tempPos);
                    }
                    animatedPos.scaleBy(1 / numBones);
                    positions[i * 3] = animatedPos.y;
                    positions[i * 3 + 1] = animatedPos.z;
                    positions[i * 3 + 2] = -animatedPos.x;
                }
                return positions;
            };
            War3Model.prototype.UpdateAllNodeMatrix = function (m_animTime) {
                var numNodes = this.bones.length;
                var i;
                var bone;
                for (i = 0; i < numNodes; i++) {
                    bone = this.bones[i];
                    bone.pivotPoint = this.pivotPoints[bone.ObjectId];
                    bone.c_transformation = bone.c_globalTransformation = null;
                }
                for (i = 0; i < numNodes; i++) {
                    bone = this.bones[i];
                    this.BuildMatrix(bone, m_animTime);
                }
            };
            War3Model.prototype.BuildMatrix = function (bone, m_animTime) {
                var globalTransformation = bone.c_globalTransformation;
                if (globalTransformation == null) {
                    bone.calculateTransformation(m_animTime);
                    var localTransformation = bone.c_transformation;
                    if (bone.Parent == -1) {
                        globalTransformation = localTransformation;
                    }
                    else {
                        var parentBone = this.bones[bone.Parent];
                        this.BuildMatrix(parentBone, m_animTime);
                        var parentGlobalTransformation = parentBone.c_globalTransformation;
                        globalTransformation = parentGlobalTransformation.clone();
                        globalTransformation.prepend(localTransformation);
                    }
                    bone.c_globalTransformation = globalTransformation;
                }
            };
            return War3Model;
        }());
        war3.War3Model = War3Model;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * war3的mdl文件解析
         * @author warden_feng 2014-6-14
         */
        // export class MdlParser extends ParserBase
        var MdlParser = (function () {
            function MdlParser() {
                /** 当前解析位置 */
                this._parseIndex = 0;
                /** 是否文件尾 */
                this._reachedEOF = false;
                /** 当前解析行号 */
                this._line = 0;
                /** 当前行的字符位置 */
                this._charLineIndex = 0;
                // super(ParserDataFormat.PLAIN_TEXT);
            }
            MdlParser.prototype.proceedParsing = function (_textData, onParseComplete) {
                if (onParseComplete === void 0) { onParseComplete = null; }
                var token;
                var bone;
                var geoset;
                var junpStr;
                var num = 0;
                var war3Model = new war3.War3Model();
                this._textData = _textData;
                while (!this._reachedEOF) {
                    //获取关键字
                    token = this.getNextToken();
                    switch (token) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case MdlParser.VERSION_TOKEN:
                            war3Model._version = this.parseVersion();
                            break;
                        case MdlParser.MODEL:
                            war3Model.model = this.parseModel();
                            break;
                        case MdlParser.SEQUENCES:
                            war3Model.sequences = this.parseSequences();
                            break;
                        case MdlParser.GLOBALSEQUENCES:
                            war3Model.globalsequences = this.parseGlobalsequences();
                            break;
                        case MdlParser.TEXTURES:
                            war3Model.textures = this.parseTextures();
                            break;
                        case MdlParser.MATERIALS:
                            war3Model.materials = this.parseMaterials();
                            break;
                        case MdlParser.GEOSET:
                            geoset = this.parseGeoset();
                            war3Model.geosets.push(geoset);
                            break;
                        case MdlParser.GEOSETANIM:
                            this.parseGeosetanim();
                            break;
                        case MdlParser.BONE:
                            bone = this.parseBone();
                            war3Model.bones[bone.ObjectId] = bone;
                            break;
                        case MdlParser.HELPER:
                            bone = this.parseHelper();
                            war3Model.bones[bone.ObjectId] = bone;
                            break;
                        case "PivotPoints":
                            war3Model.pivotPoints = this.parsePivotPoints();
                            break;
                        case "ParticleEmitter2":
                            this.parseLiteralString();
                            junpStr = this.jumpChunk();
                            break;
                        case "EventObject":
                            this.parseLiteralString();
                            junpStr = this.jumpChunk();
                            break;
                        case "Attachment":
                            this.parseLiteralString();
                            junpStr = this.jumpChunk();
                            break;
                        case "RibbonEmitter":
                            this.parseLiteralString();
                            junpStr = this.jumpChunk();
                            break;
                        case "CollisionShape":
                            this.parseLiteralString();
                            junpStr = this.jumpChunk();
                            break;
                        case "Camera":
                            this.parseLiteralString();
                            junpStr = this.jumpChunk();
                            break;
                        case "Light":
                            this.parseLiteralString();
                            junpStr = this.jumpChunk();
                            break;
                        default:
                            if (!this._reachedEOF)
                                this.sendUnknownKeywordError(token);
                    }
                }
                onParseComplete && onParseComplete(war3Model);
            };
            /**
             * 获取骨骼深度
             * @param bone
             * @param bones
             * @return
             */
            MdlParser.prototype.getBoneDepth = function (bone, bones) {
                if (bone.Parent == -1)
                    return 0;
                return this.getBoneDepth(bones[bone.Parent], bones) + 1;
            };
            /**
             * 解析版本号
             */
            MdlParser.prototype.parseVersion = function () {
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                token = this.getNextToken();
                if (token != "FormatVersion")
                    this.sendUnknownKeywordError(token);
                var version = this.getNextInt();
                token = this.getNextToken();
                if (token != "}")
                    this.sendParseError(token);
                return version;
            };
            /**
             * 解析模型数据统计结果
             */
            MdlParser.prototype.parseModel = function () {
                var model = new war3.Model();
                model.name = this.parseLiteralString();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "BlendTime":
                            model.BlendTime = this.getNextInt();
                            break;
                        case "MinimumExtent":
                            model.MinimumExtent = this.parseVector3D();
                            break;
                        case "MaximumExtent":
                            model.MaximumExtent = this.parseVector3D();
                            break;
                        case "}":
                            break;
                        default:
                            this.ignoreLine();
                            break;
                    }
                }
                return model;
            };
            /**
             * 解析动作序列
             */
            MdlParser.prototype.parseSequences = function () {
                //跳过动作个数
                this.getNextInt();
                var sequences = [];
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "Anim":
                            var anim = this.parseAnim();
                            sequences.push(anim);
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return sequences;
            };
            /**
             * 解析全局序列
             */
            MdlParser.prototype.parseGlobalsequences = function () {
                var globalsequences = new war3.Globalsequences();
                globalsequences.id = this.getNextInt();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "Duration":
                            var duration = this.getNextInt();
                            globalsequences.durations.push(duration);
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return globalsequences;
            };
            /**
             * 解析纹理列表
             */
            MdlParser.prototype.parseTextures = function () {
                //跳过纹理个数
                this.getNextInt();
                var bitmaps = [];
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "Bitmap":
                            var bitmap = this.parseBitmap();
                            bitmaps.push(bitmap);
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return bitmaps;
            };
            /**
             * 解析材质
             */
            MdlParser.prototype.parseMaterials = function () {
                //跳过纹理个数
                this.getNextInt();
                var materials = [];
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "Material":
                            var material = this.parseMaterial();
                            materials.push(material);
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return materials;
            };
            MdlParser.prototype.parseGeoset = function () {
                var geoset = new war3.Geoset();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "Vertices":
                            geoset.Vertices = this.parseVertices();
                            break;
                        case "Normals":
                            geoset.Normals = this.parseNormals();
                            break;
                        case "TVertices":
                            geoset.TVertices = this.parseTVertices();
                            break;
                        case "VertexGroup":
                            geoset.VertexGroup = this.parseVertexGroup();
                            break;
                        case "Faces":
                            geoset.Faces = this.parseFaces();
                            break;
                        case "Groups":
                            geoset.Groups = this.parseGroups();
                            break;
                        case "MinimumExtent":
                            geoset.MinimumExtent = this.parseVector3D();
                            break;
                        case "MaximumExtent":
                            geoset.MaximumExtent = this.parseVector3D();
                            break;
                        case "BoundsRadius":
                            geoset.BoundsRadius = this.getNextNumber();
                            break;
                        case "Anim":
                            var anim = this.parseAnim1();
                            geoset.Anims.push(anim);
                            break;
                        case "MaterialID":
                            geoset.MaterialID = this.getNextInt();
                            break;
                        case "SelectionGroup":
                            geoset.SelectionGroup = this.getNextInt();
                            break;
                        case "Unselectable":
                            geoset.Unselectable = true;
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return geoset;
            };
            /**
             * 解析骨骼动画
             */
            MdlParser.prototype.parseBone = function () {
                var bone = new war3.BoneObject();
                bone.type = "bone";
                bone.name = this.parseLiteralString();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "ObjectId":
                            bone.ObjectId = this.getNextInt();
                            break;
                        case "Parent":
                            bone.Parent = this.getNextInt();
                            break;
                        case "GeosetId":
                            bone.GeosetId = this.getNextToken();
                            break;
                        case "GeosetAnimId":
                            bone.GeosetAnimId = this.getNextToken();
                            break;
                        case "Billboarded":
                            bone.Billboarded = true;
                            break;
                        case "Translation":
                            this.parseBoneTranslation(bone.Translation);
                            break;
                        case "Scaling":
                            this.parseBoneScaling(bone.Scaling);
                            break;
                        case "Rotation":
                            this.parseBoneRotation(bone.Rotation);
                            break;
                        case "BillboardedLockZ":
                            break;
                        case "BillboardedLockY":
                            break;
                        case "BillboardedLockX":
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return bone;
            };
            /**
             * 解析骨骼动画
             */
            MdlParser.prototype.parseHelper = function () {
                var bone = new war3.BoneObject();
                bone.type = "helper";
                bone.name = this.parseLiteralString();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "ObjectId":
                            bone.ObjectId = this.getNextInt();
                            break;
                        case "Parent":
                            bone.Parent = this.getNextInt();
                            break;
                        case "GeosetId":
                            bone.GeosetId = this.getNextToken();
                            break;
                        case "GeosetAnimId":
                            bone.GeosetAnimId = this.getNextToken();
                            break;
                        case "Billboarded":
                            bone.Billboarded = true;
                            break;
                        case "Translation":
                            this.parseBoneTranslation(bone.Translation);
                            break;
                        case "Scaling":
                            this.parseBoneScaling(bone.Scaling);
                            break;
                        case "Rotation":
                            this.parseBoneRotation(bone.Rotation);
                            break;
                        case "BillboardedLockX":
                            break;
                        case "BillboardedLockY":
                            break;
                        case "BillboardedLockZ":
                            break;
                        case "DontInherit":
                            this.jumpChunk();
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return bone;
            };
            /**
             * 解析骨骼角度
             */
            MdlParser.prototype.parseBoneScaling = function (boneScaling) {
                //跳过长度
                var len = this.getNextInt();
                this.check("{");
                boneScaling.type = this.getNextToken();
                var currentIndex = this._parseIndex;
                var token = this.getNextToken();
                if (token == "GlobalSeqId") {
                    boneScaling.GlobalSeqId = this.getNextInt();
                }
                else {
                    this._parseIndex = currentIndex;
                }
                var i = 0;
                var scaling;
                switch (boneScaling.type) {
                    case "Hermite":
                    case "Bezier":
                        for (i = 0; i < len; i++) {
                            scaling = new war3.Scaling();
                            scaling.time = this.getNextInt();
                            scaling.value = this.parseVector3D();
                            scaling[this.getNextToken()] = this.parseVector3D();
                            scaling[this.getNextToken()] = this.parseVector3D();
                            boneScaling.scalings.push(scaling);
                        }
                        break;
                    case "Linear":
                        for (i = 0; i < len; i++) {
                            scaling = new war3.Scaling();
                            scaling.time = this.getNextInt();
                            scaling.value = this.parseVector3D();
                            boneScaling.scalings.push(scaling);
                        }
                        break;
                    case "DontInterp":
                        for (i = 0; i < len; i++) {
                            scaling = new war3.Scaling();
                            scaling.time = this.getNextInt();
                            scaling.value = this.parseVector3D();
                            boneScaling.scalings.push(scaling);
                        }
                        break;
                    default:
                        throw new Error("未处理" + boneScaling.type + "类型角度");
                }
                this.check("}");
            };
            /**
             * 解析骨骼角度
             */
            MdlParser.prototype.parseBoneTranslation = function (boneTranslation) {
                //跳过长度
                var len = this.getNextInt();
                this.check("{");
                boneTranslation.type = this.getNextToken();
                var currentIndex = this._parseIndex;
                var token = this.getNextToken();
                if (token == "GlobalSeqId") {
                    boneTranslation.GlobalSeqId = this.getNextInt();
                }
                else {
                    this._parseIndex = currentIndex;
                }
                var i = 0;
                var translation;
                switch (boneTranslation.type) {
                    case "Hermite":
                    case "Bezier":
                        for (i = 0; i < len; i++) {
                            translation = new feng3d.Translation();
                            translation.time = this.getNextInt();
                            translation.value = this.parseVector3D();
                            translation[this.getNextToken()] = this.parseVector3D();
                            translation[this.getNextToken()] = this.parseVector3D();
                            boneTranslation.translations.push(translation);
                        }
                        break;
                    case "Linear":
                        for (i = 0; i < len; i++) {
                            translation = new feng3d.Translation();
                            translation.time = this.getNextInt();
                            translation.value = this.parseVector3D();
                            boneTranslation.translations.push(translation);
                        }
                        break;
                    case "DontInterp":
                        for (i = 0; i < len; i++) {
                            translation = new feng3d.Translation();
                            translation.time = this.getNextInt();
                            translation.value = this.parseVector3D();
                            boneTranslation.translations.push(translation);
                        }
                        break;
                    default:
                        throw new Error("未处理" + boneTranslation.type + "类型角度");
                }
                this.check("}");
            };
            /**
             * 解析骨骼角度
             */
            MdlParser.prototype.parseBoneRotation = function (boneRotation) {
                var len = this.getNextInt();
                this.check("{");
                boneRotation.type = this.getNextToken();
                var currentIndex = this._parseIndex;
                var token = this.getNextToken();
                if (token == "GlobalSeqId") {
                    boneRotation.GlobalSeqId = this.getNextInt();
                }
                else {
                    this._parseIndex = currentIndex;
                }
                var i = 0;
                var rotation;
                switch (boneRotation.type) {
                    case "Hermite":
                    case "Bezier":
                        for (i = 0; i < len; i++) {
                            rotation = new war3.Rotation();
                            rotation.time = this.getNextInt();
                            rotation.value = this.parseVector3D4();
                            rotation[this.getNextToken()] = this.parseVector3D4();
                            rotation[this.getNextToken()] = this.parseVector3D4();
                            boneRotation.rotations.push(rotation);
                        }
                        break;
                    case "Linear":
                        for (i = 0; i < len; i++) {
                            rotation = new war3.Rotation();
                            rotation.time = this.getNextInt();
                            rotation.value = this.parseVector3D4();
                            boneRotation.rotations.push(rotation);
                        }
                        break;
                    case "DontInterp":
                        for (i = 0; i < len; i++) {
                            rotation = new war3.Rotation();
                            rotation.time = this.getNextInt();
                            rotation.value = this.parseVector3D4();
                            boneRotation.rotations.push(rotation);
                        }
                        break;
                    default:
                        throw new Error("未处理" + boneRotation.type + "类型角度");
                }
                this.check("}");
            };
            /**
             * 解析多边形动画
             */
            MdlParser.prototype.parseGeosetanim = function () {
                var jumpStr = this.jumpChunk();
                return null;
                // if (this.war3Model.geosetAnims == null)
                // 	this.war3Model.geosetAnims = [];
                // var geosetAnim: GeosetAnim = new GeosetAnim();
                // this.war3Model.geosetAnims.push(geosetAnim);
                // var token: string = this.getNextToken();
                // if (token != "{")
                // 	this.sendParseError(token);
                // var ch: string;
                // while (ch != "}")
                // {
                // 	ch = this.getNextToken();
                // 	switch (ch)
                // 	{
                // 		case MdlParser.COMMENT_TOKEN:
                // 			this.ignoreLine();
                // 			break;
                // 		case "Alpha":
                // 			//						parseAnimAlpha();
                // 			break;
                // 		case "}":
                // 			break;
                // 		default:
                // 			this.sendUnknownKeywordError(ch);
                // 			break;
                // 	}
                // }
                // return geosetAnim;
            };
            /**
             * 解析顶点
             */
            MdlParser.prototype.parseVertices = function () {
                var vertices = [];
                //跳过长度
                var len = this.getNextInt();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var vertex;
                for (var i = 0; i < len; i++) {
                    vertex = this.parseVector3D();
                    vertices.push(vertex.x, vertex.y, vertex.z);
                }
                token = this.getNextToken();
                if (token != "}")
                    this.sendParseError(token);
                return vertices;
            };
            /**
             * 解析法线
             */
            MdlParser.prototype.parseNormals = function () {
                var normals = [];
                //跳过长度
                var len = this.getNextInt();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var vertex;
                for (var i = 0; i < len; i++) {
                    vertex = this.parseVector3D();
                    normals.push(vertex.x, vertex.y, vertex.z);
                }
                token = this.getNextToken();
                if (token != "}")
                    this.sendParseError(token);
                return normals;
            };
            /**
             * 解析纹理坐标
             */
            MdlParser.prototype.parseTVertices = function () {
                var tVertices = [];
                //跳过长度
                var len = this.getNextInt();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var uv;
                for (var i = 0; i < len; i++) {
                    uv = this.parsePoint();
                    tVertices.push(uv.x, uv.y);
                }
                token = this.getNextToken();
                if (token != "}")
                    this.sendParseError(token);
                return tVertices;
            };
            /**
             * 解析顶点分组
             */
            MdlParser.prototype.parseVertexGroup = function () {
                var vertexGroup = [];
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                token = this.getNextToken();
                while (token != "}") {
                    vertexGroup.push(Number(token));
                    token = this.getNextToken();
                }
                return vertexGroup;
            };
            /**
             * 解析面
             */
            MdlParser.prototype.parseFaces = function () {
                var faces = [];
                var faceNum = this.getNextInt();
                var indexNum = this.getNextInt();
                var token;
                this.check("{");
                this.check("Triangles");
                this.check("{");
                this.check("{");
                token = this.getNextToken();
                while (token != "}") {
                    faces.push(Number(token));
                    token = this.getNextToken();
                }
                this.check("}");
                this.check("}");
                return faces;
            };
            /**
             * 解顶点分组
             */
            MdlParser.prototype.parseGroups = function () {
                var groups = [];
                var groupNum = this.getNextInt();
                var valueNum = this.getNextInt();
                var token;
                this.check("{");
                token = this.getNextToken();
                while (token != "}") {
                    if (token == "Matrices") {
                        this.check("{");
                        token = this.getNextToken();
                        var Matrices = [];
                        while (token != "}") {
                            Matrices.push(Number(token));
                            token = this.getNextToken();
                        }
                        groups.push(Matrices);
                    }
                    token = this.getNextToken();
                }
                return groups;
            };
            /**
             * 解析纹理
             */
            MdlParser.prototype.parseBitmap = function () {
                var bitmap = new war3.FBitmap();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "Image":
                            bitmap.image = this.parseLiteralString();
                            break;
                        case "ReplaceableId":
                            bitmap.ReplaceableId = this.getNextInt();
                            break;
                        case "WrapWidth":
                            break;
                        case "WrapHeight":
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return bitmap;
            };
            /**
             * 解析材质
             */
            MdlParser.prototype.parseMaterial = function () {
                var material = new war3.Material();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "Layer":
                            var layer = this.parseLayer();
                            material.layers.push(layer);
                            break;
                        case "SortPrimsFarZ":
                            break;
                        case "ConstantColor":
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return material;
            };
            /**
             * 解析材质层
             */
            MdlParser.prototype.parseLayer = function () {
                var layer = new war3.Layer();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var staticSigned = false;
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "FilterMode":
                            layer.FilterMode = this.getNextToken();
                            break;
                        case "static":
                            staticSigned = true;
                            break;
                        case "TextureID":
                            if (staticSigned) {
                                layer.TextureID = this.getNextInt();
                            }
                            else {
                                this.sendUnknownKeywordError(ch);
                            }
                            staticSigned = false;
                            break;
                        case "Alpha":
                            if (staticSigned) {
                                layer.Alpha = this.getNextNumber();
                            }
                            else {
                                this.getNextInt();
                                this.jumpChunk();
                                //							sendUnknownKeywordError(ch);
                            }
                            staticSigned = false;
                            break;
                        case "Unshaded":
                            layer.Unshaded = true;
                            break;
                        case "Unfogged":
                            layer.Unfogged = true;
                            break;
                        case "TwoSided":
                            layer.TwoSided = true;
                            break;
                        case "SphereEnvMap":
                            layer.SphereEnvMap = true;
                            break;
                        case "NoDepthTest":
                            layer.NoDepthTest = true;
                            break;
                        case "NoDepthSet":
                            layer.NoDepthSet = true;
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return layer;
            };
            /**
             * 解析动作信息
             */
            MdlParser.prototype.parseAnim = function () {
                var anim = new war3.AnimInfo();
                anim.name = this.parseLiteralString();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "Interval":
                            anim.interval = this.parseInterval();
                            break;
                        case "MinimumExtent":
                            anim.MinimumExtent = this.parseVector3D();
                            break;
                        case "MaximumExtent":
                            anim.MaximumExtent = this.parseVector3D();
                            break;
                        case "BoundsRadius":
                            anim.BoundsRadius = this.getNextNumber();
                            break;
                        case "Rarity":
                            anim.Rarity = this.getNextNumber();
                            break;
                        case "NonLooping":
                            anim.loop = false;
                            break;
                        case "MoveSpeed":
                            anim.MoveSpeed = this.getNextNumber();
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return anim;
            };
            /**
             * 解析几何体动作信息
             */
            MdlParser.prototype.parseAnim1 = function () {
                var anim = new war3.AnimInfo1();
                var token = this.getNextToken();
                if (token != "{")
                    this.sendParseError(token);
                var ch;
                while (ch != "}") {
                    ch = this.getNextToken();
                    switch (ch) {
                        case MdlParser.COMMENT_TOKEN:
                            this.ignoreLine();
                            break;
                        case "MinimumExtent":
                            anim.MinimumExtent = this.parseVector3D();
                            break;
                        case "MaximumExtent":
                            anim.MaximumExtent = this.parseVector3D();
                            break;
                        case "BoundsRadius":
                            anim.BoundsRadius = this.getNextNumber();
                            break;
                        case "}":
                            break;
                        default:
                            this.sendUnknownKeywordError(ch);
                            break;
                    }
                }
                return anim;
            };
            /**
             * 解析骨骼轴心坐标
             */
            MdlParser.prototype.parsePivotPoints = function () {
                var points = [];
                var len = this.getNextInt();
                this.check("{");
                for (var i = 0; i < len; i++) {
                    var point = this.parseVector3D();
                    points.push(point);
                }
                this.check("}");
                return points;
            };
            /**
             * 解析3d向量
             */
            MdlParser.prototype.parseVector3D = function () {
                var vec = new feng3d.Vector3D();
                var ch = this.getNextToken();
                if (ch != "{")
                    this.sendParseError("{");
                vec.x = this.getNextNumber();
                vec.y = this.getNextNumber();
                vec.z = this.getNextNumber();
                ch = this.getNextToken();
                if (!(ch == "}" || ch == "},"))
                    this.sendParseError("}");
                return vec;
            };
            /**
             * 解析四元素
             */
            MdlParser.prototype.parseVector3D4 = function () {
                var vec = new feng3d.Quaternion();
                var ch = this.getNextToken();
                if (ch != "{")
                    this.sendParseError("{");
                vec.x = this.getNextNumber();
                vec.y = this.getNextNumber();
                vec.z = this.getNextNumber();
                vec.w = this.getNextNumber();
                ch = this.getNextToken();
                if (!(ch == "}" || ch == "},"))
                    this.sendParseError("}");
                return vec;
            };
            /**
             * 解析2d坐标
             */
            MdlParser.prototype.parsePoint = function () {
                var point = new feng3d.Point();
                var ch = this.getNextToken();
                if (ch != "{")
                    this.sendParseError("{");
                point.x = this.getNextNumber();
                point.y = this.getNextNumber();
                ch = this.getNextToken();
                if (!(ch == "}" || ch == "},"))
                    this.sendParseError("}");
                return point;
            };
            /**
             * 解析间隔
             */
            MdlParser.prototype.parseInterval = function () {
                var interval = new war3.Interval();
                var ch = this.getNextToken();
                if (ch != "{")
                    this.sendParseError("{");
                interval.start = this.getNextInt();
                interval.end = this.getNextInt();
                ch = this.getNextToken();
                if (!(ch == "}" || ch == "},"))
                    this.sendParseError("}");
                return interval;
            };
            /**
             * 解析带双引号的字符串
             */
            MdlParser.prototype.parseLiteralString = function () {
                this.skipWhiteSpace();
                var ch = this.getNextChar();
                var str = "";
                if (ch != "\"")
                    this.sendParseError("\"");
                do {
                    if (this._reachedEOF)
                        this.sendEOFError();
                    ch = this.getNextChar();
                    if (ch != "\"")
                        str += ch;
                } while (ch != "\"");
                return str;
            };
            /**
             * 读取下个Number
             */
            MdlParser.prototype.getNextNumber = function () {
                var f = parseFloat(this.getNextToken());
                if (isNaN(f))
                    this.sendParseError("float type");
                return f;
            };
            /**
             * 读取下个字符
             */
            MdlParser.prototype.getNextChar = function () {
                var ch = this._textData.charAt(this._parseIndex++);
                if (ch == "\n") {
                    ++this._line;
                    this._charLineIndex = 0;
                }
                else if (ch != "\r")
                    ++this._charLineIndex;
                if (this._parseIndex >= this._textData.length)
                    this._reachedEOF = true;
                return ch;
            };
            /**
             * 读取下个int
             */
            MdlParser.prototype.getNextInt = function () {
                var i = parseInt(this.getNextToken());
                if (isNaN(i))
                    this.sendParseError("int type");
                return i;
            };
            /**
             * 获取下个关键字
             */
            MdlParser.prototype.getNextToken = function () {
                var ch;
                var token = "";
                while (!this._reachedEOF) {
                    ch = this.getNextChar();
                    if (ch == " " || ch == "\r" || ch == "\n" || ch == "\t" || ch == ",") {
                        if (token != MdlParser.COMMENT_TOKEN)
                            this.skipWhiteSpace();
                        if (token != "")
                            return token;
                    }
                    else
                        token += ch;
                    if (token == MdlParser.COMMENT_TOKEN)
                        return token;
                }
                return token;
            };
            /**
             * 跳过块
             * @return 跳过的内容
             */
            MdlParser.prototype.jumpChunk = function () {
                var start = this._parseIndex;
                this.check("{");
                var stack = ["{"];
                var ch;
                while (!this._reachedEOF) {
                    ch = this.getNextChar();
                    if (ch == "{") {
                        stack.push("{");
                    }
                    if (ch == "}") {
                        stack.pop();
                        if (stack.length == 0) {
                            return this._textData.substring(start, this._parseIndex);
                        }
                    }
                }
                return null;
            };
            /**
             * 返回到上个字符位置
             */
            MdlParser.prototype.putBack = function () {
                this._parseIndex--;
                this._charLineIndex--;
                this._reachedEOF = this._parseIndex >= this._textData.length;
            };
            /**
             * 跳过空白
             */
            MdlParser.prototype.skipWhiteSpace = function () {
                var ch;
                do
                    ch = this.getNextChar();
                while (ch == "\n" || ch == " " || ch == "\r" || ch == "\t");
                this.putBack();
            };
            /**
             * 忽略该行
             */
            MdlParser.prototype.ignoreLine = function () {
                var ch;
                while (!this._reachedEOF && ch != "\n")
                    ch = this.getNextChar();
            };
            MdlParser.prototype.check = function (key) {
                var token = this.getNextToken();
                if (token != key)
                    this.sendParseError(token);
            };
            /**
             * 抛出一个文件尾过早结束文件时遇到错误
             */
            MdlParser.prototype.sendEOFError = function () {
                throw new Error("Unexpected end of file");
            };
            /**
             * 遇到了一个意想不到的令牌时将抛出一个错误。
             * @param expected 发生错误的标记
             */
            MdlParser.prototype.sendParseError = function (expected) {
                throw new Error("Unexpected token at line " + (this._line + 1) + ", character " + this._charLineIndex + ". " + expected + " expected, but " + this._textData.charAt(this._parseIndex - 1) + " encountered");
            };
            /**
             * 发生未知关键字错误
             */
            MdlParser.prototype.sendUnknownKeywordError = function (keyword) {
                throw new Error("Unknown keyword[" + keyword + "] at line " + (this._line + 1) + ", character " + this._charLineIndex + ". ");
            };
            MdlParser.VERSION_TOKEN = "Version";
            MdlParser.COMMENT_TOKEN = "//";
            MdlParser.MODEL = "Model";
            MdlParser.SEQUENCES = "Sequences";
            MdlParser.GLOBALSEQUENCES = "GlobalSequences";
            MdlParser.TEXTURES = "Textures";
            MdlParser.MATERIALS = "Materials";
            MdlParser.GEOSET = "Geoset";
            MdlParser.GEOSETANIM = "GeosetAnim";
            MdlParser.BONE = "Bone";
            MdlParser.HELPER = "Helper";
            return MdlParser;
        }());
        war3.MdlParser = MdlParser;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         *
         * @author warden_feng 2014-6-28
         */
        var War3Utils = (function () {
            function War3Utils() {
            }
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
            War3Utils.D3DXMatrixTransformation = function (pScalingCenter, pScalingRotation, pScaling, pRotationCenter, pRotation, pTranslation) {
                var msc = new feng3d.Matrix3D();
                if (pScalingCenter)
                    msc.appendTranslation(pScalingCenter.x, pScalingCenter.y, pScalingCenter.z);
                var msc_1 = msc.clone();
                msc_1.invert();
                var msr = new feng3d.Matrix3D();
                if (pScalingRotation)
                    msr = pScalingRotation.toMatrix3D();
                var msr_1 = msr.clone();
                msr_1.invert();
                var ms = new feng3d.Matrix3D();
                if (pScaling)
                    ms.appendScale(pScaling.x, pScaling.y, pScaling.z);
                var ms_1 = ms.clone();
                ms_1.invert();
                var mrc = new feng3d.Matrix3D();
                if (pRotationCenter)
                    mrc.appendTranslation(pRotationCenter.x, pRotationCenter.y, pRotationCenter.z);
                var mrc_1 = mrc.clone();
                mrc_1.invert();
                var mr = new feng3d.Matrix3D();
                if (pRotation)
                    mr = pRotation.toMatrix3D();
                var mt = new feng3d.Matrix3D();
                if (pTranslation)
                    mt.appendTranslation(pTranslation.x, pTranslation.y, pTranslation.z);
                var matrix3ds = [msc_1, msr_1, ms, msr, msc, mrc_1, mr, mrc, mt];
                var mout = new feng3d.Matrix3D();
                for (var i = 0; i < matrix3ds.length; i++) {
                    mout.append(matrix3ds[i]);
                }
                return mout;
            };
            return War3Utils;
        }());
        war3.War3Utils = War3Utils;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var war3;
    (function (war3) {
        /**
         * 骨骼的位移信息
         */
        var BoneScaling = (function () {
            function BoneScaling() {
                this.scalings = [];
                this.scalingDic = {};
            }
            BoneScaling.prototype.getScaling = function (keyFrameTime) {
                var scalingVector;
                if (this.scalings.length == 0 || keyFrameTime < this.scalings[0].time || keyFrameTime > this.scalings[this.scalings.length - 1].time)
                    return new feng3d.Vector3D(1, 1, 1);
                var key1 = this.scalings[0];
                var key2;
                for (var i = 0; i < this.scalings.length; i++) {
                    key2 = this.scalings[i];
                    if (key2.time >= keyFrameTime) {
                        break;
                    }
                    key1 = key2;
                }
                if (key1.time == key2.time) {
                    scalingVector = key1.value.clone();
                    return scalingVector;
                }
                var Factor = (keyFrameTime - key1.time) / (key2.time - key1.time);
                var InverseFactor = 1.0 - Factor;
                var tempVec;
                var Factor1;
                var Factor2;
                var Factor3;
                var Factor4;
                var FactorTimesTwo;
                var InverseFactorTimesTwo;
                switch (this.type) {
                    case "DontInterp":
                        scalingVector = key1.value.clone();
                        break;
                    case "Linear":
                        scalingVector = new feng3d.Vector3D();
                        tempVec = key1.value.clone();
                        tempVec.scaleBy(InverseFactor);
                        scalingVector = scalingVector.add(tempVec);
                        tempVec = key2.value.clone();
                        tempVec.scaleBy(Factor);
                        scalingVector = scalingVector.add(tempVec);
                        break;
                    case "Hermite":
                        FactorTimesTwo = Factor * Factor;
                        Factor1 = FactorTimesTwo * (2.0 * Factor - 3.0) + 1;
                        Factor2 = FactorTimesTwo * (Factor - 2.0) + Factor;
                        Factor3 = FactorTimesTwo * (Factor - 1.0);
                        Factor4 = FactorTimesTwo * (3.0 - 2.0 * Factor);
                        scalingVector = new feng3d.Vector3D();
                        tempVec = key1.value.clone();
                        tempVec.scaleBy(Factor1);
                        scalingVector = scalingVector.add(tempVec);
                        tempVec = key1.OutTan.clone();
                        tempVec.scaleBy(Factor2);
                        scalingVector = scalingVector.add(tempVec);
                        tempVec = key2.InTan.clone();
                        tempVec.scaleBy(Factor3);
                        scalingVector = scalingVector.add(tempVec);
                        tempVec = key2.value.clone();
                        tempVec.scaleBy(Factor4);
                        scalingVector = scalingVector.add(tempVec);
                        break;
                    case "Bezier":
                        FactorTimesTwo = Factor * Factor;
                        InverseFactorTimesTwo = InverseFactor * InverseFactor;
                        Factor1 = InverseFactorTimesTwo * InverseFactor;
                        Factor2 = 3.0 * Factor * InverseFactorTimesTwo;
                        Factor3 = 3.0 * FactorTimesTwo * InverseFactor;
                        Factor4 = FactorTimesTwo * Factor;
                        scalingVector = new feng3d.Vector3D();
                        tempVec = key1.value.clone();
                        tempVec.scaleBy(Factor1);
                        scalingVector = scalingVector.add(tempVec);
                        tempVec = key1.OutTan.clone();
                        tempVec.scaleBy(Factor2);
                        scalingVector = scalingVector.add(tempVec);
                        tempVec = key2.InTan.clone();
                        tempVec.scaleBy(Factor3);
                        scalingVector = scalingVector.add(tempVec);
                        tempVec = key2.value.clone();
                        tempVec.scaleBy(Factor4);
                        scalingVector = scalingVector.add(tempVec);
                        break;
                }
                return scalingVector;
            };
            return BoneScaling;
        }());
        war3.BoneScaling = BoneScaling;
    })(war3 = feng3d.war3 || (feng3d.war3 = {}));
})(feng3d || (feng3d = {}));
//# sourceMappingURL=war3model.js.map