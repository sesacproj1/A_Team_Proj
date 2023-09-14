//바꾸려는 비밀번호 닉네임 유효성 검사

async function userUpdate() {
  const form = document.forms['updateForm'];
  console.log(nickname);
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
