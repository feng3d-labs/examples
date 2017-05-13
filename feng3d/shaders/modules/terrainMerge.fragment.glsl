#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

#define LOD_LINEAR

uniform sampler2D s_splatMergeTexture;
uniform sampler2D s_blendTexture;
uniform vec4 u_splatRepeats;

vec2 imageSize =    vec2(2048.0,1024.0);
vec4 offset[3];
vec2 tileSize = vec2(1024.0,1024.0);
float maxLod = 7.0;

vec4 terrainTexture2DLod(sampler2D s_splatMergeTexture,vec2 t_uv,float lod,vec4 offset){

    //计算不同lod像素缩放以及起始坐标
    vec4 lodvec = vec4(0.5,1.0,0.0,0.0);
    lodvec.x = lodvec.x * pow(0.5,lod);
    lodvec.y = lodvec.x * 2.0;
    lodvec.z = 1.0 - lodvec.y;

    vec2 lodPixelOffset = vec2(1.0,1.0) * lodvec.xy;
    vec2 mixFactor = mod(t_uv, lodPixelOffset);

    t_uv = fract(t_uv + vec2(0.0,0.0) * lodPixelOffset);
    //
    t_uv = (t_uv * offset.xy + offset.zw) * lodvec.xy;
    //取整像素
    t_uv = floor(t_uv * imageSize) / imageSize;
    //添加lod起始坐标
    t_uv = t_uv + lodvec.zw;
    vec4 tColor00 = texture2D(s_splatMergeTexture,t_uv);

    t_uv = fract(t_uv + vec2(1.0,0.0) * lodPixelOffset);
    //
    t_uv = (t_uv * offset.xy + offset.zw) * lodvec.xy;
    //取整像素
    t_uv = floor(t_uv * imageSize) / imageSize;
    //添加lod起始坐标
    t_uv = t_uv + lodvec.zw;
    vec4 tColor10 = texture2D(s_splatMergeTexture,t_uv);

    t_uv = fract(t_uv + vec2(0.0,1.0) * lodPixelOffset);
    //
    t_uv = (t_uv * offset.xy + offset.zw) * lodvec.xy;
    //取整像素
    t_uv = floor(t_uv * imageSize) / imageSize;
    //添加lod起始坐标
    t_uv = t_uv + lodvec.zw;
    vec4 tColor01 = texture2D(s_splatMergeTexture,t_uv);

    t_uv = fract(t_uv + vec2(1.0,1.0) * lodPixelOffset);
    //
    t_uv = (t_uv * offset.xy + offset.zw) * lodvec.xy;
    //取整像素
    t_uv = floor(t_uv * imageSize) / imageSize;
    //添加lod起始坐标
    t_uv = t_uv + lodvec.zw;
    vec4 tColor11 = texture2D(s_splatMergeTexture,t_uv);

    vec4 tColor = tColor00 * (1.0 - mixFactor.x) * (1.0 - mixFactor.y) + tColor10 * mixFactor.x * (1.0 - mixFactor.y) + tColor01 * (1.0 - mixFactor.x) * mixFactor.y + tColor11 * mixFactor.x * mixFactor.y;

    return tColor;
}

//参考 http://blog.csdn.net/cgwbr/article/details/6620318
//计算MipMap层函数：
float mipmapLevel(vec2 uv, vec2 textureSize)
{
    float dx = dFdx(uv.x * textureSize.x);
    float dy = dFdy(uv.y * textureSize.y);
    float d = max(dot(dx, dx), dot(dy, dy));  
    return 0.5 * log2(d);
}

vec4 terrainTexture2D(sampler2D s_splatMergeTexture,vec2 t_uv,float lod,vec4 offset){
 
    #ifdef LOD_LINEAR
        vec4 tColor = mix(terrainTexture2DLod(s_splatMergeTexture,t_uv,floor(lod),offset),terrainTexture2DLod(s_splatMergeTexture,t_uv,ceil(lod),offset),fract(lod));
    #else
        vec4 tColor = terrainTexture2DLod(s_splatMergeTexture,t_uv,ceil(lod),offset);
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
        vec4 tColor = terrainTexture2D(s_splatMergeTexture,t_uv,lod,offset[i]);
        diffuseColor = (tColor - diffuseColor) * blend[i] + diffuseColor;
    }

    // diffuseColor.xyz = vec3(1.0,0.0,0.0);
    // diffuseColor.xyz = vec3(floor(lod)/7.0,0.0,0.0);
    return diffuseColor;
}