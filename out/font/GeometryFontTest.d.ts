/// <reference path="../../libs/opentype.d.ts" />
declare namespace examples {
}
declare function extractFontData(fontAll: opentype.Font): {
    glyphs: opentype.GlyphSet;
    unitsPerEm: number;
    familyName: any;
    ascender: number;
    descender: number;
    tables: {
        name: opentype.Table;
        post: {
            underlinePosition: any;
            underlineThickness: any;
        };
        head: {
            yMin: any;
            xMin: any;
            yMax: any;
            xMax: any;
        };
    };
    glyphsMap: {};
};
declare function convert(font: any, restrict?: string): any;
declare function fetchToken(glyph: any): any;
declare const text1 = "\n\u9053\u53EF\u9053\uFF0C\u975E\u5E38\u9053\u3002\n\u540D\u53EF\u540D\uFF0C\u975E\u5E38\u540D\u3002\n\u65E0\u540D\u5929\u5730\u4E4B\u59CB\uFF1B\n\u6709\u540D\u4E07\u7269\u4E4B\u6BCD\u3002\n\u6545\u5E38\u65E0\uFF0C\u6B32\u4EE5\u89C2\u5176\u5999\uFF1B\n\u5E38\u6709\uFF0C\u6B32\u4EE5\u89C2\u5176\u5FBC\u3002\n\u6B64\u4E24\u8005\uFF0C\u540C\u51FA\u800C\u5F02\u540D\uFF0C\u540C\u8C13\u4E4B\u7384\u3002\n\u7384\u4E4B\u53C8\u7384\uFF0C\u4F17\u5999\u4E4B\u95E8\u3002 ";
