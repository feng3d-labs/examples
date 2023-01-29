import { CircleGeometry, CubeGeometry, CylinderGeometry, IcosahedronGeometry, LatheGeometry, Mesh3D, Node3D, OctahedronGeometry, PlaneGeometry, RingGeometry, SphereGeometry, StandardMaterial, TetrahedronGeometry, TorusGeometry, TorusKnotGeometry, Vector2, Vector3 } from 'feng3d';

const root = new Node3D();
root.addComponent('WebGLRenderer3D');

const scene = root.addComponent('Scene3D');

const camera = new Node3D().addComponent('PerspectiveCamera3D', {
    fov: 45,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
    far: 2000,
});
camera.node3d.y = 400;
scene.node3d.addChild(camera.node3d);

const container = new Node3D();
scene.node3d.addChild(container);

const pointLight = new Node3D().addComponent('PointLight3D');
pointLight.color.fromUnit(0xffffff);
pointLight.intensity = 0.8;
camera.node3d.addChild(pointLight.node3d);

const material = new StandardMaterial().init({
    uniforms: {
        s_diffuse: {
            source: { url: '../../../textures/uv_grid_opengl.jpg' },
            anisotropy: 16,
            wrapS: 'REPEAT', wrapT: 'REPEAT'
        }
    }, renderParams: { cullFace: 'NONE' }
}
);

// const material = Material.create('meshPhong', {
//     map: {
//         source: { url: '../../../textures/uv_grid_opengl.jpg' },
//         anisotropy: 16,
//         minFilter: 'LINEAR_MIPMAP_LINEAR',
//         wrapS: 'REPEAT',
//         wrapT: 'REPEAT'
//     }
// }, { cullFace: 'NONE' }
// );

let node3d: Node3D;
let model: Mesh3D;

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new SphereGeometry({ radius: 75, segmentsW: 20, segmentsH: 10 });
node3d.position.set(-300, 0, 200);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new IcosahedronGeometry({ radius: 75, detail: 0 });
node3d.position.set(-100, 0, 200);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new OctahedronGeometry({ radius: 75, detail: 0 });
node3d.position.set(100, 0, 200);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new TetrahedronGeometry({ radius: 75, detail: 0 });
node3d.position.set(300, 0, 200);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new PlaneGeometry({ width: 100, height: 100, segmentsW: 1, segmentsH: 1 });
node3d.position.set(-300, 0, 0);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new CubeGeometry({ width: 100, height: 100, depth: 100, segmentsW: 4, segmentsH: 4, segmentsD: 4 });
node3d.position.set(-100, 0, 0);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new CircleGeometry({ radius: 50, segments: 20, thetaStart: 0, thetaLength: Math.PI * 2 });
node3d.position.set(100, 0, 0);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new RingGeometry({ innerRadius: 10, outerRadius: 50, thetaSegments: 20, phiSegments: 5, thetaStart: 0, thetaLength: Math.PI * 2 });
node3d.position.set(300, 0, 0);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new CylinderGeometry({ topRadius: 25, bottomRadius: 75, height: 100, segmentsW: 40, segmentsH: 5 });
node3d.position.set(-300, 0, -200);
container.addChild(node3d);

const points: Vector2[] = [];

for (let i = 0; i < 50; i++)
{
    points.push(new Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
}

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new LatheGeometry({ points, segments: 20 });
node3d.position.set(-100, 0, -200);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new TorusGeometry({ radius: 50, tubeRadius: 20, segmentsR: 20, segmentsT: 20 });
node3d.position.set(100, 0, -200);
container.addChild(node3d);

node3d = new Node3D();
model = node3d.addComponent('Mesh3D');
model.material = material;
model.geometry = new TorusKnotGeometry({ radius: 50, tube: 10, tubularSegments: 50, radialSegments: 20 });
node3d.position.set(300, 0, -200);
container.addChild(node3d);

// 变化旋转与颜色
setInterval(function ()
{
    const timer = Date.now() * 0.0001;

    camera.node3d.x = Math.cos(timer) * 800;
    camera.node3d.z = Math.sin(timer) * 800;

    camera.node3d.lookAt(Vector3.ZERO);

    container.children.forEach((child) =>
    {
        child.rx = timer * 5 * 180 / Math.PI;
        child.ry = timer * 2.5 * 180 / Math.PI;
    });
}, 15);
