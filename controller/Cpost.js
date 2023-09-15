const { Post, PostLikes, Notification } = require('../models');

const output = {
  content: (req, res) => {
    res.render('letter/postContent');
  },

  showMyLetter: async (req, res) => {
    const userInfo = req.session.userInfo;
    // const { id, userId, nickname } = userInfo;
    // await MyLetter.create({
    //   id: id,
    // });
    // res.render('letter/myletter', { nickname: nickname });
    console.log(userInfo);
    const result2 = req.params.id; //n
    console.log(result2);

    if (userInfo) {
      if (userInfo.id == result2) {
        const isMine = true;
        console.log('1', isMine);
        // 둘이 같으면 myletter
        res.render('letter/myletter', {
          userInfo: userInfo,
          isLogin: true,
          isMine: true,
        });
      } else {
        // 아니면 yourLetter
        const isMine = false;

        console.log('isMine', isMine);
        res.render('letter/myletter', {
          userInfo: userInfo,
          isLogin: true,
          isMine: false,
        });
      }
    } else {
      //로그인 x
      const isLogin = false;
      console.log('isLogin', isLogin);
      res.render('letter/myletter', { isLogin: false, isMine: false });
    }
  },

  showPost: async (req, res) => {
    const { letterNo, postNo } = req.params;

    const showPost = await Post.findOne({
      where: { letterNo: letterNo, postNo: postNo },
    });

    const showLikes = await PostLikes.findOne({
      where: { letterNo: letterNo, postNo: postNo },
      attributes: ['likesNum'],
    });

    res.render('posts', {
      postContent: showPost.postContent,
      postNickname: showPost.postNickname,
      postIp: showPost.postIp,
      likesNum: showLikes.likesNum,
    });
  },
};

const input = {
  contentRegister: async (req, res) => {
    const letterNo = req.params.letterNo;
    const { postContent, postNickname, postIp } = req.body;
    await Post.create({
      letterNo: letterNo,
      postContent: postContent,
      postNickname: postNickname,
      postIp: postIp,
    });

    // 글작성시 알림함에 추가
    // const postInfo = await Post.findOne({
    //   where: { letterNo: letterNo, postNickname: postNickname },
    // });

    await Notification.create({
      letterNo: letterNo,
      sender: postNickname,
      // postNo: postInfo.postNo,
    });

    res.send({ result: 'true' });
  },

  contentDelete: async (req, res) => {
    const { letterNo, postNo } = req.params;
    await Post.destroy({
      where: { letterNo: letterNo, postNo: postNo },
    });

    res.send({ result: 'true' });
  },

  updateLikes: async (req, res) => {
    const { letterNo, postNo } = req.params;
    const likesNum = req.body.number;

    await PostLikes.update(
      {
        likesNum: likesNum,
      },
      { where: { letterNo: letterNo, postNo: postNo } }
    );

    res.send({ result: 'true' });
  },
};

module.exports = { output, input };
