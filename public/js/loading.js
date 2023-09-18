// 로딩 화면 1초간 지속
// const loading = document.querySelector('.loading');
// window.addEventListener('load', () => {
//   loading.style.display = 'none';
// });

// three.js 처리
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/addons/renderers/CSS2DRenderer.js';
import { escape } from 'mysql2';

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
myLight1 = new THREE.DirectionalLight(0xffffff, 1.3);
myLight1.position.set(0, 20, 30);
myScene.add(myLight1);

myLight2 = new THREE.AmbientLight(0xffffff, 1.3);
myLight2.position.set(0, 20, -10);
myScene.add(myLight2);
myScene.add(myCamera);

myScene.background = new THREE.Color('#FF52A2');

/*Obj load */
const ctrl = new OrbitControls(myCamera, myRenderer.domElement);
ctrl.update();

/*Mtl Load */
const mtlLoader = new MTLLoader();
mtlLoader.load('/obj/earth.mtl', function (materials) {
  materials.preload();
  objLoader(materials);
});

let earth = new THREE.Mesh();
earth = new THREE.Mesh();

function objLoader(materials) {
  objLoader = new OBJLoader();
  objLoader.setMaterials(materials);

  objLoader.load('/obj/earth.obj', function (loadedEarth) {
    earth = loadedEarth; //대입 추가

    earth.position.set(0, 10, 0);
    myScene.add(earth);
  });
}

// 함수 동작 관련
function animate() {
  let earthDirection = 1;
  earth.scale.x = earthDirection * 3;
  earth.scale.y = earthDirection * 3;
  earth.scale.z = earthDirection * 3;
  earth.rotation.z = 0.5;
  earth.rotation.y += 0.07;
  earth.position.x = 0;
  earth.position.y = 0;

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
