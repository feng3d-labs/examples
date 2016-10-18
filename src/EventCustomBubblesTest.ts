module feng3d {

    export class EventCustomBubblesTest extends EventDispatcher {

        public a: EventDispatcher;
        public b: EventDispatcher;

        constructor() {
            super();
            this.init();
            this.destroy();
        }

        public init(): void {

            this.name = "EventCustomBubblesTest";
            this.a = new EventDispatcher();
            this.a.name = "a";
            this.b = new EventDispatcher();
            this.b.name = "b";

            this.addEventListener("testEvent", this.onTestEvent, this);
            this.a.addEventListener("testEvent", this.onTestEvent, this);
            this.b.addEventListener("testEvent", this.onTestEvent, this);

            this.dispatchEvent(new Event("testEvent", null, true));
        }

        destroy() {

            this.removeEventListener("testEvent", this.onTestEvent, this);
            this.a.removeEventListener("testEvent", this.onTestEvent, this);
            this.b.removeEventListener("testEvent", this.onTestEvent, this);

            this.a = null;
            this.b = null;
        }

        /**
         * 自定义给出事件冒泡的对象
         */
        protected getBubbleTargets(event: Event): IEventDispatcher[] {
            return [this.a, this.b];
        }

        private onTestEvent(event: Event): void {
            console.log(event.type, (<Container>event.target).name, (<Container>event.currentTarget).name);
        }
    }
}

new feng3d.EventCustomBubblesTest();