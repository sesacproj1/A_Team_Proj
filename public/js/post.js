const form = document.forms['postForm'];
const password = document.querySelector('#postPassword');
let pw;
/* 익명 시 닉네임 비밀번호 공란 검사 alert*/
function checkValidity() {
  if (password) {
    // 비밀번호 입력란이 있을 때, -> 익명
    pw = password.value;
    if (document.getElementById('sessionNickname').value.trim() === '') {
      alert('닉네임을 입력해주세요!');
      return false;
    }

    if (pw.trim() === '') {
      // 빈 칸 여부를 체크합니다.
      alert('비밀번호를 입력해주세요!');
      return false;
    }
  } else {
    pw = null;
  }
  return true;
}

function postLetter(id) {
  axios.get('https://jsonip.com').then((ipResponse) => {
    // IP 주소 값을 변수에 저장
    const userIpAddress = ipResponse.data.ip;

    if (document.querySelector('#postNickname').value) {
      // 로그인 했고 값 썼을 때
      postNickname = document.querySelector('#postNickname').value;
    } else if (
      // 로그인 했고 값 안 썼을 때
      document.querySelector('#sessionNickname').value &&
      !document.querySelector('#postNickname').value
    ) {
      postNickname = document.querySelector('#sessionNickname').value;
    }
    if (checkValidity()) {
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
    }
  });
}
