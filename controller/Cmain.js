const {
  Admin,
  Friend,
  MyLetter,
  Notice,
  Notification,
  NotificationLikes,
  RequestList,
  Post,
  PostLikes,
  Design,
  Profile,
  User,
} = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const output = {
  index: async (req, res) => {
    const curPage = 1 | req.query.curPage;

    const result = await User.findAll({
      order: [['id', 'ASC']],
      limit: 7,
    });

    const userSession = req.session.userInfo;
    if (userSession !== undefined) {
      //로그인 했을때
      res.render('index', {
        isLogin: true,
        session: req.session.userInfo,
        data: result,
      });
    } else {
      //로그인 안했을 때
      res.render('index', {
        isLogin: false,
        session: req.session.userInfo,
        data: result,
      });
    }
  },

  // 페이징
  nextPage: async (req, res) => {
    const result = await User.findAll();
    res.send({ data: result });
  },

  prevPage: async (req, res) => {
    const result = await User.findAll();
    res.send({ data: result });
  },

  userLogin: (req, res) => {
    if (req.session.userInfo !== undefined) {
      return res.render('user/login', {
        message: '잘못된 접근입니다.',
        isLogin: true,
      });
      //이미 로그인상태라면
    } else {
      //유저 로그인 렌더 페이지입니다
      return res.render('user/login');
    }
  },

  userRegister: (req, res) => {
    //회원가입 렌더 페이지 입니다.
    return res.render('user/register');
  },

  noticeMain: async (req, res) => {
    // 공지사항 페이지에서 전체 글들 리스트 불러오기
    if (req.session.userInfo) {
      const result1 = await Notice.findAll();
      const result2 = await Admin.findOne({
        where: {
          id: req.session.userInfo.id,
        },
      });
      const adminData = result2 || {};

      return res.render('notice/notice', {
        data: result1,
        admin: true,
        adminData: adminData,
        session: req.session.userInfo,
      });
    } else {
      const result1 = await Notice.findAll();
      return res.render('notice/notice', {
        data: result1,
        admin: false,
        adminData: '',
        session: req.session.userInfo,
      });
    }
  },

  noticePost: (req, res) => {
    return res.render('notice/noticePost', { session: req.session.userInfo });
  },

  findUser: async (req, res) => {
    return res.render('user/findUser', { session: req.session.userInfo });
  },

  noticeUpdate: async (req, res) => {
    const result = await Notice.findOne({
      where: {
        noticeNo: req.params.noticeNo,
      },
    });
    return res.render('notice/noticeUpdate', {
      data: result,
      session: req.session.userInfo,
    });
  },

  myPage: async (req, res) => {
    if (req.session.userInfo !== undefined) {
      //로그인해서 세션있을 때
      const user = await User.findOne({
        where: { userId: req.session.userInfo.userId },
      });
      const profile = await Profile.findOne({
        where: { id: req.session.userInfo.id },
      });

      const postData = await Post.findAll({
        where: { id: req.session.userInfo.id },
        attributes: ['postNo'],
      });

      const notification = await Notification.findAll({
        where: { letterNo: req.session.userInfo.id },
      });
      const notificationLikes = await NotificationLikes.findAll({
        where: {
          letterNo: req.session.userInfo.id,
          id: { [Op.ne]: req.session.userInfo.id },
        },
      });
      const isFriend = await Friend.findOne({
        where: { id: req.session.userInfo.id },
      });
      const postCount = await Post.count({
        where: { letterNo: req.session.userInfo.id },
      });

      const likeCount = await PostLikes.count({
        where: { id: req.session.userInfo.id },
      });

      const isRequest = await RequestList.findAll({
        where: { id: req.params.id },
      });

      const eachNoti = notification.map((no) => no.postNo);
      const sender = notification.map((send) => send.sender);

      const eachLikes = notificationLikes.map((like) => like.postNo);
      const likesWho = notificationLikes.map((send) => send.likesWho);

      const eachRequest = isRequest.map((request) => request.nickname);
      const requestId = isRequest.map((reqId) => reqId.requestId);

      let notiLength = notification.length;
      if (isRequest) {
        notiLength = notification.length + isRequest.length;
      } else {
        notiLength = notification.length;
      }
      const post = postData.map((data) => data.postNo);

      req.session.profile = profile;

      let isAlarmDel = 'false';
      if (req.session.alarmDel) {
        isAlarmDel = 'true';
      }

      if (isFriend) {
        const friend = await Friend.findAll({
          where: { id: req.session.userInfo.id },
        });

        const numberOfFriends = friend.length;

        return res.render('user/myPage', {
          session: req.session.userInfo,
          profile: req.session.profile,
          data: user,
          isLogin: true,
          isProfile: true,
          friend: numberOfFriends,
          postNo: post,
          noti: notiLength + notificationLikes.length,
          postCount: postCount,
          likeCount: likeCount,
          postNoti: eachNoti,
          likesWho: likesWho,
          sender: sender,
          eachRequest: eachRequest,
          requestId: requestId,
          postLikes: eachLikes,
          isAlarmDel: isAlarmDel,
        });
      } else {
        return res.render('user/myPage', {
          session: req.session.userInfo,
          profile: req.session.profile,
          data: user,
          isLogin: true,
          isProfile: true,
          postNo: post,
          friend: 0,
          noti: notiLength + notificationLikes.length,
          postCount: postCount,
          likeCount: likeCount,
          postNoti: eachNoti,
          likesWho: likesWho,
          sender: sender,
          eachRequest: eachRequest,
          requestId: requestId,
          postLikes: eachLikes,
          isAlarmDel: isAlarmDel,
        });
      }
    } else {
      return res.render('user/login', {
        session: req.session.userInfo,
        isLogin: false,
        isProfile: false,
        message: '로그인해주세요!',
      });
    }
  },
  likeList: async (req, res) => {
    const id = req.params.id;

    try {
      // 사용자 정보 조회
      const userData = await User.findAll({
        where: { id: id },
      });

      // 좋아요목록 주인 정보 추출
      const lord = userData.map((user) => user.dataValues);

      // 비로그인 상태일 때 처리
      if (req.session.userInfo !== undefined) {
        // 좋아요 정보 조회
        const like = await PostLikes.findAll({
          where: { id: id },
        });
        req.session.like = like; // 좋아요 정보 저장

        // 좋아요로부터 postNo 추출
        const postNos = req.session.like.map((like) => like.postNo);

        // Post 테이블에서 좋아요로 선택한 글들 조회
        const likePost = await Post.findAll({
          where: {
            postNo: postNos,
          },
        });

        // 좋아요 데이터 가공
        const likeData = await Promise.all(
          likePost.map(async (data) => {
            // 좋아요 누른 편지의 주인 정보 조회
            const ownerInfo = await User.findOne({
              where: { id: data.letterNo },
            });

            // Design 테이블과 연결하여 designLocation 값을 가져오기
            const design = await Design.findOne({
              where: { designNo: data.postDesign },
            });

            return {
              designLocation: design ? design.designLocation : null,
              postNickname: data.postNickname,
              postContent: data.postContent,
              postDesign: data.postDesign,
              id: data.letterNo,
              ownerInfo: ownerInfo ? ownerInfo.dataValues : null,
            };
          })
        );

        // 좋아요 데이터 출력

        res.render('user/likeList', {
          lord: lord[0],
          like: req.session.like,
          isLogin: true,
          session: req.session.userInfo,
          likeData: likeData,
        });
      } else {
        // 비로그인 상태일 때 로그인 페이지로 리다이렉트
        res.render('user/login', {
          session: req.session.userInfo,
          isLogin: false,
          message: '잘못된 접근입니다.!',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
};
const input = {
  noticePost: async (req, res) => {
    // 공지사항 글쓰는 메서드
    const result2 = await Notice.create({
      noticeHeader: req.body.noticeHeader,
      noticeContent: req.body.noticeContent,
      id: req.body.id,
      adminId: req.body.id,
    });
    return res.send(result2);
  },

  noticeDelete: async (req, res) => {
    // 공지사항 지우는 메서드
    const result = await Notice.destroy({
      where: {
        noticeNo: req.params.noticeNo,
      },
    });
    if (result === 1) {
      return res.redirect('/notice');
    }
  },

  noticeUpdate: async (req, res) => {
    //공지사항 업데이트하는 메서드
    const result = await Notice.update(
      {
        noticeHeader: req.body.noticeHeader,
        noticeContent: req.body.noticeContent,
      },
      {
        where: {
          noticeNo: req.params.noticeNo,
        },
      }
    );

    return res.send(result);
  },

  search: async (req, res) => {
    const keyword = req.query.keyword;
    const users = await User.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nickname: { [Sequelize.Op.like]: `%${keyword}%` } },
        ],
      },
    });

    if (users) {
      return res.send({
        msg: true,
        data: users,
      });
    } else {
      return res.send({
        msg: false,
      });
    }
  },
};

module.exports = { output, input };
