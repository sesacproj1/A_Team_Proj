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
    res.render('letter/friends');
  },

  friendConfirm: (req, res) => {
    res.render('letter/friendConfirm');
  },

<<<<<<< HEAD
   myLetter : (req,res)=>{
      res.render('letter/myletter');
   },

   icon : (req,res)=>{
    res.render('letter/icon');
   }
  }
=======
  myLetter: (req, res) => {
    res.render('letter/myletter');
  },
>>>>>>> d898fdc3a57e91006771737f775b6a7b017e4000

  yourLetter: (req, res) => {
    res.render('letter/yourLetter');
  },
};

const input = {};

module.exports = { output, input };
