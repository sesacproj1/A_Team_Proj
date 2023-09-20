const form = document.forms['postForm'];
const password = document.querySelector('#postPassword');

function postLetter(id) {
  let pw;

  if (password) {
    pw = password.value;
  } else {
    pw = null;
  }

  console.log(id);
  axios.get('https://jsonip.com').then((ipResponse) => {
    // IP 주소 값을 변수에 저장
    const userIpAddress = ipResponse.data.ip;
    console.log(userIpAddress);

    if (document.querySelector('#postNickname').value) {
      // 로그인 했고 값 썼을 때
      postNickname = document.querySelector('#postNickname').value;
    } else if (
      // 로그인 했고 값 안 썼을 때
      document.querySelector('#sessionNickname').value &&
      !document.querySelector('#postNickname').value
    ) {
      postNickname = document.querySelector('#sessionNickname').value;
    } else if (
      // 로그인 안 했고 값 안 썼을 때
      !document.querySelector('#sessionNickname').value &&
      !document.querySelector('#postNickname').value
    ) {
      alert('닉네임을 입력해주세요.');
    }

    console.log(postNickname);

    if (form.postDesign.value) {
      axios({
        method: 'post',
        url: `/letter/select/${id}/postLetter`,
        data: {
          postDesign: form.postDesign.value,
          postNickname: postNickname,
          postContent: form.postContent.value,
          postIp: userIpAddress,
          pw: pw,
        },
      }).then((res) => {
        alert('글이 작성되었습니다.');
        document.location.href = `/`;
      });
    } else {
      alert('icon을 한가지 선택해주세요');
    }
  });
}

// function contentDelete() {
//   axios({
//     method: 'delete',
//     url: `/MyLetter/${letterNo}}/${postNo}/delete`,
//     params: {
//       letterNo: letterNo,
//       postNo: postNo,
//     },
//   }).then(() => {

//     form.postContent.value = '';
//     form.postNickname.value = '';

//   });
// }
