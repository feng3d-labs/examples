module feng3d {

    //
    // 测试事件调度器接口
    // @author warden_feng 2014-11-26
    //
    export class IEventDispatcherTest {
        dispatcher: DecoratedDispatcher1;
        constructor() {
            this.init();
            this.destroy();
        }

        public init(): void {
            this.dispatcher = new DecoratedDispatcher1();
            this.dispatcher.addEventListener("doSomething", this.didSomething, this);
            this.dispatcher.dispatchEvent(new Event("doSomething"));
        }

        destroy() {
            this.dispatcher.removeEventListener("doSomething", this.didSomething, this);
        }

        public didSomething(evt: Event): void {
            console.log(evt.type, evt);
        }
    }

    class DecoratedDispatcher1 implements IEventDispatcher {
        private dispatcher: EventDispatcher;

        public name;

        constructor() {
            this.dispatcher = new EventDispatcher(this);
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
    }
}

new feng3d.IEventDispatcherTest();