import { loader, Node3D, Scene, $set, View, $deserialize } from 'feng3d';

const view3D = new View();

loader.loadText('../../../scene/Untitled.scene.json').then((content) =>
{
    const json = JSON.parse(content);
    const sceneobject: Node3D = $deserialize(json);
    const scene = sceneobject.getComponent(Scene);

    view3D.scene = scene;
});
