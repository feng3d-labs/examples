/**
 * 测试3D容器
 */
class Container3DTest extends feng3d.Script
{
    cube: feng3d.GameObject
    colorMaterial: feng3d.Material
    num = 0;

    /**
     * 初始化时调用
     */
    init()
    {

        //初始化颜色材质
        this.cube = feng3d.GameObject.createPrimitive("Cube");
        this.gameObject.addChild(this.cube);

        this.colorMaterial = this.cube.getComponent(feng3d.Renderable).material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "color" });

        var cylinder = feng3d.GameObject.createPrimitive("Cylinder");
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
        {
            (<feng3d.ColorUniforms>this.colorMaterial.uniforms).u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
        }
    }

    /**
     * 销毁时调用
     */
    dispose()
    {

    }
}