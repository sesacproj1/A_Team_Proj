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

const output = {
  index: async (req, res) => {
    const result = await User.findAll();

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
  prevPage: async (req, res) => {
    const result = await User.findAll();
    res.send({ data: result });
  },

  nextPage: async (req, res) => {
    const result = await User.findAll();
    res.send({ data: result });
  },

  prevPage: async (req, res) => {
    const result = await User.findAll();
    res.send({ data: result });
  },

  userLogin: (req, res) => {
    //유저 로그인 렌더 페이지입니다
    return res.render('user/login');
  },

  userRegister: (req, res) => {
    //회원가입 렌더 페이지 입니다.
    return res.render('user/register');
  },

  noticeMain: async (req, res) => {
    // 공지사항 페이지에서 전체 글들 리스트 불러오기
    const result1 = await Notice.findAll();
    return res.render('notice/notice', {
      data: result1,
    });
  },

  userLogin: (req, res) => {
    return res.render('user/login');
  },

  userRegister: (req, res) => {
    return res.render('user/register');
  },

  noticePost: (req, res) => {
    return res.render('notice/noticePost');
  },

  findUser: async (req, res) => {
    // 유저 찾는 곳
    return res.render('user/findUser');
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
    });
  },

  myPage: async (req, res) => {
    // 1. userInfo 세션에 저장된 id를 이용해 현재 로그인한 유저의 id 값으로 특정 유저 정보 하나를 조회
    // 2. mypage.ejs 랜더 + data 키로 특정 유저를 찾은 결과를 넘김
    console.log('req.session.userInfo는~~ ', req.session.userInfo);
    if (req.session.userInfo !== undefined) {
      //로그인해서 세션있을 때
      const user = await User.findOne({
        where: { userId: req.session.userInfo.userId },
      });
      return res.render('user/myPage', {
        data: user,
        isLogin: true,
        isProfile: true,
      });
    } else {
      return res.render('user/login', {
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
};

module.exports = { output, input };
