namespace feng3d
{
    /**
     * 测试3D容器
     */
    export class Container3DTest extends Script
    {
        cube: GameObject
        colorMaterial: ColorMaterial
        num = 0;

        /**
         * 初始化时调用
         */
        init()
        {

            //初始化颜色材质
            this.cube = GameObjectFactory.createCube();
            this.gameObject.addChild(this.cube);

            this.colorMaterial = this.cube.getComponent(MeshRenderer).material = new ColorMaterial();

            var cylinder = GameObjectFactory.createCylinder();
            cylinder.transform.x = 2;
            this.cube.addChild(cylinder);
        }

        /**
         * 更新
         */
        update()
        {
            console.log("update")

            //变化旋转与颜色
            this.cube.transform.ry += 1;

            this.num++;

            if (this.num % 60 == 0)
                this.colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
        }

        /**
         * 销毁时调用
         */
        dispose()
        {

        }
    }
}