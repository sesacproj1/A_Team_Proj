const form = document.forms['alarmForm'];
const postAlarm = form.querySelector('.contentBox1');
const friendAlarm = form.querySelector('.contentBox2');

const alarmDel = document.getElementById('alarmBtn');

function notiModal(letterNo) {
  axios({
    method: 'get',
    url: `/user/myPage/notification/${letterNo}`,
    params: {
      letterNo: letterNo,
    },
  }).then((res) => {
    const { sender, postNo, postTime, isFriend } = res.data;

    const newPost = `
    <div onclick="goPost(${postNo})"> ${sender} 님이 ${postTime}에 송편을 남겼습니다. </div>
    `;
    postAlarm.insertAdjacentHTML('afterBegin', newPost);

    if (!isFriend) {
      friendAlarm.style.display = 'none';
    } else {
      friendAlarm.style.display = 'block';
    }
  });
}

function goPost(postNo) {
  axios({
    method: 'delete',
    url: `/user/myPage/notification/${postNo}`,
    params: {
      letterNo: letterNo,
      postNo: postNo,
    },
  }).then((res) => {
    console.log(res.data);
    document.location.href = `/letter/MyLetter/${letterNo}/${postNo}`;
  });
}

function goFriendReq(id) {
  document.location.href = `/MyLetter/${id}/reqFriend`;
}

alarmDel.addEventListener('click', () => {
  axios({
    method: 'delete',
    url: `/user/myPage/notification/${letterNo}`,
    params: {},
  }).then(() => {
    const divs = postAlarm.querySelector('div');
    divs.forEach((div) => div.remove());
    friendAlarm.style.display = 'none';
  });
});
