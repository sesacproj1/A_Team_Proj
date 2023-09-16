const { User, Friend, toFriend, RequestList } = require('../models');

// const userInfo = req.session.userInfo;

const input = {
  reqFriend: async (req, res) => {
    const toId = req.params.letterNo;
    const userInfo = req.session.userInfo;
    const fromUserId = userInfo.userId;

    const checkFriend = await toFriend.findOne({
      where: { id: toId, toFriendUserId: fromUserId },
    });

    const checkRequest = await RequestList.findOne({
      where: { id: toId, nickname: fromUserId },
    });

    if (!checkFriend && !checkRequest) {
      await RequestList.create({
        id: toId,
        nickname: fromUserId,
      });
      res.send({ result: 'true' });
    } else if (checkFriend) {
      res.send({ result: 'false', message: '이미 추가된 송편입니다.' });
    } else if (checkRequest) {
      res.send({ result: 'false', message: '이미 송편 요청한 상태입니다.' });
    }
  },

  delFriend: async (req, res) => {
    await Friend.destroy({
      where: { id: req.params.id },
    });
    await toFriend.destroy({
      where: { id: req.params.id },
    });

    res.send('true');
  },

  rejectRequest: async (req, res) => {
    const userId = req.body.userId;
    const userInfo = req.session.userInfo;
    const id = userInfo.id;

    // 요청 거절시 request 목록에서 삭제
    await RequestList.destroy({
      where: { id: id, nickname: userId },
    });

    res.send({ result: 'true' });
  },
};

const output = {
  showFriend: async (req, res) => {
    if (req.session.userInfo !== undefined) {
      const userInfo = req.session.userInfo;
      console.log(userInfo);
      const id = userInfo.id;
      console.log(id);
      // 요청을 보내서 추가된 경우 : Friend에서 id값으로 추출
      const FriendList = await Friend.findAll({
        where: { id: id },
        attributes: ['friendUserId'],
        raw: true,
      });
      console.log(FriendList);
      // 요청 수락해서 추가된 경우 : toFriend에서 id값으로 추출
      const toFriendList = await toFriend.findAll({
        where: { id: id },
        attributes: ['toFriendUserId'],
        raw: true,
      });
      const myFriend = [FriendList, toFriendList];
      console.log('친구목록>>', myFriend);
      res.render('letter/friends', {
        session: req.session.userInfo,
        profile: req.session.profile,
      });
    } else {
      res.render('user/login', {
        session: req.session.userInfo,
        isLogin: false,
        message: '잘못된 접근입니다. 로그인해주세요',
      });
    }
  },

  showRequest: async (req, res) => {
    const userInfo = req.session.userInfo;
    const id = userInfo.id;
    const requests = await RequestList.findAll({
      where: { id: id },
      attributes: ['nickname'],
      raw: true,
    });

    res.render('letter/friendConfirm', {
      requests: requests,
      session: req.session.userInfo,
    });
  },

  confirmRequest: async (req, res) => {
    const userId = req.body.userId;
    const userInfo = req.session.userInfo;
    const id = userInfo.id;
    const toUserId = userInfo.userId;
    // 요청 수락시 request 목록에서 삭제
    await RequestList.destroy({
      where: { id: id, nickname: userId },
    });
    // 요청을 수락한 User의 친구목록에 nickname 추가
    await toFriend.create({
      id: id,
      toFriendUserId: userId,
    });

    const addFriend = await User.findOne({
      where: { userId: userId },
      attributes: ['id'],
    });
    // 요청을 수락받은 User의 친구목록에 수락한 User의 nickname 추가

    await Friend.create({
      id: addFriend.id,
      friendUserId: toUserId,
    });

    res.send({ result: 'true' });
  },
};

module.exports = { input, output };
