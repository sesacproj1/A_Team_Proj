const form = document.forms['post'];

// function showPost() {
//   axios({
//     method: 'get',
//     url: `/MyLetter/${letterNo}}/${postNo}`,
//     params: {
//       letterNo: letterNo,
//       postNo: postNo,
//     },
//   }).then((res) => {
//     const { postContent, postNickname, postIp, likesNum } = res.data;
//     form.postContent.value = postContent;
//     form.postNickname.value = postNickname;
//     form.postIp.value = postIp;
//     form.likesNum.value = likesNum;
//   });
// }

function contentRegister() {
  // ip주소 따오기
  axios({
    method: 'post',
    url: `/MyLetter/${letterNo}}/contentWrite/Register`,
    data: {
      postNickname: form.postNickname.value,
      postContent: form.postContent.value,
    },
  }).then((res) => {
    const { postContent, postNickname, postIp } = res.data;
    form.postContent.value = postContent;
    form.postNickname.value = postNickname;
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
    form.postContent.value = '';
    form.postNickname.value = '';
  });
}
