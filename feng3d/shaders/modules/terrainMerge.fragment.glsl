#extension GL_EXT_shader_texture_lod : enable
#extension GL_OES_standard_derivatives : enable

uniform sampler2D s_splatMergeTexture;
uniform sampler2D s_blendTexture;
uniform vec4 u_splatRepeats;

vec4 terrainTexture2DLod(sampler2D s_splatMergeTexture,vec2 t_uv,float lod){

    vec4 lodvec = vec4(0.5,1.0,0.0,0.0);
    lodvec.x = lodvec.x * pow(0.5,lod);
    lodvec.y = lodvec.x * 2.0;
    lodvec.z = 1.0 - lodvec.y;
    
    t_uv = t_uv * lodvec.xy + lodvec.zw;

    vec2 imageSize =    vec2(2048.0,1024.0);
    t_uv = floor(t_uv * imageSize) / imageSize;
    
    vec4 tColor = texture2D(s_splatMergeTexture,t_uv);
    return tColor;
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

vec4 terrainTexture2D(sampler2D s_splatMergeTexture,vec2 t_uv){

    float distance = length(u_cameraMatrix[3].xyz - v_globalPosition.xyz);
    // float lod = (distance-50.0)/50.0;
    float lod = distance/50.0;
    lod = clamp(lod,0.0,7.0);

    
    lod = mipmapLevel(t_uv,vec2(2048.0,1024.0));

    // gl_FragColor = texture2DGradEXT(s_splatMergeTexture, mod(t_uv, vec2(0.1, 0.5)), 
    //                               dFdx(t_uv), dFdy(t_uv));
 
    vec4 tColor = mix(terrainTexture2DLod(s_splatMergeTexture,t_uv,floor(lod)),terrainTexture2DLod(s_splatMergeTexture,t_uv,ceil(lod)),fract(lod));
    // vec4 tColor = terrainTexture2DLod(s_splatMergeTexture,t_uv,ceil(lod));
    
    // vec4 tColor = vec4(floor(lod)/7.0,0.0,0.0,0.0);
    return tColor;
}

vec4 terrainMethod(vec4 diffuseColor,vec2 v_uv) {
    
    vec4 blend = texture2D(s_blendTexture,v_uv);

    // float offset = 1.0/512.0;
    // float offset = 0.000000001;
    // float offset = 1.0 / 1024.0;
    // float width = 0.5 - offset * 2.0;
    float offset = 0.0;
    float width = 0.5;

    vec2 t_uv = v_uv.xy * u_splatRepeats.y;
    t_uv.x = fract(t_uv.x);
    t_uv.y = fract(t_uv.y);
    t_uv.x = t_uv.x * width + offset;
    t_uv.y = t_uv.y * width + offset;
    vec4 tColor = terrainTexture2D(s_splatMergeTexture,t_uv);
    diffuseColor = (tColor - diffuseColor) * blend.x + diffuseColor;

    t_uv = v_uv.xy * u_splatRepeats.z;
    t_uv.x = fract(t_uv.x);
    t_uv.y = fract(t_uv.y);
    t_uv.x = t_uv.x * width + offset + 0.5;
    t_uv.y = t_uv.y * width + offset;
    tColor = terrainTexture2D(s_splatMergeTexture,t_uv);
    diffuseColor = (tColor - diffuseColor) * blend.y + diffuseColor;

    t_uv = v_uv.xy * u_splatRepeats.w;
    t_uv.x = fract(t_uv.x);
    t_uv.y = fract(t_uv.y);
    t_uv.x = t_uv.x * width + offset;
    t_uv.y = t_uv.y * width + offset + 0.5;
    tColor = terrainTexture2D(s_splatMergeTexture,t_uv);
    diffuseColor = (tColor - diffuseColor) * blend.z + diffuseColor;

    return diffuseColor;
}