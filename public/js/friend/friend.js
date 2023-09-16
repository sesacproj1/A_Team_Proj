function reqFriend() {
  // const nickname = document.querySelector
  axios({
    method: 'get',
    url: `/MyLetter/${letterNo}/reqFriend`,
    params: {
      letterNo: letterNo,
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

function confirm() {
  const nickname = this.previousElementSibling;
  axios({
    method: 'post',
    url: `/showRequest/${id}/confirm`,
    body: {
      userId: userId.value,
    },
  }).then((res) => {
    alert('송편 추가 되었습니다.');
  });
}

function reject() {
  const userId = this.previousElementSibling.previousElementSibling;
  axios({
    method: 'post',
    url: `/showRequest/${id}/reject`,
    body: {
      userId: userId.value,
    },
  }).then((res) => {
    alert('송편 거절 되었습니다.');
  });
}
