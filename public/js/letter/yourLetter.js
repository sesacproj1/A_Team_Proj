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

  //   modalBodyInput.value = recipient; 데이터 가져오기
  showLetter();
});

function showLetter() {
  try {
    axios({
      method: 'GET',
      url: `/letter/MyLetter/${id}/`,
    }).then((res) => {
      console.log(res.data);
    });
  } catch (err) {
    console.log('Err', err);
  }
}

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
// btnLike.addEventListener('click', updateLikes);
