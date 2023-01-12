import { $deserialize, loader, Node3D } from 'feng3d';

const root = new Node3D();
root.addComponent('WebGLRenderer3D');

loader.loadText('../../../scene/Untitled.scene.json').then((content) =>
{
    const json = JSON.parse(content);
    const sceneobject: Node3D = $deserialize(json);
    root.addChild(sceneobject);
});
