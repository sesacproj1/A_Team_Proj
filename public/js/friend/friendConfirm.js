//수락버튼 누르면 friend db에 추가
const id = document.getElementById('lordid');
function confirm(obj) {
  
  //수락
  
  axios({
    method: 'post',
    url: `/showRequest/${id.value}/confirm`,
    data: {
      id: id.value, //친구요청받은사람 -> 주인
      requestId: obj.value,
      isConfirm: true,
    },
  })
    .then((res) => {
      alert(`${res.data.message}`);
      location.href = `/letter/friendConfirm`;
    })
    .catch((error) => {
      console.error(error);
      alert('요청 중 오류가 발생했습니다.');
    });
}
//거절 버턴 누르면 requestList db에서 삭제

function reject(obj) {
  //거절함수 실행!!!
 
  axios({
    method: 'post',
    url: `/showRequest/${id.value}/confirm`,
    data: {
      id: id.value, //친구요청받은사람 -> 주인
      requestId: obj.value,
      isConfirm: false,
    },
  })
    .then((res) => {
      alert(`${res.data.message}`);
      location.href = `/letter/friendConfirm`;
    })
    .catch((error) => {
      console.error(error);
      alert('요청 중 오류가 발생했습니다.');
    });
}
