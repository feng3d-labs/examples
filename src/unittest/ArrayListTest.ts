namespace feng3d
{
    export class ArrayListTest
    {
        constructor()
        {
            this.testLength();
            this.testAddItem();
            this.testAddItemAt();
            this.testGetItemAt();
            this.testGetItemIndex();
            this.testRemoveAll();
            this.testRemoveItem();
            this.testRemoveItemAt();
            this.testSetItemAt();
            this.testToArray();
        }

        /**
         * 此集合中的项目数。
         */
        testLength()
        {
            var arr = [1, 2];
            var arrayList = new ArrayList(arr);
            assert(arr.length == arrayList.length);
        }

        /**
         * 向列表末尾添加指定项目。
         */
        testAddItem(): void
        {
            var arr = [1, 2];
            var arrayList = new ArrayList();
            arrayList.addItem(1);
            arrayList.addItem(arr);
            assert(arrayList.length == arr.length + 1);
        }

        /**
         * 在指定的索引处添加项目。
         */
        testAddItemAt(): void
        {
            var arrayList = new ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++)
            {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++)
            {
                assert(arrayList.getItemAt(i) == i);
            }
        }

        /**
         * 获取指定索引处的项目。
         */
        testGetItemAt()
        {
            var arrayList = new ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++)
            {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++)
            {
                assert(arrayList.getItemAt(i) == i);
            }
        }

        /**
         * 如果项目位于列表中（这样的话 getItemAt(index) == item），则返回该项目的索引。
         */
        testGetItemIndex()
        {
            var arrayList = new ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++)
            {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++)
            {
                assert(arrayList.getItemIndex(i) == i);
            }
        }

        /**
         * 删除列表中的所有项目。
         */
        testRemoveAll(): void
        {
            var arr = [1, 2, 1, 4];
            var arrayList = new ArrayList(arr);
            assert(arr.length == arrayList.length);
            arrayList.removeAll();
            assert(0 == arrayList.length);
        }

        /**
         * 删除指定项目。
         */
        testRemoveItem(): void
        {
            var arr = [1, 2, 1, 4];
            var arrayList = new ArrayList(arr);
            for (var i = 0; i < arr.length; i++)
            {
                var element = arr[i];
                arrayList.removeItem(element);
            }
            assert(0 == arrayList.length);
        }

        /**
         * 删除指定索引处的项目并返回该项目。
         */
        testRemoveItemAt()
        {
            var arr = [1, 2, 1, 4];
            var arrayList = new ArrayList(arr);
            for (var i = arr.length - 1; i >= 0; i--)
            {
                arrayList.removeItemAt(i);
            }
            assert(0 == arrayList.length);
        }

        /**
         * 在指定的索引处放置项目。
         */
        testSetItemAt()
        {
            var arr = [1, 2, 1, 4];
            var arrayList = new ArrayList(arr);
            for (var i = arr.length - 1; i >= 0; i--)
            {
                arrayList.setItemAt(0, i);
            }
            for (var i = arr.length - 1; i >= 0; i--)
            {
                assert(0 == arrayList.getItemAt(i));
            }
        }

        /**
         * 返回与 IList 实现的填充顺序相同的 Array。
         */
        testToArray()
        {
            var arr = [1, 2, 1, 4];
            var arrayList = new ArrayList(arr);
            var arr1 = arrayList.toArray();
            for (var i = arr.length - 1; i >= 0; i--)
            {
                assert(arr1[i] == arr[i]);
            }
        }

        /**
         * 添加项事件
         * @param type						事件的类型。
         * @param listener					处理事件的侦听器函数。
         * @param thisObject                listener函数作用域
         * @param priority					事件侦听器的优先级。数字越大，优先级越高。默认优先级为 0。
         */
        addItemEventListener()
        {

        }

        // /**
        //  * 移除项事件
        //  * @param type						事件的类型。
        //  * @param listener					要删除的侦听器对象。
        //  * @param thisObject                listener函数作用域
        //  */
        // removeItemEventListener(type: string, listener: (event: Event) => void, thisObject: any): void
        // {
        //     this._eventDispatcher.removeEventListener(type, listener, thisObject);
        //     for (var i = 0; i < this._source.length; i++)
        //     {
        //         var item: EventDispatcher = <any>this._source[i]
        //         if (item instanceof EventDispatcher)
        //         {
        //             item.removeEventListener(type, listener, thisObject);
        //         }
        //     }
        // }
    }
}