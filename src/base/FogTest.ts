class FogTest extends feng3d.Script
{
    /**
     * 初始化时调用
     */
    init()
    {
        var cube = new feng3d.GameObject();
        cube.transform.z = -7;
        cube.transform.y = 0;
        this.gameObject.addChild(cube);

        var model = cube.addComponent(feng3d.Model);
        model.geometry = Object.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        //材质
        var material = model.material = Object.setValue(new feng3d.Material(), {
            uniforms: {
                s_diffuse: { url: 'resources/m.png' },
                u_fogMode: feng3d.FogMode.LINEAR,
                u_fogColor: new feng3d.Color3(1, 1, 0),
                u_fogMinDistance: 2,
                u_fogMaxDistance: 3,
            }
        });


        feng3d.ticker.onframe(() =>
        {
            cube.transform.ry += 1;
        });
    }
    /**
     * 更新
     */
    update()
    {
    }

    /**
     * 销毁时调用
     */
    dispose()
    {

    }
}