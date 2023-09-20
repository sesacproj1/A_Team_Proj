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
    let curPage = req.query.curPage;
    console.log('paramsPage next', req.query.curPage);
    console.log('curpage next', curPage);
    const postData = await Post.findAll({
      where: { id: req.params.id },
      attributes: ['postNickname', 'postDesign'],
      offset: 5 * req.query.curPage,
      limit: 5,
      order: [['id', 'ASC']],
    });
    console.log('번호', postData);

    res.send({ postData: postData });
  },

  prevPage: async (req, res) => {
    let curPage = 1 | req.query.curPage;
    console.log('paramsPage prev', req.query.curPage);
    console.log('curpage prev', curPage);
    const postData2 = await Post.findAll({
      where: { id: req.params.id },
      attributes: ['postNickname', 'postDesign'],
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
      where: { letterNo: req.params.id },
      limit: 5,
      attributes: ['letterNo', 'postNickname', 'postNo', 'postDesign'],
    });
    console.log('포스트데이터 ->', postData);
    const nickname = postData.map((nick) => nick.postNickname);
    const postNo = postData.map((post) => post.postNo);
    const postDesign = postData.map((design) => design.postDesign);
    console.log('postData는', postData);
    console.log('닉네임은', nickname);
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
    const count = await PostLikes.count({
      where: {
        postNo: postNo,
        letterNo: req.params.id,
      },
    });
    console.log('count는', count);
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
          count: count,
          // isLike: isLike,
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
            count: count,
            // isLike: isLike,
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
        count: count,
      });
    }
  },
  showPost: async (req, res) => {
    const { id, postNo } = req.params;
    console.log('id는', id);
    console.log('postNo는', postNo);
    try {
      const showPost = await Post.findOne({
        where: { letterNo: id, postNo },
      });
      console.log('showpost는 -> ', showPost);
      // const showLikes = await PostLikes.findOne({
      //   where: { id, postNo },
      //   attributes: ['likesNum'],
      // });
      const postData = await Post.findAll({
        where: { id: req.params.id },
        attributes: ['postNickname', 'postNo', 'postDesign', 'postContent'],
      });

      console.log('postData -> ', postData);
      const count = await PostLikes.count({
        where: {
          postNo: postNo,
          letterNo: id,
        },
      });
      if (req.session.userInfo) {
        const isDeleteSender = await Post.findOne({
          //편지를쓴사람이 지우려할때
          where: { id: req.session.userInfo.id, postNo: postNo },
        });
        const isDeletelord = await Post.findOne({
          //편지함 주인이 지우려할때
          where: { letterNo: req.session.userInfo.id, postNo: postNo },
        });

        const like = await PostLikes.findAll({
          where: {
            postNo: postNo,
            id: req.session.userInfo.id,
          },
        });
        console.log('isLike의 like는', like);
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
        const isDeleteSender = await Post.findOne({
          //편지를쓴사람이 지우려할때
          where: { id: 0, postNo: postNo },
        });
        // const isDeletelord = await Post.findOne({
        //   //편지함 주인이 지우려할때
        //   where: { letterNo: id, postNo: postNo },
        // });
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
  // showPost: async (req, res) => {
  //   const { id, postNo } = req.params;
  //   console.log('req.params ', req.params);
  //   try {
  //     await Promise.all([
  //       const showPost = await Post.findOne({
  //         where: { id: id, postNo: postNo },
  //       }),
  //       const showLikes = await PostLikes.findOne({
  //         where: { id: id, postNo: postNo },
  //         attributes: ['likesNum'],
  //       }),
  //     ]);
  //     if (showLikes !== null) {
  //       res.send({
  //         postContent: showPost.postContent,
  //         postNickname: showPost.postNickname,
  //         likesNo: showLikes.likesNum,
  //       });
  //     } else {
  //       res.send({
  //         postContent: showPost.postContent,
  //         postNickname: showPost.postNickname,
  //         likesNo: 0,
  //       });
  //   } }catch (error) {
  //     console.error('친구 삭제 중 오류 발생:', error);
  //   }
  // },
  // const showPost = await Post.findOne({
  //   where: { id: id, postNo: postNo },
  // });

  // const showLikes = await PostLikes.findOne({
  //   where: { id: id, postNo: postNo },
  //   attributes: ['likesNum'],
  // });
};

const input = {
  contentRegister: async (req, res) => {
    const letterNo = req.params.id;
    console.log(letterNo);
    const { postDesign, postContent, postNickname, postIp, pw } = req.body;
    console.log(req.body);
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
        id: 0,
        letterNo: letterNo,
        sender: postNickname,
        postNo: postInfo.postNo,
        pw: pw,
      });
    } else {
      //익명일때
      await Post.create({
        letterNo: letterNo,
        id: 0, //익명의 id 인덱스는 0
        postContent: postContent,
        postNickname: postNickname,
        postIp: postIp,
        postDesign: postDesign,
        pw: pw,
      });
    }

    // 글작성시 좋아요 개수 0으로 default값 설정.
    // await PostLikes.create({
    //   id: req.params.id,
    //   letterNo: letterNo,
    //   likesNum: 0,
    //   postNo: postInfo.postNo,
    // });

    res.send({ result: 'true', id: letterNo });
  },

  // contentDelete: async (req, res) => {
  //   const { letterNo, postNo } = req.params;
  //   await Post.destroy({
  //     where: { letterNo: letterNo, postNo: postNo },
  //   });

  //   res.send({ result: 'true' });
  // },

  updateLikes: async (req, res) => {
    if (req.session.userInfo === undefined) {
      return res.send({ message: '로그인해주세요!' });
    }
    const { id, postNo } = req.params;

    const isLikes = await PostLikes.findAll({
      where: {
        postNo: postNo,
        letterNo: id,
      },
    });
    console.log('isLikes는', isLikes);
    if (isLikes.length !== 0) {
      console.log('이미 좋아요 누름 ');
      //이미 좋아요 눌렀다면
      await PostLikes.destroy({
        where: { postNo: postNo, letterNo: id },
      });
      //좋아요 취소하기
      const count = await PostLikes.count({
        where: {
          postNo: postNo,
          letterNo: id,
        },
      });
      return res.send({
        isLike: true,
        count: count,
        src: '/img/header/heart1.png',
      });
    } else {
      await PostLikes.create({
        postNo: parseInt(postNo) + 1,
        letterNo: id,
        id: req.session.userInfo.id,
        likesNum: 1,
      });
    }
    const count = await PostLikes.count({
      where: {
        postNo: parseInt(postNo) + 1,
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
    const { id, postNo } = req.params;
    await PostLikes.destroy({
      where: {
        postNo: parseInt(postNo) - 1,
        letterNo: id,
        id: req.session.userInfo.id,
      },
    });
    //좋아요 취소하기
    const count = await PostLikes.count({
      where: {
        postNo: parseInt(postNo) - 1,
        letterNo: id,
      },
    });
    return res.send({
      isLike: true,
      count: count,
      src: '/img/header/heart1.png',
    });
  },
  // router.delete('/post/delete', controllerFriend.input.postDelete);
  postDelete: async (req, res) => {
    const postNo = req.params.postNo;
    console.log('지울 postNo는', postNo);
    await Post.destroy({
      where: { postNo: postNo },
    });
    res.send({ message: '편지가 삭제되었습니다.' });
  },
};

module.exports = { output, input };
