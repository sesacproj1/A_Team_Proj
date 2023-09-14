let myWidth = window.innerWidth;
const menuDiv = document.querySelector('.menuDiv');

// 1. 편지 보여주기 & 편지함 주인 표시
const letterModal = document.getElementById('letterModal');
letterModal.addEventListener('show.bs.modal', (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget;
  // Update the modal's content.
  const modalTitle = letterModal.querySelector('.modal-title');
  const modalBodyInput = letterModal.querySelector('.modal-body input');

  modalTitle.textContent = `내가 받은 송편지`;
  //   modalBodyInput.value = recipient; 데이터 가져오기
  showLetter();
});

function showLetter() {
  try {
    axios({
      method: 'GET',
      url: '/MyLetter/:letterNo/:postNo',
    }).then((res) => {
      console.log(res);
    });
  } catch (err) {
    console.log('Err', err);
  }
}

// 2. 프로필 사진 값 가져와 src 변경
// 3. 로그인 한 사람만 친구 신청 보이기
// 4. 친구 신청 날리기
// 5. 페이징
// - 편지 위치 배치
// - 편지 추가하기 => 편지 개수만큼 for문 돌려 정해진 위치 배치

const moon = document.querySelector('#moon');
const moonWidth = moon.style.width;
const moonHeight = moon.style.height;
const letterDiv = document.querySelector('.letterDiv');

console.log('moon width', moonWidth);
console.log('moon height', moonHeight);
// 6. 좋아요 처리
const btnLike = document.querySelector('.btnLike');
const likeHeart = document.querySelector('#likeHeart');
const likesNum = document.querySelector('.likesNum');
btnLike.addEventListener('click', like);

function like() {
  likeHeart.src = '/img/header/heart2.png';

  try {
    axios({
      method: 'GET',
      url: '/MyLetter/:letterNo/:postNo/likes',
      params: { letterNo: 1, postNo: 1 },
    }).then((res) => {
      console.log('likesNum ', res);
      likesNum.innerText = likesNum + 1;
    });
  } catch (err) {
    console.log('Err', err);
  }
}
