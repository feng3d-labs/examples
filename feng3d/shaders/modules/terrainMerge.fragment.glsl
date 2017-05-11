uniform sampler2D s_splatMergeTexture;
uniform sampler2D s_blendTexture;
uniform vec4 u_splatRepeats;

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
    vec4 tColor = texture2D(s_splatMergeTexture,t_uv);
    diffuseColor = (tColor - diffuseColor) * blend.x + diffuseColor;

    t_uv = v_uv.xy * u_splatRepeats.z;
    t_uv.x = fract(t_uv.x);
    t_uv.y = fract(t_uv.y);
    t_uv.x = t_uv.x * width + offset + 0.5;
    t_uv.y = t_uv.y * width + offset;
    tColor = texture2D(s_splatMergeTexture,t_uv);
    diffuseColor = (tColor - diffuseColor) * blend.y + diffuseColor;

    t_uv = v_uv.xy * u_splatRepeats.w;
    t_uv.x = fract(t_uv.x);
    t_uv.y = fract(t_uv.y);
    t_uv.x = t_uv.x * width + offset;
    t_uv.y = t_uv.y * width + offset + 0.5;
    tColor = texture2D(s_splatMergeTexture,t_uv);
    diffuseColor = (tColor - diffuseColor) * blend.z + diffuseColor;

    return diffuseColor;
}