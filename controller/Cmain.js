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

  noticePost: async (req, res) => {
    res.render('notice/noticeWrite');
  },

  noticeDetail: async (req, res) => {
    // 공지사항 페이지에서 전체 글들 리스트 불러오기
    const result1 = await Notice.findAll();
    return res.send({
      data: result1,
    });
  },

  noticeOne: async (req, res) => {
    // 공지사항 긴글을 보고싶을 시 클릭하면 특정한 id 글 가져오기
    const result1 = await Notice.findOne({
      where: {
        noticeNo: req.params.noticeNo,
      },
    });
    console.log(result1);
    return res.render('notice/noticeDetail', {
      data: result1,
    });
  },

  noticeUpdate: async (req, res) => {
    // 공지사항 업데이트 페이지 렌더링
    const result1 = await Notice.findOne({
      where: {
        noticeNo: req.params.noticeNo,
      },
    });
    console.log(result1);
    return res.render('notice/noticeUpdate', {
      data: result1,
    });
  },
};

const input = {
  noticePost: async (req, res) => {
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
