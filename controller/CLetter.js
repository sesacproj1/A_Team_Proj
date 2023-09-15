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
  friends: (req, res) => {
    res.render('letter/friends', { session: req.session.userInfo });
  },

  friendConfirm: (req, res) => {
    res.render('letter/friendConfirm', { session: req.session.userInfo });
  },

  myLetter: (req, res) => {
    res.render('letter/myletter', { session: req.session.userInfo });
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
