const { Post, PostLikes, Notification, User, Profile } = require('../models');

const output = {
  content: (req, res) => {
    res.render('letter/postContent');
  },

  // 페이징
  nextPage: async (req, res) => {
    let curPage = 1 | req.query.curPage;
    console.log('paramsPage next', req.query.curPage);
    console.log('curpage next', curPage);
    const postData = await Post.findAll({
      where: { id: req.params.id },
      attributes: ['postNickname'],
      offset: 5 * req.query.curPage,
      limit: 5,
      order: [['id', 'ASC']],
    });
    console.log('편지', postData);
    res.send({ postData: postData });
  },

  prevPage: async (req, res) => {
    let curPage = 1 | req.query.curPage;
    console.log('paramsPage prev', req.query.curPage);
    console.log('curpage prev', curPage);
    const postData2 = await Post.findAll({
      where: { id: req.params.id },
      attributes: ['postNickname'],
      offset: 5 * (req.query.curPage - 2),
      limit: 5,
      order: [['id', 'ASC']],
    });
    console.log('편지', postData2);
    res.send({ postData: postData2 });
  },

  showMyLetter: async (req, res) => {
    const userInfo = req.session.userInfo;
    // const { id, userId, nickname } = userInfo;
    // await MyLetter.create({
    //   id: id,
    // });
    // res.render('letter/myletter', { nickname: nickname });
    console.log('userInfo', userInfo);
    const idParam = req.params.id; //n
    // console.log(idParam);

    const userData = await User.findAll({
      where: { id: req.params.id },
    });

    const profile = await Profile.findOne({
      where: { id: req.params.id },
    });

    let curPage = 1 | req.query.curPage;
    const postData = await Post.findAll({
      where: { id: req.params.id },
      attributes: ['postNickname'],
      limit: 5,
      // offset: 5 * curPage - 1,
    });

    const nickname = postData.map((nick) => nick.postNickname);
    console.log('닉네임은', nickname);

    console.log('profile은', profile);
    req.session.profile = profile;
    const lord = userData.map((user) => user.dataValues);
    console.log('lord는', lord);
    // console.log('req.', req.params.id);

    if (userInfo) {
      //로그인 했을 때
      if (userInfo.id == idParam) {
        const isMine = true;
        console.log('isMine', isMine);
        // 둘이 같으면 myletter
        res.render('letter/myletter', {
          profile: req.session.profile,
          lord: lord[0],
          session: userInfo,
          isLogin: true,
          isMine: true,
          id: req.params.id,
          nickname: nickname,
        });
      } else {
        // 아니면 yourLetter
        const isMine = false;
        console.log('isMine', isMine);
        res.render('letter/myletter', {
          profile: req.session.profile,
          lord: lord[0],
          session: userInfo,
          isLogin: true,
          isMine: false,
          id: req.params.id,
          nickname: nickname,
        });
      }
    } else {
      //로그인 x
      const isLogin = false;
      console.log('isLogin', isLogin);
      res.render('letter/myletter', {
        profile: req.session.profile,
        lord: lord[0],
        isLogin: false,
        isMine: false,
        id: req.params.id,
        nickname: nickname,
      });
    }
  },

  showPost: async (req, res) => {
    const { letterNo, postNo } = req.params;
    console.log('req.params ', req.params);
    const showPost = await Post.findOne({
      where: { letterNo: letterNo, postNo: postNo },
    });

    const showLikes = await PostLikes.findOne({
      where: { letterNo: letterNo, postNo: postNo },
      attributes: ['likesNum'],
    });
    console.log('showPost.postContent ', showPost.postContent);
    console.log(showLikes.likesNum);
    res.send({
      postContent: showPost.postContent,
      postNickname: showPost.postNickname,
      postIp: showPost.postIp,
      likesNo: showLikes.likesNo,
    });
  },
};

const input = {
  contentRegister: async (req, res) => {
    const letterNo = req.params.id;
    console.log(letterNo);
    const { postDesign, postContent, postNickname, postIp } = req.body;
    console.log(req.body);
    await Post.create({
      letterNo: letterNo,
      id: req.params.id,
      postContent: postContent,
      postNickname: postNickname,
      postIp: postIp,
      postDesign: postDesign,
    });

    // 글작성시 알림함에 추가
    const postInfo = await Post.findOne({
      where: { letterNo: letterNo, postNickname: postNickname },
    });

    await Notification.create({
      id: req.params.id,
      letterNo: letterNo,
      sender: postNickname,
      postNo: postInfo.postNo,
    });

    res.send({ result: 'true', id: letterNo });
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
