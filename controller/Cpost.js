const { Post, PostLikes, Notification } = require('../models');

const output = {
  content: (req, res) => {
    res.render('letter/postContent');
  },

  showMyLetter: async (req, res) => {
    const userInfo = req.session.userInfo;
    const { id, userId, nickname } = userInfo;

    await MyLetter.create({
      id: id,
    });

<<<<<<< HEAD
    res.send('myletter page 출력!');
    // res.render('MyLetter');
=======
    res.render('letter/myletter', { nickname: nickname });
>>>>>>> 2fd76c6324961257fca579d58a444a493e10392f
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
