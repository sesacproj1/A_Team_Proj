const moon = document.querySelector('#moon'); //배경 달
// console.log('moon', moon.width);
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
    let id = document.querySelector('#personId').value;
    console.log('id', id);
    try {
      axios({
        method: 'GET',
        url: `/letter/myLetter/${id}/prevPage?curPage=${curPage}`,
      }).then((res) => {
        curPage--;
        console.log('curPage prev', curPage);
        const data = res.data.postData;
        console.log('data prev', data);
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
        console.log('start prev', startIndex); //5
        // console.log('letter Cnt', letterCnt);
        // step 1) 각자 다른 이미지 path 가져오기
        for (let i = 0; i < letterImg.length; i++) {
          const dataIndex = i;
          console.log('data design', data[dataIndex]);
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
          console.log('i dataIndex prev', i, dataIndex); //5~9
          // console.log('letterP.length prev', letterP.length);
          // console.log(data[dataIndex].postNickname);
          if (data[dataIndex]) {
            letterP[i].innerText = data[dataIndex].postNickname;
          } else {
            letterP[i].innerText = '';
          }
        }
      });
    } catch (err) {
      console.log('Error', err);
    }
  }
}
function nextPage() {
  const letterImg = document.querySelectorAll('.letterImg');
  const letterP = document.querySelectorAll('.letterP');
  // console.log('letterP', letterP);
  let id = document.querySelector('#personId').value;
  console.log('id', id);

  try {
    axios({
      method: 'GET',
      url: `/letter/myLetter/${id}/nextPage?curPage=${curPage}`,
    }).then((res) => {
      const data = res.data.postData;
      console.log('data next', data);
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
        console.log('data design', data[dataIndex]);
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
        console.log('dataIndex', dataIndex); //5~9
        // console.log('letterP.length', letterP.length);
        // console.log(data[dataIndex].postNickname);
        if (data[dataIndex]) {
          letterP[i].innerText = data[dataIndex].postNickname;
        } else {
          letterP[i].innerText = '';
        }
      }
      curPage++;
      console.log('curPage next', curPage);
    });
  } catch (err) {
    console.log('Error', err);
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
  console.log('deserver', deserver);
  const combinedValue = parseInt(deserver) + parseInt(i);
  console.log('combinedValue:', combinedValue);
  const postNo = postNoArray[combinedValue];
  // const postNoInput = document.getElementById(`postNo${i}`);
  // let postNo = postNoInput.value;
  // console.log('postNoINput은 ', postNoInput);
  // postNo = (curPage - 1) * 5 + parseInt(postNo);
  // console.log('포스트넘버', postNo);
  // postNumber = postNo;
  try {
    axios({
      method: 'get',
      url: `/letter/MyLetter/${id}/${postNo}`,
    }).then((res) => {
      console.log(res.data);

      const { postContent, postNickname, count, isDeleteSender, isDeletelord } =
        res.data;
      modalBodyInput.value = postNickname;
      modalBodyTextarea.innerText = postContent;
      likesNum.innerText = count;
      console.log('res.data.isLike는', res.data.isLike);
      if (res.data.isLike !== undefined) {
        if (res.data.isLike) {
          likeHeart.src = '/img/header/heart2.png';
        } else {
          likeHeart.src = '/img/header/heart1.png';
        }
      }
      console.log('isDeletelord는', isDeletelord);
      console.log('isDeleteSender는', isDeleteSender);
      const deleteBtn = document.querySelector('.modal-footer');
      const buttonElement = document.createElement('button');
      buttonElement.setAttribute('type', 'button');
      buttonElement.classList.add('btn', 'btnDelete');
      buttonElement.setAttribute('data-bs-dismiss', 'modal');
      buttonElement.textContent = '삭제';
      if (isDeletelord !== null && isDeleteSender === null) {
        //편지주인일때
        if (document.querySelector('.btnDelete')) {
          //버튼 이미 있다면 버튼 추가하지않음
        } else {
          deleteBtn.insertBefore(buttonElement, deleteBtn.firstChild);
        }
        //주인은바로 삭제
        buttonElement.addEventListener('click', function () {
          console.log('삭제실행!');
          postDelete();
        });
      }
      if (isDeleteSender !== null && isDeletelord === null) {
        //편지쓴사람이 열었을 때
        if (isDeleteSender.id === 0) {
          //쓴사람이 익명일 때
          if (document.querySelector('.btnDelete')) {
            //버튼 이미 있다면 버튼 추가하지않음
            return;
          } else {
            deleteBtn.insertBefore(buttonElement, deleteBtn.firstChild);
          }
          //익명이용자 모달창 띄움
          buttonElement.addEventListener('click', function () {
            // 클릭 시 실행할 동작을 여기에 작성
            const myModal = new bootstrap.Modal('#deleteModal');
            myModal.show();
          });
        }
      }
    });
  } catch (err) {
    console.log('Err', err);
  }
}
// 3. 좋아요 처리
const btnLike = document.querySelector('.btnLike');
const likeHeart = document.querySelector('#likeHeart');
const likesNum = document.querySelector('.likesNum');
const heartId = document.querySelector('#heart').value;
btnLike.addEventListener('click', like);
function like() {
  console.log('src값은', likeHeart.src);
  if (likeHeart.src !== 'http://localhost:8000/img/header/heart2.png') {
    console.log('꽉찬하트 실행');
    updateLikes(heartId);
  } else {
    console.log('다시변경!!!');
    likeCancel(heartId);
  }
}
function updateLikes(id) {
  // likeHeart.src = '/img/header/heart2.png';
  const likesNum2 = parseInt(likesNum.innerText);

  console.log('포스트넘버', postNumber);
  console.log(likesNum2);
  axios({
    method: 'patch',
    url: `/letter/MyLetter/${id}/${postNumber}/likes`,
  }).then((res) => {
    console.log(res);
    if (res.data.message) {
      return alert(`${res.data.message}`);
    }
    if (res.data.isLike !== undefined) {
      console.log('좋아요갯수는', res.data.count);
      likeHeart.src = '/img/header/heart2.png';
      likesNum.innerText = res.data.count;
    }
  });
}

function likeCancel(id) {
  console.log('취소함수실행!');
  // const likesNum2 = parseInt(likesNum.innerText);

  const postNo = postNumber + 1;
  axios({
    method: 'delete',
    url: `/letter/MyLetter/${id}/${postNo}/likes/cancel`,
  })
    .then((response) => {
      console.log(response); // 응답 내용을 콘솔에 출력 (디버깅용)
      if (response.data.message) {
        return alert(`${res.data.message}`);
      }
      likeHeart.src = '/img/header/heart1.png';
      likesNum.innerText = response.data.count;
    })
    .catch((error) => {
      console.error(error); // 오류 처리
      alert('요청 중 오류가 발생했습니다.');
    });
}

// 4. 친구 신청 날렸을 때
const btnAddFriend = document.querySelector('#btnAddFriend');
// btnAddFriend.addEventListener('click', addFriend);
const imgAddFriend = document.querySelector('#imgAddFriend');
function addFriend() {
  if (imgAddFriend.src !== 'http://localhost:8000/img/header/check.png') {
    console.log('check실행');
    imgAddFriend.src = '/img/header/check.png';
    reqFriend();
    // btnAddFriend.disabled = 'true';
    // btnAddFriend.style.pointerEvents = ' none';
  } else {
    console.log('다시변경!!!');
    reqFriendCancel();
    imgAddFriend.src = '/img/header/add.png';
  }
}
let id = document.getElementById('lordid');
// console.log('id는~', id.value);
// const lordid = id.value;
// console.log(lordid);
// 4. 친구 신청 날리기 :
// const btnAddFriend = document.querySelector('.btnAddFriend');
function reqFriend() {
  console.log('함수실행!');
  axios({
    method: 'post',
    url: `/MyLetter/${id.value}/reqFriend`,
    data: {
      id: id.value,
    },
  })
    .then((response) => {
      console.log(response); // 응답 내용을 콘솔에 출력 (디버깅용)
      alert(`${response.data.message}`);
    })
    .catch((error) => {
      console.error(error); // 오류 처리
      alert('요청 중 오류가 발생했습니다.');
    });
}
//TODO 친구신청취소
function reqFriendCancel() {
  console.log('취소함수실행!');
  axios({
    method: 'delete',
    url: `/reqFriend/cancel`,
    data: {
      id: id.value,
    },
  })
    .then((response) => {
      console.log(response); // 응답 내용을 콘솔에 출력 (디버깅용)
      alert(`${response.data.message}`);
    })
    .catch((error) => {
      console.error(error); // 오류 처리
      alert('요청 중 오류가 발생했습니다.');
    });
}

async function postDelete() {
  console.log('postDelete 실행!!');
  if (document.querySelector('.pw') !== undefined) {
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
    console.log('response.data는', response.data);
    alert(`${response.data.message}`);
    location.reload();
  } catch (error) {
    console.error('삭제 요청 중 오류 발생:', error);
  }
}
