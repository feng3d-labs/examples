var editor
var jsCtrl, select, type;
function init() {

    jsCtrl = document.getElementById("jsCtrl");
    select = document.getElementById("select");
    type = GetQueryString("type");
    type = type || "PrimitiveTest";
    select.value = type;
    new feng3d[type]();
    document.onkeyup = function (e) {
        var keycode = e.which;
        if (keycode == 37) {
            if (select.selectedIndex > 0)
                select.selectedIndex--;
            else
                select.selectedIndex = select.options.length - 1;
        }
        else if (keycode == 39) {
            if (select.selectedIndex < select.options.length - 1)
                select.selectedIndex++;
            else
                select.selectedIndex = 0;
        }
        selectChanged();
    }
}
function selectChanged() {
    if (type != select.value) {
        window.location.href = window.location.pathname + "?type=" + select.value;
    }
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
}