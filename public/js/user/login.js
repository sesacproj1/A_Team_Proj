//TODO id 기억하기
// 아이디 저장
//  $(window).on('load', function() {
//     var cookieArr = document.cookie.split("; ");
//     // 아이디 기억하기 쿠키가 존재하면 아이디 띄워주기!
//     if (cookieArr.includes('id=remember')) {
//         var id_input = document.getElementById('user');
//         var user_id = document.getElementById('user_id').innerText;
//         id_input.value = user_id;

//         $("#userid_Remember").prop('checked', true);
//     }
// })
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
