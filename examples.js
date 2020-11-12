/// <reference path="../feng3d/out/feng3d.d.ts" />

window.onload = function ()
{
    var type = GetQueryString("type");

    var scene = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent("Scene")
    scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

    var camera = feng3d.serialization.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent("Camera");
    camera.transform.position = new feng3d.Vector3(0, 1, -10);
    scene.gameObject.addChild(camera.gameObject);

    var engine = new feng3d.View(null, scene, camera);
    scene.gameObject.addComponent("ScriptComponent").scriptName = type.split("/").pop();

    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    }
}

// xhrTsconfig("node_modules/feng3d/tsconfig.json", () =>
// {
//     xhrTsconfig("tsconfig.json", () =>
//     {
//         loadjs(result, loadComplete);
//     });
// });


function xhrTsconfig(url, callback)
{
    var ps = url.split("/");
    ps.pop();
    var root = ps.join("/");
    xhr(url, (xhr) =>
    {
        var obj = JSON.parse(xhr.responseText.split("\n").map(v =>
        {
            var index = v.indexOf("//");
            if (index > 0)
                v = v.substr(0, index);
            return v;
        }).join(""));
        if (obj.compilerOptions.outDir)
        {
            var files = obj.files.filter(v => v.indexOf(".d.ts") == -1);

            var sameStr = files[0];
            files.forEach(v => { sameStr = getSameStr(sameStr, v) });
            files = files.map(v => v.substr(sameStr.length).replace(".ts", ".js"));
            files.forEach(v =>
            {
                if (root.length == "")
                    result.push(obj.compilerOptions.outDir + "/" + v)
                else
                    result.push(root + "/" + obj.compilerOptions.outDir + "/" + v)
            });
        } else if (obj.compilerOptions.outFile)
        {
            if (root.length == "")
                result.push(obj.compilerOptions.outFile);
            else
                result.push(root + "/" + obj.compilerOptions.outFile);
        }
        callback && callback();
    });
}

function getSameStr(a, b)
{
    var len = Math.min(a.length, b.length);
    for (var i = 0; i < len; i++)
    {
        if (a.charAt(i) != b.charAt(i)) return a.substr(0, i);
    }
    return a.substr(0, len);
}

function xhr(url, complete, error)
{
    var req = new XMLHttpRequest();
    req.onreadystatechange = function ()
    {
        if (req.readyState === 4)
        {
            if ((req.status >= 200 && req.status < 300) || req.status === 1223)
            {
                complete(req);
            }
            else
            {
                error && error(req);
            }
            req.onreadystatechange = function () { };
        }
    };
    req.open("GET", url, true);
    req.responseType = "";
    req.send(null);
}