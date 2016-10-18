module feng3d {
    //
    // 事件冒泡测试
    // @author warden_feng 2014-11-26
    //
    export class EventBubblesTest extends EventDispatcher {
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

            //			a.addEventListener("testEvent", onTestEvent1);
            //			b.addEventListener("testEvent", onTestEvent1);
            //			c.addEventListener("testEvent", onTestEvent1);

            // this.a.dispatchEvent(new Event("testEvent", null, true));
            //			b.dispatchEvent(new Event("testEvent", null, true));
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
            console.log(event.type, (<Container>event.target).name, (<Container>event.currentTarget).name);

            //测试事件停止函数
            //			if (event.currentTarget == b)
            //				event.stopPropagation();

            //测试事件停止函数
            //			if (event.currentTarget == b)
            //				event.stopImmediatePropagation();
        }

        private onTestEvent1(event: Event): void {
            console.log(event.type, (<Container>event.target).name, (<Container>event.currentTarget).name);

            //测试事件停止函数
            if (event.currentTarget == this.b)
                event.isStop = true;
        }
    }

    class Container extends EventDispatcher {
        public parent: Container;
        name: string;

        constructor(name: string) {
            super();
            this.name = name;
        }

        public addChild(container: Container) {
            container.parent = this;
        }

        public toString(): String {
            return this.name;
        }

        public destroy() {
            super.destroy();
            this.name = null;
            this.parent = null;
        }
    }
}

new feng3d.EventBubblesTest();