let myWidth = window.innerWidth;
const menuDiv = document.querySelector('.menuDiv');

// 1. 편지 보여주기 & 편지함 주인 표시 : showPost 에 letterNo, postNo 뭐로 날리지
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

// 2. 프로필 사진 값 가져와 src 변경 : 음....
// 3. 로그인 한 사람만 친구 신청 보이기 : isLogin으로 가져오기
// 4. 친구 신청 날리기 : 음....
// 5. 페이징 : 편지 작성 테이블에서 가져오기
// - 편지 위치 배치
// - 편지 추가하기 => 편지 개수만큼 for문 돌려 정해진 위치 배치
// - 편지 있으면 추가하고 없애면 안 넣는거 어떻게 할까.... => div 안에 innerHTML로 이미지 넣자
// - 위치를 css말고 여기서 html로 정해야하나

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
      //url: `/MyLetter?letterNo=${}?postNo=${}/likes`,
    }).then((res) => {
      console.log('likesNum ', res);
      likesNum.innerText = likesNum + 1;
    });
  } catch (err) {
    console.log('Err', err);
  }
}
