const form = document.forms['alarmForm'];
const postAlarm = form.querySelector('.contentBox1');
const friendAlarm = form.querySelector('.contentBox2');

function notiModal(letterNo) {
  axios({
    method: 'get',
    url: `/user/myPage/notification/${letterNo}`,
  }).then((res) => {
    const { sender, postNo, postTime, isFriend } = res.data;

    const newPost = `
    
    <div onclick="goPost(${postNo})"> ${sender} 님이 송편을 남겼습니다. </div>

    `;
    postAlarm.insertAdjacentHTML('afterBegin', newPost);

    if (isFriend === 'false') {
      console.log('친구없어');
      friendAlarm.style.display = 'none';
    } else {
      console.log('친구있어');
      friendAlarm.style.display = 'block';
    }
  });
}

function goPost(postNo) {
  const id = document.querySelector('#ID').value;
  console.log(id);
  axios({
    method: 'delete',
    url: `/user/myPage/notification/${postNo}`,
    data: {
      letterNo: id,
    },
  }).then((res) => {
    console.log(res.data);
    document.location.href = `/letter/MyLetter/${id}`;
  });
}

function goFriendReq(id) {
  document.location.href = `/MyLetter/${id}/reqFriend`;
}

function alarmDel(id) {
  axios({
    method: 'delete',
    url: `/user/myPage/notification/${id}/delete`,
  }).then(() => {
    const divs = postAlarm.querySelector('div');
    divs.forEach((div) => div.remove());
    friendAlarm.style.display = 'none';
  });
}
