/// <reference path="../feng3d/out/feng3d.d.ts" />

window.onload = function ()
{
  var type = GetQueryString("type");

  var scene = Object.setValue(new feng3d.GameObject(), { name: "Untitled" }).addComponent(feng3d.Scene3D)
  scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

  var camera = Object.setValue(new feng3d.GameObject(), { name: "Main Camera" }).addComponent(feng3d.Camera);
  camera.transform.position = new feng3d.Vector3(0, 1, -10);
  scene.gameObject.addChild(camera.gameObject);

  var engine = new feng3d.Engine(null, scene, camera);
  scene.gameObject.addComponent(feng3d.ScriptComponent).scriptName = type.split("/").pop();

  function GetQueryString(name)
  {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
  }
}