var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SegmentMaterialTest = /** @class */ (function (_super) {
    __extends(SegmentMaterialTest, _super);
    function SegmentMaterialTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 初始化时调用
     */
    SegmentMaterialTest.prototype.init = function () {
        var scene = this.gameObject.scene;
        var camera = scene.getComponentsInChildren(feng3d.Camera)[0];
        var canvas = document.getElementById("glcanvas");
        var segment = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "segment" });
        segment.transform.z = 3;
        scene.gameObject.addChild(segment);
        //初始化材质
        var model = segment.addComponent(feng3d.Model);
        model.material = feng3d.serialization.setValue(new feng3d.Material(), { shaderName: "segment", renderParams: { renderMode: feng3d.RenderMode.LINES } });
        var segmentGeometry = model.geometry = new feng3d.SegmentGeometry();
        var length = 200;
        var height = 2 / Math.PI;
        var preVec;
        for (var x = -length; x <= length; x++) {
            var angle = x / length * Math.PI;
            if (preVec == null) {
                preVec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
            }
            else {
                var vec = new feng3d.Vector3(x / 100, Math.sin(angle) * height, 0);
                segmentGeometry.segments.push({ start: preVec, end: vec });
                preVec = vec;
            }
        }
        //变化旋转
        setInterval(function () {
            segment.transform.ry += 1;
        }, 15);
    };
    /**
     * 更新
     */
    SegmentMaterialTest.prototype.update = function () {
    };
    /**
    * 销毁时调用
    */
    SegmentMaterialTest.prototype.dispose = function () {
    };
    return SegmentMaterialTest;
}(feng3d.Script));
//# sourceMappingURL=SegmentMaterialTest.js.map