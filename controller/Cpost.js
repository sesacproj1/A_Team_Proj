const {
  Post,
  PostLikes,
  Notification,
  User,
  Profile,
  Friend,
  RequestList,
  Design,
  NotificationLikes,
} = require('../models');
let isDeleteSender;
let isDeletelord;

const output = {
  content: (req, res) => {
    res.render('letter/postContent');
  },

  nextPage: async (req, res) => {
    let curPage = req.query.curPage;

    const postData = await Post.findAll({
      where: { letterNo: req.params.id },
      attributes: ['postNickname', 'postDesign'],
      offset: 5 * req.query.curPage,
      limit: 5,
      order: [['letterNo', 'ASC']],
    });

    res.send({ postData: postData });
  },

  prevPage: async (req, res) => {
    let curPage = 1 | req.query.curPage;
    const postData2 = await Post.findAll({
      where: { letterNo: req.params.id },
      attributes: ['postNickname', 'postDesign'],
      offset: 5 * (req.query.curPage - 2),
      limit: 5,
      order: [['letterNo', 'ASC']],
    });

    console.log('편지', postData2);
    res.send({ postData: postData2 });
  },

  showMyLetter: async (req, res) => {
    const userInfo = req.session.userInfo;
    const idParam = req.params.id;

    const userData = await User.findAll({
      where: { id: idParam },
    });

    const profile = await Profile.findOne({
      where: { id: req.params.id },
    });

    let curPage = 1 | req.query.curPage;
    const postData = await Post.findAll({
      where: { letterNo: req.params.id },
      limit: 5,
      attributes: ['letterNo', 'postNickname', 'postNo', 'postDesign'],
    });

    const postNo3 = await Post.findAll({
      where: {
        letterNo: req.params.id,
      },
    });
    const postIds = postNo3.map((post) => post.postNo);

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

    req.session.profile = profile;
    const lord = userData.map((user) => user.dataValues);
    const count = await PostLikes.count({
      where: {
        postNo: postNo,
        letterNo: req.params.id,
      },
    });

    if (userInfo) {
      //로그인 했을 때
      if (userInfo.id == idParam) {
        const isMine = true;
        res.render('letter/myletter', {
          profile: req.session.profile,
          lord: lord[0],
          session: userInfo,
          isLogin: true,
          isMine: true,
          id: req.params.id,
          nickname: nickname,
          postNo1: postIds,
          postNo: postNo,
          postDesign: designSrc,
          count: count,
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

          const isMine = false;
          res.render('letter/myletter', {
            profile: req.session.profile,
            lord: lord[0],
            session: userInfo,
            isLogin: true,
            isMine: false,
            id: req.params.id,
            nickname: nickname,
            postNo1: postIds,
            postNo: postNo,
            postDesign: designSrc,
            checkFriend: checkFriend,
            checkRequest: checkRequest,
            count: count,
          });
        } catch (error) {
          console.error('오류 발생:', error);
        }
      }
    } else {
      //로그인 x
      const isLogin = false;
      res.render('letter/myletter', {
        profile: req.session.profile,
        lord: lord[0],
        isLogin: false,
        isMine: false,
        id: req.params.id,
        nickname: nickname,
        postNo: postNo,
        postNo1: postIds,
        postDesign: postDesign,
        postDesign: designSrc,
        count: count,
      });
    }
  },
  showPost: async (req, res) => {
    const { id, postNo } = req.params;
    try {
      const showPost = await Post.findOne({
        where: { letterNo: id, postNo },
      });
      const postData = await Post.findAll({
        where: { id: req.params.id },
        attributes: ['postNickname', 'postNo', 'postDesign', 'postContent'],
      });

      const count = await PostLikes.count({
        where: {
          postNo: postNo,
          letterNo: id,
        },
      });

      if (req.session.userInfo) {
        isDeleteSender = await Post.findOne({
          //편지를쓴사람이 지우려할때
          where: { id: req.session.userInfo.id, postNo: postNo },
        });
        isDeletelord = await Post.findOne({
          //편지함 주인이 지우려할때
          where: { letterNo: req.session.userInfo.id, postNo: postNo },
        });

        const like = await PostLikes.findAll({
          where: {
            postNo: postNo,
            id: req.session.userInfo.id,
          },
        });
        let isLike;
        if (like.length !== 0) {
          //이미 좋아요를 눌렀다면
          isLike = true;
        } else {
          isLike = false;
        }

        res.send({
          postContent: showPost.postContent,
          postNickname: showPost.postNickname,
          count,
          isLike: isLike,
          isDeleteSender: isDeleteSender,
          isDeletelord: isDeletelord,
        });
      } else {
        //익명일때
        isDeleteSender = await Post.findOne({
          //편지를쓴사람이 지우려할때
          where: { id: 0, postNo: postNo },
        });
        //편지함 주인이 지우려할때
        res.send({
          postContent: showPost.postContent,
          postNickname: showPost.postNickname,
          count,
          isDeleteSender: isDeleteSender,
          isDeletelord: null,
        });
      }
    } catch (error) {
      console.error('게시물 조회 중 오류 발생:', error);
      res.status(500).send('게시물을 조회하는 동안 오류가 발생했습니다.');
    }
  },
};

const input = {
  contentRegister: async (req, res) => {
    const letterNo = req.params.id;
    const { postDesign, postContent, postNickname, postIp, pw } = req.body;
    if (req.session.userInfo !== undefined) {
      await Post.create({
        letterNo: letterNo,
        id: req.session.userInfo.id,
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
        id: req.session.userInfo.id,
        letterNo: letterNo,
        sender: postNickname,
        postNo: postInfo.postNo,
        pw: pw,
      });
    } else {
      //익명일때
      await Post.create({
        letterNo: letterNo,
        id: 0,
        postContent: postContent,
        postNickname: postNickname,
        postIp: postIp,
        postDesign: postDesign,
        pw: pw,
      });
      const postInfo = await Post.findOne({
        where: {
          letterNo: letterNo,
          postNickname: postNickname,
          postDesign: postDesign,
        },
      });
      await Notification.create({
        id: 0,
        letterNo: letterNo,
        sender: postNickname,
        postNo: postInfo.postNo,
        pw: pw,
      });
    }

    res.send({ result: 'true', id: letterNo });
  },

  updateLikes: async (req, res) => {
    if (req.session.userInfo === undefined) {
      return res.send({ message: '로그인해주세요!' });
    }
    const { id, postNumber } = req.params;

    await PostLikes.create({
      postNo: postNumber,
      letterNo: id,
      id: req.session.userInfo.id,
      likesNum: 1,
    });

    await NotificationLikes.create({
      postNo: postNumber,
      letterNo: id,
      id: req.session.userInfo.id,
      likesWho: req.session.userInfo.userId,
    });

    const count = await PostLikes.count({
      where: {
        postNo: postNumber,
        letterNo: id,
      },
    });
    return res.send({
      isLike: false,
      count: count,
      src: '/img/header/heart2.png',
    });
  },
  likeCancel: async (req, res) => {
    if (req.session.userInfo === undefined) {
      return res.send({ message: '로그인해주세요!' });
    }
    const { id, postNumber } = req.params;
    await PostLikes.destroy({
      where: {
        postNo: postNumber,
        letterNo: id,
        id: req.session.userInfo.id,
      },
    });
    //좋아요 취소하기
    const count = await PostLikes.count({
      where: {
        postNo: postNumber,
        letterNo: id,
      },
    });
    return res.send({
      isLike: true,
      count: count,
      src: '/img/header/heart1.png',
    });
  },
  postDelete: async (req, res) => {
    if (req.body.pw !== '') {
      if (isDeleteSender !== null) {
        //익명일때
        if (isDeleteSender.pw === req.body.pw) {
          //비밀번호 일치시
          await Post.destroy({
            where: { id: 0, postNickname: isDeleteSender.postNickname },
          });

          return res.send({ message: '편지가 삭제되었습니다.' });
        } else {
          return res.send({ message: '비밀번호가 일치하지 않습니다.' });
        }
      }
    } else {
      //편지주인일때
      if (isDeletelord === null) {
        await Post.destroy({
          where: {
            id: isDeleteSender.id,
            postNo: isDeletelord.postNo,
          },
        });
      } else {
        await Post.destroy({
          where: {
            id: isDeletelord.id,
            postNo: isDeletelord.postNo,
          },
        });
      }

      return res.send({ message: '편지가 삭제되었습니다.' });
    }
  },
};

module.exports = { output, input };
