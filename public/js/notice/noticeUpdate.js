function noticeUpdate() {
  const form = document.forms['resultForm'];
  const data = {
    noticeHeader: form.noticeHeader.value,
    noticeContent: form.noticeContent.value,
  };
  const noticeNo = form.noticeNo.value;
  if (confirm('업데이트 할것입니까?')) {
    axios({
      method: 'patch',
      url: `/notice/Update/${noticeNo}`,
      data: data,
    })
      .then((res) => {
        console.log(res.data);
        alert('업데이트 변경에 성공했습니다.');
        location.href = '/notice';
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
