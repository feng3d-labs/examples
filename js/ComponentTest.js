var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var feng3d;
(function (feng3d) {
    /**
     * 组件测试
     * @author  feng 2016-04-26
     */
    var ComponentTest = (function () {
        function ComponentTest() {
            this.init();
            this.destroy();
        }
        ComponentTest.prototype.init = function () {
            var container = new feng3d.Component();
            container.name = "container";
            container.addEventListener(feng3d.ComponentEvent.ADDED_COMPONENT, this.onAdded, this);
            container.addEventListener(feng3d.ComponentEvent.REMOVED_COMPONENT, this.onRemoved, this);
            var comA = new ComponentCustom();
            comA.addEventListener(feng3d.ComponentEvent.ADDED_COMPONENT, this.onAdded, this);
            comA.addEventListener(feng3d.ComponentEvent.REMOVED_COMPONENT, this.onRemoved, this);
            container.addComponent(comA);
            feng3d.assert(container.numComponents == 1);
            feng3d.assert(container.getComponentsByName(comA.name).length == 1);
            feng3d.assert(container.getComponentByName(comA.name) == comA);
            feng3d.assert(container.getComponentByClass(feng3d.Component) == comA);
            container.removeComponent(comA);
            feng3d.assert(container.numComponents == 0);
            comA.removeEventListener(feng3d.ComponentEvent.ADDED_COMPONENT, this.onAdded, this);
            comA.removeEventListener(feng3d.ComponentEvent.REMOVED_COMPONENT, this.onRemoved, this);
            var comB = container.getOrCreateComponentByClass(ComponentCustom);
            var comC = container.getOrCreateComponentByClass(ComponentCustom);
            feng3d.assert(comB == comC);
            container.removeComponent(comB);
            feng3d.assert(container.numComponents == 0);
            var comInterface = container.getOrCreateComponentByClass(ComponentInterface);
            feng3d.assert(comInterface == container.getOrCreateComponentByClass(ComponentInterface));
            container.removeEventListener(feng3d.ComponentEvent.ADDED_COMPONENT, this.onAdded, this);
            container.removeEventListener(feng3d.ComponentEvent.REMOVED_COMPONENT, this.onRemoved, this);
        };
        ComponentTest.prototype.destroy = function () {
        };
        ComponentTest.prototype.onAdded = function (e) {
            console.log(e.type, e.target.name, e.currentTarget.name, e.data);
        };
        ComponentTest.prototype.onRemoved = function (e) {
            console.log(e.type, e.target.name, e.currentTarget.name, e.data);
        };
        return ComponentTest;
    }());
    feng3d.ComponentTest = ComponentTest;
    var ComponentCustom = (function (_super) {
        __extends(ComponentCustom, _super);
        function ComponentCustom() {
            _super.call(this);
            this.name = "ComponentCustom";
        }
        return ComponentCustom;
    }(feng3d.Component));
    var ComponentInterface = (function (_super) {
        __extends(ComponentInterface, _super);
        function ComponentInterface() {
            _super.call(this);
        }
        return ComponentInterface;
    }(feng3d.EventDispatcher));
})(feng3d || (feng3d = {}));
new feng3d.ComponentTest();
//# sourceMappingURL=ComponentTest.js.map