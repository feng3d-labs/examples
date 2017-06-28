namespace feng3d
{
    export class OBJParserTest
    {
        view3D: View3D;

        constructor()
        {
            this.init();
        }

        init()
        {

            this.view3D = new View3D();

            // //变化旋转
            setInterval(function ()
            {
                if (object)
                {
                    object.transform.rotationY += 1;
                }
            }, 15);

            // var objUrl = "resources/cube.obj";
            var objUrl = "resources/head.obj";
            var scene = this.view3D.scene;

            var material = new StandardMaterial();
            material.diffuseMethod.difuseTexture.url = "resources/head_diffuse.jpg";
            material.normalMethod.normalTexture.url = "resources/head_normals.jpg";
            material.specularMethod.specularTexture.url = "resources/head_specular.jpg";
            // var material = new ColorMaterial();

            var objLoader = new ObjLoader();
            objLoader.load(objUrl, material, function (object3D: GameObject)
            {
                object = object3D;
                object.transform.scaleX = 20;
                object.transform.scaleY = 20;
                object.transform.scaleZ = 20;
                object.transform.z = 300;
                scene.transform.addChild(object3D.transform);
            });

            //初始化光源
            var light1 = GameObject.create();
            var pointLight1 = light1.addComponent(PointLight);
            pointLight1.color = new Color(0, 1, 0, 1);
            scene.transform.addChild(light1.transform);
        }
    }
    var object: GameObject;
}