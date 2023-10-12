const moon = document.querySelector('#moon'); //배경 달

const btnLeft = document.querySelector('#btnLeft');
const btnRight = document.querySelector('#btnRight');
const letterCnt = document.querySelectorAll('.letters').length;
let postNumber;
let pw = null;
let curPage = 1;
function prevPage() {
  if (curPage > 1) {
    const letterImg = document.querySelectorAll('.letterImg');
    const letterP = document.querySelectorAll('.letterP');
    const letters = document.querySelectorAll('.letters');
    let id = document.querySelector('#personId').value;

    try {
      axios({
        method: 'GET',
        url: `/letter/myLetter/${id}/prevPage?curPage=${curPage}`,
      }).then((res) => {
        curPage--;

        const data = res.data.postData;

        const designMap = {
          1: '/img/letterIcons/px_acorn.png',
          2: '/img/letterIcons/px_apple.png',
          3: '/img/letterIcons/px_apple2.png',
          4: '/img/letterIcons/px_coin.png',
          5: '/img/letterIcons/px_food.png',
          6: '/img/letterIcons/px_hedgehog.png',
          7: '/img/letterIcons/px_lApple.png',
          8: '/img/letterIcons/px_nuts.png',
          9: '/img/letterIcons/px_panda.png',
          10: '/img/letterIcons/px_pear.png',
          11: '/img/letterIcons/px_persimmon.png',
          12: '/img/letterIcons/px_pumpkin.png',
          13: '/img/letterIcons/px_rabbit.png',
          14: '/img/letterIcons/px_squirrel.png',
          15: '/img/letterIcons/px_tree.png',
        };
        const startIndex = (curPage - 1) * letterCnt;
        document.querySelector('#postNo5').value = startIndex;

        // step 1) 각자 다른 이미지 path 가져오기
        for (let i = 0; i < letterImg.length; i++) {
          const dataIndex = i;

          if (data[dataIndex]) {
            const designNumber = data[dataIndex].postDesign;
            const imagePath = designMap[designNumber];

            if (imagePath) {
              letterImg[dataIndex].src = imagePath;
              letterImg[dataIndex].style.display = 'block';
            } else {
              letterImg[dataIndex].src = '';
            }
          } else {
            letterImg[dataIndex].src = '';
            letterImg[dataIndex].style.display = 'none';
          }
        }
        // step 2) 각자 다른 이름 가져오기
        for (let i = 0; i < letterP.length; i++) {
          let dataIndex = i;

          if (data[dataIndex]) {
            letterP[i].innerText = data[dataIndex].postNickname;
          } else {
            letterP[i].innerText = '';
          }
        }
        // step 3) 데이터 있을 때에만 편지 내용 보여주기
        for (let i = 0; i < letters.length; i++) {
          let dataIndex = i;

          if (data[dataIndex]) {
            letters[i].setAttribute('data-bs-target', '#letterModal');
            letters[i].setAttribute('data-bs-toggle', 'modal');
            letters[i].setAttribute('onclick', `showPost(${id}, ${i})`);
            letters[i].style.cursor = 'pointer';
          } else {
            letters[i].removeAttribute('data-bs-target');
            letters[i].removeAttribute('data-bs-toggle');
            letters[i].removeAttribute('onclick');
            letters[i].style.cursor = 'default';
          }
        }
      });
    } catch (err) {
      console.error('Error', err);
    }
  }
}
function nextPage() {
  const letterImg = document.querySelectorAll('.letterImg');
  const letterP = document.querySelectorAll('.letterP');
  const letters = document.querySelectorAll('.letters');

  let id = document.querySelector('#personId').value;

  try {
    axios({
      method: 'GET',
      url: `/letter/myLetter/${id}/nextPage?curPage=${curPage}`,
    }).then((res) => {
      const data = res.data.postData;

      const startIndex = curPage * letterCnt;
      document.querySelector('#postNo5').value = startIndex;
      const designMap = {
        1: '/img/letterIcons/px_acorn.png',
        2: '/img/letterIcons/px_apple.png',
        3: '/img/letterIcons/px_apple2.png',
        4: '/img/letterIcons/px_coin.png',
        5: '/img/letterIcons/px_food.png',
        6: '/img/letterIcons/px_hedgehog.png',
        7: '/img/letterIcons/px_lApple.png',
        8: '/img/letterIcons/px_nuts.png',
        9: '/img/letterIcons/px_panda.png',
        10: '/img/letterIcons/px_pear.png',
        11: '/img/letterIcons/px_persimmon.png',
        12: '/img/letterIcons/px_pumpkin.png',
        13: '/img/letterIcons/px_rabbit.png',
        14: '/img/letterIcons/px_squirrel.png',
        15: '/img/letterIcons/px_tree.png',
      };

      // step 1) 각자 다른 이미지 path 가져오기
      for (let i = 0; i < letterImg.length; i++) {
        const dataIndex = i;

        if (data[dataIndex]) {
          const designNumber = data[dataIndex].postDesign;
          const imagePath = designMap[designNumber];
          if (imagePath) {
            letterImg[dataIndex].src = imagePath;
            letterImg[dataIndex].style.display = 'block';
          } else {
            letterImg[dataIndex].src = '';
          }
        } else {
          // letterImg[dataIndex].src = '';
          letterImg[dataIndex].style.display = 'none';
        }
      }
      // step 2) 각자 다른 이름 가져오기
      for (let i = 0; i < letterP.length; i++) {
        let dataIndex = i;

        if (data[dataIndex]) {
          letterP[i].innerText = data[dataIndex].postNickname;
        } else {
          letterP[i].innerText = '';
        }
      }
      // step 3) 데이터 있을 때에만 편지 내용 보여주기
      for (let i = 0; i < letters.length; i++) {
        let dataIndex = i;

        if (data[dataIndex]) {
          letters[i].setAttribute('data-bs-target', '#letterModal');
          letters[i].setAttribute('data-bs-toggle', 'modal');
          letters[i].setAttribute('onclick', `showPost(${id}, ${i})`);
          letters[i].style.cursor = 'pointer';
        } else {
          letters[i].removeAttribute('data-bs-target');
          letters[i].removeAttribute('data-bs-toggle');
          letters[i].removeAttribute('onclick');
          letters[i].style.cursor = 'default';
        }
      }
      curPage++;
    });
  } catch (err) {
    console.error('Error', err);
  }
}
// 2. 편지 보여주기 - 각자 다른 내용 가져오기
const letterModal = document.getElementById('letterModal');
const modalBodyInput = letterModal.querySelector('.modal-body input');
const modalBodyTextarea = letterModal.querySelector('.modal-body textarea');
function showPost(id, i) {
  const postNo3 = document.getElementById('postNo3').value;
  const postNoArray = postNo3.split(',').map(Number);
  const deserver = document.getElementById('postNo5').value;

  const combinedValue = parseInt(deserver) + parseInt(i);

  const postNo = postNoArray[combinedValue];

  postNumber = postNo;

  try {
    axios({
      method: 'get',
      url: `/letter/MyLetter/${id}/${postNo}`,
    }).then((res) => {
      const { postContent, postNickname, count, isDeleteSender, isDeletelord } =
        res.data;
      modalBodyInput.value = postNickname;
      modalBodyTextarea.innerText = postContent;
      likesNum.innerText = count;

      if (res.data.isLike !== undefined) {
        if (res.data.isLike) {
          likeHeart.src = '/img/header/heart2.png';
        } else {
          likeHeart.src = '/img/header/heart1.png';
        }
      }
      const deleteBtn = document.querySelector('.modal-footer');
      const buttonElement = document.createElement('button');
      buttonElement.setAttribute('type', 'button');
      buttonElement.classList.add('btn', 'btnDelete');
      buttonElement.setAttribute('data-bs-dismiss', 'modal');
      buttonElement.textContent = '삭제';
      if (isDeletelord === null && isDeleteSender === null) {
        return;
      }

      if (isDeletelord !== null) {
        //편지주인일때
        if (document.querySelector('.btnDelete')) {
          //버튼 이미 있다면 버튼 추가하지않음
        } else {
          deleteBtn.insertBefore(buttonElement, deleteBtn.firstChild);
        }
        //주인은바로 삭제
        buttonElement.addEventListener('click', function () {
          postDelete();
        });
      }
      if (isDeleteSender !== null) {
        if (document.querySelector('.btnDelete')) {
          //버튼 이미 있다면 버튼 추가하지않음
        } else {
          deleteBtn.insertBefore(buttonElement, deleteBtn.firstChild);
        }
        //편지쓴사람이 열었을 때
        if (isDeleteSender.id === 0) {
          buttonElement.addEventListener('click', function () {
            // 클릭 시 실행할 동작을 여기에 작성
            const myModal = new bootstrap.Modal('#deleteModal');
            myModal.show();
          });
        } else {
          buttonElement.addEventListener('click', function () {
            postDelete();
          });
        }
      }
    });
  } catch (err) {
    console.error('Err', err);
  }
}
// 3. 좋아요 처리
const btnLike = document.querySelector('.btnLike');
const likeHeart = document.querySelector('#likeHeart');
const likesNum = document.querySelector('.likesNum');
const heartId = document.getElementById('heart').value;
btnLike.addEventListener('click', like);
function like() {
  // if (likeHeart.src !== 'http://49.50.162.160:8000/img/header/heart2.png') {
  //로컬용
  if (likeHeart.src !== 'http://localhost:8000/img/header/heart2.png') {
    //하트가 꽉찬하트가 아니라면
    updateLikes(heartId);
  } else {
    //하트가 빈하트라면
    likeCancel(heartId);
  }
}
function updateLikes(id) {
  //postNumber -> 68
  axios({
    method: 'patch',
    url: `/letter/MyLetter/${id}/${postNumber}/likes`,
  }).then((res) => {
    if (res.data.message) {
      return alert(`${res.data.message}`);
    }
    if (res.data.isLike !== undefined) {
      likeHeart.src = `${res.data.src}`;

      likesNum.innerText = res.data.count;
    }
  });
}
// 4. 좋아요 취소 처리
function likeCancel(id) {
  axios({
    method: 'delete',
    url: `/letter/MyLetter/${id}/${postNumber}/likes/cancel`,
  })
    .then((response) => {
      if (response.data.message) {
        return alert(`${res.data.message}`);
      }
      likesNum.innerText = response.data.count;
      likeHeart.src = `${response.data.src}`;
    })
    .catch((error) => {
      console.error(error);
      alert('요청 중 오류가 발생했습니다.');
    });
}

const btnAddFriend = document.querySelector('#btnAddFriend');
const imgAddFriend = document.querySelector('#imgAddFriend');
// 5. 친구 신청
function addFriend() {
  if (imgAddFriend.src === 'http://localhost:8000/img/header/add.png') {
    imgAddFriend.src = '/img/header/check.png';
    return reqFriend();
  } else {
    imgAddFriend.src = '/img/header/add.png';

    return reqFriendCancel();
  }
}
let id = document.getElementById('lordid');

// 5-1. 친구 신청 날리기 :
async function reqFriend() {
  const res = await axios({
    method: 'post',
    url: `/MyLetter/${id.value}/reqFriend`,
    data: {
      id: id.value,
    },
  });
  alert(`${res.data.message}`);
}
//5-2.  친구신청취소 함수
async function reqFriendCancel() {
  const res = await axios({
    method: 'delete',
    url: `/reqFriend/cancel`,
    data: {
      id: id.value,
    },
  });
  alert(`${res.data.message}`);
}

//6. 편지 삭제
async function postDelete() {
  if (document.querySelector('.pw') !== undefined) {
    //편지 pw 가 존재한다면
    pw = document.querySelector('.pw').value;
  }
  try {
    const response = await axios({
      method: 'delete',
      url: `/post/delete/${postNumber}`,
      data: {
        pw: pw,
      },
    });
    alert(`${response.data.message}`);
    location.reload();
  } catch (error) {
    console.error('삭제 요청 중 오류 발생:', error);
  }
}

// 7. 공유하기
const btnShare = document.querySelector('#btnShare');
async function copyUrl() {
  try {
    //개발자도구 오류 -> 문서에 포커스 주기
    document.body.focus();

    await navigator.clipboard.writeText(window.location.href);

    alert('편지함 링크가 복사됐어요!');
  } catch (error) {
    console.error('복사 중 오류 발생:', error);
  }
}

// 툴팁 js
let tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
