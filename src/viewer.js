import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const host = document.querySelector("#viewer");
const loading = document.querySelector("#loading");
const errorBox = document.querySelector("#error");
const errorMessage = document.querySelector("#error-message");
const resetButton = document.querySelector("#reset");
const spinButton = document.querySelector("#spin");

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0, 1.25, 4.2);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
host.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x5b496f, 2.1));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
keyLight.position.set(3, 5, 4);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xc5a7ff, 1.4);
rimLight.position.set(-4, 2, -3);
scene.add(rimLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = false;
controls.minDistance = 1.5;
controls.maxDistance = 7;
controls.target.set(0, 1, 0);

let model = null;
let autoRotate = false;
const loader = new GLTFLoader();

function fitCamera(object) {
  const bounds = new THREE.Box3().setFromObject(object);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  if (!Number.isFinite(maxDim) || maxDim <= 0) return;
  object.position.x -= center.x;
  object.position.y -= bounds.min.y;
  object.position.z -= center.z;
  const distance = maxDim * 1.65;
  camera.position.set(0, maxDim * 0.62, distance);
  camera.near = Math.max(0.01, maxDim / 100);
  camera.far = maxDim * 100;
  camera.updateProjectionMatrix();
  controls.target.set(0, maxDim * 0.48, 0);
  controls.update();
}

loader.load(
  "./assets/models/phoebe.glb",
  (gltf) => {
    model = gltf.scene;
    model.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.frustumCulled = true;
        if (node.material) node.material.side = THREE.DoubleSide;
      }
    });
    scene.add(model);
    fitCamera(model);
    loading.classList.add("hidden");
  },
  undefined,
  (err) => {
    console.error("Phoebe model load error:", err);
    loading.classList.add("hidden");
    errorBox.classList.remove("hidden");
    errorMessage.textContent = "Could not load assets/models/phoebe.glb. Check the filename and open this project through GitHub Pages or a local web server.";
  }
);

function resize() {
  const width = host.clientWidth;
  const height = host.clientHeight;
  if (!width || !height) return;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
const observer = new ResizeObserver(resize);
observer.observe(host);
resize();

resetButton.addEventListener("click", () => {
  if (model) fitCamera(model);
});
spinButton.addEventListener("click", () => {
  autoRotate = !autoRotate;
  controls.autoRotate = autoRotate;
  spinButton.textContent = `Auto rotate: ${autoRotate ? "on" : "off"}`;
  spinButton.setAttribute("aria-pressed", String(autoRotate));
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
