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
  friends: async (req, res) => {
    const id = req.params.id;
    const userData = await User.findAll({
      where: { id: id },
    });
    const lord = userData.map((user) => user.dataValues);

    if (req.session.userInfo !== undefined) {
      const friend = await Friend.findAll({
        where: { id: id },
      });
      req.session.friend = friend;
      const friendProfiles = await Profile.findAll({
        where: {
          userId: req.session.friend.map((friend) => friend.friendUserId),
        },
      });

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

  friendConfirm: async (req, res) => {
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

  icon: async (req, res) => {
    const id = req.params.id;
    const result = await User.findOne({
      where: {
        id: id,
      },
    });
    res.render('letter/icon', {
      session: req.session.userInfo,
      data: result,
    });
  },
};

const input = {};

module.exports = { output, input };
