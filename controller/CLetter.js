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
    friends : (req,res)=>{
        res.render('letter/friends');
    },


  }

  const input = {

  }

  module.exports = {output, input};