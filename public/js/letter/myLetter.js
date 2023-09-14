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

// 2. 좋아요 처리
const btnLike = document.querySelector('.btnLike');
const likeHeart = document.querySelector('#likeHeart');
const likesNum = document.querySelector('.likesNum');
btnLike.addEventListener('click', like);

// function like() {
//   likeHeart.src = '/img/header/heart2.png';

//   try {
//     axios({
//       method: 'GET',
//       url: `/MyLetter?letterNo=${}?postNo=${}/likes`,
//     }).then((res) => {
//       console.log('likesNum ', res);
//       likesNum.innerText = likesNum + 1;
//     });
//   } catch (err) {
//     console.log('Err', err);
//   }
// }

// 3. 페이징
