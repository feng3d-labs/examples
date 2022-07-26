/// <reference path="../../libs/opentype.d.ts" />
var examples;
(function (examples) {
    var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent(feng3d.Scene);
    scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);
    var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent(feng3d.Camera);
    camera.transform.position = new feng3d.Vector3(0, 1, -10);
    scene.gameObject.addChild(camera.gameObject);
    var engine = new feng3d.View(null, scene, camera);
    camera.gameObject.addComponent(feng3d.FPSController);
    var script = document.createElement('script');
    script.onload = function (ev) {
        // opentype.load('./resources/fonts/NotoSansCJKsc_Regular.otf', function (err, font)
        opentype.load('./resources/fonts/simfang.ttf', function (err, font) {
            if (err) {
                alert('Font could not be loaded: ' + err);
            }
            else {
                var fontData = extractFontData(font);
                var contoursInfo = convert(fontData);
                var font1 = new feng3d.Font(contoursInfo);
                // font1.isCCW = !!font['isCIDFont'];
                // const { vertices, normals, uvs, indices } = font1.calculateGeometry('图', 1);
                // const { vertices, normals, uvs, indices } = font1.calculateGeometry('图纸!', 1);
                var _a = font1.calculateGeometry(text1, 1), vertices = _a.vertices, normals = _a.normals, uvs = _a.uvs, indices = _a.indices;
                var geometry = new feng3d.CustomGeometry();
                geometry.positions = Array.from(vertices);
                geometry.normals = Array.from(normals);
                geometry.uvs = Array.from(uvs);
                geometry.indices = Array.from(indices);
                var cube = new feng3d.GameObject().addComponent(feng3d.Renderable);
                cube.transform.x = -7;
                cube.transform.y = 7;
                cube.transform.rx = 180;
                scene.gameObject.addChild(cube.gameObject);
                //材质
                var material = cube.material = new feng3d.Material();
                material.renderParams.frontFace = feng3d.FrontFace.CCW;
                material.renderParams.cullFace = feng3d.CullFace.NONE;
                cube.geometry = geometry;
            }
        });
    };
    script.src = './libs/opentype.min.js';
    document.head.appendChild(script);
})(examples || (examples = {}));
function extractFontData(fontAll) {
    // get only the data we need in a better way
    var fontData = {
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
    for (var i = 0; i < fontAll.glyphs.length; i++) {
        var glyph = fontAll.glyphs['glyphs'][i];
        if (glyph.unicode !== undefined) {
            fontData.glyphsMap[glyph.unicode] = glyph;
        }
    }
    return fontData;
}
function convert(font, restrict) {
    var result = {};
    result.glyphs = {};
    var restriction = {
        range: null,
        set: null
    };
    if (restrict) {
        var restrictContent = restrict;
        var rangeSeparator = '-';
        if (restrictContent.indexOf(rangeSeparator) !== -1) {
            var rangeParts = restrictContent.split(rangeSeparator);
            if (rangeParts.length === 2 && !isNaN(rangeParts[0]) && !isNaN(rangeParts[1])) {
                restriction.range = [parseInt(rangeParts[0]), parseInt(rangeParts[1])];
            }
        }
        if (restriction.range === null) {
            restriction.set = restrictContent;
        }
    }
    if (restriction.range) { // get characters from range, not use very often
        for (var i = 0; i < font.glyphs.length; i++) {
            var glyph = font.glyphs.glyphs[i];
            if (glyph.unicode !== undefined) {
                var glyphCharacter = String.fromCharCode(glyph.unicode);
                if ((glyph.unicode >= restriction.range[0] && glyph.unicode <= restriction.range[1])) {
                    result.glyphs[glyphCharacter] = fetchToken(glyph);
                }
            }
        }
    }
    else if (restriction.set) { // use quit a lot
        for (var _i = 0, _a = restriction.set; _i < _a.length; _i++) {
            var char = _a[_i];
            var charCode = char.codePointAt(0);
            var glyph = font.glyphsMap[charCode];
            if (glyph) {
                result.glyphs[char] = fetchToken(glyph);
            }
            else {
                console.warn("char: " + char + ", charCode: " + charCode);
            }
        }
    }
    else { // get all characters
        for (var i = 0; i < font.glyphs.length; i++) {
            var glyph = font.glyphs.glyphs[i];
            if (glyph.unicode !== undefined) {
                var glyphCharacter = String.fromCharCode(glyph.unicode);
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
function fetchToken(glyph) {
    var token = {};
    token.ha = Math.round(glyph.advanceWidth);
    token.x_min = Math.round(glyph.xMin);
    token.x_max = Math.round(glyph.xMax);
    token.o = '';
    glyph.path.commands.forEach(function (command, i) {
        if (command.type.toLowerCase() === 'c') {
            command.type = 'b';
        }
        token.o += command.type.toLowerCase();
        token.o += ' ';
        if (command.x !== undefined && command.y !== undefined) {
            token.o += Math.round(command.x);
            token.o += ' ';
            token.o += Math.round(command.y);
            token.o += ' ';
        }
        if (command.x1 !== undefined && command.y1 !== undefined) {
            token.o += Math.round(command.x1);
            token.o += ' ';
            token.o += Math.round(command.y1);
            token.o += ' ';
        }
        if (command.x2 !== undefined && command.y2 !== undefined) {
            token.o += Math.round(command.x2);
            token.o += ' ';
            token.o += Math.round(command.y2);
            token.o += ' ';
        }
    });
    return token;
}
var text1 = "\n\u9053\u53EF\u9053\uFF0C\u975E\u5E38\u9053\u3002\n\u540D\u53EF\u540D\uFF0C\u975E\u5E38\u540D\u3002\n\u65E0\u540D\u5929\u5730\u4E4B\u59CB\uFF1B\n\u6709\u540D\u4E07\u7269\u4E4B\u6BCD\u3002\n\u6545\u5E38\u65E0\uFF0C\u6B32\u4EE5\u89C2\u5176\u5999\uFF1B\n\u5E38\u6709\uFF0C\u6B32\u4EE5\u89C2\u5176\u5FBC\u3002\n\u6B64\u4E24\u8005\uFF0C\u540C\u51FA\u800C\u5F02\u540D\uFF0C\u540C\u8C13\u4E4B\u7384\u3002\n\u7384\u4E4B\u53C8\u7384\uFF0C\u4F17\u5999\u4E4B\u95E8\u3002 ";
//# sourceMappingURL=GeometryFontTest.js.map