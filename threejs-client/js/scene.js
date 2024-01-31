import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { updateLocation, room, player } from "./colyseus_client";

// Set up the scene
const scene = new THREE.Scene();

// Set up the came
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = -5.5;
camera.position.y = 3;
camera.position.z = -3;

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

//for better resolutions
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 5 : 1); // Adjust according to device pixel ratio

document.body.appendChild(renderer.domElement);

// Load the 3D environment model
const loader = new GLTFLoader();
loader.load("/res/3d_gallery.glb", function (gltf) {
  scene.add(gltf.scene);
});

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light from one direction
directionalLight.position.set(1, 1, 1).normalize();
scene.add(ambientLight);
scene.add(directionalLight);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Add keyboard controls to move the avatar
const keys = { W: 87, A: 65, S: 83, D: 68 };
const moveSpeed = 0.3;
const onKeyDown = (event) => {
  if (!player) return; // Ensure player is loaded before moving
  let tempX = player.x;
  let tempZ = player.z;

  switch (event.keyCode) {
    case keys.W:
      tempX += moveSpeed;
      updateLocation({ x: tempX, y: player.y, z: player.z });
      break;
    case keys.A:
      tempZ -= moveSpeed;
      updateLocation({ x: player.x, y: player.y, z: tempZ });
      break;
    case keys.S:
      tempX -= moveSpeed;
      updateLocation({ x: tempX, y: player.y, z: player.z });
      break;
    case keys.D:
      tempZ += moveSpeed;
      updateLocation({ x: player.x, y: player.y, z: tempZ });
      break;
  }
};

//Event Listening
document.addEventListener("keydown", onKeyDown, false);
window.addEventListener("resize", onWindowResize, false);

// Responsive rendering
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

animate();

export { scene };
