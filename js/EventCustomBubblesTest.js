var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var feng3d;
(function (feng3d) {
    var EventCustomBubblesTest = (function (_super) {
        __extends(EventCustomBubblesTest, _super);
        function EventCustomBubblesTest() {
            _super.call(this);
            this.init();
            this.destroy();
        }
        EventCustomBubblesTest.prototype.init = function () {
            this.name = "EventCustomBubblesTest";
            this.a = new feng3d.EventDispatcher();
            this.a.name = "a";
            this.b = new feng3d.EventDispatcher();
            this.b.name = "b";
            this.addEventListener("testEvent", this.onTestEvent, this);
            this.a.addEventListener("testEvent", this.onTestEvent, this);
            this.b.addEventListener("testEvent", this.onTestEvent, this);
            this.dispatchEvent(new feng3d.Event("testEvent", null, true));
        };
        EventCustomBubblesTest.prototype.destroy = function () {
            this.removeEventListener("testEvent", this.onTestEvent, this);
            this.a.removeEventListener("testEvent", this.onTestEvent, this);
            this.b.removeEventListener("testEvent", this.onTestEvent, this);
            this.a = null;
            this.b = null;
        };
        /**
         * 自定义给出事件冒泡的对象
         */
        EventCustomBubblesTest.prototype.getBubbleTargets = function (event) {
            return [this.a, this.b];
        };
        EventCustomBubblesTest.prototype.onTestEvent = function (event) {
            console.log(event.type, event.target.name, event.currentTarget.name);
        };
        return EventCustomBubblesTest;
    }(feng3d.EventDispatcher));
    feng3d.EventCustomBubblesTest = EventCustomBubblesTest;
})(feng3d || (feng3d = {}));
new feng3d.EventCustomBubblesTest();
//# sourceMappingURL=EventCustomBubblesTest.js.map