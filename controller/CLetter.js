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
  friends : (req,res) => {
    res.render('letter/friends', {session : req.session.userInfo});
  },

  friendConfirm: (req, res) => {
    res.render('letter/friendConfirm', { session: req.session.userInfo });
  },

  myLetter: async (req, res) => {
    if (req.session.userInfo !== undefined) {
      const user = await User.findOne({
        where: { userId: req.session.userInfo.userId },
      });
      res.render('letter/myletter', {
        data: user,
        isLogin: true,
        session: req.session.userInfo,
        profile: req.session.profile,
      });
    } else {
      res.render('user/login', {
        isLogin: false,
        message: '잘못된 접근입니다. 로그인해주세요',
      });
    }
  },

  icon: (req, res) => {
    res.render('letter/icon', { session: req.session.userInfo });
  },

  yourLetter: (req, res) => {
    res.render('letter/yourLetter', { session: req.session.userInfo });
  },
};

const input = {};

module.exports = { output, input };
