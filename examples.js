loadjs([
  `libs/feng3d.js`,
], loadComplete);

function loadjs(path, onload, onerror)
{
  if (typeof path == "string")
  {
    var script = document.createElement('script');
    script.src = path;
    script.onload = (ev) =>
    {
      if (onload)
        onload(ev);
      else
      {
        console.log(`${path} 加载完成`);
      }
    }
    script.onerror = () =>
    {
      if (onerror)
        onerror();
      else
      {
        console.warn(`${path} 加载失败！`);
      }
    }
    document.head.appendChild(script);
  } else
  {
    if (path.length == 0)
    {
      onload();
    } else
    {
      loadjs(path.shift(), () =>
      {
        loadjs(path, onload, onerror);
      }, onerror);
    }
  }

}

function loadComplete()
{
  var type = GetQueryString("type");

  loadjs("out/" + type + ".js");

  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
  }
}

