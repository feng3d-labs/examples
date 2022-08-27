window.onload = function ()
{
    var type = GetQueryString("type");

    const script = document.createElement('script');
    script.type = 'module';
    script.src = `src/${type}.ts`;
    document.body.appendChild(script);

    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
        return null;
    }
}