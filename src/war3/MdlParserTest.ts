namespace feng3d
{
	import War3Model = feng3d.war3.War3Model;
	import MdlParser = feng3d.war3.MdlParser;

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

	var configUrl = "resources/war3/modelShow.config";

	/** 相机旋转角度 */
	var cameraAngle = 0;

	/** 相机起始离物体的距离 */
	var len = 200;

	var showWar3Model: War3Model;

	var view = new Engine();

	view.camera.transform.x = -200;
	view.camera.transform.y = 200;
	view.camera.transform.z = -300;
	view.camera.transform.lookAt(new Vector3D());

	view.camera.gameObject.addComponent(FPSController);

	//
	var rooturl = configUrl.substring(0, configUrl.lastIndexOf("/") + 1);
	updateModel();

	input.on("keyup", (e) =>
	{
		var inputEvent: InputEvent = e.data;
		if (inputEvent.keyCode == 37 && !loading)
		{
			modelId--;
			updateModel();
		}
		if (inputEvent.keyCode == 39 && !loading)
		{
			modelId++;
			updateModel();
		}
		if (inputEvent.keyCode == 38)
			animatorId--;
		if (inputEvent.keyCode == 40)
			animatorId++;
	});

	setInterval(_onEnterFrame, 17);

	function updateModel()
	{
		if (showWar3Model)
		{
			var showMesh = showWar3Model.getMesh();
			view.scene.transform.removeChild(showMesh.transform);
		}

		modelId = (modelId + modelConfig.length) % modelConfig.length;
		loadModel(modelConfig[modelId]);
	}

	function loadModel(model: { label: string, url: string }): void
	{
		loading = true;
		var mdlurl = rooturl + model.url;
		Loader.loadText(mdlurl, (content) =>
		{
			var myParser: MdlParser = new MdlParser();
			myParser.proceedParsing(content, (war3Model) =>
			{
				war3Model.root = mdlurl.substring(0, mdlurl.lastIndexOf("/") + 1);
				showWar3Model = war3Model;

				var showMesh = showWar3Model.getMesh();
				view.scene.transform.addChild(showMesh.transform);

				loading = false;
			});
		});
	}

	function _onEnterFrame(e: Event): void
	{
		if (showWar3Model)
		{
			var items: { label: string, start: number, end: number }[] = [];
			showWar3Model.sequences.forEach(animInfo =>
			{
				items.push({ label: animInfo.name, start: animInfo.interval.start, end: animInfo.interval.end });
			});

			var time = Date.now();

			animatorId = (items.length + animatorId) % items.length;
			var item = items[animatorId];

			var meshtime = (time % (item.end - item.start)) + item.start;

			var stime = Date.now();
			var meshs = showWar3Model.updateAnim(meshtime);
			console.log(`更新顶点数据: ${Date.now() - stime} ms`);
		}
	}
}
