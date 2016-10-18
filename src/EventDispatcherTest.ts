module feng3d {

    //
    // 测试事件调度器
    // @author warden_feng 2014-11-26
    //
    export class EventDispatcherTest {

        dispatcher: EventDispatcher;

        constructor() {
            this.init();
            this.destroy();
        }

        public init(): void {
            this.dispatcher = new EventDispatcher();
            this.dispatcher.addEventListener("testEvent", this.onTestEvent, this);
            this.dispatcher.addEventListener("testEvent", this.onTestEvent, this);
            this.dispatcher.dispatchEvent(new Event("testEvent"));
        }

        destroy() {
            this.dispatcher.removeEventListener("testEvent", this.onTestEvent, this);
        }

        private onTestEvent(event: Event): void {
            console.log(event.type, event);
        }
    }
}

new feng3d.EventDispatcherTest();