let idResult = false,
  nicknameResult = false,
  user;
//email
async function finduserId() {
  const form = document.forms['findId'];
  const result = await axios({
    method: 'POST',
    url: '/find/id',
    data: {
      email: form.email.value,
    },
  });
  alert(`${result.data.message}`);
  if (result.data.result) {
    document.location.href = '/';
  } else {
    document.location.href = '/user/findUser';
  }
}
//userId,nickname
const myModal = new bootstrap.Modal('#exampleModal');
function findPw() {
  console.log(
    'idResult는 -> ',
    idResult,
    'nicknameResult는 -> ',
    nicknameResult
  );
  //idResult, nicknameResult -> true 일때
  if ((idResult, nicknameResult)) {
    console.log('if문 통과!');
    myModal.show();
  } else {
    myModal.hide();
    alert('패스워드를 변경할 수 없습니다.');
    document.location.href = '/user/findUser';
  }
}
async function updatePassword() {
  const form = document.forms['passwordForm'];
  const result = await axios({
    method: 'POST',
    url: '/find/password',
    data: {
      userId: user.userId,
      password: form.password.value,
    },
  });
  alert(`${result.data.message}`);
  document.location.href = '/';
}
async function isId(obj) {
  $('#isUser').text('');
  const response = await axios({
    method: 'POST',
    url: '/isId',
    data: {
      userId: obj.value,
    },
  });
  const data = await response.data;
  //data.result = true면 존재하지않는 아이디
  user = data.user;
  if (!user) {
    console.log(user);
    $('#isUser').css('color', 'red');
    $('#isUser').text('존재하지 않지않는 아이디입니다.');
    idResult = false;
  } else {
    $('#isUser').css('color', 'green');
    $('#isUser').text('현재 등록되어 있는 아이디입니다');
    idResult = true;
  }
}
async function isNickname(obj) {
  console.log(obj.value);
  if (!user) {
    $('#isNickname').text('');
  } else {
    //id에 해당하는 user가 있을 때
    if (user.nickname == obj.value) {
      $('#isNickname').css('color', 'green');
      $('#isNickname').text('닉네임 일치');
      nicknameResult = true;
    } else {
      $('#isNickname').css('color', 'red');
      $('#isNickname').text('닉네임이 일치하지 않습니다.');
      nicknameResult = false;
    }
  }
}

// 비밀번호 유효성
function isPwValidity() {
  const form = document.forms['passwordForm'];
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
//비밀번호 일치
function isPw() {
  if (
    document.getElementById('password').value != '' &&
    document.getElementById('passwordConfirm').value != ''
  ) {
    if (
      document.getElementById('password').value ==
      document.getElementById('passwordConfirm').value
    ) {
      document.getElementById('pwCheck2').innerHTML = '비밀번호 일치';
      document.getElementById('pwCheck2').style.color = 'rgb(54, 54, 255)';
      return true;
    } else {
      document.getElementById('pwCheck2').innerHTML =
        '비밀번호가 일치하지 않습니다';
      document.getElementById('pwCheck2').style.color = 'rgb(255, 89, 89)';
      return false;
    }
  }
}
