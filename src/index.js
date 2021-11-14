import './style/main.css'
import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Environnements
 */
// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const gridCointainerWidth = 16
const gridCointainerHeight = 16
const gridColumns = 6
const gridRows = 6
let currentRow = 0;
const gridGroup = new THREE.Group();
const interfaceGroup = new THREE.Group();

// Test
for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridColumns; j++) {
        if (j % 4 == 0) {
            currentRow++;
        }
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, .25),
            new THREE.MeshPhongMaterial({ color: 'cyan' })
        )

        cube.position.x = -gridColumns + i * 2
        cube.position.y = gridRows - j * 2
        gridGroup.add(cube)
        console.log('cube ' + currentRow)

    }
}
// const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 0.25), new THREE.MeshNormalMaterial())
// cube.position.set(-4, 4 , 0)
// gridGroup.add(cube)
				const dirLight1 = new THREE.DirectionalLight( 0xffffff );
				dirLight1.position.set( 1, 1, 1 );
				scene.add( dirLight1 );
// Plane
const geometry = new THREE.PlaneGeometry( gridCointainerWidth, gridCointainerHeight );
const material = new THREE.MeshBasicMaterial( {color: '#FF69B4', side: THREE.DoubleSide} );
const plane = new THREE.Mesh(geometry, material);

interfaceGroup.add(plane);
gridGroup.position.set(1, -1, 0.1)
interfaceGroup.add(gridGroup);
scene.add(interfaceGroup);

interfaceGroup.rotation.x = -1

const canvas = document.querySelector('canvas.webgl');

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const controls = new TrackballControls(camera, canvas);
controls.noRoll = true;
controls.noRotate = true;
controls.mouseButtons = {
    LEFT: THREE.MOUSE.RIGHT,
    MIDDLE: THREE.MOUSE.MIDDLE,
    RIGHT: THREE.MOUSE.LEFT
}

// controls.enableDamping = true;


/**
 * Loop
 */
const loop = () =>
{
    // Update
    // cube.rotation.y += 0.01

    // Render
    renderer.render(scene, camera)
    controls.update();
    // Keep looping
    window.requestAnimationFrame(loop)
}

loop()
