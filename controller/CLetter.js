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
  //TODO 친구리스트들가져오기 완료
  friends: async (req, res) => {
    const id = req.params.id;
    const userData = await User.findAll({
      where: { id: id },
    });
    const lord = userData.map((user) => user.dataValues); //친구목록 주인

    //비로그인시 친구목록 접근권한없음
    if (req.session.userInfo !== undefined) {
      const friend = await Friend.findAll({
        where: { id: id },
      }); //params로 친구찾기
      req.session.friend = friend; //배열로로나옴
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

      res.render('letter/friends', {
        lord: lord[0],
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

  // myLetter: async (req, res) => {
  //   if(req.session.userInfo !== undefined){
  //     const user = await User.findOne({
  //       where: { userId: req.session.userInfo.userId },
  //     });
  //   }
  //     if(user !== undefined){
  //       res.render('letter/myletter', {
  //         data: user,
  //         isLogin: true,
  //         session: req.session.userInfo,
  //         profile: req.session.profile,
  //     });
  //   }
  //   else {
  //     res.render('letter/myletter', {
  //       isLogin: false,
  //       message: '잘못된 접근입니다. 로그인해주세요',
  //     });
  //   }
  // },

  icon: (req, res) => {
    res.render('letter/icon', { session: req.session.userInfo });
  },
};

const input = {};

module.exports = { output, input };
