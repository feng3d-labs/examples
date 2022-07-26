namespace examples
{
	var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent(feng3d.Scene)
	scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

	var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent(feng3d.Camera);
	camera.transform.position = new feng3d.Vector3(0, 1, -10);
	scene.gameObject.addChild(camera.gameObject);

	var engine = new feng3d.View(null, scene, camera);

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

	var showWar3Model: feng3d.GameObject;

	var view = new feng3d.View();

	view.camera.transform.x = -2;
	view.camera.transform.y = 2;
	view.camera.transform.z = -3;
	view.camera.transform.lookAt(new feng3d.Vector3());

	view.camera.gameObject.addComponent(feng3d.FPSController);

	//
	var rooturl = "resources/war3/";
	updateModel();

	feng3d.windowEventProxy.on("keyup", (event) =>
	{
		const e = event.data;
		if (e.keyCode == 37 && !loading)
		{
			modelId--;
			updateModel();
		}
		if (e.keyCode == 39 && !loading)
		{
			modelId++;
			updateModel();
		}
		if (e.keyCode == 38)
		{
			animatorId--;
			updateAnimatorId();
		}
		if (e.keyCode == 40)
		{
			animatorId++;
			updateAnimatorId();
		}

		function updateAnimatorId()
		{
			var animation = showWar3Model.getComponentsInChildren(feng3d.Animation)[0];
			animatorId = (animation.animations.length + animatorId) % animation.animations.length;
			animation.animation = animation.animations[animatorId];
		}
	});

	function updateModel()
	{
		if (showWar3Model)
		{
			view.scene.gameObject.removeChild(showWar3Model);
			showWar3Model = null;
		}

		modelId = (modelId + modelConfig.length) % modelConfig.length;
		loadModel(modelConfig[modelId]);
	}

	function loadModel(model: { label: string, url: string }): void
	{
		var mdlurl = rooturl + model.url;
		loading = true;
		feng3d.mdlLoader.load(mdlurl, (gameObject) =>
		{
			view.scene.gameObject.addChild(gameObject);
			loading = false;
			showWar3Model = gameObject;
			var animation = showWar3Model.getComponentsInChildren(feng3d.Animation)[0];
			animation.isplaying = true;
		});
	}
}