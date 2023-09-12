//TODO cookie,session -> 아이디 저장

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
  console.log(data);
  if (data.result) {
    console.log(data.data.nickname);
    alert(`${data.data.nickname}님 ${data.message} 환영합니다.`);
    //메인 페이지 이동
    document.location.href = '/';
  } else {
    alert(`${data.message}`);
    //다시 로그인페이지 이동
    document.location.href = '/user/login';
  }
}
