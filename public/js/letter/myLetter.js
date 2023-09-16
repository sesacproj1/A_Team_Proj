// 1. 편지 보여주기 & 편지함 주인 표시
const letterModal = document.getElementById('letterModal');

letterModal.addEventListener('show.bs.modal', (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget;
  // Update the modal's content.

  const modalBodyInput = letterModal.querySelector('.modal-body input');
  const modalBodyTextarea = letterModal.querySelector('.modal-body textarea');

  try {
    axios({
      method: 'get',
      url: `/MyLetter/${letterNo}/${postNo}`,
      params: {
        letterNo: letterNo,
        postNo: postNo,
      },
    }).then((res) => {
      const { postContent, postNickname, postIp, likesNo } = res.data;
      (modalBodyInput.value = postNickname),
        (modalBodyTextarea.value = postContent);
      likesNum.value = likesNo;
    });
  } catch (err) {
    console.log('Err', err);
  }

  //   modalBodyInput.value = recipient; 데이터 가져오기
});

// 2. 좋아요 처리
const btnLike = document.querySelector('.btnLike');
const likeHeart = document.querySelector('#likeHeart');
const likesNum = document.querySelector('.likesNum');

btnLike.addEventListener('click', updateLikes);

function updateLikes() {
  // likeHeart.src = '/img/header/heart2.png';
  const likesNum2 = parseInt(likesNum.innerText);
  axios({
    method: 'patch',
    url: `/MyLetter/${letterNo}}/${postNo}`, //letterNo is not defined
    data: {
      number: likesNum2 + 1,
    },
  }).then((res) => {
    console.log(res);
    likesNum = likesNum2 + 1;
  });
}

// 3. 프로필 사진 값 가져와 src 변경 : 음....
// 4. 친구 신청 날리기 : 음....
// 5. 페이징 : 편지 작성 테이블에서 가져오기
// - 편지 위치 배치
// - 편지 추가하기 => 편지 개수만큼 for문 돌려 정해진 위치 배치
// - 편지 있으면 추가하고 없애면 안 넣는거 어떻게 할까.... => div 안에 innerHTML로 이미지 넣자
// - 위치를 css말고 여기서 html로 정해야하나
