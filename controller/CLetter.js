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
  //TODO 친구리스트들가져오기
  friends: async (req, res) => {
    if (req.session.userInfo !== undefined) {
      const friend = await Friend.findAll({
        where: { id: req.session.userInfo.id },
      });
      req.session.friend = friend; //배열로
      console.log('req.session.friend는 ~~~~', req.session.friend);
      const friendProfiles = await Profile.findAll({
        where: {
          userId: req.session.friend.map((friend) => friend.friendUserId),
        },
      });
      //친구 프로필들은 배열 객체로 생성
      console.log('friendProfiles은 ~~~~', friendProfiles);
      const friendData = friendProfiles.map((profile) => ({
        profileLocation: profile.profileLocation,
        userId: profile.userId,
        id: profile.id,
      }));
      // [
      //   {
      //     profileLocation: '/img/profile/ì´\x88ì\x95\x881694843963578.png',
      //     userId: 'hb1234'
      //   },
      //   {
      //     profileLocation: '/img/profile/피카츄1694843819104.gif',
      //     userId: 'lobster100'
      //   }
      // ]
      res.render('letter/friends', {
        friend: req.session.friend,
        isLogin: true,
        session: req.session.userInfo,
        friendData: friendData,
      });
    } else {
      res.render('user/login', {
        session: req.session.userInfo,
        isLogin: false,
        message: '잘못된 접근입니다.!',
      });
    }
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
