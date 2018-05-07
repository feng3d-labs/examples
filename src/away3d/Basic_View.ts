namespace feng3d
{

    export class Basic_View extends feng3d.Script
    {
        /**
         * 初始化时调用
         */
        init()
        {
            var scene = this.gameObject.scene;
            var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
            var canvas = document.getElementById("glcanvas");


            camera.transform.z = -6;
            camera.transform.y = 5;
            camera.transform.lookAt(new Vector3());

            var plane = GameObject.create();
            var model = plane.addComponent(MeshRenderer);
            model.geometry = new PlaneGeometry(7, 7);
            var material = model.material = materialFactory.create("standard");
            material.uniforms.s_diffuse.url = "resources/floor_diffuse.jpg";
            scene.gameObject.addChild(plane);

            ticker.onframe(() =>
            {
                plane.transform.ry += 1;
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