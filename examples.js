/// <reference path="libs/feng3d.d.ts" />

window.onload = function ()
{
  var type = GetQueryString("type");

  var scene = feng3d.GameObject.create("Untitled").addComponent(feng3d.Scene3D)
  scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

  var camera = feng3d.GameObject.create("Main Camera").addComponent(feng3d.Camera);
  camera.transform.position = new feng3d.Vector3(0, 1, -10);
  scene.gameObject.addChild(camera.gameObject);

  var engine = new feng3d.Engine(null, scene, camera);
  scene.gameObject.addComponent(feng3d.ScriptComponent).script = type.split("/").pop();

  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
  }
}