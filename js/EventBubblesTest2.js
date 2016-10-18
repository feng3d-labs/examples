var feng3d;
(function (feng3d) {
    //
    // 事件冒泡测试(使用接口)
    // @author warden_feng 2014-11-26
    //
    class EventBubblesTest2 extends feng3d.EventDispatcher {
        constructor() {
            super();
            this.init();
            this.destroy();
        }
        init() {
            this.a = new Container("a");
            this.b = new Container("b");
            this.c = new Container("c");
            this.a.addChild(this.b);
            this.b.addChild(this.c);
            this.a.addEventListener("testEvent", this.onTestEvent, this);
            this.b.addEventListener("testEvent", this.onTestEvent, this);
            this.c.addEventListener("testEvent", this.onTestEvent, this);
            // this.a.dispatchEvent(new Event("testEvent", null, true));
            //			b.dispatchEvent(new FEvent("testEvent", null, true));
            this.c.dispatchEvent(new feng3d.Event("testEvent", null, true));
        }
        destroy() {
            this.a.removeEventListener("testEvent", this.onTestEvent, this);
            this.b.removeEventListener("testEvent", this.onTestEvent, this);
            this.c.removeEventListener("testEvent", this.onTestEvent, this);
            this.a.destroy();
            this.b.destroy();
            this.c.destroy();
            this.a = null;
            this.b = null;
            this.c = null;
        }
        onTestEvent(event) {
            console.log(event.type, event.target.tostring(), event.currentTarget.tostring());
        }
    }
    feng3d.EventBubblesTest2 = EventBubblesTest2;
    class Container {
        constructor(name) {
            this.name = name;
            this.dispatcher = new feng3d.EventDispatcher(this);
        }
        addChild(Container2) {
            Container2.parent = this;
        }
        tostring() {
            return this.name;
        }
        addEventListener(type, listener, thisObject, priority = 0) {
            this.dispatcher.addEventListener(type, listener, thisObject, priority);
        }
        dispatchEvent(event) {
            this.dispatcher.dispatchEvent(event);
        }
        removeEventListener(type, listener, thisObject) {
            this.dispatcher.removeEventListener(type, listener, thisObject);
        }
        hasEventListener(type) {
            return this.dispatcher.hasEventListener(type);
        }
        destroy() {
            this.name = null;
            this.parent = null;
            this.dispatcher.destroy();
            this.dispatcher = null;
        }
    }
    feng3d.Container = Container;
})(feng3d || (feng3d = {}));
new feng3d.EventBubblesTest2();
//# sourceMappingURL=EventBubblesTest2.js.map