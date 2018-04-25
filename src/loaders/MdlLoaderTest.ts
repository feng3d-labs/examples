namespace feng3d
{

	export class MdlLoaderTest extends feng3d.Script
	{
        /**
         * 初始化时调用
         */
		init()
		{
			var scene = this.gameObject.scene;
			var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
			var canvas = document.getElementById("glcanvas");

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

			var showWar3Model: GameObject;

			var view = new Engine();

			view.camera.transform.x = -200;
			view.camera.transform.y = 200;
			view.camera.transform.z = -300;
			view.camera.transform.lookAt(new Vector3());

			view.camera.gameObject.addComponent(FPSController);

			//
			var rooturl = "resources/war3/";
			updateModel();

			windowEventProxy.on("keyup", (e) =>
			{
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
					var animation = showWar3Model.getComponentsInChildren(Animation)[0];
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
				mdlLoader.load(mdlurl, (gameObject) =>
				{
					view.scene.gameObject.addChild(gameObject);
					loading = false;
					showWar3Model = gameObject;
					var animation = showWar3Model.getComponentsInChildren(Animation)[0];
					animation.isplaying = true;
				});
			}
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