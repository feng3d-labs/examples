import * as feng3d from 'feng3d';
import * as opentype from 'opentype.js';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

camera.object3D.addComponent(feng3d.FPSController);

var script = document.createElement('script');
script.onload = (ev) =>
{
    // opentype.load('./resources/fonts/NotoSansCJKsc_Regular.otf', function (err, font)
    opentype.load('./resources/fonts/simfang.ttf', function (err, font)
    {
        if (err)
        {
            alert('Font could not be loaded: ' + err);
        } else
        {
            const fontData = extractFontData(font);
            const contoursInfo = convert(fontData);
            const font1 = new feng3d.Font(contoursInfo);
            // font1.isCCW = !!font['isCIDFont'];

            // const { vertices, normals, uvs, indices } = font1.calculateGeometry('图', 1);
            // const { vertices, normals, uvs, indices } = font1.calculateGeometry('图纸!', 1);
            const { vertices, normals, uvs, indices } = font1.calculateGeometry(text1, 1);

            const geometry = new feng3d.CustomGeometry();

            geometry.positions = vertices;
            geometry.normals = normals;
            geometry.uvs = uvs;
            geometry.indices = indices;

            var cube = new feng3d.Object3D().addComponent(feng3d.Renderable);
            cube.object3D.x = -7;
            cube.object3D.y = 7;
            cube.object3D.rx = 180;
            scene.object3D.addChild(cube.object3D);

            //材质
            var material = cube.material = new feng3d.Material();
            material.renderParams.frontFace = feng3d.FrontFace.CCW;
            material.renderParams.cullFace = 'NONE';

            cube.geometry = geometry;
        }
    });
}
script.src = './libs/opentype.min.js';
document.head.appendChild(script);


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
const text1 = `
道可道，非常道。
名可名，非常名。
无名天地之始；
有名万物之母。
故常无，欲以观其妙；
常有，欲以观其徼。
此两者，同出而异名，同谓之玄。
玄之又玄，众妙之门。 `;
