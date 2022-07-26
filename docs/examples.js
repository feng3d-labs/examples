/// <reference path="../feng3d/out/feng3d.d.ts" />

window.onload = function ()
{
    var type = GetQueryString("type");

    const script = document.createElement('script');
    script.src = `out/${type}.js`;
    document.body.appendChild(script);

    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    }
}