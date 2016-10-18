var feng3d;
(function (feng3d) {
    /**
     * 组件测试
     * @author  feng 2016-04-26
     */
    class ComponentTest {
        constructor() {
            this.init();
            this.destroy();
        }
        init() {
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
        }
        destroy() {
        }
        onAdded(e) {
            console.log(e.type, e.target.name, e.currentTarget.name, e.data);
        }
        onRemoved(e) {
            console.log(e.type, e.target.name, e.currentTarget.name, e.data);
        }
    }
    feng3d.ComponentTest = ComponentTest;
    class ComponentCustom extends feng3d.Component {
        constructor() {
            super();
            this.name = "ComponentCustom";
        }
    }
    class ComponentInterface extends feng3d.EventDispatcher {
        constructor() {
            super();
        }
    }
})(feng3d || (feng3d = {}));
new feng3d.ComponentTest();
//# sourceMappingURL=ComponentTest.js.map