function noticePost() {
  const form = document.forms['resultForm'];
  const data = {
    adminId: form.adminId.value,
    id: form.id.value,
    noticeHeader: form.noticeHeader.value,
    noticeContent: form.noticeContent.value,
  };
  axios({
    method: 'post',
    url: '/noticePost',
    data: data,
  })
    .then((res) => {
      console.log(res.data);
      alert('등록되셨습니다');
      location.href = '/notice';
    })
    .catch((error) => {
      console.error(error);
    });
}
