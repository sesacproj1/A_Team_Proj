// 프로필 사진 업로드 버튼을 클릭하면 파일 입력(input)을 클릭하는 이벤트를 추가.
const btn = document.querySelector('#profileBtn');
const mail = document.querySelector('.mailBox');
const friend = document.querySelector('.friendList');
const noti = document.querySelector('notification');

btn.addEventListener('click', () => {
  document.querySelector('#fileInput').click();
});
// 파일 입력(input) 요소의 변경 이벤트를 감지하고 선택된 파일 정보를 가져옴.
const fileInput = document.getElementById('fileInput');

fileInput.onchange = () => {
  const selectedFile = fileInput.files[0];
};

// 파일 입력(input) 요소의 변경 이벤트를 다시 처리하는 함수를 정의.
fileInput.addEventListener('change', fileUpload);

function fileUpload() {
  const file = document.querySelector('#fileInput');
  const formData = new FormData();
  console.dir(fileInput);
  console.dir(fileInput.files); //업로드한 파일 객체
  console.dir(fileInput.files[0]); //업로드한 첫 파일

  // 선택된 파일 formData에 추가
  formData.append('fileInput', file.files[0]);

  axios({
    method: 'POST',
    url: '/profileImage',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(function (res) {
    const { data } = res;

    document.querySelector('#profileImage').src =
      '/img/profile/' + data.filename;
  });
}

/*폼 유효성 검사 alert*/
function checkValidity() {
  const form = document.forms['updateForm'];
  if (form.nickname.value == '') {
    alert('닉네임을 입력해주세요!');
    return false;
  }
  if (form.password.value == '') {
    alert('비밀번호를 입력해주세요!');
    return false;
  }
  return true;
}

// 비밀번호 유효성
function isPwValidity() {
  const form = document.forms['updateForm'];
  //문자열체크
  const letterCheck = {
    checkNum: /[0-9]/,
    checkEngAll: /[a-zA-Z]/,
  };
  // 조건메세지
  const conditionMessage = {
    maxLength: '15자리 이하로 입력해주세요',
    withNoNum: '숫자가 포함되지않았습니다.',
    withNoEnga: '영문 문자가 포함되어있지 않습니다.',
  };
  // pw의 조건
  const pwCondition = {
    maxLength: 15, //15자리이하
    withNum: true, //숫자포함
    withEnga: true, //영어포함
  };
  if (
    letterCheck.checkEngAll.test(form.password.value) !== pwCondition.withEnga
  ) {
    //패스워드에 영어가 포함되어 있지 않다면
    document.getElementById('pwCheck1').innerHTML = conditionMessage.withNoEnga;
    document.getElementById('pwCheck1').style.color = 'rgb(255, 89, 89)';
    return false;
  }
  if (letterCheck.checkNum.test(form.password.value) !== pwCondition.withNum) {
    //패스워드에 숫자가 포함되어 있지 않다면
    document.getElementById('pwCheck1').innerHTML = conditionMessage.withNoNum;
    document.getElementById('pwCheck1').style.color = 'rgb(255, 89, 89)';
    return false;
  }
  if (form.password.value.length > pwCondition.maxLength) {
    //패스워드가 15자 이상이라면
    document.getElementById('pwCheck1').innerHTML = conditionMessage.maxLength;
    document.getElementById('pwCheck1').style.color = 'rgb(255, 89, 89)';
    return false;
  }
  document.getElementById('pwCheck1').innerHTML = '';
  return true;
}
//사용자 정보 업데이트 함수
async function userUpdate() {
  const isCheck = checkValidity();
  if (isCheck) {
    const form = document.forms['updateForm'];
    const res = await axios({
      method: 'PATCH',
      url: '/profile/edit',
      data: {
        pw: form.password.value,
        nickname: form.nickname.value,
        originNickname: nickname,
        id: id,
      },
    });
    alert(`${res.data.message}`);
    document.location.href = `/user/mypage/${id}`;
  }
}
