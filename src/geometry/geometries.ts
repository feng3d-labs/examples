import { Camera, CircleGeometry, CubeGeometry, CylinderGeometry, IcosahedronGeometry, LatheGeometry, Material, Object3D, OctahedronGeometry, PerspectiveLens, PlaneGeometry, PointLight, Renderable, RingGeometry, Scene, SphereGeometry, TetrahedronGeometry, TextureWrap, TorusGeometry, TorusKnotGeometry, Vector2, Vector3, View } from 'feng3d';

const scene = new Object3D().addComponent(Scene);

const camera = new Object3D().addComponent(Camera);
camera.lens = new PerspectiveLens(45, window.innerWidth / window.innerHeight, 1, 2000)
camera.object3D.y = 400;
scene.object3D.addChild(camera.object3D);

const container = new Object3D();
scene.object3D.addChild(container);

const pointLight = new Object3D().addComponent(PointLight);
pointLight.color.fromUnit(0xffffff);
pointLight.intensity = 0.8;
camera.object3D.addChild(pointLight.object3D);

const engine = new View(null, scene, camera);

const material = Material.create('standard', {
    s_diffuse: {
        source: { url: 'resources/textures/uv_grid_opengl.jpg' },
        anisotropy: 16,
        wrapS: TextureWrap.REPEAT, wrapT: TextureWrap.REPEAT
    }
}, { cullFace: 'NONE' }
);

// const material = Material.create('meshPhong', {
//     map: {
//         source: { url: 'resources/textures/uv_grid_opengl.jpg' },
//         anisotropy: 16,
//         minFilter: 'LINEAR_MIPMAP_LINEAR',
//         wrapS: TextureWrap.REPEAT,
//         wrapT: TextureWrap.REPEAT
//     }
// }, { cullFace: 'NONE' }
// );

let object3D: Object3D;
let model: Renderable;

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new SphereGeometry({ radius: 75, segmentsW: 20, segmentsH: 10 });
object3D.position.set(-300, 0, 200);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new IcosahedronGeometry({ radius: 75, detail: 0 });
object3D.position.set(-100, 0, 200);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new OctahedronGeometry({ radius: 75, detail: 0 });
object3D.position.set(100, 0, 200);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new TetrahedronGeometry({ radius: 75, detail: 0 });
object3D.position.set(300, 0, 200);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new PlaneGeometry({ width: 100, height: 100, segmentsW: 1, segmentsH: 1 });
object3D.position.set(-300, 0, 0);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new CubeGeometry({ width: 100, height: 100, depth: 100, segmentsW: 4, segmentsH: 4, segmentsD: 4 });
object3D.position.set(-100, 0, 0);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new CircleGeometry({ radius: 50, segments: 20, thetaStart: 0, thetaLength: Math.PI * 2 });
object3D.position.set(100, 0, 0);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new RingGeometry({ innerRadius: 10, outerRadius: 50, thetaSegments: 20, phiSegments: 5, thetaStart: 0, thetaLength: Math.PI * 2 });
object3D.position.set(300, 0, 0);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new CylinderGeometry({ topRadius: 25, bottomRadius: 75, height: 100, segmentsW: 40, segmentsH: 5 });
object3D.position.set(-300, 0, -200);
container.addChild(object3D);

const points: Vector2[] = [];

for (let i = 0; i < 50; i++)
{
    points.push(new Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
}

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new LatheGeometry({ points: points, segments: 20 });
object3D.position.set(- 100, 0, - 200);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new TorusGeometry({ radius: 50, tubeRadius: 20, segmentsR: 20, segmentsT: 20 });
object3D.position.set(100, 0, - 200);
container.addChild(object3D);

object3D = new Object3D();
model = object3D.addComponent(Renderable);
model.material = material;
model.geometry = new TorusKnotGeometry({ radius: 50, tube: 10, tubularSegments: 50, radialSegments: 20 });
object3D.position.set(300, 0, - 200);
container.addChild(object3D);

//变化旋转与颜色
setInterval(function ()
{
    const timer = Date.now() * 0.0001;

    camera.object3D.x = Math.cos(timer) * 800;
    camera.object3D.z = Math.sin(timer) * 800;

    camera.object3D.lookAt(Vector3.ZERO);

    container.children.forEach(child =>
    {
        child.rx = timer * 5 * 180 / Math.PI;
        child.ry = timer * 2.5 * 180 / Math.PI;
    });
}, 15);
