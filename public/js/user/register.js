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
// 아이디 중복검사
const isId = async function isId(obj) {
  await axios({
    method: 'POST',
    url: '/register/isId',
    data: {
      userId: obj.value,
    },
  })
    .then((rep) => {
      return rep.data;
    })
    .then((data) => {
      console.log(data);
      if (data) {
        $('#idConfirm').css('color', 'green'); // id가 idConfirm 인 태그 css 설정
        $('#idConfirm').text('사용할 수 있는 아이디입니다.');
        return true;
      } else {
        console.log('아이디 중복!');
        $('#idConfirm').css('color', 'red'); // id가 idConfirm 인 태그 css 설정
        $('#idConfirm').text('사용할 수 없는 아이디입니다.');

        return false;
      }
    });
};
//닉네임 중복검사
const isNickname = async function isNickname(obj) {
  await axios({
    method: 'POST',
    url: '/register/isNickname',
    data: {
      nickname: obj.value,
    },
  })
    .then((rep) => {
      return rep.data;
    })
    .then((data) => {
      console.log(data);
      if (data) {
        $('#nicknameConfirm').css('color', 'green'); // id가 nicknameConfirm 인 태그 css 설정
        $('#nicknameConfirm').text('사용할 수 있는 닉네임입니다.');
        return true;
      } else {
        $('#nicknameConfirm').css('color', 'red'); // id가 nicknameConfirm 인 태그 css 설정
        $('#nicknameConfirm').text('사용할 수 없는 닉네임입니다.');
        return false;
      }
    });
};
// 이메일 중복검사
const isEmail = async function isEmail(obj) {
  await axios({
    method: 'POST',
    url: '/register/isEmail',
    data: {
      email: obj.value,
    },
  })
    .then((rep) => {
      return rep.data;
    })
    .then((data) => {
      console.log(data);
      if (data) {
        $('#emailConfirm').css('color', 'green'); // id가 emailConfirm 인 태그 css 설정
        $('#emailConfirm').text('사용할 수 있는 이메일입니다.');
        return true;
      } else {
        $('#emailConfirm').css('color', 'red'); // id가 emailConfirm 인 태그 css 설정
        $('#emailConfirm').text('사용할 수 없는 이메일입니다.');
        return false;
      }
    });
};
const isPw = async function isPwValidity() {
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
    document.getElementById('check').innerHTML = conditionMessage.withNoEnga;
    document.getElementById('check').style.color = 'rgb(255, 89, 89)';
    return false;
  }
  if (letterCheck.checkNum.test(form.password.value) !== pwCondition.withNum) {
    //패스워드에 숫자가 포함되어 있지 않다면
    document.getElementById('check').innerHTML = conditionMessage.withNoNum;
    document.getElementById('check').style.color = 'rgb(255, 89, 89)';
    return false;
  }
  if (form.password.value.length > pwCondition.maxLength) {
    //패스워드가 15자 이상이라면
    document.getElementById('check').innerHTML = conditionMessage.maxLength;
    document.getElementById('check').style.color = 'rgb(255, 89, 89)';
    return false;
  }
  if (
    document.getElementById('password').value != '' &&
    document.getElementById('passwordConfirm').value != ''
  ) {
    if (
      document.getElementById('password').value ==
      document.getElementById('passwordConfirm').value
    ) {
      document.getElementById('check').innerHTML = '비밀번호 일치';
      document.getElementById('check').style.color = 'rgb(54, 54, 255)';
      return true;
    } else {
      document.getElementById('check').innerHTML =
        '비밀번호가 일치하지 않습니다';
      document.getElementById('check').style.color = 'rgb(255, 89, 89)';
      return false;
    }
  }
};

async function register() {
  console.log('register함수 실행시작!!');
  const form = document.forms['registerForm'];
  const isCheck = checkValidity();
  if (isCheck == true) {
    await axios({
      method: 'POST',
      url: '/register',
      data: {
        userId: form.userId.value,
        pw: form.password.value,
        nickname: form.nickname.value,
        email: form.email.value,
        pwConfirm: form.passwordConfirm.value,
        isId: isId,
        isEmail: isEmail,
        isNickname: isNickname,
        isPw: isPw,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.result) {
        alert(`${res.data.message}`);
        //로그인 페이지 이동
        document.location.href = '/user/login';
      } else {
        alert(`${res.data.message}`);
        //다시 회원가입페이지 이동
        document.location.href = '/user/register';
      }
    });
  }
}
