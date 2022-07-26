namespace examples
{
    var webglcanvas = document.createElement('canvas');
    webglcanvas.id = "glcanvas";
    webglcanvas.style.position = "fixed";
    webglcanvas.style.left = "0px";
    webglcanvas.style.top = "0px";
    webglcanvas.style.width = "100%";
    webglcanvas.style.height = "100%";
    document.body.appendChild(webglcanvas);

    const webglRenderer = new feng3d.WebGLRenderer(webglcanvas);

    const renderAtomic = new feng3d.RenderAtomic({
        attributes: {
            a_position: {
                data: [
                    -1, 0,
                    0, -1,
                    1, 1
                ],
                size: 2,
            },
        },
        uniforms: { u_color: [1, 0, 0, 1] },
        renderParams: { cullFace: "NONE", enableBlend: true },
        shader: {
            vertex: `
                    precision mediump float;
                    attribute vec2 a_position;
                    void main () {
                      gl_Position = vec4(a_position, 0, 1);
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
}