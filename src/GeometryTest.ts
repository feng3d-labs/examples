module feng3d
{
    export class GeometryTest
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

            var object3d = new Object3D();
            var model = object3d.getOrCreateComponentByClass(Model);


            var geometry = model.geometry = new Geometry();
            geometry.addGeometry(new PlaneGeometry());
            var matrix3D = new Matrix3D();
            matrix3D.appendTranslation(0, 50, 0);
            geometry.addGeometry(new SphereGeometry(50), matrix3D);

            matrix3D.appendTranslation(0, 50, 0);
            var addGeometry = new CubeGeometry();
            geometry.addGeometry(addGeometry, matrix3D);

            addGeometry.width = 50;
            matrix3D.appendTranslation(0, 50, 0);
            matrix3D.appendRotation(45, Vector3D.Z_AXIS);
            geometry.addGeometry(addGeometry, matrix3D);


            object3d.position.z = 300;
            object3d.position.y = -100;
            this.view3D.scene.addChild(object3d);

            //初始化颜色材质
            var colorMaterial = model.material = new ColorMaterial();

            //变化旋转与颜色
            setInterval(function ()
            {
                object3d.rotation.y += 1;
            }, 15);
            setInterval(function ()
            {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        }
    }
}

new feng3d.GeometryTest();