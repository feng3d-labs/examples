/// <reference path="../../libs/opentype.d.ts" />

namespace examples
{
    var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent("Scene")
    scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

    var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent("Camera");
    camera.transform.position = new feng3d.Vector3(0, 1, -10);
    scene.gameObject.addChild(camera.gameObject);

    var engine = new feng3d.View(null, scene, camera);

    camera.gameObject.addComponent("FPSController");

    var cube = new feng3d.GameObject().addComponent("Renderable");
    cube.transform.z = -7;
    cube.transform.x = -1;
    scene.gameObject.addChild(cube.gameObject);

    //材质
    var material = cube.material = new feng3d.Material();
    material.renderParams.frontFace = feng3d.FrontFace.CCW;
    material.renderParams.cullFace = feng3d.CullFace.NONE;

    var script = document.createElement('script');
    script.onload = (ev) =>
    {
        opentype.load('./resources/fonts/NotoSansCJKsc_Regular.otf', function (err, font)
        // opentype.load('./resources/fonts/simfang.ttf', function(err, font)
        {
            if (err)
            {
                alert('Font could not be loaded: ' + err);
            } else
            {
                const fontData = extractFontData(font);
                const contoursInfo = convert(fontData);
                const font1 = new feng3d.Font(contoursInfo);
                font1.isCCW = !!font['isCIDFont'];

                // const { vertices, normals, uvs, indices } = font1.calculateGeometry('图', 1);
                // const { vertices, normals, uvs, indices } = font1.calculateGeometry('图纸!', 1);
                const { vertices, normals, uvs, indices } = font1.calculateGeometry(text1, 1);

                cube.geometry.positions = Array.from(vertices);
                cube.geometry.normals = Array.from(normals);
                cube.geometry.uvs = Array.from(uvs);
                cube.geometry.indices = Array.from(indices);
            }
        });
    }
    script.src = './libs/opentype.min.js';
    document.head.appendChild(script);

    feng3d.ticker.onframe(() =>
    {
        cube.transform.rx = 180;
        // this.cube.node3d.rx += 1;
        // log("this.cube.ry: " + this.cube.ry);
    });
}


function extractFontData(fontAll: opentype.Font)
{
    // get only the data we need in a better way
    const fontData = {
        glyphs: fontAll.glyphs,
        unitsPerEm: fontAll.unitsPerEm,
        familyName: fontAll['familyName'],
        ascender: fontAll.ascender,
        descender: fontAll.descender,
        tables: {
            name: fontAll.tables.name,
            post: {
                underlinePosition: fontAll.tables.post.underlinePosition,
                underlineThickness: fontAll.tables.post.underlineThickness
            },
            head: {
                yMin: fontAll.tables.head.yMin,
                xMin: fontAll.tables.head.xMin,
                yMax: fontAll.tables.head.yMax,
                xMax: fontAll.tables.head.xMax
            }
        },
        glyphsMap: {}
    };

    for (let i = 0; i < fontAll.glyphs.length; i++)
    {
        const glyph = fontAll.glyphs['glyphs'][i];
        if (glyph.unicode !== undefined)
        {
            fontData.glyphsMap[glyph.unicode] = glyph;
        }
    }
    return fontData;
}

function convert(font, restrict?: string)
{
    const result = {} as any;
    result.glyphs = {};

    const restriction = {
        range: null,
        set: null
    };

    if (restrict)
    {
        const restrictContent = restrict;
        const rangeSeparator = '-';
        if (restrictContent.indexOf(rangeSeparator) !== -1)
        {
            const rangeParts = restrictContent.split(rangeSeparator) as any;
            if (rangeParts.length === 2 && !isNaN(rangeParts[0]) && !isNaN(rangeParts[1]))
            {
                restriction.range = [parseInt(rangeParts[0]), parseInt(rangeParts[1])];
            }
        }
        if (restriction.range === null)
        {
            restriction.set = restrictContent;
        }
    }

    if (restriction.range)
    { // get characters from range, not use very often
        for (let i = 0; i < font.glyphs.length; i++)
        {
            const glyph = font.glyphs.glyphs[i];
            if (glyph.unicode !== undefined)
            {
                const glyphCharacter = String.fromCharCode(glyph.unicode);
                if ((glyph.unicode >= restriction.range[0] && glyph.unicode <= restriction.range[1]))
                {
                    result.glyphs[glyphCharacter] = fetchToken(glyph);
                }
            }
        }
    } else if (restriction.set)
    { // use quit a lot
        for (let char of restriction.set)
        {
            const charCode = char.codePointAt(0);
            const glyph = font.glyphsMap[charCode];
            if (glyph)
            {
                result.glyphs[char] = fetchToken(glyph);
            } else
            {
                console.warn(`char: ${char}, charCode: ${charCode}`);
            }
        }
    } else
    { // get all characters
        for (let i = 0; i < font.glyphs.length; i++)
        {
            const glyph = font.glyphs.glyphs[i];
            if (glyph.unicode !== undefined)
            {
                const glyphCharacter = String.fromCharCode(glyph.unicode);
                result.glyphs[glyphCharacter] = fetchToken(glyph);
            }
        }
    }

    result.familyName = font.familyName;
    result.ascender = Math.round(font.ascender);
    result.descender = Math.round(font.descender);
    result.underlinePosition = Math.round(font.tables.post.underlinePosition);
    result.underlineThickness = Math.round(font.tables.post.underlineThickness);
    result.boundingBox = {
        'yMin': Math.round(font.tables.head.yMin),
        'xMin': Math.round(font.tables.head.xMin),
        'yMax': Math.round(font.tables.head.yMax),
        'xMax': Math.round(font.tables.head.xMax)
    };
    result.unitsPerEm = font.unitsPerEm;
    result.original_font_information = font.tables.name;
    result.cssFontStyle = 'normal';

    return result;
}

function fetchToken(glyph)
{
    const token = {} as any;
    token.ha = Math.round(glyph.advanceWidth);
    token.x_min = Math.round(glyph.xMin);
    token.x_max = Math.round(glyph.xMax);
    token.o = '';
    glyph.path.commands.forEach(function (command, i)
    {
        if (command.type.toLowerCase() === 'c') { command.type = 'b'; }
        token.o += command.type.toLowerCase();
        token.o += ' ';
        if (command.x !== undefined && command.y !== undefined)
        {
            token.o += Math.round(command.x);
            token.o += ' ';
            token.o += Math.round(command.y);
            token.o += ' ';
        }
        if (command.x1 !== undefined && command.y1 !== undefined)
        {
            token.o += Math.round(command.x1);
            token.o += ' ';
            token.o += Math.round(command.y1);
            token.o += ' ';
        }
        if (command.x2 !== undefined && command.y2 !== undefined)
        {
            token.o += Math.round(command.x2);
            token.o += ' ';
            token.o += Math.round(command.y2);
            token.o += ' ';
        }
    });
    return token;
}

const text1 = `固图请设计施工规范总说明
一、	设计依据
(1) 建设方提供的室内设计要求及其他相关资料。
(2)《建筑内部装修设计防火规范》（GB-50022-2017）。
(3)《建筑装饰装修工程质量验收规范》（ GB50210-2018 ）。
(4) 国家现行的有关规范、标准和规定。、

二、一般说明
（1）本图纸为XXX设计施工说明。
（2）本公司设计所注装修尺寸单位为毫米（MM）。
（3）凡层楼地面有地漏处的找坡及范围应以原建筑设计为准。
（4）本公司所选用的产品和材料需符合国家相关的质量检测标准。
（5）所有装修材料均应采用不燃或难燃材料，木材必须采用防火处埋，埋入结构的部分应采用防腐处理，类似的材料应严格按照国家规范进行处理。
（6）建筑装修施工时，需与其他各工种密切配合，严格遵守国家颁布的有关标准及各项验收规范。

三、建筑装修施工概况
（1）装修涉及使用的装修材料有石材、地砖、木材、石膏板、涂料、油漆、及多种灯具等。(本方案涉及使用材料详见材料单）
（2）本建筑装修的做法除注明之外，其它做法均按国家的标准图集的做法施工，并须严格遵守相应的国家验收规范。

四、图纸辅助说明
（1）家具、灯饰在施工图中只作示意，具体参考形象图。
（2）大型的壁饰、装饰画已在施工图中示意，具体待定。
（3）工艺品的选择,具体待定。
（4）强体及门窗洞口尺寸定位，除标注者外，均同原建筑设计图。

五、主要材料及施工工艺说明
（一）主要材料说明：
(1) 进口瓷砖，磨光度达腊5度以上，厚度要基本一致，产品要选用“A级”。国产花岗石，大理石的产品质量要符合国家A级产品标准。
（2）表面装饰木料，属符合国际标准的A级产品。木方，不管是国产还是进口，都选用与表面饰板相同纹理及相同颜色的A级产品，含水率要控制在15%以内。
（3)乳胶漆及聚安脂漆，均为合资哑光漆（个别地方除外）。
（4）天花材料，轻钢龙骨石膏板天花，均选用合资防火防潮的产品。
（二）施工工艺要求：（所有施工必须按照国家施工及验收规范及相应的产品说明进行施工）
（1）强、地面
     （A）采用抛光砖或抛釉砖铺贴。瓷砖施工要求严格进行试拼标号，避免色差及纹路凌乱以保证视觉效果，同时要求饰面平整，垂直水平度好，缝线笔直，接缝严密，无污染及反锈反碱，并无空鼓等现象。凡是白色或者浅色厨卫地板瓷砖，在贴前都要做防污及防浸透处理。凡是木质地板铺设，需确保地面基层平整，再行铺设。
     （B）地板铺设要求须做防潮，找平处理已达到铺装要求。
     强地砖铺贴要及时清洁砖面，不可空鼓开裂,铺贴完毕后要及时清理砖缝，填充填缝剂或白水泥修补所有缝隙
     （C）所有外强内侧的强面（批水泥或木装饰）均要进行防水处理。
      以上工程应注意同各专业安装工程的配合，尤其需同专业的明露设备（如照明控制、强弱电插座及控制等）协调施工，以保证装修效果。
（2）天花
     此部分工程也应同各专业施工的配合，吊顶饰面及喷涂面应平整均匀，风口、音响及灯具等应与顶棚衔接紧密得体，排列整齐，检查口应统一规格，结合吊顶内专业管线的情况合理布置。
（3）门窗
     详见施工图。
（4）家具
   （A）固定家具请参照详图，具体尺寸就依据现场实际确定。
   （B）卫生间洁具参考形象图。
（5）灯具
灯具安装应排列整齐，布置均匀，某些场合如需专业设计应结合设计的风格进行处理。
六、专业  要求
（1）空调暖通系统：空调暖通系统同原建筑设计。
（2）强弱电系统：开关、插座、报警器明露件的样式颜色应与内协调统一并排列整齐。
七、所有做法均以详图为准。
八、工程施工必须严格按照中华人民共和国现有的施工验收规范执行，各工种相互协调配合。
九、图中若有尺寸与现状及设计效果矛盾之处，设计师可根据现场情况适当调整。

出图方LOGO

INTERIOR DESIGN
室内装饰设计单位

PROJECT NO.
工程编号

NOTE
注意
所有尺寸以现场实际测量为准，请勿按比例测量图纸，所有注释及说明见图纸标注。版权所有，未经授权，不得擅自使用本图和设计。现场与本图纸不一致之处应在施工前书面告知设计方。未签章图纸不得作为施工用途，未经许可擅自使用图纸指导施工，原设计方不负责任何后果。

SPECIAL SEAL OUT THE MAP
出图专用章

CLIENT
业主

PROJECT NAME
项目名称

SHEET TITLE
图名

设计总说明

STAGE
阶段

方案/施工图
PROFESSIONAL
专业

DESIGN
设计

DRAWBY
绘图

AUDIT
审核

SCALE
比例

DATE
日期

DRAWING NO.
图纸编号
`;

