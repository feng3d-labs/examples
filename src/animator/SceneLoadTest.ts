import * as feng3d from 'feng3d';

var view3D = new feng3d.View();

feng3d.loader.loadText("../../../scene/Untitled.scene.json").then((content) =>
{
    var json = JSON.parse(content);
    var sceneobject: feng3d.Node3D = feng3d.serialization.deserialize(json);
    var scene = sceneobject.getComponent(feng3d.Scene);

    view3D.scene = scene;
});
