const form = document.forms['alarmForm'];
const postAlarm = form.querySelector('.contentBox1');
const noAlarm = form.querySelector('.noAlarm');
const friendAlarm = form.querySelector('.contentBox2');

function notiModal(letterNo) {
  axios({
    method: 'get',
    url: `/user/myPage/notification/${letterNo}`,
  }).then((res) => {
    console.log('레스데이터', res.data);
    const { postNo, isFriend } = res.data;
    if (postNo.length !== 0) {
      noAlarm.style.display = 'none';
      if (isFriend === 'false') {
        console.log('친구없어');
        friendAlarm.style.display = 'none';
      } else {
        console.log('친구있어');
        friendAlarm.style.display = 'block';
      }
    } else {
      noAlarm.style.display = 'block';
      if (isFriend === 'false') {
        console.log('친구없어');
        friendAlarm.style.display = 'none';
      } else {
        console.log('친구있어');
        friendAlarm.style.display = 'block';
      }
    }
  });
}

function goPost(postNo) {
  const id = document.querySelector('#ID').value;

  axios({
    method: 'delete',
    url: `/user/myPage/notification/${postNo}`,
    data: {
      letterNo: id,
    },
  }).then((res) => {
    console.log(res.data);
    document.getElementById(`post${postNo}`).remove();
    document.location.href = `/letter/MyLetter/${id}`;
  });
}

function goLikes(postLikes) {
  const id = document.querySelector('#ID').value;

  axios({
    method: 'delete',
    url: `/user/myPage/notification/${postLikes}/likes`,
    data: {
      letterNo: id,
    },
  }).then((res) => {
    console.log(res.data);
    document.getElementById(`likes${postLikes}`).remove();
    document.location.href = `/letter/MyLetter/${id}`;
  });
}

function goFriendReq() {
  document.location.href = `/letter/friendConfirm`;
}

function alarmDel(id) {
  axios({
    method: 'delete',
    url: `/user/myPage/notification/${id}/delete`,
  }).then(() => {
    const divs = postAlarm.querySelectorAll('div');
    divs.forEach((div) => div.remove());
    friendAlarm.style.display = 'none';
    noAlarm.style.display = 'block';
  });
}
