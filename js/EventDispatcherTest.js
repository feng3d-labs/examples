var feng3d;
(function (feng3d) {
    //
    // 测试事件调度器
    // @author warden_feng 2014-11-26
    //
    var EventDispatcherTest = (function () {
        function EventDispatcherTest() {
            this.init();
            this.destroy();
        }
        EventDispatcherTest.prototype.init = function () {
            this.dispatcher = new feng3d.EventDispatcher();
            this.dispatcher.addEventListener("testEvent", this.onTestEvent, this);
            this.dispatcher.addEventListener("testEvent", this.onTestEvent, this);
            this.dispatcher.dispatchEvent(new feng3d.Event("testEvent"));
        };
        EventDispatcherTest.prototype.destroy = function () {
            this.dispatcher.removeEventListener("testEvent", this.onTestEvent, this);
        };
        EventDispatcherTest.prototype.onTestEvent = function (event) {
            console.log(event.type, event);
        };
        return EventDispatcherTest;
    }());
    feng3d.EventDispatcherTest = EventDispatcherTest;
})(feng3d || (feng3d = {}));
new feng3d.EventDispatcherTest();
//# sourceMappingURL=EventDispatcherTest.js.map