var feng3d;
(function (feng3d) {
    //
    // 测试事件调度器接口
    // @author warden_feng 2014-11-26
    //
    var IEventDispatcherTest = (function () {
        function IEventDispatcherTest() {
            this.init();
            this.destroy();
        }
        IEventDispatcherTest.prototype.init = function () {
            this.dispatcher = new DecoratedDispatcher1();
            this.dispatcher.addEventListener("doSomething", this.didSomething, this);
            this.dispatcher.dispatchEvent(new feng3d.Event("doSomething"));
        };
        IEventDispatcherTest.prototype.destroy = function () {
            this.dispatcher.removeEventListener("doSomething", this.didSomething, this);
        };
        IEventDispatcherTest.prototype.didSomething = function (evt) {
            console.log(evt.type, evt);
        };
        return IEventDispatcherTest;
    }());
    feng3d.IEventDispatcherTest = IEventDispatcherTest;
    var DecoratedDispatcher1 = (function () {
        function DecoratedDispatcher1() {
            this.dispatcher = new feng3d.EventDispatcher(this);
        }
        DecoratedDispatcher1.prototype.addEventListener = function (type, listener, thisObject, priority) {
            if (priority === void 0) { priority = 0; }
            this.dispatcher.addEventListener(type, listener, thisObject, priority);
        };
        DecoratedDispatcher1.prototype.dispatchEvent = function (event) {
            this.dispatcher.dispatchEvent(event);
        };
        DecoratedDispatcher1.prototype.removeEventListener = function (type, listener, thisObject) {
            this.dispatcher.removeEventListener(type, listener, thisObject);
        };
        DecoratedDispatcher1.prototype.hasEventListener = function (type) {
            return this.dispatcher.hasEventListener(type);
        };
        return DecoratedDispatcher1;
    }());
})(feng3d || (feng3d = {}));
new feng3d.IEventDispatcherTest();
//# sourceMappingURL=IEventDispatcherTest.js.map