module feng3d {

    //
    // 事件冒泡测试(使用接口)
    // @author warden_feng 2014-11-26
    //
    export class EventBubblesTest2 extends EventDispatcher {
        public a: Container;
        public b: Container;
        public c: Container;

        constructor() {
            super();
            this.init();
            this.destroy();
        }

        public init(): void {

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
            this.c.dispatchEvent(new Event("testEvent", null, true));
        }

        destroy() {

            this.a.removeEventListener("testEvent", this.onTestEvent, this);
            this.b.removeEventListener("testEvent", this.onTestEvent, this);
            this.c.removeEventListener("testEvent", this.onTestEvent, this);

            this.a.destroy();
            this.b.destroy();
            this.c.destroy();

            this.a = null;
            this.b = null;
            this.c = null;
        }

        private onTestEvent(event: Event): void {
            console.log(event.type, (<Container>event.target).tostring(), (<Container>event.currentTarget).tostring());
        }

    }

    export class Container implements IEventDispatcher {
        // 使用于冒泡 
        public parent: Container;

        name: string;
        private dispatcher: EventDispatcher;

        constructor(name: string) {
            this.name = name;
            this.dispatcher = new EventDispatcher(this);
        }

        public addChild(Container2: Container): void {
            Container2.parent = this;
        }

        public tostring(): string {
            return this.name;
        }

        public addEventListener(type: string, listener: (event: Event) => any, thisObject: any, priority: number = 0): void {
            this.dispatcher.addEventListener(type, listener, thisObject, priority);
        }

        public dispatchEvent(event: Event): void {
            this.dispatcher.dispatchEvent(event);
        }

        public removeEventListener(type: string, listener: (event: Event) => any, thisObject: any): void {
            this.dispatcher.removeEventListener(type, listener, thisObject);
        }

        public hasEventListener(type: string): boolean {
            return this.dispatcher.hasEventListener(type);
        }

        public destroy() {
            this.name = null;
            this.parent = null;
            this.dispatcher.destroy();
            this.dispatcher = null;
        }
    }
}

new feng3d.EventBubblesTest2();