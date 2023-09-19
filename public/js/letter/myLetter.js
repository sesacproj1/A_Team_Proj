// 1. 편지 목록 보여주기
// 페이징 : 편지 작성 테이블에서 가져오기
// - 1) 각자 다른 이미지 path 가져오기
// - 2) 각자 다른 이름 가져오기

// const { query } = require('express');

const moon = document.querySelector('#moon'); //배경 달
// console.log('moon', moon.width);
const btnLeft = document.querySelector('#btnLeft');
const btnRight = document.querySelector('#btnRight');
const letterCnt = document.querySelectorAll('.letters').length;
// console.log(letterCnt);

// btnLeft.addEventListener('click', prevPage);
// btnRight.addEventListener('click', nextPage);

let curPage = 1;

// function prevPage() {
//   if (curPage > 1) {
//     //현재 페이지가 1보다 큰 경우에만 이전 페이지로
//     // 데이터 -5(편지 개수)
//     const letterImg = document.querySelectorAll('.letterImg');
//     const letterP = document.querySelectorAll('.letterP');
//     try {
//       axios({
//         method: 'GET',
//         url: `/letter/myletter/${id}/prevPage?page=${curPage}`,
//       }).then((res) => {
//         curPage--;
//         const data = res.data.data;
//         const startIndex = (curPage - 1) * letterCnt; //0
//         // console.log('start prev', startIndex); //0

//         // step 1) 각자 다른 이미지 path 가져오기
//         for (let i = 0; i < letterImg.length; i++) {
//           const dataIndex = startIndex + i; //0~6

//           if (data[dataIndex]) {
//             // letterImg[i].src = `/letter/MyLetter/${data[dataIndex].}`;
//             // img src 디자인 테이블 값으로
//           } else {
//             letterImg[i].src = '';
//           }
//         }

//         // step 2) 각자 다른 이름 가져오기
//         for (let i = 0; i < letterP.length; i++) {
//           const dataIndex = startIndex + i; //0~6

//           if (data[dataIndex]) {
//             // letterP[i].innerText = data[dataIndex].postNickname;
//           } else {
//             letterP[i].innerText = '';
//           }
//         }
//       });
//     } catch (err) {
//       console.log('Error', err);
//     }
//   }
// }
// function nextPage() {
//   const letterImg = document.querySelectorAll('.letterImg');
//   const letterP = document.querySelectorAll('.letterP');
//   try {
//     axios({
//       method: 'GET',
//         url: `/letter/myletter/${id}/nextPage?page=${curPage}`,
//     }).then((res) => {
//       const data = res.data.data;
//       console.log(data); //undefined

//       const startIndex = curPage * letterCnt;
//       // console.log('start prev', startIndex);

//       // step 1) 각자 다른 이미지 path 가져오기
//       for (let i = 0; i < letterImg.length; i++) {
//         const dataIndex = startIndex + i; //0~6

//         if (data[dataIndex]) {
//           // letterImg[i].src = `/letter/MyLetter/${data[dataIndex].}`;
//           // img src 디자인 테이블 값으로
//         } else {
//           letterImg[i].src = '';
//         }
//       }

//       // step 2) 각자 다른 이름 가져오기
//       for (let i = 0; i < letterP.length; i++) {
//         const dataIndex = startIndex + i; //0~6

//         if (data[dataIndex]) {
//           letterP[i].innerText = data[dataIndex].postNickname;
//         } else {
//           letterP[i].innerText = '';
//         }
//       }
//       curPage++;
//     });
//   } catch (err) {
//     console.log('Error', err);
//   }
// }

// 2. 편지 보여주기 - 각자 다른 내용 가져오기
const letterModal = document.getElementById('letterModal');

const modalBodyInput = letterModal.querySelector('.modal-body input');
const modalBodyTextarea = letterModal.querySelector('.modal-body textarea');

function showPost(id) {
  const postNo = document.querySelector('#postNo').value;
  console.log('포스트넘버', postNo);

  try {
    axios({
      method: 'get',
      url: `/letter/MyLetter/${id}/${postNo}`,
    }).then((res) => {
      console.log(res.data);
      modalBodyInput.value = postNickname;
      modalBodyTextarea.value = postContent;
      likesNum.value = likesNo;
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

  axios({
    method: 'patch',
    url: `/letter/MyLetter/${id}/${postNo}`,

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

const id = document.getElementById('lordid');
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
