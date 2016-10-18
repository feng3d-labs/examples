module feng3d {
    /**
     * 组件测试
     * @author  feng 2016-04-26
     */
    export class ComponentTest {

        constructor() {
            this.init();
            this.destroy();
        }

        init() {

            var container = new Component();
            container.name = "container";
            container.addEventListener(ComponentEvent.ADDED_COMPONENT, this.onAdded, this);
            container.addEventListener(ComponentEvent.REMOVED_COMPONENT, this.onRemoved, this);

            var comA = new ComponentCustom();
            comA.addEventListener(ComponentEvent.ADDED_COMPONENT, this.onAdded, this);
            comA.addEventListener(ComponentEvent.REMOVED_COMPONENT, this.onRemoved, this);

            container.addComponent(comA);

            assert(container.numComponents == 1);
            assert(container.getComponentsByName(comA.name).length == 1);
            assert(container.getComponentByName(comA.name) == comA);
            assert(container.getComponentByClass(Component) == comA);

            container.removeComponent(comA);
            assert(container.numComponents == 0);

            comA.removeEventListener(ComponentEvent.ADDED_COMPONENT, this.onAdded, this);
            comA.removeEventListener(ComponentEvent.REMOVED_COMPONENT, this.onRemoved, this);

            var comB = container.getOrCreateComponentByClass(ComponentCustom);
            var comC = container.getOrCreateComponentByClass(ComponentCustom);
            assert(comB == comC);
            container.removeComponent(comB);
            assert(container.numComponents == 0);

            var comInterface = container.getOrCreateComponentByClass(ComponentInterface);
            assert(comInterface == container.getOrCreateComponentByClass(ComponentInterface));

            container.removeEventListener(ComponentEvent.ADDED_COMPONENT, this.onAdded, this);
            container.removeEventListener(ComponentEvent.REMOVED_COMPONENT, this.onRemoved, this);
        }

        destroy() {

        }
        onAdded(e: ComponentEvent) {
            console.log(e.type, e.target.name, e.currentTarget.name, e.data);
        }
        onRemoved(e: ComponentEvent) {
            console.log(e.type, e.target.name, e.currentTarget.name, e.data);
        }
    }

    class ComponentCustom extends Component {
        constructor() {
            super();
            this.name = "ComponentCustom";
        }
    }

    class ComponentInterface extends EventDispatcher implements IComponent {

        constructor() {
            super();
        }

        _name;
        /**
         * 组件列表
         */
        protected components: IComponent[];
        /**
         * 组件名称
         */
        name: string;
        /**
         * 子组件个数
         */
        numComponents: number;
        /**
         * 父组件
         */
        parentComponent: IComponent;
        /**
         * 添加组件
         * @param component 被添加组件
         */
        addComponent: (component: IComponent) => void;
        /**
         * 添加组件到指定位置
         * @param component		被添加的组件
         * @param index			插入的位置
         */
        addComponentAt: (component: IComponent, index: number) => void;
        /**
         * 移除组件
         * @param component 被移除组件
         */
        removeComponent: (component: IComponent) => void;
        /**
         * 移除组件
         * @param index		要删除的 Component 的子索引。
         */
        removeComponentAt: (index: number) => IComponent;
        /**
         * 获取组件在容器的索引位置
         * @param component			查询的组件
         * @return				    组件在容器的索引位置
         */
        getComponentIndex: (component: IComponent) => number;
        /**
         * 设置子组件的位置
         * @param component				子组件
         * @param index				位置索引
         */
        setComponentIndex: (component: IComponent, index: number) => void;
        /**
         * 获取指定位置索引的子组件
         * @param index			位置索引
         * @return				子组件
         */
        getComponentAt: (index: number) => IComponent;
        /**
         * 根据组件名称获取组件
         * <p>注意：此处比较的是name而非name</p>
         * @param name		组件名称
         * @return 					获取到的组件
         */
        getComponentByName: (name: String) => IComponent;
        /**
         * 获取与给出组件名称相同的所有组件
         * <p>注意：此处比较的是name而非name</p>
         * @param name		组件名称
         * @return 					获取到的组件
         */
        getComponentsByName: (name: String) => IComponent[];
        /**
         * 根据类定义获取组件
         * <p>如果存在多个则返回第一个</p>
         * @param cls				类定义
         * @return
         */
        getComponentByClass: <T extends Component>(cls: new (...args) => T) => T;
        /**
         * 根据类定义查找组件
         * @param cls		类定义
         * @return			返回与给出类定义一致的组件
         */
        getComponentsByClass: <T extends Component>(cls: new (...args) => T) => T[];
        /**
         * 根据类定义获取或创建组件
         * <p>当不存在该类型对象时创建一个该组件并且添加到容器中</p>
         * @param cls
         * @return
         */
        getOrCreateComponentByClass: <T extends Component>(cls: new (...args) => T) => T;
        /**
         * 判断是否拥有组件
         * @param com	被检测的组件
         * @return		true：拥有该组件；false：不拥有该组件。
         */
        hasComponent: (com: IComponent) => boolean;
        /**
         * 交换子组件位置
         * @param index1		第一个子组件的索引位置
         * @param index2		第二个子组件的索引位置
         */
        swapComponentsAt: (index1: number, index2: number) => void;
        /**
         * 交换子组件位置
         * @param a		第一个子组件
         * @param b		第二个子组件
         */
        swapComponents: (a: IComponent, b: IComponent) => void;
        /**
         * 派发子组件事件
         * <p>事件广播给子组件</p>
         * @param event
         */
        dispatchChildrenEvent: (event: Event) => void;
        /**
         * 派发移除子组件事件
         */
        private dispatchAddedEvent: (component) => void;
        /**
         * 派发移除子组件事件
         */
        private dispatchRemovedEvent: (component) => void;
    }
}

new feng3d.ComponentTest();