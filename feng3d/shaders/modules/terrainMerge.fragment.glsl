//代码实现lod以及线性插值
#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

#define LOD_LINEAR

uniform sampler2D s_splatMergeTexture;
uniform sampler2D s_blendTexture;
uniform vec4 u_splatRepeats;

vec2 imageSize =    vec2(2048.0,1024.0);
vec4 offset[3];
vec2 tileSize = vec2(512.0,512.0);
// float maxLod = 7.0;
float maxLod = 5.0;

vec4 terrainTexture2DLod(sampler2D s_splatMergeTexture,vec2 uv,float lod,vec4 offset){

    //计算不同lod像素缩放以及起始坐标
    vec4 lodvec = vec4(0.5,1.0,0.0,0.0);
    lodvec.x = lodvec.x * pow(0.5,lod);
    lodvec.y = lodvec.x * 2.0;
    lodvec.z = 1.0 - lodvec.y;

    vec2 t_uv = uv;
    
    vec2 lodSize = imageSize * lodvec.xy;
    lodSize = lodSize * 0.5;
    //------------------------------------------------------------------------------------------------------
    // t_uv = local坐标系 0-1
    // 根据与中心点的比例获取四个点
    //------------------------------------------------------------------------------------------------------
    // 获取与该像素中心点的偏移差
    vec2 pixelUV = 1.00/lodSize; // 0.1
    vec2 halfPixelUV = pixelUV*0.5; // 0.05
    // 采样像素偏移，距离该像素中心点的偏移UV
    vec2 sampleDev = mod(t_uv,pixelUV) - halfPixelUV;
    // 0.37 - (0.37/0.1)*0.1 + 0.05 = 0.02
    vec2 lodPixelOffset = sign(sampleDev) / lodSize;

    // 取得四个点
    vec2 t_uv2 = t_uv + lodPixelOffset;// X+Y
    t_uv2 = fract(t_uv2);
    vec2 t_uv3 = vec2(t_uv.x + lodPixelOffset.x,t_uv.y ); // X
    t_uv3 = fract(t_uv3);
    vec2 t_uv4 = vec2(t_uv.x,t_uv.y + lodPixelOffset.y); // Y
    t_uv4 = fract(t_uv4);

    // 获取比例
    vec2 xyPer = abs(sampleDev)/pixelUV;

    // 获取像素的全局坐标
    t_uv = t_uv * offset.xy + offset.zw;
    t_uv = t_uv * lodvec.xy;
    t_uv = floor(t_uv * imageSize) / imageSize;
    //添加lod起始坐标
    t_uv = t_uv + lodvec.zw;

    t_uv2 = t_uv2 * offset.xy + offset.zw;
    t_uv2 = t_uv2 * lodvec.xy;
    t_uv2 = floor(t_uv2 * imageSize) / imageSize;
     //添加lod起始坐标
    t_uv2 = t_uv2 + lodvec.zw;

    t_uv3 = t_uv3 * offset.xy + offset.zw;
    t_uv3 = t_uv3 * lodvec.xy;
    t_uv3 = floor(t_uv3 * imageSize) / imageSize;
      //添加lod起始坐标
    t_uv3 = t_uv3 + lodvec.zw;

    t_uv4 = t_uv4 * offset.xy + offset.zw;
    t_uv4 = t_uv4 * lodvec.xy;
    t_uv4 = floor(t_uv4 * imageSize) / imageSize;
      //添加lod起始坐标
    t_uv4 = t_uv4 + lodvec.zw;

    // 获取颜色
    vec4 tColor = texture2D(s_splatMergeTexture,t_uv);
    vec4 tColor2 = texture2D(s_splatMergeTexture,t_uv2);  // X+Y
    vec4 tColor3 = texture2D(s_splatMergeTexture,t_uv3); // X
    vec4 tColor4 = texture2D(s_splatMergeTexture,t_uv4); // Y

    // 二次线性计算 先X后Y
    vec4 linearColorX = mix(tColor,tColor3,xyPer.x);
    vec4 linearColorY = mix(tColor4,tColor2,xyPer.x);
    vec4 linearColorFinal = mix(linearColorX,linearColorY,xyPer.y);

    //linearColorFinal.z = linearColorFinal.z + xPer;
    return linearColorFinal;
    //return tColor;
    // return linearX;

    // return vec4(mixFactor.x,mixFactor.y,0.0,1.0);
    // return vec4(mixFactor.x + 0.5,mixFactor.y + 0.5,0.0,1.0);
}


//参考 http://blog.csdn.net/cgwbr/article/details/6620318
//计算MipMap层函数：
float mipmapLevel(vec2 uv, vec2 textureSize)
{
    vec2 dx = dFdx(uv * textureSize.x);
    vec2 dy = dFdy(uv * textureSize.y);
    float d = max(dot(dx, dx), dot(dy, dy));  
    return 0.5 * log2(d);
}

vec4 terrainTexture2D(sampler2D s_splatMergeTexture,vec2 t_uv,float lod,vec4 offset){
 
    #ifdef LOD_LINEAR
        vec4 tColor = mix(terrainTexture2DLod(s_splatMergeTexture,t_uv,floor(lod),offset),terrainTexture2DLod(s_splatMergeTexture,t_uv,ceil(lod),offset),fract(lod));
    #else
        vec4 tColor = terrainTexture2DLod(s_splatMergeTexture,t_uv,floor(lod),offset);
    #endif

    return tColor;
}

vec4 terrainMethod(vec4 diffuseColor,vec2 v_uv) {
    
    offset[0] = vec4(0.5,0.5,0.0,0.0);
    offset[1] = vec4(0.5,0.5,0.5,0.0);
    offset[2] = vec4(0.5,0.5,0.0,0.5);
    
    vec4 blend = texture2D(s_blendTexture,v_uv);
    for(int i = 0; i < 3; i++)
    {
        vec2 t_uv = v_uv.xy * u_splatRepeats[i];
        float lod = mipmapLevel(t_uv,tileSize);
        lod = clamp(lod,0.0,maxLod);
        // lod = 5.0;
        t_uv = fract(t_uv);
        vec4 tColor = terrainTexture2D(s_splatMergeTexture,t_uv,lod,offset[i]);
        diffuseColor = (tColor - diffuseColor) * blend[i] + diffuseColor;
    }

    // diffuseColor.xyz = vec3(1.0,0.0,0.0);
    // diffuseColor.xyz = vec3(floor(lod)/7.0,0.0,0.0);
    return diffuseColor;
}