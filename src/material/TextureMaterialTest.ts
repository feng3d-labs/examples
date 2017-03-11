module feng3d {
    export class TextureMaterialTest {
        view3D: View3D;
        constructor() {

            this.init();
        }

        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var cube = new CubeObject3D();
            cube.transform.position.z = 300;
            this.view3D.scene.addChild(cube);

            //变化旋转与颜色
            setInterval(function () {
                cube.transform.rotation.y += 1;
            }, 15);

            var image = new Image();  // Create the image object
            if (!image) {
                console.log('Failed to create the image object');
                return false;
            }
            // Register the event handler to be called on loading an image
            image.onload = function () {

                //材质
                var textureMaterial = cube.getOrCreateComponentByClass(MeshRenderer).material = new TextureMaterial();
                //
                textureMaterial.texture = new Texture2D(image);

            };
            // Tell the browser to load an image
            image.src = 'resources/sky.jpg';

        }
    }
}

new feng3d.TextureMaterialTest();