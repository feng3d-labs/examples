namespace feng3d
{
    export class FogTest extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var cube = GameObject.create();
            cube.transform.z = -7;
            cube.transform.y = 0;
            this.gameObject.addChild(cube);

            var model = cube.addComponent(MeshRenderer);
            model.geometry = new CubeGeometry(1, 1, 1, 1, 1, 1, false);
            //材质
            var material = model.material = new StandardMaterial();
            material.uniforms.s_diffuse.url = 'resources/m.png';

            material.fogMethod.enable = true;
            material.fogMethod.fogColor = new Color3(1, 1, 0);
            material.fogMethod.minDistance = 2;
            material.fogMethod.maxDistance = 3;

            ticker.onframe(() =>
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
}