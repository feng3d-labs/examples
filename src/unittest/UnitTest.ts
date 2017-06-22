namespace feng3d
{
    export class UnitTest
    {
        constructor()
        {
            console.log(`执行单元测试`);
            var start = Date.now();
            this.test();
            console.log(`通过单元测试，耗时${(Date.now() - start) / 1000}s`);
        }

        test()
        {
            new ArrayListTest();
        }
    }
    new UnitTest();
}