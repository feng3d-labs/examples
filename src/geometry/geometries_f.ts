import { Camera, Color4, ColorUniforms, CubeGeometry, CullFace, CustomGeometry, Material, Matrix4x4, Object3D, PerspectiveLens, PlaneGeometry, PointLight, Renderable, Scene, serialization, SphereGeometry, Texture2D, TextureUniforms, TextureWrap, Vector3, View } from 'feng3d';

const scene = new Object3D().addComponent(Scene);

const camera = new Object3D().addComponent(Camera);
camera.lens = new PerspectiveLens(45, window.innerWidth / window.innerHeight, 1, 2000)
camera.object3D.y = 400;
scene.object3D.addChild(camera.object3D);

const pointLight = new Object3D().addComponent(PointLight);
pointLight.color.fromUnit(0xffffff);
pointLight.intensity = 0.8;
camera.object3D.addChild(pointLight.object3D);

const engine = new View(null, scene, camera);

const material = Material.create('texture', {
    s_texture: { source: { url: 'resources/textures/uv_grid_opengl.jpg' }, anisotropy: 16, wrapS: TextureWrap.REPEAT, wrapT: TextureWrap.REPEAT }
}, { cullFace: CullFace.NONE }
);

let object3D = new Object3D();
const model = object3D.addComponent(Renderable);
model.material = material;

model.geometry = new SphereGeometry({ radius: 75, segmentsW: 20, segmentsH: 10 });

object3D.position.set(- 300, 0, 200);
scene.object3D.addChild(object3D);

//变化旋转与颜色
setInterval(function ()
{
    const timer = Date.now() * 0.0001;

    camera.object3D.x = Math.cos(timer) * 800;
    camera.object3D.z = Math.sin(timer) * 800;

    camera.object3D.lookAt(Vector3.ZERO);
}, 15);
setInterval(function ()
{
    // colorUniforms.u_diffuseInput.fromUnit(Math.random() * (1 << 32 - 1));
}, 1000);
