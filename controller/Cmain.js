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
  index: (req, res) => {
    res.render('index');
    // 메인 루트 페이지 렌더링하는 기능입니다.
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

  noticePost: (req, res) => {
    return res.render('notice/noticePost');
  },

  findUser: async (req, res) => {
    // 유저 찾는 곳
    return res.render('user/findUser');
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
      return res.send('성공');
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
