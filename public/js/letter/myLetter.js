let myWidth = window.innerWidth;
const menuDiv = document.querySelector('.menuDiv');

// 로그인 여부 가져오기=> ejs 에서 처리하거나 js에서 처리 하기
// console.log(sessionStorage);
// try {
//   axios({
//     method: 'GET',
//     url: '/myletter',
//   }).then((res) => {
//     console.log('res.data', res.data);
//   });
// } catch (err) {
//   console.log('err', err);
// }

// 편지 위치 배치
const moon = document.querySelector('#moon');
const moonWidth = moon.style.width;
const moonHeight = moon.style.height;
const letterDiv = document.querySelector('.letterDiv');

console.log('moon width', moonWidth);
console.log('moon height', moonHeight);

// 편지 추가하기 => 편지 개수만큼 for문 돌려 정해진 위치 배치
