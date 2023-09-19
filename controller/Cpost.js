const {
  Post,
  PostLikes,
  Notification,
  User,
  Profile,
  Design,
} = require('../models');

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
    console.log('userInfo', userInfo);
    const idParam = req.params.id; //n
    console.log(idParam);

    const userData = await User.findAll({
      where: { id: req.params.id },
    });
    const profile = await Profile.findOne({
      where: { id: req.params.id },
    });

    const postData = await Post.findAll({
      where: { id: req.params.id },
      attributes: ['postNickname', 'postNo', 'postDesign'],
    });

    const nickname = postData.map((nick) => nick.postNickname);
    const postNo = postData.map((post) => post.postNo);
    const postDesign = postData.map((design) => design.postDesign);

    let designSrc = [];
    for (let design of postDesign) {
      const srcValue = await Design.findOne({
        where: { designNo: design },
      });
      console.log(srcValue);
      designSrc.push(srcValue.designLocation);
    }
    console.log(designSrc);

    // async function srcExtract(postDesign) {
    //   let designSrc = [];
    //   for (let design of postDesign) {
    //     const srcValue = await Design.findOne({
    //       where: { designNo: design },
    //     });
    //     console.log(srcValue);
    //     designSrc.push(srcValue.designLocation);
    //   }
    //   console.log(designSrc);
    //   return designSrc;
    // }

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
          postNo: postNo,
          postDesign: postDesign,
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
          postNo: postNo,
          postDesign: postDesign,
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
        postNo: postNo,
        postDesign: postDesign,
      });
    }
  },

  showPost: async (req, res) => {
    const { id, postNo } = req.params;
    console.log('req.params ', req.params);
    const showPost = await Post.findOne({
      where: { id: id, postNo: postNo },
    });

    const showLikes = await PostLikes.findOne({
      where: { id: id, postNo: postNo },
      attributes: ['likesNum'],
    });

    res.send({
      postContent: showPost.postContent,
      postNickname: showPost.postNickname,
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
      where: {
        letterNo: letterNo,
        postNickname: postNickname,
        postDesign: postDesign,
      },
    });

    await Notification.create({
      id: req.params.id,
      letterNo: letterNo,
      sender: postNickname,
      postNo: postInfo.postNo,
    });

    // 글작성시 좋아요 개수 0으로 default값 설정.
    await PostLikes.create({
      id: req.params.id,
      letterNo: letterNo,
      likesNum: 0,
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
    req.session.likes;

    if (!req.session.likes) {
      await PostLikes.update(
        {
          likesNum: likesNum,
        },
        { where: { letterNo: letterNo, postNo: postNo } }
      );

      res.send({ message: '좋아요!' });
    } else {
      res.send({ message: '좋아요는 한번만!' });
    }
  },
};

module.exports = { output, input };
