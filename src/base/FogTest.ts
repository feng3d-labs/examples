import * as feng3d from 'feng3d';

var scene = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Untitled" }).addComponent(feng3d.Scene)
scene.background = new feng3d.Color4(0.408, 0.38, 0.357, 1.0);

var camera = feng3d.serialization.setValue(new feng3d.Object3D(), { name: "Main Camera" }).addComponent(feng3d.Camera);
camera.object3D.position = new feng3d.Vector3(0, 1, -10);
scene.object3D.addChild(camera.object3D);

var engine = new feng3d.View(null, scene, camera);

var cube = new feng3d.Object3D();
cube.z = -7;
cube.y = 0;
scene.object3D.addChild(cube);

var model = cube.addComponent(feng3d.Renderable);
model.geometry = feng3d.serialization.setValue(new feng3d.CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
//材质
var material = model.material = feng3d.serialization.setValue(new feng3d.Material(), {
    uniforms: {
        s_diffuse: {
            __class__: "Texture2D",
            source: { url: 'resources/m.png' }
        },
        u_fogMode: feng3d.FogMode.LINEAR,
        u_fogColor: new feng3d.Color3(1, 1, 0),
        u_fogMinDistance: 2,
        u_fogMaxDistance: 3,
    }
});


feng3d.ticker.onframe(() =>
{
    cube.ry += 1;
});
