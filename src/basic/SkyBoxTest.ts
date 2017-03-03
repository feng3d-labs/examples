module feng3d {
    export class SkyBoxTest {
        view3D: View3D;
        controller: FPSController;
        cameraObj: Object3D;

        constructor() {

            this.init();

            this.cameraObj = new Object3D("camera");
            this.cameraObj.transform.z = -500;
            this.cameraObj.transform.lookAt(new Vector3D());
            this.cameraObj.addComponent(this.view3D.camera);
            //
            this.controller = new FPSController();
            //
            this.process();
            setInterval(this.process.bind(this), 17);


            Input.instance.addEventListener("mousedown", this.onMousedown, this);
            Input.instance.addEventListener("mouseup", this.onMouseup, this);
        }

        private onMousedown() {

            this.controller.target = this.cameraObj.transform;
        }

        private onMouseup() {

            this.controller.target = null;
        }

        process() {

            this.controller.update();
        }

        init() {
            var canvas = document.getElementById("glcanvas");
            this.view3D = new View3D(canvas);

            var scene = this.view3D.scene;

            var loadedNum = 0;
            var imagePaths = ['px.jpg', 'py.jpg', 'pz.jpg', 'nx.jpg', 'ny.jpg', 'nz.jpg'];
            var images: HTMLImageElement[] = [];
            for (var i = 0; i < imagePaths.length; i++) {
                var image = images[i] = new Image();
                image.onload = function () {
                    loadedNum++;
                    if (loadedNum == imagePaths.length) {
                        var skybox = new SkyBoxObject3D(images);
                        scene.addChild(skybox);
                    }
                }
                image.src = 'resources/skybox/' + imagePaths[i];
            }

        }
    }
}

new feng3d.SkyBoxTest();