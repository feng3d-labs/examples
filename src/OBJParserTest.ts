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

            var objLoader = new ObjLoader();
            objLoader.load(objUrl, function (object3D: GameObject)
            {
                object = object3D;
                object.scaleX = 20;
                object.scaleY = 20;
                object.scaleZ = 20;
                object.z = 300;
                scene.addChild(object3D);
            });
        }
    }
    var object: GameObject;
}