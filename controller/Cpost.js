const { Post, PostLikes, Notification } = require('../models');

const output = {
  showMyLetter: async (req, res) => {
    const letterNo = req.params.letterNo;

    res.render('letter/MyLetter');
  },

  showPost: async (req, res) => {
    const { letterNo, postNo } = req.params;

    const showPost = await Post.findOne({
      where: { letterNo: letterNo, postNo: postNo },
    });
    if (showPost) {
      res.send({
        postContent: showPost.postContent,
        postNickname: showPost.postNickname,
        postIp: showPost.postIp,
      });
    } else res.send('편지내용이 없음');
  },
};

const input = {
  contentRegister: async (req, res) => {
    // IP 주소를 받아오는 API : <script type="text/javascript" src="https://jsonip.com"></script>
    const letterNo = req.params.letterNo;
    const { postContent, postNickname, postIp } = req.body;
    await Post.create({
      letterNo: letterNo,
      postContent: postContent,
      postNickname: postNickname,
      postIp: postIp,
    });

    // 글작성시 알림함에 추가
    const postInfo = await Post.findOne({
      where: { letterNo: letterNo, postNickname: postNickname },
    });

    await Notifiaction.create({
      letterNo: letterNo,
      sender: postNickname,
      postNo: postInfo.postNo,
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

  contentLikes: async (req, res) => {
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
