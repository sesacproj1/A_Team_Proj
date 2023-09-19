const {
  Post,
  PostLikes,
  Notification,
  User,
  Profile,
  Friend,
  RequestList,
  Design,
} = require('../models');

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
      where: { id: idParam },
    });

    const profile = await Profile.findOne({
      where: { id: req.params.id },
    });

    let curPage = 1 | req.query.curPage;
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

    console.log('profile은', profile);
    req.session.profile = profile;
    const lord = userData.map((user) => user.dataValues);
    console.log('lord는', lord[0]);
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
          postDesign: designSrc,
        });
      } else {
        try {
          const friend = await User.findOne({
            where: { id: idParam },
          });

          const checkFriend = await Friend.findOne({
            where: { id: req.session.userInfo.id, friendUserId: friend.userId },
          });

          const checkRequest = await RequestList.findOne({
            where: { id: friend.id, nickname: req.session.userInfo.userId },
          });

          // 작업 결과를 사용할 수 있음
          console.log('friend:', friend);
          console.log('checkFriend:', checkFriend);
          console.log('checkRequest:', checkRequest);
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
            postDesign: designSrc,
            checkFriend: checkFriend,
            checkRequest: checkRequest,
          });
        } catch (error) {
          console.error('오류 발생:', error);
        }
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
        postDesign: designSrc,
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
      likesNo: showLikes.likesNum,
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
    const { id, postNo } = req.params;
    const likesNum = req.body.number;
    req.session.likes = postNo;

    if (!req.session.likes) {
      await PostLikes.update(
        {
          likesNum: likesNum,
        },
        { where: { letterNo: id, postNo: postNo } }
      );

      res.send({ message: '좋아요!' });
    } else {
      res.send({ message: '좋아요는 한번만!' });
    }
  },
};

module.exports = { output, input };
