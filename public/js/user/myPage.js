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
    document.location.href = '/user/mypage';
  }
}
