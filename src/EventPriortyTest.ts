module feng3d {
    export class EventPriortyTest {
        dispatcher: EventDispatcher;
        constructor() {
            this.init();
            this.destroy();
        }

        init() {
            this.dispatcher = new EventDispatcher();

            this.dispatcher.addEventListener("test", this.func2, this, 2.5)
            this.dispatcher.addEventListener("test", this.func1, this, 1)
            this.dispatcher.addEventListener("test", this.func3, this, 3)

            this.dispatcher.dispatchEvent(new Event("test"));
        }

        destroy() {

            this.dispatcher.removeEventListener("test", this.func1, this)
            this.dispatcher.removeEventListener("test", this.func2, this)
            this.dispatcher.removeEventListener("test", this.func3, this)

            this.dispatcher = null;
        }

        func1() {
            console.log("1");
        }
        func2() {
            console.log("2");
        }
        func3() {
            console.log("3");
        }
    }
}

new feng3d.EventPriortyTest();