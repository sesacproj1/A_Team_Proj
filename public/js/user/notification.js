const form = document.forms['alarmForm'];
const postAlarm = form.querySelector('.contentBox1');
const noAlarm = form.querySelector('.noAlarm');
const friendAlarm = form.querySelector('.contentBox2');

function notiModal(letterNo) {
  axios({
    method: 'get',
    url: `/user/myPage/notification/${letterNo}`,
  }).then((res) => {
    const { isNoti, isFriend } = res.data;

    if (!res.data.isAlarmDel) {
      if (isNoti === 'true') {
        noAlarm.style.display = 'none';
        if (isFriend === 'true') {
          friendAlarm.style.display = 'block';
        } else if (isFriend === 'false') {
          friendAlarm.style.display = 'none';
        }
      } else if (isNoti === 'false') {
        noAlarm.style.display = 'block';
        friendAlarm.style.display = 'none';
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
    document.getElementById(`likes${postLikes}`).remove();
    document.location.href = `/letter/MyLetter/${id}`;
  });
}

function goFriendReq(requestId) {
  console.log(requestId);
  axios({
    method: 'delete',
    url: `/user/myPage/notification/friends/${requestId}`,
  }).then((res) => {
    document.getElementById(`requestId${requestId}`).remove();
    document.location.href = `/letter/friendConfirm`;
  });
}

function alarmDel(id) {
  axios({
    method: 'delete',
    url: `/user/myPage/notification/${id}/delete`,
  }).then((res) => {
    const divs = postAlarm.querySelectorAll('div');
    divs.forEach((div) => div.remove());
    friendAlarm.style.display = 'none';
    noAlarm.style.display = 'block';

    window.location.reload();
  });
}
