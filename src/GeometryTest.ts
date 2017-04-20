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
            var transform = new Matrix3D();
            transform.appendTranslation(0, 50, 0);
            geometry.addGeometry(new SphereGeometry(50), transform);

            transform.appendTranslation(0, 50, 0);
            var addGeometry = new CubeGeometry();
            geometry.addGeometry(addGeometry, transform);

            addGeometry.width = 50;
            transform.appendTranslation(0, 50, 0);
            transform.appendRotation(45, Vector3D.Z_AXIS);
            geometry.addGeometry(addGeometry, transform);


            object3d.transform.position.z = 300;
            object3d.transform.position.y = -100;
            this.view3D.scene.addChild(object3d);

            //初始化颜色材质
            var colorMaterial = model.material = new ColorMaterial();

            //变化旋转与颜色
            setInterval(function ()
            {
                object3d.transform.rotation.y += 1;
            }, 15);
            setInterval(function ()
            {
                colorMaterial.color.fromUnit(Math.random() * (1 << 32 - 1), true);
            }, 1000);
        }
    }
}

new feng3d.GeometryTest();