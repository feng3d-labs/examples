namespace feng3d
{
	import War3Model = feng3d.war3.War3Model;
	import MdlParser = feng3d.war3.MdlParser;

	/**
	 * war3的mdl文件解析测试
	 * @author warden_feng 2014-4-29
	 */
	export class MdlParserTest
	{
		private view: View3D;
		private controller: FPSController;
		private modelId = 0;
		private animatorId = 0;

		private loading = false;

		private configUrl: String = "resources/war3/modelShow.config";

		private rooturl: String;

		private showWar3Model: War3Model;

		/** 相机旋转角度 */
		private cameraAngle: Number = 0;

		/** 相机起始离物体的距离 */
		private len: Number = 200;

		constructor()
		{
			this.init();
		}

		private init(e: Event = null): void
		{
			this.view = new View3D();
			this.view.autoRender = false;

			this.view.camera.transform.x = -200;
			this.view.camera.transform.y = 200;
			this.view.camera.transform.z = -300;
			this.view.camera.transform.lookAt(new Vector3D());

			//
			this.controller = new FPSController(this.view.camera.gameObject);

			this.rooturl = this.configUrl.substring(0, this.configUrl.lastIndexOf("/") + 1);
			this.updateModel();

			Event.on(input, <any>inputType.KEY_UP, (e) =>
			{
				var inputEvent: InputEvent = e.data;
				if (inputEvent.keyCode == 37 && !this.loading)
				{
					this.modelId--;
					this.updateModel();
				}
				if (inputEvent.keyCode == 39 && !this.loading)
				{
					this.modelId++;
					this.updateModel();
				}
				if (inputEvent.keyCode == 38)
					this.animatorId--;
				if (inputEvent.keyCode == 40)
					this.animatorId++;
			});

			setInterval(this._onEnterFrame.bind(this), 17);
		}

		private updateModel()
		{
			if (this.showWar3Model)
			{
				var showMesh = this.showWar3Model.getMesh();
				this.view.scene.transform.removeChild(showMesh.transform);
			}

			this.modelId = (this.modelId + modelConfig.length) % modelConfig.length;
			this.loadModel(modelConfig[this.modelId]);
		}

		private loadModel(model: { label: string, url: string }): void
		{
			this.loading = true;
			var loader = new Loader();
			var mdlurl = this.rooturl + model.url;
			loader.loadText(mdlurl, (content) =>
			{
				var myParser: MdlParser = new MdlParser();
				myParser.proceedParsing(content, (war3Model) =>
				{
					war3Model.root = mdlurl.substring(0, mdlurl.lastIndexOf("/") + 1);
					this.showWar3Model = war3Model;

					var showMesh = this.showWar3Model.getMesh();
					this.view.scene.transform.addChild(showMesh.transform);

					this.loading = false;
				});
			});
		}

		private _onEnterFrame(e: Event): void
		{
			if (this.showWar3Model)
			{
				var items: { label: string, start: number, end: number }[] = [];
				this.showWar3Model.sequences.forEach(animInfo =>
				{
					items.push({ label: animInfo.name, start: animInfo.interval.start, end: animInfo.interval.end });
				});

				var time = Date.now();

				this.animatorId = (items.length + this.animatorId) % items.length;
				var item = items[this.animatorId];

				var meshtime = (time % (item.end - item.start)) + item.start;

				var stime = Date.now();
				var meshs = this.showWar3Model.updateAnim(meshtime);
				console.log(`更新顶点数据: ${Date.now() - stime} ms`);
			}

			this.view.render();
		}
	}

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
}


