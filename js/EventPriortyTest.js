var feng3d;
(function (feng3d) {
    var EventPriortyTest = (function () {
        function EventPriortyTest() {
            this.init();
            this.destroy();
        }
        EventPriortyTest.prototype.init = function () {
            this.dispatcher = new feng3d.EventDispatcher();
            this.dispatcher.addEventListener("test", this.func2, this, 2.5);
            this.dispatcher.addEventListener("test", this.func1, this, 1);
            this.dispatcher.addEventListener("test", this.func3, this, 3);
            this.dispatcher.dispatchEvent(new feng3d.Event("test"));
        };
        EventPriortyTest.prototype.destroy = function () {
            this.dispatcher.removeEventListener("test", this.func1, this);
            this.dispatcher.removeEventListener("test", this.func2, this);
            this.dispatcher.removeEventListener("test", this.func3, this);
            this.dispatcher = null;
        };
        EventPriortyTest.prototype.func1 = function () {
            console.log("1");
        };
        EventPriortyTest.prototype.func2 = function () {
            console.log("2");
        };
        EventPriortyTest.prototype.func3 = function () {
            console.log("3");
        };
        return EventPriortyTest;
    }());
    feng3d.EventPriortyTest = EventPriortyTest;
})(feng3d || (feng3d = {}));
new feng3d.EventPriortyTest();
//# sourceMappingURL=EventPriortyTest.js.map