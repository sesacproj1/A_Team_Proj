const form = document.forms['alarmForm'];
const postAlarm = form.querySelector('.contentBox1');
const friendAlarm = form.querySelector('.contentBox2');

const alarmDel = document.getElementById('alarmBtn');

function notiModal(letterNo) {
  axios({
    method: 'get',
    url: `/user/myPage/notification/${letterNo}`,
  }).then((res) => {
    const { sender, postNo, postTime, isFriend } = res.data;
    console.log(sender);
    console.log(postNo);
    const newPost = `
    
    <div onclick="goPost(${postNo})"> ${sender} 님이 송편을 남겼습니다. </div>
    <input type="hidden" value="<%= data.id%> id= "ID">
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
  const id = document.querySelector('#ID');
  axios({
    method: 'delete',
    url: `/user/myPage/notification/${postNo}`,
    params: {
      letterNo: id,
      postNo: postNo,
    },
  }).then((res) => {
    console.log(res.data);
    document.location.href = `/letter/MyLetter/${id}/${postNo}`;
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
