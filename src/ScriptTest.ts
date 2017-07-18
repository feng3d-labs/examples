namespace feng3d
{
    export class ScriptTest
    {
        constructor()
        {
            this.init();
        }

        init()
        {

            var view3D = new View3D();
            var gameObject = view3D.scene.gameObject;

            Event.on(input, <any>inputType.KEY_UP, (e) =>
            {
                // var inputEvent: InputEvent = e.data;
                // inputEvent.keyCode

                new Loader().loadText("../scripts/out/ScriptDemo.js" + `?version=${Math.random()}`, (content) =>
                {
                    var scripts = gameObject.getComponents(Script);
                    while (scripts.length > 0)
                    {
                        var script = scripts.shift();
                        script.enabled = false;
                        gameObject.removeComponent(script);
                    }

                    var reg = /(feng3d.(\w+)) = (\w+);/;
                    var result = content.match(reg);
                    var classPath = result[1];

                    var windowEval = eval.bind(window);
                    windowEval(content);

                    var componentClass = windowEval(classPath);
                    var scriptDemo: Script = gameObject.addComponent(componentClass);
                    scriptDemo.enabled = true;
                });
            })
            input
        }
    }
}