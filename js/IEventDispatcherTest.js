var feng3d;
(function (feng3d) {
    //
    // 测试事件调度器接口
    // @author warden_feng 2014-11-26
    //
    class IEventDispatcherTest {
        constructor() {
            this.init();
            this.destroy();
        }
        init() {
            this.dispatcher = new DecoratedDispatcher1();
            this.dispatcher.addEventListener("doSomething", this.didSomething, this);
            this.dispatcher.dispatchEvent(new feng3d.Event("doSomething"));
        }
        destroy() {
            this.dispatcher.removeEventListener("doSomething", this.didSomething, this);
        }
        didSomething(evt) {
            console.log(evt.type, evt);
        }
    }
    feng3d.IEventDispatcherTest = IEventDispatcherTest;
    class DecoratedDispatcher1 {
        constructor() {
            this.dispatcher = new feng3d.EventDispatcher(this);
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
    }
})(feng3d || (feng3d = {}));
new feng3d.IEventDispatcherTest();
//# sourceMappingURL=IEventDispatcherTest.js.map