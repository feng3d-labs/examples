var feng3d;
(function (feng3d) {
    var modelConfig = [
        {
            "label": "WoWDryad",
            "url": "WoWDryad.mdl"
        },
        {
            "label": "Owl",
            "url": "Owl.mdl"
        },
        {
            "label": "Arthas",
            "url": "Arthas.mdl"
        },
        {
            "label": "DragonRed",
            "url": "DragonRed.mdl"
        },
        {
            "label": "Tauren_Range",
            "url": "Tauren_Range.mdl"
        },
        {
            "label": "archimonde",
            "url": "archimonde.mdl"
        },
        {
            "label": "Knight",
            "url": "Knight.mdl"
        },
        {
            "label": "kiljaeden",
            "url": "kiljaeden.mdl"
        }
    ];
    var modelId = 0;
    var animatorId = 0;
    var loading = false;
    /** 相机旋转角度 */
    var cameraAngle = 0;
    /** 相机起始离物体的距离 */
    var len = 200;
    var showWar3Model;
    var view = new feng3d.Engine();
    view.camera.transform.x = -200;
    view.camera.transform.y = 200;
    view.camera.transform.z = -300;
    view.camera.transform.lookAt(new feng3d.Vector3D());
    view.camera.gameObject.addComponent(feng3d.FPSController);
    //
    var rooturl = "resources/war3/";
    updateModel();
    feng3d.windowEventProxy.on("keyup", function (e) {
        if (e.keyCode == 37 && !loading) {
            modelId--;
            updateModel();
        }
        if (e.keyCode == 39 && !loading) {
            modelId++;
            updateModel();
        }
        if (e.keyCode == 38) {
            animatorId--;
            updateAnimatorId();
        }
        if (e.keyCode == 40) {
            animatorId++;
            updateAnimatorId();
        }
        function updateAnimatorId() {
            var animation = showWar3Model.getComponentsInChildren(feng3d.Animation)[0];
            animatorId = (animation.animations.length + animatorId) % animation.animations.length;
            animation.animation = animation.animations[animatorId];
        }
    });
    function updateModel() {
        if (showWar3Model) {
            view.scene.gameObject.removeChild(showWar3Model);
            showWar3Model = null;
        }
        modelId = (modelId + modelConfig.length) % modelConfig.length;
        loadModel(modelConfig[modelId]);
    }
    function loadModel(model) {
        var mdlurl = rooturl + model.url;
        loading = true;
        feng3d.mdlLoader.load(mdlurl, function (gameObject) {
            view.scene.gameObject.addChild(gameObject);
            loading = false;
            showWar3Model = gameObject;
            var animation = showWar3Model.getComponentsInChildren(feng3d.Animation)[0];
            animation.isplaying = true;
        });
    }
})(feng3d || (feng3d = {}));
//# sourceMappingURL=MdlLoaderTest.js.map