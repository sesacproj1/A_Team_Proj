let idResult, emailResult, nicknameResult, pwResult;
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // 엔터 키가 눌렸을 때 로그인 버튼 클릭
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
      registerBtn.click();
    }
  }
});
/*폼 유효성 검사 alert*/
function checkValidity() {
  const form = document.forms['registerForm'];
  if (form.id.value == '') {
    alert('아이디를 입력해주세요!');
    return false;
  }
  if (form.nickname.value == '') {
    alert('닉네임을 입력해주세요!');
    return false;
  }
  if (form.password.value == '') {
    alert('비밀번호를 입력해주세요!');
    return false;
  }
  if (form.email.value != '' && !form.email.value.includes('@')) {
    alert('올바른 이메일 형식이 아닙니다.');
    return false;
  }
  if (form.passwordConfirm.value == '') {
    alert('비밀번호 확인해주세요');
    return false;
  }
  return true;
}
const nickname = document.getElementById('isNickname');

nickname.addEventListener('click', () => {
  isNickname();
});

const email = document.getElementById('isEmail');

email.addEventListener('click', () => {
  isEmail();
});

const form = document.forms['registerForm'];
async function isId() {
  const obj = document.getElementById('userId');
  console.log(obj);
  const response = await axios({
    method: 'POST',
    url: '/isId',
    data: {
      userId: obj.value,
    },
  });
  const data = await response.data;

  if (data.result) {
    $('#idConfirm').css('color', 'green'); // id가 idConfirm 인 태그 css 설정
    $('#idConfirm').text('사용할 수 있는 아이디입니다.');
    idResult = true;
  } else {
    form.userId.value = '';
    // event.preventDefault(); // 기본 이벤트(폼 제출) 막기
    $('#idConfirm').css('color', 'red'); // id가 idConfirm 인 태그 css 설정
    $('#idConfirm').text('이미 사용중인 아이디입니다.');
    idResult = false;
  }
}

// 이메일 중복검사
async function isEmail() {
  const obj = document.getElementById('email').value;
  const response = await axios({
    method: 'POST',
    url: '/register/isEmail',
    data: {
      email: obj,
    },
  });
  const data = await response.data;
  if (data) {
    $('#emailConfirm').css('color', 'green'); // id가 emailConfirm 인 태그 css 설정
    $('#emailConfirm').text('사용할 수 있는 이메일입니다.');
    emailResult = true;
  } else {
    form.email.value = '';
    $('#emailConfirm').css('color', 'red'); // id가 emailConfirm 인 태그 css 설정
    $('#emailConfirm').text('이미 사용중인 이메일입니다.');
    emailResult = false;
  }
}
// 비밀번호 유효성
function isPwValidity() {
  const form = document.forms['registerForm'];
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
//닉네임 중복검사
async function isNickname() {
  const obj = document.getElementById('nickname').value;
  const result = await axios({
    method: 'POST',
    url: '/isNickname',
    data: {
      nickname: obj,
    },
  });
  const data = result.data;
  if (data) {
    $('#nicknameConfirm').css('color', 'green'); // id가 nicknameConfirm 인 태그 css 설정
    $('#nicknameConfirm').text('사용할 수 있는 닉네임입니다.');
    nicknameResult = true;
  } else {
    form.nickname.value = '';
    $('#nicknameConfirm').css('color', 'red'); // id가 nicknameConfirm 인 태그 css 설정
    $('#nicknameConfirm').text('이미 사용중인 닉네임입니다.');
    nicknameResult = false;
  }
}
async function register() {
  const form = document.forms['registerForm'];
  const isCheck = checkValidity();
  pwResult = isPw() && isPwValidity();
  if (isCheck == true) {
    const result = await axios({
      method: 'POST',
      url: '/register',
      data: {
        userId: form.userId.value,
        pw: form.password.value,
        nickname: form.nickname.value,
        email: form.email.value,
        pwConfirm: form.passwordConfirm.value,
        idResult: idResult,
        isPw: pwResult,
        nicknameResult: nicknameResult,
        emailResult: emailResult,
      },
    });
    const data = result.data;
    if (data.result) {
      alert(`${data.message}`);
      // 로그인 페이지 이동
      document.location.href = '/user/login';
    } else {
      alert(`${data.message}`);
      //다시 회원가입페이지 이동
      document.location.href = '/user/register';
    }
  }
}
