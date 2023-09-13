function reqFriend() {
  axios({
    method: 'get',
    url: `/reqFriend/${id}`,
    params: {
      id: id,
    },
  }).then((res) => {
    if (res.data.result) {
      alert(`${nickname} 님에게 송편 요청 보냈습니다`);
    } else {
      alert(res.data.message);
    }
  });
}

function delFriend() {
  axios({
    method: 'get',
    url: `/friend/${id}/delete`,
    params: {
      id: id,
    },
  }).then(() => {
    alert('송편 삭제 성공!');
  });
}

function admitRequest() {
  const form = document.forms['req_friend'];
  axios({
    method: 'post',
    url: `/admitRequest/${id}`,
    body: {
      nickname: form.nickname.value,
    },
  }).then((res) => {
    alert('송편 추가 되었습니다.');
  });
}
