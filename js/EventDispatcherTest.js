var feng3d;
(function (feng3d) {
    //
    // 测试事件调度器
    // @author warden_feng 2014-11-26
    //
    class EventDispatcherTest {
        constructor() {
            this.init();
            this.destroy();
        }
        init() {
            this.dispatcher = new feng3d.EventDispatcher();
            this.dispatcher.addEventListener("testEvent", this.onTestEvent, this);
            this.dispatcher.addEventListener("testEvent", this.onTestEvent, this);
            this.dispatcher.dispatchEvent(new feng3d.Event("testEvent"));
        }
        destroy() {
            this.dispatcher.removeEventListener("testEvent", this.onTestEvent, this);
        }
        onTestEvent(event) {
            console.log(event.type, event);
        }
    }
    feng3d.EventDispatcherTest = EventDispatcherTest;
})(feng3d || (feng3d = {}));
new feng3d.EventDispatcherTest();
//# sourceMappingURL=EventDispatcherTest.js.map