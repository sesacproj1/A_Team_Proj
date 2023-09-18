function deleted(obj) {
  const myid = document.getElementById('meid');
  const myuserId = document.getElementById('meuserId');
  console.log(myid.value);
  console.log(myuserId.value);
  console.log(obj.value);
  axios({
    method: 'delete',
    url: `/friend/delete`,
    data: {
      id: obj.value, //삭제하려는 userid
      meid: myid.value, //id
      meuserId: myuserId.value, //내 userId
    },
  })
    .then((res) => {
      alert(`${res.data.message}`);
      location.href = `/letter/friends/${myid.value}`;
    })
    .catch((error) => {
      console.error(error);
      alert('요청 중 오류가 발생했습니다.');
    });
}
