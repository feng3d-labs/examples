import * as feng3d from 'feng3d';

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

const lineData = [-300, 0, 300, 0];

// 构建线条几何体
const geo: { points: number[]; indices: number[]; } = { points: [], indices: [] };

function drawDashedLine(pattern: number[])
{
    feng3d.buildLineGeometry({ points: lineData, lineStyle: { width: 2, dashedLinePatternUnit: 2, dashedLinePattern: pattern } }, geo);
    for (let i = 0; i < lineData.length; i += 2)
    {
        lineData[i + 1] -= 20;
    }
}

drawDashedLine([]);
drawDashedLine([1, 1]);
drawDashedLine([10, 10]);
drawDashedLine([20, 5]);
drawDashedLine([15, 3, 3, 3]);
drawDashedLine([20, 3, 3, 3, 3, 3, 3, 3]);
drawDashedLine([12, 3, 3]);  // Equals [12, 3, 3, 12, 3, 3]

geo.points = geo.points.map(v => v / 500);


const webglRenderer = new feng3d.WebGLRenderer(webglcanvas);

const renderAtomic = new feng3d.RenderAtomic({
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
        vertex: `
                    precision mediump float;
                    attribute vec2 position;
                    void main () {
                      gl_Position = vec4(position, 0, 1);
                    }
            `, fragment: `
            precision mediump float;
            uniform vec4 u_color;
            void main () {
              gl_FragColor = u_color;
            }
            `}
});

function draw()
{
    webglcanvas.width = webglcanvas.clientWidth;
    webglcanvas.height = webglcanvas.clientHeight;
    webglRenderer.render(renderAtomic);
    requestAnimationFrame(draw);
}
draw();
