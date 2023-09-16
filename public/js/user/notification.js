const form = document.forms['alarmForm'];
const postAlarm = form.contentBox1;
const friendAlarm = form.contentBox2;

const notiModal = document.getElementById('exampleModal');

notiModal.addEventListener('click', (event) => {
  const modalTitle = letterModal.querySelector('.modal-title');
  const modalBodyInput = letterModal.querySelector('.modal-body input');

  axios({
    method: 'get',
    url: '',
  }).then((res) => {
    const { sender, postTime, isFriend } = res.data;

    const newPost = `
    <div> ${sender} 님이 ${postTime}에 송편을 남겼습니다. </div>
    `;
    postAlarm.insertAdjacentHTML('afterBegin', newPost);

    if (!isFriend) {
      friendAlarm.style.display = 'none';
    }
  });
});
