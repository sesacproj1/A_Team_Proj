const {
  Admin,
  Friend,
  MyLetter,
  Notice,
  Notification,
  NotificationLikes,
  RequestList,
  Post,
  Profile,
  User,
} = require('../models');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const output = {
  index: async (req, res) => {
    const curPage = 1 | req.query.curPage;

    const result = await User.findAll({
      order: [['id', 'ASC']],
      limit: 7,
    });

    const userSession = req.session.userInfo;

    if (userSession !== undefined) {
      res.render('index', {
        isLogin: true,
        session: req.session.userInfo,
        data: result,
      });
    } else {
      res.render('index', {
        isLogin: false,
        session: req.session.userInfo,
        data: result,
      });
    }
  },

  nextPage: async (req, res) => {
    const result = await User.findAll();
    res.send({ data: result });
  },

  prevPage: async (req, res) => {
    const result = await User.findAll();
    res.send({ data: result });
  },

  userLogin: (req, res) => {
    if (req.session.userInfo !== undefined) {
      return res.render('user/login', {
        message: '잘못된 접근입니다.',
        isLogin: true,
      });
    } else {
      return res.render('user/login');
    }
  },

  userRegister: (req, res) => {
    return res.render('user/register');
  },

  noticeMain: async (req, res) => {
    if (req.session.userInfo) {
      const result1 = await Notice.findAll();
      const result2 = await Admin.findOne({
        where: {
          id: req.session.userInfo.id,
        },
      });
      const adminData = result2 || {};

      return res.render('notice/notice', {
        data: result1,
        admin: true,
        adminData: adminData,
        session: req.session.userInfo,
      });
    } else {
      const result1 = await Notice.findAll();
      return res.render('notice/notice', {
        data: result1,
        admin: false,
        adminData: '',
        session: req.session.userInfo,
      });
    }
  },

  noticePost: (req, res) => {
    return res.render('notice/noticePost', { session: req.session.userInfo });
  },

  findUser: async (req, res) => {
    return res.render('user/findUser', { session: req.session.userInfo });
  },

  noticeUpdate: async (req, res) => {
    const result = await Notice.findOne({
      where: {
        noticeNo: req.params.noticeNo,
      },
    });
    return res.render('notice/noticeUpdate', {
      data: result,
      session: req.session.userInfo,
    });
  },

  myPage: async (req, res) => {
    if (req.session.userInfo !== undefined) {
      const user = await User.findOne({
        where: { userId: req.session.userInfo.userId },
      });

      const profile = await Profile.findOne({
        where: { id: req.session.userInfo.id },
      });

      const postData = await Post.findAll({
        where: { id: req.session.userInfo.id },
        attributes: ['postNo'],
      });

      const notification = await Notification.findAll({
        where: { letterNo: req.session.userInfo.id },
      });
      const notificationLikes = await NotificationLikes.findAll({
        where: {
          letterNo: req.session.userInfo.id,
          id: { [Op.ne]: req.session.userInfo.id },
        },
      });

      const isFriend = await Friend.findOne({
        where: { id: req.session.userInfo.id },
      });
      const postCount = await Post.count({
        where: { letterNo: req.session.userInfo.id },
      });

      const isRequest = await RequestList.findOne({
        where: { id: req.params.id },
      });

      const eachNoti = notification.map((no) => no.postNo);
      const sender = notification.map((send) => send.sender);

      const eachLikes = notificationLikes.map((like) => like.postNo);
      const likesWho = notificationLikes.map((send) => send.likesWho);

      let notiLength = notification.length;
      if (isRequest) {
        notiLength = notification.length + 1;
      } else {
        notiLength = notification.length;
      }

      const post = postData.map((data) => data.postNo);

      req.session.profile = profile;

      if (isFriend) {
        const friend = await Friend.findAll({
          where: { id: req.session.userInfo.id },
        });

        const numberOfFriends = friend.length;

        return res.render('user/myPage', {
          session: req.session.userInfo,
          profile: req.session.profile,
          data: user,
          isLogin: true,
          isProfile: true,
          friend: numberOfFriends,
          postNo: post,
          noti: notiLength + notificationLikes.length,
          postCount: postCount,
          postNoti: eachNoti,
          likesWho: likesWho,
          sender: sender,
          postLikes: eachLikes,
        });
      } else {
        return res.render('user/myPage', {
          session: req.session.userInfo,
          profile: req.session.profile,
          data: user,
          isLogin: true,
          isProfile: true,
          postNo: post,
          friend: 0,
          noti: notiLength + notificationLikes.length,
          postCount: postCount,
          postNoti: eachNoti,
          likesWho: likesWho,
          sender: sender,
          postLikes: eachLikes,
        });
      }
    } else {
      return res.render('user/login', {
        session: req.session.userInfo,
        isLogin: false,
        isProfile: false,
        message: '로그인해주세요!',
      });
    }
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
    return res.send(result2);
  },

  noticeDelete: async (req, res) => {
    const result = await Notice.destroy({
      where: {
        noticeNo: req.params.noticeNo,
      },
    });
    if (result === 1) {
      return res.redirect('/notice');
    }
  },

  noticeUpdate: async (req, res) => {
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
    return res.send(result);
  },

  search: async (req, res) => {
    const keyword = req.query.keyword;
    const users = await User.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nickname: { [Sequelize.Op.like]: `%${keyword}%` } },
        ],
      },
    });

    if (users) {
      return res.send({
        msg: true,
        data: users,
      });
    } else {
      return res.send({
        msg: false,
      });
    }
  },
};

module.exports = { output, input };
