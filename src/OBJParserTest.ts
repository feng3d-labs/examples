module feng3d
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
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            // //变化旋转
            setInterval(function ()
            {
                if (object)
                {
                    object.rotationY += 1;
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
                object.scaleX = 20;
                object.scaleY = 20;
                object.scaleZ = 20;
                object.z = 300;
                scene.addChild(object3D);
            });

            //初始化光源
            var light1 = new GameObject();
            var pointLight1 = new PointLight();
            pointLight1.color = new Color(0, 1, 0, 1);
            light1.addComponent(pointLight1);
            scene.addChild(light1);
        }
    }
    var object: GameObject;
}