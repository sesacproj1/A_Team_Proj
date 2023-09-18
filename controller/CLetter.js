const {
  Admin,
  Friend,
  MyLetter,
  Notice,
  Notification,
  Post,
  Profile,
  User,
  RequestList,
} = require('../models');

const output = {
  //TODO 친구리스트들가져오기 완료
  friends: async (req, res) => {
    const id = req.params.id;
    const userData = await User.findAll({
      where: { id: id },
    });
    const lord = userData.map((user) => user.dataValues); //친구목록 주인
    // console.log('주인', lord.id);
    // console.log('로그인 여부', req.session.userInfo.id);

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

      //로그인 했고 자기 페이지일 때
      if (lord.id == req.session.userInfo.id) {
        res.render('letter/friends', {
          lord: lord[0],
          friend: req.session.friend,
          isLogin: true,
          session: req.session.userInfo,
          friendData: friendData,
          isMine: true,
        });
      } else {
        res.render('letter/friends', {
          lord: lord[0],
          friend: req.session.friend,
          isLogin: true,
          session: req.session.userInfo,
          friendData: friendData,
          isMine: false,
        });
      }
    } else {
      res.render('user/login', {
        session: req.session.userInfo,
        isLogin: false,
        message: '잘못된 접근입니다.!',
      });
    }
  },

  friendConfirm: async (req, res) => {
    //친구요청목록
    console.log(req.session.userInfo);
    const request = await RequestList.findAll({
      where: { id: req.session.userInfo.id },
    });
    const requestProfiles = await Profile.findAll({
      where: {
        userId: request.map((friend) => friend.nickname),
      },
    });
    const requestData = requestProfiles.map((profile) => ({
      profileLocation: profile.profileLocation,
      userId: profile.userId,
      id: profile.id,
    }));

    res.render('letter/friendConfirm', {
      session: req.session.userInfo,
      requestData: requestData,
    });
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

  icon: async (req, res) => {
    const id = req.params.id;
    const result = await User.findOne({
      where: {
        id: id,
      },
    });
    console.log(result.nickname);
    res.render('letter/icon', {
      session: req.session.userInfo,
      data: result,
    });
  },
};

const input = {};

module.exports = { output, input };
