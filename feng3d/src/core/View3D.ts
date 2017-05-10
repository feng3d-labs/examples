module feng3d
{

    /**
     * 3D视图
     * @author feng 2016-05-01
     */
    export class View3D
    {
		/**
		 * 射线坐标临时变量
		 */
        private static tempRayPosition: Vector3D = new Vector3D();
        /**
		 * 射线方向临时变量
		 */
        private static tempRayDirection: Vector3D = new Vector3D();

        //
        private _gl: GL;
        private _camera: CameraObject3D;
        private _scene: Scene3D;
        private _canvas: HTMLCanvasElement;
        private _viewRect: Rectangle;

        /**
         * 默认渲染器
         */
        private defaultRenderer: ForwardRenderer;

        /**
         * 鼠标事件管理器
         */
        private mouse3DManager: Mouse3DManager;

        /**
         * 阴影图渲染器
         */
        private shadowRenderer: ShadowRenderer;

        /**
         * 渲染环境
         */
        private _renderContext: RenderContext;

        /**
         * 鼠标在3D视图中的位置
         */
        public mousePos = new Point();

        /**
         * 构建3D视图
         * @param canvas    画布
         * @param scene     3D场景
         * @param camera    摄像机
         */
        constructor(canvas, scene: Scene3D = null, camera: CameraObject3D = null)
        {
            //初始化引擎
            initEngine();

            debuger && assert(canvas instanceof HTMLCanvasElement, `canvas参数必须为 HTMLCanvasElement 类型！`);
            this._canvas = canvas;

            this._gl = getWebGLContext(canvas, false);

            this.initGL();

            this._viewRect = new Rectangle(this._canvas.clientLeft,this._canvas.clientTop,this._canvas.clientWidth,this._canvas.clientHeight);
            this.scene = scene || new Scene3D();
            this.camera = camera || new CameraObject3D();

            this.defaultRenderer = new ForwardRenderer();
            this.mouse3DManager = new Mouse3DManager();
            this.shadowRenderer = new ShadowRenderer();

            this._renderContext = new RenderContext();

            input.addEventListener(inputType.MOUSE_MOVE, this.onMouseEvent, this);
            ticker.addEventListener(Event.ENTER_FRAME, this.drawScene, this);
        }

        /**
         * 初始化GL
         */
        private initGL()
        {
            this._gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
            this._gl.clearDepth(1.0);                 // Clear everything
            this._gl.enable(GL.DEPTH_TEST);           // Enable depth testing
            this._gl.depthFunc(GL.LEQUAL);            // Near things obscure far things
        }

        /** 3d场景 */
        public get scene(): Scene3D
        {
            return this._scene;
        }

        public set scene(value: Scene3D)
        {
            this._scene = value;
        }

        /**
         * 视窗宽度
         */
        public get width()
        {
            return this._canvas.width;
        }

        /**
         * 绘制场景
         */
        private drawScene(event: Event)
        {
            this._canvas.width = this._canvas.clientWidth;
            this._canvas.height = this._canvas.clientHeight;

            this._renderContext.camera = this._camera.camera;
            this._renderContext.scene3d = this._scene;
            this._renderContext.view3D = this;
            this._renderContext.gl = this._gl;

            var viewClientRect: ClientRect = this._canvas.getBoundingClientRect();
            var viewRect = this._viewRect = this._viewRect || new Rectangle();
            viewRect.setTo(viewClientRect.left, viewClientRect.top, viewClientRect.width, viewClientRect.height);
            this.camera.camera.lens.aspectRatio = viewRect.width / viewRect.height;

            //鼠标拾取渲染
            this.mouse3DManager.viewRect.copyFrom(viewRect);
            this.mouse3DManager.draw(this._renderContext);

            //绘制阴影图
            // this.shadowRenderer.draw(this._gl, this._scene, this._camera.camera);

            // 默认渲染
            this.defaultRenderer.viewRect.copyFrom(viewRect);
            this.defaultRenderer.draw(this._renderContext);
        }

        /**
         * 摄像机
         */
        public get camera()
        {
            return this._camera;
        }

        public set camera(value)
        {
            this._camera = value;
        }

        /**
         * 监听鼠标事件收集事件类型
         */
        private onMouseEvent(event: InputEvent)
        {
            this.mousePos.setTo(event.clientX - this._viewRect.x, event.clientY - this._viewRect.y);
        }

        /**
		 * 获取鼠标射线（与鼠标重叠的摄像机射线）
		 */
        public getMouseRay3D(): Ray3D
        {
            var pos = this.mousePos;
            return this.getRay3D(pos.x, pos.y);
        }

        /**
		 * 获取与坐标重叠的射线
		 * @param x view3D上的X坐标
		 * @param y view3D上的X坐标
		 * @return
		 */
        public getRay3D(x: number, y: number, ray3D: Ray3D = null): Ray3D
        {
            //摄像机坐标
            var rayPosition: Vector3D = this.unproject(x, y, 0, View3D.tempRayPosition);
            //摄像机前方1处坐标
            var rayDirection: Vector3D = this.unproject(x, y, 1, View3D.tempRayDirection);
            //射线方向
            rayDirection.x = rayDirection.x - rayPosition.x;
            rayDirection.y = rayDirection.y - rayPosition.y;
            rayDirection.z = rayDirection.z - rayPosition.z;
            rayDirection.normalize();
            //定义射线
            ray3D = ray3D || new Ray3D(rayPosition, rayDirection);
            return ray3D;
        }

		/**
		 * 投影坐标（世界坐标转换为3D视图坐标）
		 * @param point3d 世界坐标
		 * @return 屏幕的绝对坐标
		 */
        public project(point3d: Vector3D): Vector3D
        {
            var v: Vector3D = this._camera.camera.project(point3d);

            v.x = (v.x + 1.0) * this._canvas.width / 2.0;
            v.y = (v.y + 1.0) * this._canvas.height / 2.0;

            return v;
        }

        /**
		 * 屏幕坐标投影到场景坐标
		 * @param nX 屏幕坐标X ([0-width])
		 * @param nY 屏幕坐标Y ([0-height])
		 * @param sZ 到屏幕的距离
		 * @param v 场景坐标（输出）
		 * @return 场景坐标
		 */
        public unproject(sX: number, sY: number, sZ: number, v: Vector3D = null): Vector3D
        {
            var gpuPos: Point = this.screenToGpuPosition(new Point(sX, sY));
            return this._camera.camera.unproject(gpuPos.x, gpuPos.y, sZ, v);
        }

        /**
		 * 屏幕坐标转GPU坐标
		 * @param screenPos 屏幕坐标 (x:[0-width],y:[0-height])
		 * @return GPU坐标 (x:[-1,1],y:[-1-1])
		 */
        public screenToGpuPosition(screenPos: Point): Point
        {
            var gpuPos: Point = new Point();
            gpuPos.x = (screenPos.x * 2 - this._canvas.width) / this._canvas.width;
            gpuPos.y = (screenPos.y * 2 - this._canvas.height) / this._canvas.height;
            return gpuPos;
        }

        /**
         * 获取单位像素在指定深度映射的大小
         * @param   depth   深度
         */
        public getScaleByDepth(depth: number)
        {
            var centerX = this._viewRect.width / 2;
            var centerY = this._viewRect.height / 2;
            var lt = this.unproject(centerX - 0.5, centerY - 0.5, depth);
            var rb = this.unproject(centerX + 0.5, centerY + 0.5, depth);
            var scale = lt.subtract(rb).length;
            return scale;
        }
    }
}