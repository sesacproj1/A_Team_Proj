const {
  Admin,
  Friend,
  MyLetter,
  Notice,
  Notification,
  Post,
  Profile,
  User,
} = require('../models');
const Sequelize = require('sequelize');

const output = {
  index: async (req, res) => {
    const curPage = 1 | req.query.curPage;
    console.log(req.query.curPage);

    const result = await User.findAll({
      // offset: 7 * (req.query.curPage - 1),
      order: [['id', 'ASC']],
      limit: 7,
    });
    console.log('req.body.curPage', req.body);

    // index.ejs 랜더 (data 키로 session 객체의 userInfo 전달)
    const userSession = req.session.userInfo;
    console.log(userSession);
    if (userSession !== undefined) {
      //로그인 했을때
      res.render('index', {
        isLogin: true,
        session: req.session.userInfo,
        data: result,
      });
    } else {
      //로그인 안했을 때
      // id: result2,
      res.render('index', {
        isLogin: false,
        session: req.session.userInfo,
        data: result,
      });
      // id: result2,
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
    console.log('세션있나요~~~ ', req.session.userInfo);
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
      // adminData가 없을 경우 빈 객체로 설정
      const adminData = result2 || {};

      return res.render('notice/notice', {
        data: result1,
        admin: true,
        adminData: adminData, // 항상 객체가 존재하도록 함
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
    // 유저 찾는 곳
    return res.render('user/findUser', { session: req.session.userInfo });
  },

  noticeUpdate: async (req, res) => {
    const result = await Notice.findOne({
      where: {
        noticeNo: req.params.noticeNo,
      },
    });
    console.log('시작' + result);
    return res.render('notice/noticeUpdate', {
      data: result,
      session: req.session.userInfo,
    });
  },

  myPage: async (req, res) => {
    // 1. userInfo 세션에 저장된 id를 이용해 현재 로그인한 유저의 id 값으로 특정 유저 정보 하나를 조회
    // 2. mypage.ejs 랜더 + data 키로 특정 유저를 찾은 결과를 넘김

    if (req.session.userInfo !== undefined) {
      //로그인해서 세션있을 때
      const user = await User.findOne({
        where: { userId: req.session.userInfo.userId },
      });
      console.log('req.session.userInfo는~~ ', req.session.userInfo);
      const profile = await Profile.findOne({
        where: { id: req.session.userInfo.id },
      });

      const postData = await Post.findAll({
        where: { id: req.session.userInfo.id },
        attributes: ['postNo'],
      });

      const notification = await Notification.findAll({
        where: { id: req.session.userInfo.id },
      });
      const isFriend = await Friend.findOne({
        where: { id: req.session.userInfo.id },
      });
      console.log(notification.length);
      const post = postData.map((data) => data.postNo);

      console.log('profile', profile);

      req.session.profile = profile;

      console.log('req.session.profile~~ ', req.session.profile);
      if (isFriend) {
        //friend있으면
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
          noti: notification.length + 1,
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
          noti: notification.length,
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
    console.log(result2);
    return res.send(result2);
  },

  noticeDelete: async (req, res) => {
    // 공지사항 지우는 메서드
    const result = await Notice.destroy({
      where: {
        noticeNo: req.params.noticeNo,
      },
    });
    console.log(result);
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

    console.log(result);
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
