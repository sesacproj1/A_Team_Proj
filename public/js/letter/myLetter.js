const moon = document.querySelector('#moon'); //배경 달
// console.log('moon', moon.width);
const btnLeft = document.querySelector('#btnLeft');
const btnRight = document.querySelector('#btnRight');
const letterCnt = document.querySelectorAll('.letters').length;
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
            } else {
              letterImg[dataIndex].src = '';
            }
          } else {
            letterImg[dataIndex].src = '';
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
          } else {
            letterImg[dataIndex].src = '';
          }
        } else {
          letterImg[dataIndex].src = '';
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
  const postNo = document.querySelectorAll('#postNo');
  console.log('포스트넘버', postNo[i]);
  try {
    axios({
      method: 'get',
      url: `/letter/MyLetter/${id}/${postNo[i].value}`,
    }).then((res) => {
      console.log(res.data);
      const { postContent, postNickname, likesNo } = res.data;
      modalBodyInput.value = postNickname;
      modalBodyTextarea.innerText = postContent;
      likesNum.innerText = likesNo;
    });
  } catch (err) {
    console.log('Err', err);
  }
}
// 3. 좋아요 처리
const btnLike = document.querySelector('.btnLike');
const likeHeart = document.querySelector('#likeHeart');
const likesNum = document.querySelector('.likesNum');
function updateLikes(id) {
  // likeHeart.src = '/img/header/heart2.png';
  const likesNum2 = parseInt(likesNum.innerText);
  const postNo = document.querySelector('#postNo').value;
  console.log('포스트넘버', postNo);
  console.log(likesNum2);
  axios({
    method: 'patch',
    url: `/letter/MyLetter/${id}/${postNo}/likes`,
    data: {
      number: likesNum2 + 1,
    },
  }).then((res) => {
    console.log(res);
    alert(`${res.data.message}`);
    likesNum.innerText = likesNum2 + 1;
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
