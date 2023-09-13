const form = document.forms['post'];

function showPost() {
  // const postNo = this.()

  axios({
    method: 'post',
    url: `/MyLetter/${letterNo}}/${postNo}`,
    params: {
      letterNo: req.session.id,
      postNo: postNo,
    },
  }).then((res) => {
    const { postContent, postNickname, postIp, likesNum } = res.data;
    (form.postContent.value = postContent),
      (form.postNickname.value = postNickname),
      (form.postIp.value = postIp),
      (form.likesNum.value = likesNum);
  });
}

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
    params: {
      letterNo: letterNo,
      postNo: postNo,
    },
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
