var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var feng3d;
(function (feng3d) {
    var ClassUtilsTest = (function () {
        function ClassUtilsTest() {
            this.init();
        }
        ClassUtilsTest.prototype.init = function () {
            this.testGetQualifiedClassName();
            this.testGetQualifiedSuperclassName();
        };
        ClassUtilsTest.prototype.testGetQualifiedClassName = function () {
            var className = feng3d.ClassUtils.getQualifiedClassName(feng3d.Event);
            console.assert(className == "feng3d.Event");
            var className = feng3d.ClassUtils.getQualifiedClassName(true);
            console.assert(className == "Boolean");
            var className = feng3d.ClassUtils.getQualifiedClassName(Boolean);
            console.assert(className == "Boolean");
            var className = feng3d.ClassUtils.getQualifiedClassName("1");
            console.assert(className == "String");
            var className = feng3d.ClassUtils.getQualifiedClassName(String);
            console.assert(className == "String");
            var className = feng3d.ClassUtils.getQualifiedClassName(123);
            console.assert(className == "Number");
            var className = feng3d.ClassUtils.getQualifiedClassName(Number);
            console.assert(className == "Number");
        };
        ClassUtilsTest.prototype.testGetQualifiedSuperclassName = function () {
            var className = feng3d.ClassUtils.getQualifiedSuperclassName(new ChildClassTest());
            console.assert(className == "feng3d.SuperClassTest");
            var className = feng3d.ClassUtils.getQualifiedSuperclassName(ChildClassTest);
            console.assert(className == "feng3d.SuperClassTest");
        };
        return ClassUtilsTest;
    }());
    feng3d.ClassUtilsTest = ClassUtilsTest;
    var SuperClassTest = (function () {
        function SuperClassTest() {
        }
        return SuperClassTest;
    }());
    feng3d.SuperClassTest = SuperClassTest;
    var ChildClassTest = (function (_super) {
        __extends(ChildClassTest, _super);
        function ChildClassTest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChildClassTest;
    }(SuperClassTest));
    feng3d.ChildClassTest = ChildClassTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var EulerTest = (function () {
        function EulerTest() {
            this.test();
        }
        EulerTest.prototype.test = function () {
            this.testRotate0();
            this.testRotate();
            this.testTransformRotation();
            this.testAppend();
            // this.testInvert();
            // this.testAppendInvert();
            // this.testMatrix3d();
            this.testMatrix3d1();
        };
        EulerTest.prototype.testRotate0 = function () {
            for (var i = 0; i < 100; i++) {
                var euler = new feng3d.Euler(0, 0, 0);
                var rotation = new feng3d.Vector3D(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                rotation.scaleBy(360);
                euler.rotate(feng3d.Vector3D.X_AXIS, rotation.x);
                euler.rotate(feng3d.Vector3D.Y_AXIS, rotation.y);
                euler.rotate(feng3d.Vector3D.Z_AXIS, rotation.z);
                console.assert(euler.equals(rotation, 0.01));
            }
        };
        EulerTest.prototype.testRotate = function () {
            var euler = new feng3d.Euler(0, 0, 0);
            var rotateMatrix3d = new feng3d.Matrix3D();
            for (var i = 0; i < 100; i++) {
                var axis = { x: Math.random(), y: Math.random(), z: Math.random() }, angle = Math.random() * 90;
                euler.rotate(axis, angle);
                rotateMatrix3d.appendRotation(axis, angle);
                var eulerMatrix3d = euler.toMatrix3D();
                console.assert(eulerMatrix3d.equals(rotateMatrix3d));
            }
        };
        EulerTest.prototype.testTransformRotation = function () {
            var rotation = { x: Math.random() * 360, y: Math.random() * 360, z: Math.random() * 360 };
            var euler = new feng3d.Euler(rotation);
            var rotateMatrix3d = feng3d.Matrix3D.fromRotation(rotation);
            for (var i = 0; i < 100; i++) {
                var randomRotation = { x: Math.random() * 360, y: Math.random() * 360, z: Math.random() * 360 };
                var resultRotation1 = new feng3d.Vector3D();
                var resultRotation2 = new feng3d.Vector3D();
                euler.transformRotation(randomRotation, resultRotation1);
                rotateMatrix3d.transformRotation(randomRotation, resultRotation2);
                console.assert(resultRotation1.equals(resultRotation2));
            }
        };
        EulerTest.prototype.testAppend = function () {
            var rotation = { x: Math.random() * 360, y: Math.random() * 360, z: Math.random() * 360 };
            var euler = new feng3d.Euler(rotation);
            var rotateMatrix3d = feng3d.Matrix3D.fromRotation(rotation);
            for (var i = 0; i < 100; i++) {
                var changeRotation = { x: Math.random() * 360, y: Math.random() * 360, z: Math.random() * 360 };
                euler.append(changeRotation);
                rotateMatrix3d.append(feng3d.Matrix3D.fromRotation(changeRotation));
                var eulerMatrix3d = euler.toMatrix3D();
                console.assert(eulerMatrix3d.equals(rotateMatrix3d));
            }
        };
        EulerTest.prototype.testInvert = function () {
            for (var i = 0; i < 100; i++) {
                var rotation = new feng3d.Vector3D(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                rotation.scaleBy(1000);
                var euler = new feng3d.Euler(0, 0, 0);
                euler.rotate(feng3d.Vector3D.X_AXIS, rotation.x);
                euler.rotate(feng3d.Vector3D.Y_AXIS, rotation.y);
                euler.rotate(feng3d.Vector3D.Z_AXIS, rotation.z);
                console.assert(euler.equals(rotation, 0.001));
                euler.rotate(feng3d.Vector3D.Z_AXIS, -rotation.z);
                euler.rotate(feng3d.Vector3D.Y_AXIS, -rotation.y);
                euler.rotate(feng3d.Vector3D.X_AXIS, -rotation.x);
                console.assert(euler.equals(new feng3d.Vector3D()));
                var euler1 = new feng3d.Euler();
                euler1.rotate(feng3d.Vector3D.X_AXIS, rotation.x);
                euler1.rotate(feng3d.Vector3D.Y_AXIS, rotation.y);
                euler1.rotate(feng3d.Vector3D.Z_AXIS, rotation.z);
                console.assert(euler1.equals(rotation, 0.001));
                var euler2 = new feng3d.Euler();
                euler2.rotate(feng3d.Vector3D.Z_AXIS, -rotation.z);
                euler2.rotate(feng3d.Vector3D.Y_AXIS, -rotation.y);
                euler2.rotate(feng3d.Vector3D.X_AXIS, -rotation.x);
                var mergeEuler = euler1.clone();
                mergeEuler.append(euler2);
                console.assert(mergeEuler.equals(new feng3d.Vector3D()));
                // euler.copyFrom(rotation);
                // var inverteuler = euler.clone();
                // inverteuler.invert();
                // var result = euler.clone();
                // result.append(inverteuler);
                // console.assert(result.equals(new Vector3D(), 0.0001));
                var euler = new feng3d.Euler(0, 0, 0);
                euler.append(new feng3d.Euler().rotate(feng3d.Vector3D.X_AXIS, rotation.x));
                var euler1 = new feng3d.Euler();
                euler1.append(new feng3d.Euler().rotate(feng3d.Vector3D.Y_AXIS, rotation.y));
                euler1.append(new feng3d.Euler().rotate(feng3d.Vector3D.Z_AXIS, rotation.z));
                euler.append(euler1);
                console.assert(euler.equals(rotation, 0.0001));
            }
        };
        EulerTest.prototype.testAppendInvert = function () {
            for (var i = 0; i < 100; i++) {
                var rotation = new feng3d.Vector3D(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                rotation.scaleBy(1000);
                // rotation.x = -204.35293458336056;
                // rotation.y = 53.6719294679584;
                // rotation.z = -108.44530012851261;
                var changeRotation = new feng3d.Vector3D(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                changeRotation.scaleBy(1000);
                // changeRotation.x = 0;
                // changeRotation.y = 0;
                // changeRotation.z = 0;
                // changeRotation.x = 0;
                // changeRotation.y = -343.32008752043055;
                // changeRotation.z = -326.93672932807874;
                var changeEuler = new feng3d.Euler(changeRotation);
                var euler = new feng3d.Euler(rotation);
                euler.append(changeEuler);
                euler.appendInvert(changeEuler);
                console.assert(euler.equals(rotation, 0.001));
                euler.appendInvert(euler);
                console.assert(euler.equals(new feng3d.Vector3D()));
            }
        };
        EulerTest.prototype.testMatrix3d = function () {
            for (var i = 0; i < 100; i++) {
                var rotation = new feng3d.Vector3D(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                rotation.scaleBy(1000);
                var scale = new feng3d.Vector3D(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                scale.scaleBy(1000);
                var rotationmatrix3d = feng3d.Matrix3D.fromRotation(rotation);
                var scalematrix3d = feng3d.Matrix3D.fromScale(scale);
                var matrix3d1 = scalematrix3d.clone().append(rotationmatrix3d);
                var matrix3d2 = rotationmatrix3d.clone().append(scalematrix3d);
                console.log(matrix3d1.decompose()[2]);
                console.log(matrix3d2.decompose()[2]);
                console.assert(matrix3d1.equals(matrix3d2));
            }
        };
        EulerTest.prototype.testMatrix3d1 = function () {
            for (var i = 0; i < 100; i++) {
                var rotation = new feng3d.Vector3D(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                rotation.scaleBy(1000);
                rotation.y = 90;
                var matrix3d1 = feng3d.Matrix3D.fromRotation(rotation);
                // var matrix3d2 = new Matrix3D();
                // matrix3d2.appendRotation(matrix3d2.up, rotation.y);
                // matrix3d2.appendRotation(matrix3d2.right, rotation.x);
                // matrix3d2.appendRotation(matrix3d2.forward, rotation.z);
                // console.assert(matrix3d1.equals(matrix3d2));
                // console.log(rotation, matrix3d1.decompose()[1].scaleBy(180 / Math.PI));
            }
        };
        return EulerTest;
    }());
    feng3d.EulerTest = EulerTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var ArrayListTest = (function () {
        function ArrayListTest() {
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
            this.testAddItemEventListener();
            this.testRemoveItemEventListener();
        }
        /**
         * 此集合中的项目数。
         */
        ArrayListTest.prototype.testLength = function () {
            var arr = [1, 2];
            var arrayList = new feng3d.ArrayList(arr);
            console.assert(arr.length == arrayList.length);
        };
        /**
         * 向列表末尾添加指定项目。
         */
        ArrayListTest.prototype.testAddItem = function () {
            var arr = [1, 2];
            var arrayList = new feng3d.ArrayList();
            arrayList.addItem(1);
            arrayList.addItem(arr);
            console.assert(arrayList.length == arr.length + 1);
        };
        /**
         * 在指定的索引处添加项目。
         */
        ArrayListTest.prototype.testAddItemAt = function () {
            var arrayList = new feng3d.ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++) {
                console.assert(arrayList.getItemAt(i) == i);
            }
        };
        /**
         * 获取指定索引处的项目。
         */
        ArrayListTest.prototype.testGetItemAt = function () {
            var arrayList = new feng3d.ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++) {
                console.assert(arrayList.getItemAt(i) == i);
            }
        };
        /**
         * 如果项目位于列表中（这样的话 getItemAt(index) == item），则返回该项目的索引。
         */
        ArrayListTest.prototype.testGetItemIndex = function () {
            var arrayList = new feng3d.ArrayList();
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arrayList.addItemAt(i, i);
            }
            for (var i = 0; i < 10; i++) {
                console.assert(arrayList.getItemIndex(i) == i);
            }
        };
        /**
         * 删除列表中的所有项目。
         */
        ArrayListTest.prototype.testRemoveAll = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr);
            console.assert(arr.length == arrayList.length);
            arrayList.removeAll();
            console.assert(0 == arrayList.length);
        };
        /**
         * 删除指定项目。
         */
        ArrayListTest.prototype.testRemoveItem = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr.concat());
            for (var i = 0; i < arr.length; i++) {
                var element = arr[i];
                arrayList.removeItem(element);
            }
            console.assert(0 == arrayList.length);
        };
        /**
         * 删除指定索引处的项目并返回该项目。
         */
        ArrayListTest.prototype.testRemoveItemAt = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr.concat());
            for (var i = arr.length - 1; i >= 0; i--) {
                arrayList.removeItemAt(i);
            }
            console.assert(0 == arrayList.length);
        };
        /**
         * 在指定的索引处放置项目。
         */
        ArrayListTest.prototype.testSetItemAt = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr.concat());
            for (var i = arr.length - 1; i >= 0; i--) {
                arrayList.setItemAt(0, i);
            }
            for (var i = arr.length - 1; i >= 0; i--) {
                console.assert(0 == arrayList.getItemAt(i));
            }
        };
        /**
         * 返回与 IList 实现的填充顺序相同的 Array。
         */
        ArrayListTest.prototype.testToArray = function () {
            var arr = [1, 2, 1, 4];
            var arrayList = new feng3d.ArrayList(arr.concat());
            var arr1 = arrayList.toArray();
            for (var i = arr.length - 1; i >= 0; i--) {
                console.assert(arr1[i] == arr[i]);
            }
        };
        /**
         * 添加项事件
         * @param type						事件的类型。
         * @param listener					处理事件的侦听器函数。
         * @param thisObject                listener函数作用域
         * @param priority					事件侦听器的优先级。数字越大，优先级越高。默认优先级为 0。
         */
        ArrayListTest.prototype.testAddItemEventListener = function () {
            var arrayList = new feng3d.ArrayList();
            var changeItem;
            arrayList.addItemEventListener("change", function (event) {
                changeItem = event.target;
            }, null);
            var eventDispatcher = {};
            arrayList.addItem(eventDispatcher);
            feng3d.Event.dispatch(eventDispatcher, "change");
            console.assert(eventDispatcher == changeItem);
        };
        /**
         * 移除项事件
         * @param type						事件的类型。
         * @param listener					要删除的侦听器对象。
         * @param thisObject                listener函数作用域
         */
        ArrayListTest.prototype.testRemoveItemEventListener = function () {
            var arrayList = new feng3d.ArrayList();
            var changeItem;
            var onChange = function (event) {
                changeItem = event.target;
            };
            arrayList.addItemEventListener("change", onChange, null);
            var eventDispatcher = {};
            arrayList.addItem(eventDispatcher);
            feng3d.Event.dispatch(eventDispatcher, "change");
            console.assert(eventDispatcher == changeItem);
            changeItem = null;
            arrayList.removeItemEventListener("change", onChange, null);
            feng3d.Event.dispatch(eventDispatcher, "change");
            console.assert(null === changeItem);
        };
        return ArrayListTest;
    }());
    feng3d.ArrayListTest = ArrayListTest;
})(feng3d || (feng3d = {}));
var feng3d;
(function (feng3d) {
    var UnitTest = (function () {
        function UnitTest() {
            console.log("\u6267\u884C\u5355\u5143\u6D4B\u8BD5");
            var start = Date.now();
            this.test();
            console.log("\u901A\u8FC7\u5355\u5143\u6D4B\u8BD5\uFF0C\u8017\u65F6" + (Date.now() - start) / 1000 + "s");
        }
        UnitTest.prototype.test = function () {
            this.testClass([
                feng3d.ArrayListTest,
                feng3d.ClassUtilsTest,
                feng3d.EulerTest,
            ]);
        };
        UnitTest.prototype.testClass = function (cls) {
            if (cls instanceof Array) {
                for (var i = 0; i < cls.length; i++) {
                    this.testClass(cls[i]);
                }
                return;
            }
            var classname = cls["name"];
            console.log("\u6267\u884C " + classname + " \u6D4B\u8BD5");
            var start = Date.now();
            new cls();
            console.log(classname + " \u6D4B\u8BD5\u901A\u8FC7\uFF0C\u8017\u65F6" + (Date.now() - start) / 1000 + "s");
        };
        return UnitTest;
    }());
    feng3d.UnitTest = UnitTest;
    new UnitTest();
})(feng3d || (feng3d = {}));
//# sourceMappingURL=unittest.js.map