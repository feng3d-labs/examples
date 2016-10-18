var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var feng3d;
(function (feng3d) {
    //
    // 事件冒泡测试(使用接口)
    // @author warden_feng 2014-11-26
    //
    var EventBubblesTest2 = (function (_super) {
        __extends(EventBubblesTest2, _super);
        function EventBubblesTest2() {
            _super.call(this);
            this.init();
            this.destroy();
        }
        EventBubblesTest2.prototype.init = function () {
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
        };
        EventBubblesTest2.prototype.destroy = function () {
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
        EventBubblesTest2.prototype.onTestEvent = function (event) {
            console.log(event.type, event.target.tostring(), event.currentTarget.tostring());
        };
        return EventBubblesTest2;
    }(feng3d.EventDispatcher));
    feng3d.EventBubblesTest2 = EventBubblesTest2;
    var Container = (function () {
        function Container(name) {
            this.name = name;
            this.dispatcher = new feng3d.EventDispatcher(this);
        }
        Container.prototype.addChild = function (Container2) {
            Container2.parent = this;
        };
        Container.prototype.tostring = function () {
            return this.name;
        };
        Container.prototype.addEventListener = function (type, listener, thisObject, priority) {
            if (priority === void 0) { priority = 0; }
            this.dispatcher.addEventListener(type, listener, thisObject, priority);
        };
        Container.prototype.dispatchEvent = function (event) {
            this.dispatcher.dispatchEvent(event);
        };
        Container.prototype.removeEventListener = function (type, listener, thisObject) {
            this.dispatcher.removeEventListener(type, listener, thisObject);
        };
        Container.prototype.hasEventListener = function (type) {
            return this.dispatcher.hasEventListener(type);
        };
        Container.prototype.destroy = function () {
            this.name = null;
            this.parent = null;
            this.dispatcher.destroy();
            this.dispatcher = null;
        };
        return Container;
    }());
    feng3d.Container = Container;
})(feng3d || (feng3d = {}));
new feng3d.EventBubblesTest2();
//# sourceMappingURL=EventBubblesTest2.js.map