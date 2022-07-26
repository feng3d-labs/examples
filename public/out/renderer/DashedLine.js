var examples;
(function (examples) {
    var webglcanvas = document.createElement('canvas');
    webglcanvas.id = "glcanvas";
    webglcanvas.style.position = "fixed";
    webglcanvas.style.left = "0px";
    webglcanvas.style.top = "0px";
    webglcanvas.style.width = "100%";
    webglcanvas.style.height = "100%";
    document.body.appendChild(webglcanvas);
    // 构建圆线条
    // const lineData = [0, 0];
    // for (let i = 0; i <= 360; i++)
    // {
    //     lineData[i * 2] = Math.sin(Math.PI / 180 * i) * 100;
    //     lineData[i * 2 + 1] = Math.cos(Math.PI / 180 * i) * 100;
    // }
    var lineData = [-300, 0, 300, 0];
    // 构建线条几何体
    var geo = { points: [], indices: [] };
    function drawDashedLine(pattern) {
        feng3d.buildLineGeometry({ points: lineData, lineStyle: { width: 2, dashedLinePatternUnit: 2, dashedLinePattern: pattern } }, geo);
        for (var i = 0; i < lineData.length; i += 2) {
            lineData[i + 1] -= 20;
        }
    }
    drawDashedLine([]);
    drawDashedLine([1, 1]);
    drawDashedLine([10, 10]);
    drawDashedLine([20, 5]);
    drawDashedLine([15, 3, 3, 3]);
    drawDashedLine([20, 3, 3, 3, 3, 3, 3, 3]);
    drawDashedLine([12, 3, 3]); // Equals [12, 3, 3, 12, 3, 3]
    geo.points = geo.points.map(function (v) { return v / 500; });
    var webglRenderer = new feng3d.WebGLRenderer(webglcanvas);
    var renderAtomic = new feng3d.RenderAtomic({
        attributes: {
            position: {
                data: geo.points,
                size: 2,
            },
        },
        index: { indices: geo.indices },
        uniforms: { u_color: [1, 0, 0, 1] },
        renderParams: { cullFace: "NONE", enableBlend: true },
        shader: {
            vertex: "\n                    precision mediump float;\n                    attribute vec2 position;\n                    void main () {\n                      gl_Position = vec4(position, 0, 1);\n                    }\n            ", fragment: "\n            precision mediump float;\n            uniform vec4 u_color;\n            void main () {\n              gl_FragColor = u_color;\n            }\n            "
        }
    });
    function draw() {
        webglcanvas.width = webglcanvas.clientWidth;
        webglcanvas.height = webglcanvas.clientHeight;
        webglRenderer.render(renderAtomic);
        requestAnimationFrame(draw);
    }
    draw();
})(examples || (examples = {}));
//# sourceMappingURL=DashedLine.js.map