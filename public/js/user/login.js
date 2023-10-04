// 쿠키 값을 가져오는 함수

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue); // URL 디코딩
    }
  }
  return null;
}

// 아이디를 쿠키에 저장하는 함수
function setRememberIdCookie() {
  const userId = document.getElementById('userId').value;
  const saveIdCheckbox = document.getElementById('saveId');

  if (saveIdCheckbox.checked) {
    // 체크박스가 체크되었을 때 아이디 값을 쿠키에 저장
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // 7일 동안 유지
    document.cookie = `userInfo=${encodeURIComponent(
      userId
    )}; expires=${expirationDate.toUTCString()}`;
  } else {
    // 체크박스가 해제되었을 때 아이디 쿠키를 삭제
    document.cookie = 'userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  }
}

// 페이지가 로드될 때 실행되는 함수
document.addEventListener('DOMContentLoaded', function () {
  // 쿠키 값을 가져와서 아이디 입력란에 설정
  const rememberedId = getCookie('userInfo');
  if (rememberedId) {
    document.getElementById('userId').value = rememberedId;
    document.getElementById('saveId').checked = true;
  }

  // "아이디 저장" 체크박스의 상태가 변경될 때 쿠키 설정 함수 호출
  document
    .getElementById('saveId')
    .addEventListener('change', setRememberIdCookie);
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // 엔터 키가 눌렸을 때 로그인 버튼 클릭
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.click();
    }
  }
});

async function loginAxios() {
  const form = document.forms['loginForm'];
  const result = await axios({
    method: 'POST',
    url: '/login',
    data: {
      userId: form.userId.value,
      pw: form.password.value,
    },
  });
  const data = result.data;
  if (data.result) {
    alert(`${data.data.nickname}님 ${data.message} 환영합니다.`);
    //메인 페이지 이동
    document.location.href = '/';
  } else {
    alert(`${data.message}`);
    //다시 로그인페이지 이동
    document.location.href = '/user/login';
  }
}
