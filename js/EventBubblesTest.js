var feng3d;
(function (feng3d) {
    //
    // 事件冒泡测试
    // @author warden_feng 2014-11-26
    //
    class EventBubblesTest extends feng3d.EventDispatcher {
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
            //			a.addEventListener("testEvent", onTestEvent1);
            //			b.addEventListener("testEvent", onTestEvent1);
            //			c.addEventListener("testEvent", onTestEvent1);
            // this.a.dispatchEvent(new Event("testEvent", null, true));
            //			b.dispatchEvent(new Event("testEvent", null, true));
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
            console.log(event.type, event.target.name, event.currentTarget.name);
            //测试事件停止函数
            //			if (event.currentTarget == b)
            //				event.stopPropagation();
            //测试事件停止函数
            //			if (event.currentTarget == b)
            //				event.stopImmediatePropagation();
        }
        onTestEvent1(event) {
            console.log(event.type, event.target.name, event.currentTarget.name);
            //测试事件停止函数
            if (event.currentTarget == this.b)
                event.isStop = true;
        }
    }
    feng3d.EventBubblesTest = EventBubblesTest;
    class Container extends feng3d.EventDispatcher {
        constructor(name) {
            super();
            this.name = name;
        }
        addChild(container) {
            container.parent = this;
        }
        toString() {
            return this.name;
        }
        destroy() {
            super.destroy();
            this.name = null;
            this.parent = null;
        }
    }
})(feng3d || (feng3d = {}));
new feng3d.EventBubblesTest();
//# sourceMappingURL=EventBubblesTest.js.map