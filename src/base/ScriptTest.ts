import { Camera, Color3, Color4, CubeGeometry, FogMode, MeshRenderer, Node3D, Scene, Script, Serializable, serialization, StandardMaterial, StandardUniforms, Texture2D, Vector3, View } from 'feng3d';

const scene = serialization.setValue(new Node3D(), { name: 'Untitled' }).addComponent(Scene);
scene.background = new Color4(0.408, 0.38, 0.357, 1.0);

const camera = serialization.setValue(new Node3D(), { name: 'Main Camera' }).addComponent(Camera);
camera.node3d.position = new Vector3(0, 1, -10);
scene.node3d.addChild(camera.node3d);

const engine = new View(null, scene, camera);

const sc = scene.node3d.addScript('ScriptDemo');

@Serializable('ScriptDemo')
class ScriptDemo extends Script
{
    cube: Node3D;

    init()
    {
        const cube = this.cube = new Node3D();
        cube.z = -7;
        this.node3d.addChild(cube);

        const model = cube.addComponent(MeshRenderer);
        model.geometry = serialization.setValue(new CubeGeometry(), { width: 1, height: 1, depth: 1, segmentsW: 1, segmentsH: 1, segmentsD: 1, tile6: false });
        // 材质
        const material = model.material = new StandardMaterial();
        const uniforms = <StandardUniforms>material.uniforms;
        uniforms.s_diffuse = new Texture2D();
        uniforms.s_diffuse.source = { url: '../../../m.png' };

        uniforms.u_fogMode = FogMode.LINEAR;
        uniforms.u_fogColor = new Color3(1, 1, 0);
        uniforms.u_fogMinDistance = 2;
        uniforms.u_fogMaxDistance = 3;
    }

    update()
    {
        this.cube.ry += 1;
        // log("this.cube.ry: " + this.cube.ry);
    }

    /**
     * 销毁
     */
    dispose()
    {
        this.cube.dispose();
        this.cube = null;
    }
}
