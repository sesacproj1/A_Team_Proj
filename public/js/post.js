const form = document.forms['post'];

function contentRegister() {
  axios({
    method: 'post',
    url: `/MyLetter/${letterNo}}/${postNo}/Register`,
    data: {
      postNickname: form.postNickname.value,
      postContent: form.postContent.value,
    },
  }).then((res) => {
    const { postContent, postNickname, postIp } = res.data;
    (form.postContent.value = postContent),
      (form.postNickname.value = postNickname);
  });
}

function contentDelete() {
  axios({
    method: 'delete',
    url: `/MyLetter/${letterNo}}/${postNo}/delete`,
  }).then(() => {
    (form.postContent.value = ''), (form.postNickname.value = '');
  });
}

function updateLikes() {
  const likesNum = parseInt(form.postLikes.value);
  axios({
    method: 'post',
    url: `/MyLetter/${letterNo}}/${postNo}/likes`,
    data: {
      number: likesNum + 1,
    },
  }).then((res) => {
    form.postLikes.value = likesNum + 1;
  });
}
