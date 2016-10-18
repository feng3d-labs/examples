var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var feng3d;
(function (feng3d) {
    //
    // 事件冒泡测试
    // @author warden_feng 2014-11-26
    //
    var EventBubblesTest = (function (_super) {
        __extends(EventBubblesTest, _super);
        function EventBubblesTest() {
            _super.call(this);
            this.init();
            this.destroy();
        }
        EventBubblesTest.prototype.init = function () {
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
        };
        EventBubblesTest.prototype.destroy = function () {
            this.a.removeEventListener("testEvent", this.onTestEvent, this);
            this.b.removeEventListener("testEvent", this.onTestEvent, this);
            this.c.removeEventListener("testEvent", this.onTestEvent, this);
            this.a.destroy();
            this.b.destroy();
            this.c.destroy();
            this.a = null;
            this.b = null;
            this.c = null;
        };
        EventBubblesTest.prototype.onTestEvent = function (event) {
            console.log(event.type, event.target.name, event.currentTarget.name);
            //测试事件停止函数
            //			if (event.currentTarget == b)
            //				event.stopPropagation();
            //测试事件停止函数
            //			if (event.currentTarget == b)
            //				event.stopImmediatePropagation();
        };
        EventBubblesTest.prototype.onTestEvent1 = function (event) {
            console.log(event.type, event.target.name, event.currentTarget.name);
            //测试事件停止函数
            if (event.currentTarget == this.b)
                event.isStop = true;
        };
        return EventBubblesTest;
    }(feng3d.EventDispatcher));
    feng3d.EventBubblesTest = EventBubblesTest;
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(name) {
            _super.call(this);
            this.name = name;
        }
        Container.prototype.addChild = function (container) {
            container.parent = this;
        };
        Container.prototype.toString = function () {
            return this.name;
        };
        Container.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.name = null;
            this.parent = null;
        };
        return Container;
    }(feng3d.EventDispatcher));
})(feng3d || (feng3d = {}));
new feng3d.EventBubblesTest();
//# sourceMappingURL=EventBubblesTest.js.map