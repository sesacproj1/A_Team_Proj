// 로딩 화면
const loading = document.querySelector('.loading');

// setTimeout(() => {
//   loading.style.display = 'none';
// }, 3000);

// 쿠키 굽기
function setCookie(name, value, expireTime) {
  let today = new Date();
 
  today.setHours(today.getHours() + expireTime);
  document.cookie =
    name + '=' + escape(value) + ';expires=' + today.toGMTString();
}

function getCookie(name) {
  let cookie = document.cookie;
  
  if (document.cookie != '') {
    //있으면
    let cookieArr = cookie.split('; ');
    

    for (let idx in cookieArr) {
      let cookieName = cookieArr[idx].split('=');
      if (cookieName[0] == 'bensCookie2') {
        return cookieName[1];
      }
    }
  }
  return;
}

let checkCookie = getCookie('bensCookie2');
setCookie('bensCookie2', 'end', 1);

if (checkCookie == 'end') {
  loading.style.display = 'none';
} else {
  setTimeout(() => {
    loading.style.display = 'none';
  }, 3000);
}

///////////////////////////////////////////////
// three.js 처리
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

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

myScene.background = new THREE.Color('#DDF7E3');

/*Obj load */
const ctrl = new OrbitControls(myCamera, myRenderer.domElement);
ctrl.update();

/*Mtl Load */
const mtlLoader = new MTLLoader();
mtlLoader.load('/obj/skewers2.mtl', function (materials) {
  materials.preload();
  objLoader(materials, 'skewers2');
});
mtlLoader.load('/obj/rabbit.mtl', function (materials) {
  materials.preload();
  objLoader(materials, 'rabbit');
});

let skewers = new THREE.Mesh();
let rabbit = new THREE.Mesh();

function objLoader(materials, modelName) {
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);

  objLoader.load(`/obj/${modelName}.obj`, function (loadedModel) {
    switch (modelName) {
      case 'skewers2':
        skewers = loadedModel;
        myScene.add(skewers);
        break;
      case 'rabbit':
        rabbit = loadedModel;
        myScene.add(rabbit);
        break;
    }
  });
}

let step = 0;

// 함수 동작 관련
function animate() {
  let rotateDirection = 1;
  skewers.scale.x = rotateDirection * 2;
  skewers.scale.y = rotateDirection * 2;
  skewers.scale.z = rotateDirection * 2;

  skewers.rotation.z = 0.5;
  skewers.rotation.y += 0.07;

  skewers.position.x = 0;
  skewers.position.y = -0.7;
  skewers.position.z = 4;

  // rabbit
  rabbit.position.set(-0.5, 0, -2);
  step += 0.06;
  rabbit.scale.x = rotateDirection * 2.2;
  rabbit.scale.y = rotateDirection * 2.2;
  rabbit.scale.z = rotateDirection * 2.2;
  rabbit.position.y = 2.3 * Math.abs(Math.sin(step));
  rabbit.position.z += step;

  if (rabbit.position.z >= 4) {
    rabbit.scale.x = rotateDirection * 3;
    rabbit.scale.y = rotateDirection * 3;
    rabbit.scale.z = rotateDirection * 3;
    rabbit.position.y = -1;
    rabbit.position.z = 4;
    rabbit.rotation.y += 0.07;

    skewers.scale.x = 0;
    skewers.scale.y = 0;
    skewers.rotation.y = 0;
  }
  requestAnimationFrame(animate);
  ctrl.update();
  myRenderer.render(myScene, myCamera);
  // labelRenderer.render(myScene, myCamera);
}

//resize event
function onResize() {
  myCamera.aspect = window.innerWidth / window.innerHeight;
  myCamera.updateProjectionMatrix();
  myRenderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);
animate();
