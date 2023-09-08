function noticePost() {
  const form = document.forms['resultForm'];
  const data = {
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
    })
    .catch((error) => {
      console.error(error);
    });
}
