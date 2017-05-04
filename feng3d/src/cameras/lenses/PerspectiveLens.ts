module feng3d
{

	/**
	 * 透视摄像机镜头
	 * @author feng 2014-10-14
	 */
    export class PerspectiveLens extends LensBase
    {
        private _fieldOfView: number;
        private _focalLength: number;
        private _focalLengthInv: number;
        private _yMax: number;
        private _xMax: number;
        private _coordinateSystem: number;

		/**
		 * 创建一个透视摄像机镜头
		 * @param fieldOfView 视野
		 * @param coordinateSystem 坐标系统类型
		 */
        constructor(fieldOfView: number = 60, coordinateSystem: number = CoordinateSystem.LEFT_HANDED)
        {
            super();

            this.fieldOfView = fieldOfView;
            this.coordinateSystem = coordinateSystem;
        }

		/**
		 * 视野
		 */
        public get fieldOfView(): number
        {
            return this._fieldOfView;
        }

        public set fieldOfView(value: number)
        {
            if (value == this._fieldOfView)
                return;

            this._fieldOfView = value;

            this._focalLengthInv = Math.tan(this._fieldOfView * Math.PI / 360);
            this._focalLength = 1 / this._focalLengthInv;

            this.invalidateMatrix();
        }

		/**
		 * 焦距
		 */
        public get focalLength(): number
        {
            return this._focalLength;
        }

        public set focalLength(value: number)
        {
            if (value == this._focalLength)
                return;

            this._focalLength = value;

            this._focalLengthInv = 1 / this._focalLength;
            this._fieldOfView = Math.atan(this._focalLengthInv) * 360 / Math.PI;

            this.invalidateMatrix();
        }

        public unproject(nX: number, nY: number, sZ: number, v: Vector3D = null): Vector3D
        {
            if (!v)
                v = new Vector3D();
            v.x = nX;
            v.y = -nY;
            v.z = sZ;
            v.w = 1;

            v.x *= sZ;
            v.y *= sZ;

            this.unprojectionMatrix.transformVector(v, v);

            //z is unaffected by transform
            v.z = sZ;

            return v;
        }

		/**
		 * 坐标系类型
		 */
        public get coordinateSystem(): number
        {
            return this._coordinateSystem;
        }

        public set coordinateSystem(value: number)
        {
            if (value == this._coordinateSystem)
                return;

            this._coordinateSystem = value;

            this.invalidateMatrix();
        }

        protected updateMatrix()
        {
            var raw = Matrix3D.RAW_DATA_CONTAINER;

            this._yMax = this._near * this._focalLengthInv;
            this._xMax = this._yMax * this._aspectRatio;

            var left: number, right: number, top: number, bottom: number;

            if (this._scissorRect.x == 0 && this._scissorRect.y == 0 && this._scissorRect.width == this._viewPort.width && this._scissorRect.height == this._viewPort.height)
            {
                // assume unscissored frustum
                left = -this._xMax;
                right = this._xMax;
                top = -this._yMax;
                bottom = this._yMax;
                // assume unscissored frustum
                raw[0] = this._near / this._xMax;
                raw[5] = this._near / this._yMax;
                raw[10] = this._far / (this._far - this._near);
                raw[11] = 1;
                raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[8] = raw[9] = raw[12] = raw[13] = raw[15] = 0;
                raw[14] = -this._near * raw[10];
            }
            else
            {
                // assume scissored frustum
                var xWidth: number = this._xMax * (this._viewPort.width / this._scissorRect.width);
                var yHgt: number = this._yMax * (this._viewPort.height / this._scissorRect.height);
                var center: number = this._xMax * (this._scissorRect.x * 2 - this._viewPort.width) / this._scissorRect.width + this._xMax;
                var middle: number = -this._yMax * (this._scissorRect.y * 2 - this._viewPort.height) / this._scissorRect.height - this._yMax;

                left = center - xWidth;
                right = center + xWidth;
                top = middle - yHgt;
                bottom = middle + yHgt;

                raw[0] = 2 * this._near / (right - left);
                raw[5] = 2 * this._near / (bottom - top);
                raw[8] = (right + left) / (right - left);
                raw[9] = (bottom + top) / (bottom - top);
                raw[10] = (this._far + this._near) / (this._far - this._near);
                raw[11] = 1;
                raw[1] = raw[2] = raw[3] = raw[4] = raw[6] = raw[7] = raw[12] = raw[13] = raw[15] = 0;
                raw[14] = -2 * this._far * this._near / (this._far - this._near);
            }

            // Switch projection transform from left to right handed.
            if (this._coordinateSystem == CoordinateSystem.RIGHT_HANDED)
                raw[5] = -raw[5];

            this._matrix.copyRawDataFrom(raw);

            var yMaxFar: number = this._far * this._focalLengthInv;
            var xMaxFar: number = yMaxFar * this._aspectRatio;

            this._frustumCorners[0] = this._frustumCorners[9] = left;
            this._frustumCorners[3] = this._frustumCorners[6] = right;
            this._frustumCorners[1] = this._frustumCorners[4] = top;
            this._frustumCorners[7] = this._frustumCorners[10] = bottom;

            this._frustumCorners[12] = this._frustumCorners[21] = -xMaxFar;
            this._frustumCorners[15] = this._frustumCorners[18] = xMaxFar;
            this._frustumCorners[13] = this._frustumCorners[16] = -yMaxFar;
            this._frustumCorners[19] = this._frustumCorners[22] = yMaxFar;

            this._frustumCorners[2] = this._frustumCorners[5] = this._frustumCorners[8] = this._frustumCorners[11] = this._near;
            this._frustumCorners[14] = this._frustumCorners[17] = this._frustumCorners[20] = this._frustumCorners[23] = this._far;

            this._matrixInvalid = false;
        }
    }
}
