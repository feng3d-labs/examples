/**
 * 测试3D容器
 */
class Container3DTest extends feng3d.Script
{
    cube: feng3d.GameObject
    colorMaterial: feng3d.ColorMaterial
    num = 0;

    /**
     * 初始化时调用
     */
    init()
    {

        //初始化颜色材质
        this.cube = feng3d.gameObjectFactory.createCube();
        this.gameObject.addChild(this.cube);

        this.colorMaterial = this.cube.getComponent(feng3d.Model).material = feng3d.materialFactory.create("color");

        var cylinder = feng3d.gameObjectFactory.createCylinder();
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
            this.colorMaterial.uniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
    }

    /**
     * 销毁时调用
     */
    dispose()
    {

    }
}