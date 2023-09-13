// 로딩 화면 3초간 지속
const loading = document.querySelector('.loading');
setTimeout(() => {
  loading.style.display = 'none';
}, 0);

// three.js 처리
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/addons/renderers/CSS2DRenderer.js';

/* Basic Setting*/
var myRenderer;
var myCamera;
var myScene;
var myLight1;
var myLight2;

//*renderer setting
myRenderer = new THREE.WebGL1Renderer();
let rd_w = window.innerWidth;
let rd_h = window.innerHeight;
myRenderer.setSize(rd_w, rd_h);
myRenderer.setViewport(0, 0, rd_w, rd_h);

loading.appendChild(myRenderer.domElement);

//*camera setting
myCamera = new THREE.PerspectiveCamera(45, rd_w / rd_h, 1, 500);
myCamera.position.set(0, 0, 12);
myCamera.up.set(0, 1, -10);
myCamera.lookAt(0, 0, 0);
//*scene setting
myScene = new THREE.Scene();
myLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
myLight1.position.set(0, 20, 30);
myScene.add(myLight1);

myLight2 = new THREE.AmbientLight(0xffffff, 0.9);
myLight2.position.set(0, 20, -10);
myScene.add(myLight2);
myScene.add(myCamera);

myScene.background = new THREE.Color('#070A52');

/*Obj load */
const ctrl = new OrbitControls(myCamera, myRenderer.domElement);
ctrl.update();

/*Mtl Load */
const mtlLoader = new MTLLoader();
mtlLoader.load('/obj/ufo.mtl', function (materials) {
  materials.preload();
  objLoader(materials);
});

let ufo = new THREE.Mesh();
ufo = new THREE.Mesh();

function objLoader(materials) {
  objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  // objLoader.setPath('./obj/');

  objLoader.load('/obj/ufo.obj', function (loadedUfo) {
    ufo = loadedUfo; //대입 추가

    ufo.position.set(0, -0.5, 0);
    myScene.add(ufo);
  });
}

// 글자
// const labelRenderer = new CSS2DRenderer();
// labelRenderer.setSize(rd_w, rd_h);
// labelRenderer.domElement.style.position = 'absolute';
// labelRenderer.domElement.style.top = '0px';
// labelRenderer.domElement.style.pointEvents = 'none';
// document.body.appendChild(labelRenderer.domElement);

// const h = document.createElement('h1');
// const hPointLabel = new CSS2DObject(h);
// hPointLabel.position.set(0, 2, 10);
// h.textContent = '로딩중...';
// h.style.color = '#eee';
// myScene.add(hPointLabel);

// 함수 동작 관련
function animate() {
  let ufoDirection = 1;
  ufo.scale.x = ufoDirection * 3;
  ufo.scale.y = ufoDirection * 3;
  ufo.scale.z = ufoDirection * 3;
  ufo.rotation.y += 0.1;
  ufo.position.x = 0;
  ufo.position.y = 0;

  requestAnimationFrame(animate);
  ctrl.update();
  myRenderer.render(myScene, myCamera);
  // labelRenderer.render(myScene, myCamera);
}

//*add resize event
function onResize() {
  //resize event는 변경되는 size 기준이기 때문에 rd_w, rd_h 변수 사용 x
  myCamera.aspect = window.innerWidth / window.innerHeight;
  myCamera.updateProjectionMatrix();
  myRenderer.setSize(window.innerWidth, window.innerHeight);
  // labelRenderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);
animate();
