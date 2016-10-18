var feng3d;
(function (feng3d) {
    class EventCustomBubblesTest extends feng3d.EventDispatcher {
        constructor() {
            super();
            this.init();
            this.destroy();
        }
        init() {
            this.name = "EventCustomBubblesTest";
            this.a = new feng3d.EventDispatcher();
            this.a.name = "a";
            this.b = new feng3d.EventDispatcher();
            this.b.name = "b";
            this.addEventListener("testEvent", this.onTestEvent, this);
            this.a.addEventListener("testEvent", this.onTestEvent, this);
            this.b.addEventListener("testEvent", this.onTestEvent, this);
            this.dispatchEvent(new feng3d.Event("testEvent", null, true));
        }
        destroy() {
            this.removeEventListener("testEvent", this.onTestEvent, this);
            this.a.removeEventListener("testEvent", this.onTestEvent, this);
            this.b.removeEventListener("testEvent", this.onTestEvent, this);
            this.a = null;
            this.b = null;
        }
        /**
         * 自定义给出事件冒泡的对象
         */
        getBubbleTargets(event) {
            return [this.a, this.b];
        }
        onTestEvent(event) {
            console.log(event.type, event.target.name, event.currentTarget.name);
        }
    }
    feng3d.EventCustomBubblesTest = EventCustomBubblesTest;
})(feng3d || (feng3d = {}));
new feng3d.EventCustomBubblesTest();
//# sourceMappingURL=EventCustomBubblesTest.js.map