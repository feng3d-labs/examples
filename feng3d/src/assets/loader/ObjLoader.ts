module feng3d
{
    /**
     * Obj模型加载类
     * @author feng 2017-01-18
     */
    export class ObjLoader
    {
        private _objData: OBJ_OBJData;
        private _mtlData: Mtl_Mtl;
        private _completed: (object3D: GameObject) => void;
        private _url: string;
        private _material: Material;

        /**
         * 加载资源
         * @param url   路径
         */
        public load(url: string, material: Material, completed: (object3D: GameObject) => void = null)
        {
            this._completed = completed;
            this._url = url;
            this._material = material;

            var loader = new Loader();
            loader.addEventListener(LoaderEvent.COMPLETE, this.onComplete, this)
            loader.loadText(url);
        }

        private onComplete(e: LoaderEvent)
        {
            var objData = this._objData = OBJParser.parser(e.data.content);
            var mtl = objData.mtl;
            if (mtl)
            {
                var mtlRoot = this._url.substring(0, this._url.lastIndexOf("/") + 1);
                var mtlLoader = new Loader();
                mtlLoader.loadText(mtlRoot + mtl);
                mtlLoader.addEventListener(LoaderEvent.COMPLETE, function (e: LoaderEvent)
                {
                    var mtlData = this._mtlData = MtlParser.parser(e.data.content);
                    this.createObj(this._material);
                }, this);
            } else
            {
                this.createObj(this._material);
            }
        }

        private createObj(material: Material)
        {
            var object = new GameObject();
            var objData = this._objData;
            var objs = objData.objs;
            for (var i = 0; i < objs.length; i++)
            {
                var obj = objs[i];
                var object3D = this.createSubObj(obj, material);
                object.addChild(object3D);
            }
            if (this._completed)
            {
                this._completed(object);
            }
        }

        private createSubObj(obj: OBJ_OBJ, material: Material)
        {
            var object3D = new GameObject(obj.name);
            var vertex = new Float32Array(obj.vertex);
            var subObjs = obj.subObjs;
            for (var i = 0; i < subObjs.length; i++)
            {
                var materialObj = this.createMaterialObj(vertex, subObjs[i], material);
                object3D.addChild(materialObj);
            }
            return object3D;
        }

        private createMaterialObj(vertex: Float32Array, subObj: OBJ_SubOBJ, material: Material)
        {
            var object3D = new GameObject();
            var model = object3D.getOrCreateComponentByClass(Model);
            model.material = material || new ColorMaterial();

            var geometry = model.geometry = new Geometry();
            geometry.setVAData(GLAttribute.a_position, vertex, 3);

            var faces = subObj.faces;

            var indices: number[] = [];
            for (var i = 0; i < faces.length; i++)
            {
                var vertexIndices = faces[i].vertexIndices;
                indices.push(vertexIndices[0] - 1, vertexIndices[1] - 1, vertexIndices[2] - 1);
                if (vertexIndices.length == 4)
                {
                    indices.push(vertexIndices[2] - 1, vertexIndices[3] - 1, vertexIndices[0] - 1);
                }
            }
            geometry.setIndices(new Uint16Array(indices));
            if (this._mtlData && this._mtlData[subObj.material])
            {
                var materialInfo = this._mtlData[subObj.material];
                var kd = materialInfo.kd;
                var colorMaterial = new ColorMaterial();
                colorMaterial.color.r = kd[0];
                colorMaterial.color.g = kd[1];
                colorMaterial.color.b = kd[2];
                model.material = colorMaterial;
            }
            return object3D;
        }
    }
}